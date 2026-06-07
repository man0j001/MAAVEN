import { Link } from "react-router-dom";
import Product from "@/Interfaces/Product";
import { dummyProducts } from "@/data/dummyProducts";

// "Shirts (Men)" -> "Shirts"
const cleanCategory = (c?: string) => (c ? c.replace(/\s*\(.*?\)\s*/g, "").trim() : "");

function ShopByCategory() {
  // Unique categories in catalog order, each with a representative product for the image.
  const seen = new Set<string>();
  const categories: { label: string; product: Product }[] = [];
  for (const p of dummyProducts) {
    const label = cleanCategory(p.category);
    if (label && !seen.has(label)) {
      seen.add(label);
      categories.push({ label, product: p });
    }
  }

  return (
    <section className="mt-16 md:mt-24">
      <h2 className="mb-8 font-monument text-3xl font-extrabold uppercase text-black dark:text-white md:text-5xl">
        Shop by category
      </h2>

      <div className="flex flex-wrap justify-center gap-x-6 gap-y-8 sm:justify-between">
        {categories.map(({ label, product }) => (
          <Link
            key={label}
            to={`/products/${product.id}`}
            className="group flex cursor-pointer flex-col items-center gap-3 focus:outline-none"
          >
            <div className="h-28 w-28 overflow-hidden rounded-full border border-gray-200 dark:border-neutral-700 transition-shadow duration-200 group-hover:shadow-lg dark:group-hover:shadow-neutral-800 group-focus-visible:ring-2 group-focus-visible:ring-black dark:group-focus-visible:ring-white md:h-36 md:w-36">
              <img
                src={product.images[0].image}
                alt={label}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
              />
            </div>
            <span className="font-enter text-sm font-bold uppercase tracking-wide text-black dark:text-neutral-200">
              {label}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default ShopByCategory;
