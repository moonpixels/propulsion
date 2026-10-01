"""Measure maximum syntactic control nesting per Python function."""

from __future__ import annotations

import ast


CONTROLS = {'If', 'For', 'AsyncFor', 'While', 'Try', 'TryStar', 'With', 'AsyncWith', 'Match', 'IfExp'}
FUNCTIONS = (ast.FunctionDef, ast.AsyncFunctionDef)
COMPREHENSIONS = (ast.ListComp, ast.SetComp, ast.DictComp, ast.GeneratorExp)


def control_depth(node: ast.AST, depth: int = 0) -> int:
    if isinstance(node, FUNCTIONS):
        headers = [node.args, *node.decorator_list, *getattr(node, 'type_params', [])]
        if node.returns is not None:
            headers.append(node.returns)
        return max([depth, *(control_depth(header, depth) for header in headers)])
    if isinstance(node, COMPREHENSIONS):
        # Each generator nests in the preceding generator and its filters.
        maximum = depth
        level = depth
        for generator in node.generators:
            level += 1
            maximum = max(maximum, control_depth(generator.iter, level))
            if generator.ifs:
                level += 1
            maximum = max(maximum, level)
            for condition in generator.ifs:
                maximum = max(maximum, control_depth(condition, level))
        for field in ('elt', 'key', 'value'):
            if hasattr(node, field):
                maximum = max(maximum, control_depth(getattr(node, field), level))
        return maximum
    nested = depth + int(type(node).__name__ in CONTROLS)
    maximum = nested
    for child in ast.iter_child_nodes(node):
        # An elif belongs to the same choice as its preceding if.
        is_elif = (isinstance(node, ast.If) and child in node.orelse
                   and isinstance(child, ast.If) and child.col_offset == node.col_offset)
        child_depth = depth if is_elif else nested
        maximum = max(maximum, control_depth(child, child_depth))
    return maximum


def function_depths(source: str, filename: str) -> dict[int, int]:
    tree = ast.parse(source, filename=filename)
    return {
        node.lineno: max((control_depth(statement) for statement in node.body), default=0)
        for node in ast.walk(tree)
        if isinstance(node, (ast.FunctionDef, ast.AsyncFunctionDef))
    }
