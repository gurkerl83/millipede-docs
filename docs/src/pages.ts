import { Icon, IconType, Page } from '@app/types';
import _ from 'lodash';

const lowerTextIncludes = (text: string, sub: string) =>
  _.includes(_.lowerCase(text), _.lowerCase(_.trimStart(sub)));

export const loadPages = (pathname: string, _currentPages: Array<Page>) => {
  if (pathname === '/') {
    return [];
  }
  return [
    ...pagesAI,
    ...pagesRethinkSecurity,
    ...pagesPIDP,
    ...pagesPET,
    ...pagesPerspective,
    ...pagesGuides,
    ...pagesDiscoverMore
  ];
};

/* eslint-disable consistent-return */
export const loadPagesToRefactor = (
  pathname: string,
  currentPages: Array<Page>
) => {
  const linkIncludesText = (link: Page) =>
    lowerTextIncludes(link.pathname, pathname);

  if (pathname === '/') {
    return [];
  }

  if (
    pagesPIDP.filter(link => {
      return _.some([link, ...(link.children || [])], linkIncludesText);
    }).length > 0
  ) {
    return [
      ...pagesRethinkSecurity,
      ...pagesPIDP,
      ...pagesPerspective,
      ...pagesDiscoverMore
    ];
  }

  if (currentPages.length === 0) {
    return [
      ...pagesRethinkSecurity,
      ...pagesPIDP,
      ...pagesPerspective,
      ...pagesDiscoverMore
    ];
  }

  if (
    pagesRethinkSecurity.filter(link => {
      return _.some([link, ...(link.children || [])], linkIncludesText);
    }).length > 0
  ) {
    return [...currentPages];
  }

  if (
    pagesDiscoverMore.filter(link => {
      return _.some([link, ...(link.children || [])], linkIncludesText);
    }).length > 0
  ) {
    return [...currentPages];
  }

  if (
    pagesPerspective.filter(link => {
      return _.some([link, ...(link.children || [])], linkIncludesText);
    }).length > 0
  ) {
    return [...currentPages];
  }
};

export const defaultIcon: Icon = {
  type: IconType.MUI,
  name: 'star'
};

export const defaultFAIcon: Icon = {
  type: IconType.FA,
  name: ''
};

export const pagesDiscoverMore: Array<Page> = [
  {
    pathname: '/discover-more',
    icon: { ...defaultIcon, name: 'info' },
    children: [
      {
        pathname: '/discover-more/support',
        icon: {
          ...defaultIcon,
          name: 'contact_support'
        }
      },
      {
        pathname: '/discover-more/team',
        icon: {
          ...defaultIcon,
          name: 'group_work'
        }
      },
      {
        pathname: '/discover-more/organisation',
        icon: {
          ...defaultIcon,
          name: 'business'
        }
      }
    ]
  }
];

export const pagesPIDP: Array<Page> = [
  {
    pathname: '/pidp',
    icon: defaultIcon,
    children: [
      {
        pathname: '/pidp/intro',
        icon: { ...defaultIcon, name: 'slideshow' }
      },
      {
        pathname: '/pidp/approach',
        icon: { ...defaultIcon, name: 'filter_center_focus' },
        children: [
          {
            pathname: '/pidp/approach/intro',
            icon: { ...defaultIcon, name: 'slideshow' }
          },
          {
            pathname: '/pidp/approach/byExample',
            icon: { ...defaultIcon, name: 'touch_app' }
          }
        ]
      },
      {
        pathname: '/pidp/use-case',
        icon: { ...defaultIcon, name: 'extension' },
        children: [
          {
            pathname: '/pidp/use-case/intro',
            icon: { ...defaultIcon, name: 'slideshow' }
          },
          {
            pathname: '/pidp/use-case/recognition',
            icon: { ...defaultIcon, name: 'flip' }
          },
          {
            pathname: '/pidp/use-case/response',
            icon: { ...defaultIcon, name: 'create' }
          }
        ]
      }
    ]
  }
];

