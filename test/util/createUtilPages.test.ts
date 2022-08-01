import createLearnPages from '../../util-node/createLearnPages';

const edges = [
  {
    node: {
      id: 'aedc55c9-365e-595a-b47c-ecc91744b9d0',
      fileAbsolutePath: '/nodejs.dev/content/about/releases.md',
      parent: {
        relativePath: 'releases.md',
      },
      frontmatter: {
        title: 'Releases',
        description: 'Releases | Node.js',
        authors:
          'ZYSzys, nstanard,  mikeal, fhemberger, garybernhardt, piepmatz, boneskull, bjb568',
        section: null,
        category: {
          name: 'releases',
          slug: 'Releases',
        },
      },
      fields: {
        slug: 'releases',
        categoryName: 'releases',
      },
    },
    next: {
      frontmatter: {
        title: 'mock',
      },
      fields: {
        slug: '/blog/0000/00/00/mock',
      },
    },
    previous: null,
  },
  {
    node: {
      id: 'fcf411db-1983-5611-a668-9915fc33dbfa',
      fileAbsolutePath: '/nodejs.dev/content/blog/0000-00-00-mock.md',
      parent: {
        relativePath: '0000-00-00-mock.md',
      },
      frontmatter: {
        title: 'mock',
        description: null,
        authors: null,
        section: null,
        category: null, // test non-existent category
      },
      fields: {
        slug: '/blog/0000/00/00/mock',
        categoryName: 'blog',
      },
    },
    next: {
      frontmatter: {
        title: 'mock1',
      },
      fields: {
        slug: '/blog/0000/00/01/mock1',
      },
    },
    previous: {
      frontmatter: {
        title: 'Releases',
      },
      fields: {
        slug: 'releases',
      },
    },
  },
  {
    node: {
      id: 'fcf411db-1983-5611-a668-9915fc33db11',
      fileAbsolutePath: '/nodejs.dev/content/blog/0000-00-01-mock1.md',
      parent: {
        relativePath: '0000-00-01-mock1.md',
      },
      frontmatter: {
        title: 'mock1',
        description: null,
        authors: null,
        section: null,
        category: null, // test non-existent category
      },
      fields: {
        slug: '/blog/0000/00/01/mock1',
        categoryName: 'blog',
      },
    },
    next: {
      frontmatter: {
        title: 'Installing Node.js via package manager',
      },
      fields: {
        slug: 'installing-nodejs-via-package-manager',
      },
    },
    previous: {
      frontmatter: {
        title: 'mock',
      },
      fields: {
        slug: '/blog/0000/00/00/mock',
      },
    },
  },
  {
    node: {
      id: '56fcc407-0035-56dc-aa7a-d68d0c992a7d',
      fileAbsolutePath: '/nodejs.dev/content/download/package-manager.md',
      parent: {
        relativePath: 'package-manager.md',
      },
      frontmatter: {
        title: 'Installing Node.js via package manager',
        description: 'Installing Node.js via package manager',
        authors:
          'fhemberger, XhmikosR, shadowspawn, vsemozhetbyt, nschonni, wildcard, MrJithil, kasicka, cassidyjames, Trott, richardlau, Qantas94Heavy, pierreneter, 0mp, ThePrez, PoojaDurgad, MaledongGit, Megajin, marc-maurer, yodeyer, geek, sudowork, strawbrary, ryanmurakami, rbnswartz, arkwright, oliversalzburg, mweagle, Mohamed3on, Ginden, kapouer, jperkin, jericopulvera, jedsmith, jasonkarns, sonicdoe, mcollina, fornwall, danbev, naskapal, awochna, AdamMajer, ahmetanilgur, bnb, qbit',
        section: null,
        category: {
          name: 'download',
          slug: 'Download',
        },
      },
      fields: {
        slug: 'installing-nodejs-via-package-manager',
        categoryName: 'download',
      },
    },
    next: {
      frontmatter: {
        title: 'Introduction to Node.js',
      },
      fields: {
        slug: 'introduction-to-nodejs',
      },
    },
    previous: {
      frontmatter: {
        title: 'mock1',
      },
      fields: {
        slug: '/blog/0000/00/01/mock1',
      },
    },
  },
];

