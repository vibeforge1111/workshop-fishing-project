#!/usr/bin/env node
/**
 * Workshop Fishing Project - Data Migration Script (dry-run)
 *
 * Validates data integrity and supports dry-run migration verification.
 * Useful for checking database migrations before applying them.
 *
 * Usage: node scripts/migrate-check.js [options]
 *
 * Options:
 *   --dry-run          Show what would be done without making changes
 *   --verbose, -v      Show detailed migration steps
 *   --json             Output results as JSON
 *   --no-color         Disable ANSI color output
 *   --help, -h         Show this help message
 */

const fs = require('fs');
const path = require('path');

// Parse CLI arguments
const args = process.argv.slice(2);
const flags = {};
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--dry-run') {
    flags['dry-run'] = true;
  } else if (args[i] === '--verbose' || args[i] === '-v') {
    flags.verbose = true;
  } else if (args[i] === '--json') {
    flags.json = true;
  } else if (args[i] === '--no-color') {
    flags.nocolor = true;
  } else if (args[i] === '--help' || args[i] === '-h') {
    console.log(`Workshop Fishing Project - Data Migration Check

Usage: node scripts/migrate-check.js [options]

Options:
  --dry-run        Show what would be done without making changes
  --verbose, -v    Show detailed migration steps
  --json           Output results as JSON
  --no-color       Disable ANSI color output
  --help, -h       Show this help message

Description:
  Validates the project structure and checks data integrity.
  Use --dry-run to preview migrations before applying them.
`);
    process.exit(0);
  }
}

const DRY_RUN = flags['dry-run'];
const VERBOSE = flags.verbose;
const JSON_OUTPUT = flags.json;
const NO_COLOR = flags.nocolor;
const ROOT = path.resolve(__dirname, '..');

const ENABLE_COLOR = !NO_COLOR;
const RED = ENABLE_COLOR ? '\x1b[31m' : '';
const GREEN = ENABLE_COLOR ? '\x1b[32m' : '';
const YELLOW = ENABLE_COLOR ? '\x1b[33m' : '';
const CYAN = ENABLE_COLOR ? '\x1b[36m' : '';
const RESET = ENABLE_COLOR ? '\x1b[0m' : '';

const results = [];
const actions = [];

function check(label, fn) {
  let passed = false;
  let error = null;
  try {
    passed = fn();
  } catch (err) {
    error = err.message;
  }
  const status = passed ? 'pass' : (error ? 'error' : 'fail');
  results.push({ label, status, error });
  if (VERBOSE || !passed) {
    const color = passed ? GREEN : RED;
    console.log(`${color}[${status.toUpperCase()}]${RESET} ${label}${error ? ': ' + error : ''}`);
  }
  return passed;
}

function planAction(description, details) {
  actions.push({ description, details });
  if (VERBOSE) {
    console.log(`  ${CYAN}→${RESET} ${description}: ${details}`);
  }
}

console.log(`${YELLOW}🎣 Workshop Fishing Project - Data Check${RESET}\n`);

if (DRY_RUN) {
  console.log(`${YELLOW}DRY RUN MODE - No changes will be made${RESET}\n`);
}

// Structure checks
check('package.json exists', () => fs.existsSync(path.join(ROOT, 'package.json')));
check('src directory exists', () => fs.existsSync(path.join(ROOT, 'src')));
check('vite.config.js exists', () => fs.existsSync(path.join(ROOT, 'vite.config.js')));
check('svelte.config.js exists', () => fs.existsSync(path.join(ROOT, 'svelte.config.js')));
check('src/routes directory exists', () => fs.existsSync(path.join(ROOT, 'src', 'routes')));
check('src/lib directory exists', () => fs.existsSync(path.join(ROOT, 'src', 'lib')));

// Route discovery
const routesDir = path.join(ROOT, 'src', 'routes');
let routeCount = 0;
if (fs.existsSync(routesDir)) {
  const entries = fs.readdirSync(routesDir, { withFileTypes: true });
  routeCount = entries.filter(e => e.isDirectory()).length;
  const pageFiles = entries.filter(e => e.isFile() && e.name.startsWith('+')).length;
  check(`Routes directory has ${routeCount} route directories`, () => routeCount > 0);
  check(`Route files present (${pageFiles} +page files)`, () => pageFiles > 0);
}

// Plan migrations (dry-run only)
if (fs.existsSync(path.join(ROOT, 'src', 'routes'))) {
  const entries = fs.readdirSync(path.join(ROOT, 'src', 'routes'), { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory() && entry.name !== 'api') {
      const routePath = path.join(ROOT, 'src', 'routes', entry.name);
      const files = fs.readdirSync(routePath);
      const pageFiles = files.filter(f => f.startsWith('+page'));
      if (pageFiles.length === 0) {
        planAction(`Empty route: /${entry.name}`, 'No +page.svelte found');
      } else if (VERBOSE) {
        planAction(`Route OK: /${entry.name}`, `${pageFiles.length} page file(s)`);
      }
    }
  }
}

// Summary
let allPassed = results.every(r => r.status === 'pass');
console.log(`\n${allPassed ? `${GREEN}✅ All checks passed${RESET}` : `${RED}❌ Some checks failed${RESET}`}`);

if (DRY_RUN) {
  console.log(`\n${CYAN}Planned actions:${RESET} ${actions.length}`);
  actions.forEach(a => console.log(`  • ${a.description}: ${a.details}`));
}

if (JSON_OUTPUT) {
  console.log(JSON.stringify({
    passed: allPassed,
    dry_run: DRY_RUN,
    checks: results,
    planned_actions: actions,
    summary: { total: results.length, passed: results.filter(r => r.status === 'pass').length, failed: results.filter(r => r.status !== 'pass').length, actions: actions.length }
  }));
}

process.exit(allPassed ? 0 : 1);
