export type FooterLink = {
  name: string;
  link: string;
};

export type FooterSocial = {
  name: string;
  link: string;
  path: string;
};

export const footerMarketPlace: FooterLink[] = [
  { name: 'All Products', link: '/' },
  { name: 'New Arrivals', link: '/new' },
  { name: 'Best Sellers', link: '/best' },
];

export const footerResource: FooterLink[] = [
  { name: 'Docs', link: 'https://react.dev' },
  { name: 'Learn', link: 'https://beta.reactjs.org/learn' },
  { name: 'Community', link: 'https://react.dev/community' },
];

export const footerCompany: FooterLink[] = [
  { name: 'About', link: 'https://github.com/jinpark0625' },
  { name: 'Contact', link: 'mailto:example@example.com' },
  { name: 'Careers', link: '#' },
];

export const footerSocial: FooterSocial[] = [
  {
    name: 'Twitter',
    link: 'https://twitter.com',
    path: 'M32 6.076a13.172 13.172 0 0 1-3.769 1.031 6.588 6.588 0 0 0 2.887-3.631 13.168 13.168 0 0 1-4.169 1.594A6.56 6.56 0 0 0 22.155 4c-3.626 0-6.563 2.938-6.563 6.563 0 .514.058 1.016.17 1.496C10.303 11.84 5.464 9.108 2.228 5.148a6.544 6.544 0 0 0-.888 3.3c0 2.279 1.16 4.287 2.92 5.468a6.548 6.548 0 0 1-2.973-.821v.083c0 3.183 2.264 5.837 5.269 6.442a6.58 6.58 0 0 1-2.965.113c.836 2.61 3.26 4.51 6.134 4.563A13.161 13.161 0 0 1 0 27.524 18.588 18.588 0 0 0 10.063 30c12.072 0 18.675-10.002 18.675-18.675 0-.284-.006-.568-.019-.85A13.353 13.353 0 0 0 32 6.076z',
  },
];




