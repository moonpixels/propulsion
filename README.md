![Propulsion](assets/banner.png)

# Propulsion

Propulsion is a compact skill set for agentic coding. It gives coding agents a stronger workflow.

## Installation

### Remote

Install Propulsion from GitHub with the skills installer:

```sh
bunx skills@latest add moonpixels/propulsion
```

Choose the skills and coding agents you want when prompted.

### Local

When developing Propulsion from a local clone, link each skill you want to use into the shared Agent Skills directory:

```sh
mkdir -p ~/.agents/skills
ln -s /absolute/path/to/propulsion/skills/elicit ~/.agents/skills/elicit
```

Repeat the link for each selected skill. Codex and OpenCode both discover skills from `~/.agents/skills`; edits in the clone are available through the links without reinstalling or publishing a new version.

## Usage

Propulsion skills are independently invocable. For most feature and change requests, use this recommended workflow:

1. Shape the idea with `$elicit-with-context` until the request is understood and confirmed.

    ```text
    $elicit-with-context Help me work through an idea for <desired outcome>.
    ```

2. Implement the confirmed request with `$implement`.

    ```text
    $implement the request we just confirmed.
    ```

3. Review the working-tree changes yourself. Ask the agent to explain or adjust anything necessary, and repeat until you are satisfied with the result.

4. Commit the reviewed changes, then create the pull request.

    ```text
    $commit the reviewed changes.
    Create a $pr for the current branch.
    ```

### Alternative entry points

For a bug, start with `$debug` instead of elicitation and implementation:

```text
$debug Fix <observed problem>.
```

After the repair, rejoin the recommended workflow at human review, followed by `$commit` and `$pr`.

For codebase improvements, start with `$review-architecture` to produce an architecture report:

```text
$review-architecture Review <scope> for high-value architecture improvements.
```

Review the report, then take each accepted recommendation through the recommended workflow separately, beginning with `$elicit-with-context`.

## Acknowledgements

Propulsion is heavily inspired by:

- [mattpocock/skills](https://github.com/mattpocock/skills) for brevity, wording discipline, and the question-by-question discovery style
