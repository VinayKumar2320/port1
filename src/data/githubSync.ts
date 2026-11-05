import githubCache from './github-cache.json';

export interface CachedRepo {
  id: number;
  name: string;
  fullName: string;
  description: string;
  url: string;
  stars: number;
  forks: number;
  language: string;
  isFork: boolean;
  updatedAt: string;
  pushedAt: string;
  topics: string[];
}

export interface GitHubSyncData {
  lastSyncTimestamp: string;
  totalPublicRepos: number;
  repositories: CachedRepo[];
}

export const getGitHubData = (): GitHubSyncData => {
  return githubCache as GitHubSyncData;
};

// Filter out forks, empty repos, or internal scaffolds to show meaningful repos
export const getFilteredPublicRepos = (): CachedRepo[] => {
  const data = getGitHubData();
  const hiddenNames = new Set(['VinayKumar2320', 'port1', 'vkport', 'ip']);
  return data.repositories.filter(
    (repo) => !repo.isFork && !hiddenNames.has(repo.name)
  );
};
