// Accept standard preview flags while keeping the project's Next.js runtime.
import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const production = process.argv.includes('--production');
const args = process.argv.slice(2).filter(arg => !['--strictPort', '--production'].includes(arg))
  .map(arg => arg === '--host' ? '--hostname' : arg);
const child = spawn(process.execPath, [require.resolve('next/dist/bin/next'), production ? 'start' : 'dev', ...args], { stdio: 'inherit' });
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => child.kill(signal));
child.on('error', error => { console.error(error.message); process.exit(1); });
child.on('exit', code => process.exit(code ?? 1));
