/**
 * Syncs harvester state (queue progress + scraped leads) through the project's
 * own git remote, so pausing on one device and resuming on another picks up
 * exactly where the first device left off. No extra infrastructure required —
 * git is already the source of truth for this repo.
 */
const { execFile } = require('child_process');
const path = require('path');

const REPO_ROOT = path.join(__dirname, '../..');
const DATA_FILES = ['data/scraper_state.json', 'data/leads.json'];

function run(args) {
  return new Promise((resolve, reject) => {
    execFile('git', args, { cwd: REPO_ROOT, timeout: 30000 }, (err, stdout, stderr) => {
      if (err) return reject(new Error((stderr || err.message || '').trim()));
      resolve((stdout || '').trim());
    });
  });
}

async function getBranch() {
  return run(['rev-parse', '--abbrev-ref', 'HEAD']);
}

/**
 * Stage + commit + push the current harvester state. Safe to call often —
 * it's a no-op if nothing changed since the last sync.
 */
async function pushState(message) {
  try {
    await run(['add', ...DATA_FILES]);
    const staged = await run(['diff', '--cached', '--name-only', ...DATA_FILES]);
    if (!staged) {
      return { synced: false, reason: 'No state changes to sync.' };
    }
    await run(['commit', '-m', message]);
    const branch = await getBranch();
    await run(['push', 'origin', branch]);
    return { synced: true, message };
  } catch (err) {
    return { synced: false, error: err.message };
  }
}

/**
 * Fast-forward only pull of the latest state from the remote. Deliberately
 * refuses to merge/rebase if the local branch has diverged, so it never
 * silently overwrites or discards work — it just reports the failure.
 */
async function pullState() {
  try {
    const branch = await getBranch();
    await run(['fetch', 'origin', branch]);
    await run(['merge', '--ff-only', `origin/${branch}`]);
    return { synced: true };
  } catch (err) {
    return { synced: false, error: err.message };
  }
}

module.exports = { pushState, pullState };
