import { useMemo, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ProductCard from "../ui/ProductCard";
import { dummyProducts } from "@/data/dummyProducts";

type Gender = "Women" | "Men";

interface ProductCarouselProps {
  /** Big section heading, e.g. "New fit energy" */
  title: string;
  /** Small uppercase label above the title */
  eyebrow?: string;
  /** Show a Women's / Men's segmented toggle that filters by product gender */
  showGenderToggle?: boolean;
  defaultGender?: Gender;
  /** Max products to show */
  limit?: number;
}

/**
 * Reusable titled product carousel. Reuses the existing ProductCard and the
 * shadcn/embla Carousel so it stays visually consistent with the home page.
 * Powers "New fit energy", "Latest. Dialed in." and "Best sellers".
 */
function ProductCarousel({
  title,
  eyebrow,
  showGenderToggle = false,
  defaultGender = "Women",
  limit = 12,
}: ProductCarouselProps) {
  const [gender, setGender] = useState<Gender>(defaultGender);

  const products = useMemo(() => {
    const list = showGenderToggle
      ? dummyProducts.filter((p) => p.gender === gender)
      : dummyProducts;
    return list.slice(0, limit);
  }, [gender, showGenderToggle, limit]);

  return (
    <section className="mt-16 md:mt-24">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          {eyebrow && (
            <p className="font-enter text-xs font-bold uppercase tracking-[0.2em] text-gray-500 dark:text-neutral-400">
              {eyebrow}
            </p>
          )}
          <h2 className="font-monument text-3xl font-extrabold uppercase leading-none text-black dark:text-white md:text-5xl">
            {title}
          </h2>
        </div>

        {showGenderToggle && (
          <div
            role="tablist"
            aria-label="Shop by gender"
            className="inline-flex w-fit rounded-full border border-gray-300 dark:border-neutral-600 p-1"
          >
            {(["Women", "Men"] as Gender[]).map((g) => (
              <button
                key={g}
                role="tab"
                aria-selected={gender === g}
                onClick={() => setGender(g)}
                className={`cursor-pointer rounded-full px-6 py-2.5 font-enter text-sm font-bold uppercase tracking-wide transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-black dark:focus-visible:ring-white focus-visible:ring-offset-2 dark:focus-visible:ring-offset-neutral-950 ${
                  gender === g
                    ? "bg-black text-white dark:bg-white dark:text-black"
                    : "bg-transparent text-gray-600 dark:text-neutral-400 hover:text-black dark:hover:text-white"
                }`}
              >
                {g}'s
              </button>
            ))}
          </div>
        )}
      </div>

      {products.length > 0 ? (
        <Carousel opts={{ align: "start" }} className="w-full">
          <CarouselContent className="-ml-1">
            {products.map((product) => (
              <CarouselItem
                key={product.id}
                className="basis-full pl-1 sm:basis-1/2 lg:basis-1/4"
              >
                <div className="p-1">
                  <ProductCard productInfo={product} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      ) : (
        <p className="font-enter text-gray-500 dark:text-neutral-400">No products in this collection yet.</p>
      )}
    </section>
  );
}

export default ProductCarousel;
