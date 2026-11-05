#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CACHE_PATH = path.resolve(__dirname, '../src/data/github-cache.json');
const USERNAME = 'VinayKumar2320';

async function syncGitHub() {
  console.log(`[SYNC] Fetching public repositories for user ${USERNAME}...`);
  try {
    const headers = {
      'User-Agent': 'Vinay-Portfolio-Sync',
      'Accept': 'application/vnd.github.v3+json'
    };
    if (process.env.GITHUB_TOKEN) {
      headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
    }

    const res = await fetch(`https://api.github.com/users/${USERNAME}/repos?per_page=100`, { headers });
    if (!res.ok) {
      throw new Error(`GitHub API responded with status ${res.status}: ${res.statusText}`);
    }

    const repos = await res.json();
    if (!Array.isArray(repos)) {
      throw new Error('Unexpected response format from GitHub API');
    }

    const curated = repos.map((r) => ({
      id: r.id,
      name: r.name,
      fullName: r.full_name,
      description: r.description || '',
      url: r.html_url,
      stars: r.stargazers_count || 0,
      forks: r.forks_count || 0,
      language: r.language || 'General',
      isFork: Boolean(r.fork),
      updatedAt: r.updated_at || '',
      pushedAt: r.pushed_at || '',
      topics: r.topics || []
    }));

    const newCache = {
      lastSyncTimestamp: new Date().toISOString(),
      totalPublicRepos: curated.length,
      repositories: curated
    };

    let existingTotal = 0;
    if (fs.existsSync(CACHE_PATH)) {
      try {
        const oldData = JSON.parse(fs.readFileSync(CACHE_PATH, 'utf-8'));
        existingTotal = oldData.totalPublicRepos || 0;
      } catch (e) {
        // ignore
      }
    }

    fs.writeFileSync(CACHE_PATH, JSON.stringify(newCache, null, 2), 'utf-8');
    console.log(`[SYNC] Success! Cached ${curated.length} repositories (previously ${existingTotal}).`);
  } catch (err) {
    console.error(`[SYNC] Error syncing with GitHub:`, err.message);
    process.exitCode = 1;
  }
}

syncGitHub();
