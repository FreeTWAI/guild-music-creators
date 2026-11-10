import test from 'node:test';
import { performance } from 'node:perf_hooks';
import { escapeHtml, renderWorkspace, validateWorkspace } from '../scripts/build.mjs';
import { readFile } from 'node:fs/promises';

const workspace = JSON.parse(await readFile(new URL('../workspace.json', import.meta.url), 'utf8'));

test('performance benchmark: escapeHtml', () => {
  const start = performance.now();
  for (let i = 0; i < 100000; i++) {
    escapeHtml('<script>alert("test & demo")</script>');
  }
  const end = performance.now();
  console.log(`escapeHtml 100k runs: ${end - start}ms`);
});

test('performance benchmark: renderWorkspace', () => {
  const start = performance.now();
  for (let i = 0; i < 10000; i++) {
    renderWorkspace(workspace);
  }
  const end = performance.now();
  console.log(`renderWorkspace 10k runs: ${end - start}ms`);
});

test('performance benchmark: validateWorkspace', () => {
  const start = performance.now();
  for (let i = 0; i < 100000; i++) {
    validateWorkspace(workspace);
  }
  const end = performance.now();
  console.log(`validateWorkspace 100k runs: ${end - start}ms`);
});
