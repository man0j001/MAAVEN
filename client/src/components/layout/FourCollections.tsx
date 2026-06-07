import { Link } from "react-router-dom";
import { dummyProducts } from "@/data/dummyProducts";

interface CollectionDef {
  title: string;
  tagline: string;
  /** Match against productName to find a representative product/image */
  match: (name: string) => boolean;
}

// MAAVEN's real product lines, adapted from the Alphalete "Four Collections" layout.
const COLLECTIONS: CollectionDef[] = [
  { title: "Alpha", tagline: "Stone-washed staples.", match: (n) => n.includes("Alpha Tee") },
  { title: "Staple", tagline: "Built for every day.", match: (n) => n.includes("Cargo Pant") || n.includes("Jogger") },
  { title: "Aura", tagline: "Sculpted to move.", match: (n) => n.includes("Aura") },
  { title: "Pump", tagline: "Mid-rise, high impact.", match: (n) => n.includes("Pump") },
];

function FourCollections() {
  const cards = COLLECTIONS.map((c) => ({
    ...c,
    product: dummyProducts.find((p) => c.match(p.productName)),
  })).filter((c) => c.product);

  return (
    <section className="mt-16 md:mt-24">
      <div className="mb-8 text-center">
        <h2 className="font-monument text-3xl font-extrabold uppercase text-black dark:text-white md:text-5xl">
          Four collections. One standard.
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map(({ title, tagline, product }) => (
          <Link
            key={title}
            to={`/products/${product!.id}`}
            className="group relative block aspect-[3/4] cursor-pointer overflow-hidden rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-black dark:focus-visible:ring-white focus-visible:ring-offset-2 dark:focus-visible:ring-offset-neutral-950"
          >
            <img
              src={product!.images[0].image}
              alt={`${title} collection`}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute bottom-0 left-0 p-5">
              <h3 className="font-monument text-2xl font-extrabold uppercase text-white">
                {title}
              </h3>
              <p className="font-enter text-sm font-medium text-white/80">{tagline}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default FourCollections;
