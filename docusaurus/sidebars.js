module.exports = {
  gitPart1: [
    {
      type: "doc",
      id: "git/welcome",
    },
    {
      type: "category",
      label: "Setup",
      items: ['git/setup', 'git/ex01'],
      collapsed: false,
    },
    'git/guigit',
    'git/dvcs',
    {
      type: "category",
      label: "Repository Creation",
      items: ['git/create/intro',
              'git/create/init',
              'git/create/ex-init',
              'git/create/clone',
              'git/create/ex-clone',
             ],
      collapsed: false,
    },
    'git/lifecycle',
    {
      type: "category",
      label: "Git Commits",
      items: ['git/commit/commit',
              'git/commit/ex-commit',
              'git/commit/shortcircuit',
             ],
      collapsed: false,
    },
    'git/log1',
    'git/ex-log',
    {
      type: "category",
      label: "Branches",
      items: ['git/branches/branches',
              'git/branches/ex-branches',
              'git/branches/addbranch',
              'git/branches/ex-noconflict',
              'git/branches/branchgraph',
              'git/branches/delbranch',
              'git/branches/branchname',
             ],
      collapsed: false,
    },
    'git/part1wrap',
  ], 
  gitPart2: [ 
    'git/part2intro',
    {
      type: "category",
      label: "Merge Conflicts",
      items: ['git/conflict/prep',
              'git/conflict/ex-conflict',
             ],
      collapsed: false,
    },
    {
      type: "category",
      label: "Remotes",
      items: ['git/remotes/intro',
              'git/remotes/scenario',
              'git/remotes/pull',
             ],
      collapsed: false,
    },
  ],
  jwt: [
    'jwt/welcome',
    'jwt/tokens',
    'jwt/jwtokens',
    'jwt/specs',
    'jwt/jwsigs',
    'jwt/ex1',
    'jwt/ex2',
    'jwt/hmac',
    'jwt/ex3',
    'jwt/ex4',
    'jwt/ex5',
    'jwt/claims',
    'jwt/scope',
    'jwt/effscope',
    'jwt/bearer',
    'jwt/libs',
    'jwt/keys',
  ],
  postman: [
    'postman/welcome',
    'postman/app',
  ],
};
