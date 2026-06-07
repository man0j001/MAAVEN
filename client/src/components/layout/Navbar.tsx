
import { HiOutlineUserCircle } from "react-icons/hi2";
import { CgShoppingBag } from "react-icons/cg";
import { CgSearch } from "react-icons/cg";
import { Link } from "react-router-dom";
import ThemeToggle from "../ui/ThemeToggle";

const MenuLinks = [
  {
    id: 3,
    name: "MEN",
    link: "/#about",
  },
  {
    id: 4,
    name: "WOMEN",
    link: "/#blog",
  },
];

const Navbar = ({}) => {
  return (
      <nav className="duration-200 z-40 border border-gray-200 dark:border-neutral-700 px-3 md:px-10 mx-1 md:mx-24 rounded-b-3xl bg-white bg-opacity-60 dark:bg-neutral-900/70 backdrop-filter backdrop-blur-lg sticky top-0">
        <div className="py-2">
          <div className="container flex justify-between items-center">
            {/* Logo and Links section */}
            <div className="flex items-center gap-4">
              <Link
                to="/"
                className="text-primary text-black dark:text-white font-semibold tracking-widest text-2xl uppercase sm:text-3xl"
              ><p className="font-inter font-bold text-3xl">MAAVEN</p>
              </Link>
            </div>
                          {/* Menu Items */}
              <div className="hidden lg:block">
                <ul className="flex items-center gap-4">
                  {MenuLinks.map((data, index) => (
                    <li key={index}>
                      <a
                        href={data.link}
                        className="inline-block font-enter px-4 text-lg font-bold text-gray-700 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors duration-300 ease-out  focus:outline-none relative w-fit after:block after:content-[''] after:absolute after:h-[3px] after:bg-gray-900 dark:after:bg-white after:w-9/12 after:scale-x-0 after:hover:scale-x-100 after:origin-left after:duration-300"
                      >
                        {data.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

            {/* Navbar Right section */}
            <div className="flex justify-between items-center gap-0 md:gap-4">
              {/* Light/Dark mode toggle */}
              <ThemeToggle />
              {/* Search Bar section */}
              <button aria-label="Search" className="relative p-2 cursor-pointer text-gray-900 dark:text-neutral-100 hover:bg-gray-300 dark:hover:bg-neutral-700 hover:rounded-full">
                <CgSearch size={25} />
              </button>
              {/* User Button*/}
              <button aria-label="Account" className="m-2 p-1 cursor-pointer bg-inherit text-gray-900 dark:text-neutral-100 hover:bg-gray-300 dark:hover:bg-neutral-700 hover:rounded-full">
                <HiOutlineUserCircle size={25} className="text-center" />
              </button>

              {/* Order-button section */}
              <button aria-label="Cart" className="relative p-2 cursor-pointer text-gray-900 dark:text-neutral-100 hover:bg-gray-300 dark:hover:bg-neutral-700 hover:rounded-full">
                <CgShoppingBag size={25} />
                <div className="w-4 h-4 bg-red-500 text-white rounded-full absolute top-0 right-0 flex items-center justify-center text-xs">
                  4
                </div>
              </button>

            </div>
          </div>
        </div>
      </nav>
  );
};

export default Navbar;
