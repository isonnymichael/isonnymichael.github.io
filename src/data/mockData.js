export const profile = {
  name: 'Sonny Michael Wijaya',
  title: 'Fullstack Developer · Web3 Builder · AI-Driven Maker',
  github: 'https://github.com/isonnymichael',
  linkedIn: 'https://www.linkedin.com/in/isonnymichael',
  email: 'mailto:hello@isonnymichael.dev',
  wallet: '0x9f8A...4B2e',
}

export const githubStats = {
  commits: 1432,
  contributions: 920,
  commitStreak: 38,
  prsMerged: 186,
  contributionHeatmap: [
    [1, 2, 1, 3, 2, 0, 2],
    [2, 3, 1, 4, 2, 1, 3],
    [0, 2, 3, 3, 4, 2, 2],
    [1, 4, 3, 2, 3, 1, 2],
    [2, 3, 4, 2, 2, 3, 1],
  ],
  languages: [
    { name: 'JavaScript', percent: 41 },
    { name: 'TypeScript', percent: 24 },
    { name: 'CSS', percent: 18 },
    { name: 'Solidity', percent: 11 },
    { name: 'Python', percent: 6 },
  ],
}

export const repositories = [
  {
    name: 'html-form-validator',
    description:
      'A lightweight and extensible JavaScript library for validating HTML forms.',
    tags: ['JavaScript', 'Validation', 'Library'],
    stars: 8,
    forks: 5,
    url: 'https://github.com/isonnymichael',
  },
  {
    name: 'isonnymichael.github.io',
    description:
      'Personal portfolio website with modern UI experiments and interactive modules.',
    tags: ['React', 'Tailwind', 'Framer Motion'],
    stars: 107,
    forks: 43,
    url: 'https://github.com/isonnymichael/isonnymichael.github.io',
  },
  {
    name: 'base-smart-contract-lab',
    description: 'Exercises and examples for learning smart contract development on Base.',
    tags: ['Solidity', 'Foundry', 'Base'],
    stars: 18,
    forks: 6,
    url: 'https://github.com/isonnymichael',
  },
  {
    name: 'tea-bounty-action',
    description:
      'GitHub Action that sends native TEA token rewards when bounty PRs are merged.',
    tags: ['TypeScript', 'GitHub Actions', 'Automation'],
    stars: 14,
    forks: 3,
    url: 'https://github.com/isonnymichael',
  },
]

export const techStack = {
  Frontend: ['React', 'Tailwind CSS', 'Framer Motion', 'Vite'],
  Backend: ['Node.js', 'Express', 'PostgreSQL', 'REST API'],
  DevOps: ['GitHub Actions', 'Docker', 'Vercel', 'Cloudflare'],
  Web3: ['Solidity', 'Foundry', 'Ethers.js', 'Base'],
}

export const assistantMessages = [
  { role: 'user', content: 'Show skills' },
  { role: 'assistant', content: 'Frontend, Backend, DevOps, and Web3 modules are online.' },
  { role: 'user', content: 'Top projects' },
  {
    role: 'assistant',
    content: 'html-form-validator, tea-bounty-action, and this interactive portfolio.',
  },
  { role: 'user', content: 'GitHub stats' },
  { role: 'assistant', content: '920 contributions this year with a 38-day commit streak.' },
]