const expectedDocPages = [
  {
    slug: 'releases',
    next: null,
    previous: null,
    relativePath: 'releases.md',
    realPath: '/nodejs.dev/content/about/releases.md',
    category: 'releases',
    navigationData: {
      null: {
        data: [
          {
            title: 'Releases',
            slug: 'releases',
            section: null,
            category: 'releases',
          },
          {
            title: 'mock',
            slug: '/blog/0000/00/00/mock',
            section: null,
            category: 'blog',
          },
          {
            title: 'mock1',
            slug: '/blog/0000/00/01/mock1',
            section: null,
            category: 'blog',
          },
          {
            title: 'Installing Node.js via package manager',
            slug: 'installing-nodejs-via-package-manager',
            section: null,
            category: 'download',
          },
        ],
        category: 'releases',
      },
    },
  },
  {
    slug: '/blog/0000/00/00/mock',
    next: {
      slug: '/blog/0000/00/01/mock1',
      title: 'mock1',
    },
    previous: null,
    realPath: '/nodejs.dev/content/blog/0000-00-00-mock.md',
    relativePath: '0000-00-00-mock.md',
    category: 'blog',
    navigationData: {
      null: {
        data: [
          {
            title: 'Releases',
            slug: 'releases',
            section: null,
            category: 'releases',
          },
          {
            title: 'mock',
            slug: '/blog/0000/00/00/mock',
            section: null,
            category: 'blog',
          },
          {
            title: 'mock1',
            slug: '/blog/0000/00/01/mock1',
            section: null,
            category: 'blog',
          },
          {
            title: 'Installing Node.js via package manager',
            slug: 'installing-nodejs-via-package-manager',
            section: null,
            category: 'download',
          },
        ],
        category: 'releases',
      },
    },
  },
  {
    slug: '/blog/0000/00/01/mock1',
    next: null,
    previous: {
      slug: '/blog/0000/00/00/mock',
      title: 'mock',
    },
    realPath: '/nodejs.dev/content/blog/0000-00-01-mock1.md',
    relativePath: '0000-00-01-mock1.md',
    category: 'blog',
    navigationData: {
      null: {
        data: [
          {
            title: 'Releases',
            slug: 'releases',
            section: null,
            category: 'releases',
          },
          {
            title: 'mock',
            slug: '/blog/0000/00/00/mock',
            section: null,
            category: 'blog',
          },
          {
            title: 'mock1',
            slug: '/blog/0000/00/01/mock1',
            section: null,
            category: 'blog',
          },
          {
            title: 'Installing Node.js via package manager',
            slug: 'installing-nodejs-via-package-manager',
            section: null,
            category: 'download',
          },
        ],
        category: 'releases',
      },
    },
  },
  {
    slug: 'installing-nodejs-via-package-manager',
    next: null,
    previous: null,
    realPath: '/nodejs.dev/content/download/package-manager.md',
    relativePath: 'package-manager.md',
    category: 'download',
    navigationData: {
      null: {
        data: [
          {
            title: 'Releases',
            slug: 'releases',
            section: null,
            category: 'releases',
          },
          {
            title: 'mock',
            slug: '/blog/0000/00/00/mock',
            section: null,
            category: 'blog',
          },
          {
            title: 'mock1',
            slug: '/blog/0000/00/01/mock1',
            section: null,
            category: 'blog',
          },
          {
            title: 'Installing Node.js via package manager',
            slug: 'installing-nodejs-via-package-manager',
            section: null,
            category: 'download',
          },
        ],
        category: 'releases',
      },
    },
  },
];

describe('createLearnPages', () => {
  it('returns expected object', () => {
    const docPages = createLearnPages(edges);
    expect(docPages).toEqual(expectedDocPages);
  });
});
