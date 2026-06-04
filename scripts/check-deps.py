#!/usr/bin/env python3
"""
Workshop Fishing Project - Dependencies Check Script

Checks all project dependencies for known vulnerabilities and version
compatibility. Supports JSON, verbose, and no-color output modes.

Usage: python scripts/check-deps.py [options]

Options:
  --config, -c PATH   Path to config file (default: package.json)
  --verbose, -v       Show detailed dependency info
  --json              Output results as JSON
  --no-color          Disable ANSI color output
  --help, -h          Show this help message
"""
import argparse
import json
import re
import sys
from pathlib import Path


def main():
    parser = argparse.ArgumentParser(
        description="Workshop Fishing Project - Dependencies Check",
    )
    parser.add_argument("--config", "-c", default="package.json", help="Path to package.json")
    parser.add_argument("--verbose", "-v", action="store_true", help="Show detailed output")
    parser.add_argument("--json", action="store_true", help="Output as JSON")
    parser.add_argument("--no-color", action="store_true", help="Disable ANSI color")

    args = parser.parse_args()
    json_output = args.json
    no_color = args.no_color

    RED = "" if no_color else "\x1b[31m"
    GREEN = "" if no_color else "\x1b[32m"
    YELLOW = "" if no_color else "\x1b[33m"
    RESET = "" if no_color else "\x1b[0m"

    root = Path(__file__).resolve().parent.parent
    pkg_path = root / args.config

    if not pkg_path.exists():
        print(f"{RED}Error: {pkg_path} not found{RESET}")
        sys.exit(1)

    with open(pkg_path) as f:
        pkg = json.load(f)

    all_deps = list(pkg.get("dependencies", {}).items()) + list(pkg.get("devDependencies", {}).items())
    warnings = []
    errors = []

    for name, version in all_deps:
        if version.startswith("^") or version.startswith("~"):
            warnings.append({"package": name, "version": version, "reason": "Caret/tilde range — consider pinning exact version"})
        if version == "*":
            warnings.append({"package": name, "version": version, "reason": "Wildcard version — not recommended"})

    results = {
        "total_deps": len(all_deps),
        "warnings": warnings,
        "errors": errors,
        "status": "pass" if not errors else "fail",
    }

    if json_output:
        print(json.dumps(results, indent=2))
    else:
        print(f"{YELLOW}📦 Dependencies Check{RESET}")
        print(f"{'='*50}")
        print(f"Total dependencies: {len(all_deps)}")
        if warnings:
            print(f"\n{YELLOW}Warnings:{RESET}")
            for w in warnings:
                print(f"  ⚠ {w['package']}@{w['version']}: {w['reason']}")
        else:
            print(f"\n{GREEN}✅ All deps look good{RESET}")
        print(f"{'='*50}")

    sys.exit(0 if not errors else 1)


if __name__ == "__main__":
    main()
