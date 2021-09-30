import createDocPages from '../../util-node/createDocPages';

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
        category: 'releases',
      },
      fields: {
        slug: 'releases',
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
        category: 'blog',
      },
      fields: {
        slug: '/blog/0000/00/00/mock',
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
        title: 'Releases',
      },
      fields: {
        slug: 'releases',
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
        category: 'download',
      },
      fields: {
        slug: 'installing-nodejs-via-package-manager',
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
        title: 'mock',
      },
      fields: {
        slug: '/blog/0000/00/00/mock',
      },
    },
  },
];

const expectedDocPages = [
  {
    slug: 'releases',
    next: {
      slug: '/blog/0000/00/00/mock',
      title: 'mock',
    },
    previous: null,
    relativePath: 'releases.md',
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
      slug: 'installing-nodejs-via-package-manager',
      title: 'Installing Node.js via package manager',
    },
    previous: {
      slug: 'releases',
      title: 'Releases',
    },
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
    previous: {
      slug: '/blog/0000/00/00/mock',
      title: 'mock',
    },
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

describe('createDocPages', () => {
  it('returns expected object', () => {
    const docPages = createDocPages(edges);
    expect(docPages).toEqual(expectedDocPages);
  });
});
