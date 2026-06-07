import { Link, useLocation } from 'react-router-dom';

export default function Footer() {
  const navigation = useLocation();
  type FooterLink = { name: string; link: string };

  const helpLinks: FooterLink[] = [
    { name: 'FAQs', link: '#' },
    { name: 'Contact Us', link: '#' },
  ];

  const moreLinks: FooterLink[] = [
    { name: 'New Arrivals', link: '#' },
    { name: 'Best Sellers', link: '#' },
    { name: 'Men', link: '#' },
    { name: 'Women', link: '#' },
    { name: 'Accessories', link: '#' },
    { name: 'Sale', link: '#' },
  ];

  const legalLinks: FooterLink[] = [
    { name: 'Privacy Policy', link: '#' },
    { name: 'Terms of Service', link: '#' },
    { name: 'Sitemap', link: '#' },
    { name: 'Accessibility', link: '#' },

  ];

  return (
    <>
    <footer
      className={`z-10 bg-white dark:bg-black font-sans mt-auto border-t border-gray-200 dark:border-neutral-800 ${
        navigation.pathname === '/login' || navigation.pathname === '/register'
          ? 'hidden'
          : 'block'
      }`}
    >
      <div className="mx-auto flex flex-col items-center ">
        {/* Top area: Blocks */}
        <div className="grid w-full max-w-7xl gap-8 py-8 p-4 sm:grid-cols-12 sm:px-6 md:py-12">
          <div className="sm:col-span-12 lg:col-span-8 xl:col-span-9 p-4">
            <div className="flex w-full flex-1 border-gray-200 dark:border-neutral-800">
              {/* Help */}
              <ul className="flex flex-col border-gray-200 dark:border-neutral-800 mr-4">
                <p className="mb-4"><span className="font-semibold text-gray-800 dark:text-neutral-200">Help</span></p>
                <div className="from-desktop:max-w-[25rem]">
                  <div>
                    {helpLinks.map(({ name, link }) => (
                      <li key={name} className="py-1.5">
                        {link.startsWith('http') ? (
                          <a
                            className="text-sm text-gray-600 dark:text-neutral-400 transition hover:text-gray-900 dark:hover:text-white"
                            href={link}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <span className="pb-[2px]">{name}</span>
                          </a>
                        ) : (
                          <Link
                            className="text-sm text-gray-600 dark:text-neutral-400 transition hover:text-gray-900 dark:hover:text-white"
                            to={link}
                          >
                            <span className="pb-[2px]">{name}</span>
                          </Link>
                        )}
                      </li>
                    ))}
                  </div>
                </div>
              </ul>

              {/* Shop */}
              <ul className="flex flex-col border-gray-200 dark:border-neutral-800 mr-4">
                <p className="mb-4"><span className="font-semibold text-gray-800 dark:text-neutral-200">Shop</span></p>
                <div className="from-desktop:max-w-[25rem]">
                  <div>
                    {moreLinks.map(({ name, link }) => (
                      <li key={name} className="py-1.5">
                        {link.startsWith('http') ? (
                          <a
                            className="text-sm text-gray-600 dark:text-neutral-400 transition hover:text-gray-900 dark:hover:text-white"
                            href={link}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <span className="pb-[2px]">{name}</span>
                          </a>
                        ) : (
                          <Link
                            className="text-m text-gray-600 dark:text-neutral-400 transition hover:text-gray-900 dark:hover:text-white"
                            to={link}
                          >
                            <span className="pb-[2px]">{name}</span>
                          </Link>
                        )}
                      </li>
                    ))}
                  </div>
                </div>
              </ul>

              {/* Address */}
              <ul className="flex flex-col border-gray-200 dark:border-neutral-800 mr-4">
                <p className="mb-4 "><span className="font-semibold text-gray-800 dark:text-neutral-200">Address</span></p>
                <div>
                  <div>
                    <p className="py-1 text-gray-600 dark:text-neutral-400 transition hover:text-gray-900 dark:hover:text-white">
                      <a
                        className="text-m"
                        href="https://maps.app.goo.gl/NN9EpPgK8wrLLdMV9"
                        target="_blank"
                        rel="noreferrer"
                      >
                        13927 South Gessner Road, Missouri City Texas 77489, United States
                      </a>
                    </p>
                  </div>
                </div>
              </ul>
            </div>
          </div>

          {/* Promo block */}
          <div className="sm:col-span-12 lg:col-span-4 xl:col-span-3 till-desktop:border-t border-gray-200 dark:border-neutral-800 p-4">
            <h3 className="font-bold text-gray-800">Premium Workout Clothes &amp; Athleisure</h3>
            <p className="text-sm text-gray-700 dark:text-neutral-400">
              Experience the next level of comfort, style, and functionality with our premium athleisure collections designed for those who demand the best. Shop now!
            </p>
          </div>
        </div>



        {/* Bottom area */}
        <div className="flex w-full justify-center border-y border-gray-200 dark:border-neutral-800 p-4 sm:px-6 md:py-8">
          <div className="w-full max-w-7xl px-4 sm:px-6 md:flex md:items-center md:justify-between">
            <div className="mb-4 flex flex-wrap items-center gap-1 md:order-1 md:ml-4 md:mb-0">
              {legalLinks.map((item, idx) => (
                <span key={item.name} className="flex items-center">
                  {item.link.startsWith('http') ? (
                    <a
                      className="px-1 text-m font-medium opacity-70 transition hover:opacity-100"
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {item.name}
                    </a>
                  ) : (
                    <Link
                      className="px-1 text-m font-medium opacity-70 transition hover:opacity-100"
                      to={item.link}
                    >
                      {item.name}
                    </Link>
                  )}
                  {idx < legalLinks.length - 1 && (
                    <small className="opacity-50">•</small>
                  )}
                </span>
              ))}
            </div>
            <span className="text-sm font-semibold text-gray-800 dark:text-neutral-200">© 2025 • E-cart • All Rights Reserved</span>
          </div>
        </div>
      </div>
    </footer>

    <section className="block sticky bottom-0 z-[-1] w-full border-x border-b border-secondary/20 overflow-hidden font-sans">
    <div className="w-full flex justify-center text-primary text-black dark:text-white font-bold tracking-widest text-[9rem]">
      <h4>M</h4>
      <h4>A</h4>
      <h4>A</h4>
      <h4>V</h4>
      <h4>E</h4>
      <h4>N</h4>
    </div>
  </section>
    </>
  );
}
