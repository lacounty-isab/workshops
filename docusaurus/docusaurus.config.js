module.exports = {
  title: 'ISAB  Workshops',
  tagline: 'Countywide Skills Development',
  url: 'https://workshops.lacounty-isab.org',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  favicon: '/img/favicon.ico',
  organizationName: 'lacounty-isab',
  projectName: 'workshops',
  themeConfig: {
    announcementBar: {
      id: 'next_offering',
      content: 'Next Postman delivery expected in September 2022',
      backgroundColor: '#edb879',
      textColor: '#042f66',
    },
    navbar: {
      title: 'Workshops',
      logo: {
        alt: 'LAC Site Logo',
        src: '/img/LACoSEAL.png',
      },
      items: [
        {
          to: '/docs/',
          activeBasePath: 'docs',
          label: 'Git, Part 1',
          position: 'left',
        },
        {
          to: '/docs/git/part2intro',
          activeBasePath: 'docs',
          label: 'Git, Part 2',
          position: 'left',
        },
        {
          to: '/docs/jwt/welcome',
          activeBasePath: 'docs',
          label: 'JWT',
          position: 'left',
        },
        {
          to: '/docs/postman/welcome',
          activeVasePath: 'docs',
          label: 'Postman',
          position: 'left',
        },
        {to: 'blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/lacounty-isab/workshops',
          label: 'Source on GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Workshop Source',
          items: [
            {
              label: 'Git - Parts 1 and 2',
              to: 'https://github.com/lacounty-isab/workshops/tree/master/git',
            },
            {
              label: 'Intro to Crypto, GPG and SSH',
              to: 'https://github.com/lacounty-isab/workshops/tree/master/crypto',
            },
            {
              label: 'Regular Expressions',
              to: 'https://github.com/lacounty-isab/workshops/tree/master/regex',
            },
            {
              label: 'Probability Distributions',
              to: 'https://github.com/lacounty-isab/workshops/tree/master/distributions',
            },
            {
              label: 'Intro to Data Science',
              to: 'https://github.com/lacounty-isab/workshops/tree/master/ds',
            },
          ],
        },
        {
          title: 'ISAB on',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/lacounty-isab',
            },
            {
              label: 'Docker Hub',
              href: 'https://hub.docker.com/u/lacounty',
            },
            {
              label: 'NPM',
              href: 'https://www.npmjs.com/org/isab',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Workshop Catalog',
              to: 'catalog',
            },
            {
              label: 'Official ISAB Page',
              to: 'http://ccjcc.lacounty.gov/Subcommittees-Task-Forces/Information-Systems-Advisory-Board-ISAB',
            },
            {
              label: 'CCJCC Page',
              to: 'http://ccjcc.lacounty.gov/',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()}, ISAB - Los Angeles County. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          showLastUpdateTime: false,
        },
        blog: {
          showReadingTime: true,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