export const pagesAI: Array<Page> = [
  {
    pathname: '/ai',
    icon: defaultIcon,
    children: [
      {
        pathname: '/ai/objectives',
        icon: { ...defaultIcon, name: 'offline_bolt' }
      },
      {
        pathname: '/ai/general',
        icon: { ...defaultIcon, name: 'toc' }
      },
      {
        pathname: '/ai/reverse',
        icon: { ...defaultIcon, name: 'find_replace' },
        children: [
          {
            pathname: '/ai/reverse/intro',
            icon: { ...defaultIcon, name: 'slideshow' }
          },
          {
            pathname: '/ai/reverse/hooks',
            icon: { ...defaultIcon, name: 'functions' }
          }
        ]
      }
    ]
  }
];

// export const pagesPET: Array<Page> = [
//   {
//     pathname: '/common',
//     icon: defaultIcon,
//     children: [
//       {
//         pathname: '/common/dataflow',
//         icon: { ...defaultIcon, name: 'waves' },
//       },
//       {
//         pathname: '/common/dataflow/comparison',
//         icon: { ...defaultIcon, name: 'compare_arrows' },
//       },
//     ],
//   },
// ];

export const pagesPET: Array<Page> = [
  {
    pathname: '/pet',
    icon: defaultIcon
  }
];

export const pagesRethinkSecurity: Array<Page> = [
  {
    pathname: '/rethink-security',
    icon: { ...defaultIcon, name: 'security' },
    children: [
      {
        pathname: '/rethink-security/intro',
        icon: { ...defaultIcon, name: 'slideshow' }
      },
      {
        pathname: '/rethink-security/attackVectors',
        icon: { ...defaultIcon, name: 'bug_report' },
        children: [
          {
            pathname: '/rethink-security/attackVectors/intro',
            icon: { ...defaultIcon, name: 'slideshow' }
          },
          {
            pathname: '/rethink-security/attackVectors/comparison',
            icon: { ...defaultIcon, name: 'compare_arrows' }
          }
        ]
      }
    ]
  }
];

export const pagesPerspective: Array<Page> = [
  {
    pathname: '/perspective',
    icon: { ...defaultIcon, name: 'layers' },
    children: [
      {
        pathname: '/perspective/strategy',
        icon: { ...defaultIcon, name: 'list' }
      },
      {
        pathname: '/perspective/cause',
        icon: { ...defaultIcon, name: 'warning' }
      },
      {
        pathname: '/perspective/shortsighted',
        icon: { ...defaultIcon, name: 'trending_down' }
      },
      {
        pathname: '/perspective/competence',
        icon: { ...defaultIcon, name: 'flash_on' }
      },
      {
        pathname: '/perspective/reference',
        icon: { ...defaultIcon, name: 'format_quote' }
      }
    ]
  }
];

export const pagesGuides: Array<Page> = [
  {
    pathname: '/guides',
    icon: { ...defaultIcon, name: 'explore' },
    children: [
      {
        pathname: '/guides/engineering',
        icon: {
          ...defaultIcon,
          name: 'code'
        },
        children: [
          {
            pathname: '/guides/engineering/applicationTypes',
            icon: {
              ...defaultIcon,
              name: 'call_split'
            }
          }
        ]
      },
      {
        pathname: '/guides/research',
        icon: {
          ...defaultIcon,
          name: 'book'
        },
        children: [
          {
            pathname: '/guides/research/paper',
            icon: { ...defaultIcon, name: 'book' }
          }
        ]
      },
      {
        pathname: '/guides/disinformation',
        icon: { ...defaultIcon, name: 'info' },
        children: [
          {
            pathname: '/guides/disinformation/general',
            icon: { ...defaultIcon, name: 'toc' }
          },
          {
            pathname: '/guides/disinformation/objectives',
            icon: { ...defaultIcon, name: 'assessment' }
          }
        ]
      }
    ]
  }
];
