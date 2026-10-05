#!/usr/bin/env python3
# /// script
# requires-python = ">=3.9"
# dependencies = ["tiktoken==0.14.0"]
# ///
"""Count UTF-8 text with a pinned tokenizer and an explicit encoding."""

import argparse
import json
from pathlib import Path
import sys


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--encoding", required=True, help="Named tiktoken encoding")
    parser.add_argument("files", nargs="*", help="UTF-8 files; - or no files reads stdin")
    args = parser.parse_args()
    files = args.files or ["-"]
    if files.count("-") > 1:
        parser.error("stdin may be supplied only once")

    try:
        import tiktoken

        if tiktoken.__version__ != "0.14.0":
            raise ValueError("Expected tiktoken 0.14.0; run this script with uv")
        encoder = tiktoken.get_encoding(args.encoding)
        inputs = []
        for filename in files:
            raw = sys.stdin.buffer.read() if filename == "-" else Path(filename).read_bytes()
            count = len(encoder.encode_ordinary(raw.decode("utf-8")))
            inputs.append({"input": filename, "tokens": count})
        print(json.dumps({
            "encoding": encoder.name,
            "tokenizer_version": tiktoken.__version__,
            "inputs": inputs,
            "total_tokens": sum(item["tokens"] for item in inputs),
        }))
        return 0
    except Exception as error:
        print(json.dumps({"error": str(error)}), file=sys.stderr)
        return 1


if __name__ == "__main__":
    sys.exit(main())
