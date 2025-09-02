// import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
// import GET_PRODUCTS from "@/Graphql/Query";
import Product from "@/Interfaces/Product";
import { dummyProducts } from '@/data/dummyProducts';
import { useParams } from "react-router-dom";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

function ProductDetails() {
  // Commented out GraphQL API call
  // const { loading, error, data } = useQuery(GET_PRODUCTS);
  const [products, setProducts] = useState<Product[]>([]);
  const { id } = useParams(); // Get product ID from URL

  useEffect(() => {
    // Using dummy data instead of API
    setProducts(dummyProducts);
    
    // Commented out API data handling
    // if (data) {
    //   setProducts(data.allProducts);
    // }
  }, []);

  // Find the specific product by ID, or use the first one as fallback
  let product = id ? products.find(p => p.id === id) : products[0];
  const Allsizes: string[] = ["XS", "S", "M", "L", "XL"];

  return (
    <>
      {product && (
        <div className="m-10 grid grid-cols-12 gap-4 items-start">
          {/* details */}
          <div className="mt-6 col-span-3 sticky top-[165px]">
            {/* accordian */}
            <div>
              <h3 className="font-monument text-lg text-slate-800 font-extrabold uppercase">
                {product.productName}
              </h3>
              <p className="font-bold">Color</p>
              <br></br>
              <p className="font-bold">${product.price}</p>
            </div>
            <Accordion type="single" defaultValue="item-2" className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger> Fit suggestion</AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc">
                    <li>This item runs true to Alphalete’s relaxed fit.</li>
                    <li>
                      Model is 5’11”/180.3cm, wearing a size L with a
                      47”/119.4cm chest.
                    </li>
                    <li>
                      Model is 5'6"/167.6cm, wearing a size S with 36.5"/92.7cm
                      bust.{" "}
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  Materials and washing directions
                </AccordionTrigger>
                <AccordionContent>
                  <ul>
                    <li>62% Polyester, 38% Cotton</li>
                    <li>We recommend washing inside-out on a cold setting</li>
                    <li>Hang to dry</li>
                    <li>Anticipate shrinkage will occur after initial wash</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Description</AccordionTrigger>
                <AccordionContent>
                  <p>
                    Our latest delivery is an exploration in form, function and
                    color, built to fit the needs of the modern fitness
                    enthusiast. Our classic hoodie is constructed from a
                    cotton/polyester blend which offers plenty of softness to
                    provide comfort and allow for movement without restriction.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          {/* image */}
          <div className="col-span-6 w-100 mx-4">
            {product.images.map((image) => (
              <img
                className="rounded-3xl mb-6 w-full"
                src={image.image}
              />
            ))}
          </div>
          {/* sizes */}
          <div className="mt-6 col-span-3 sticky top-[165px]">
            {/* select image */}
            <div className="">
            <div className="w-ful rounded-lg flex justify-center w-full bg-slate-300 bg-opacity-60 backdrop-filter backdrop-blur-lg border overflow-x-hidden">
          {product.images.map((image,index) =><div key={index}><img className="rounded-lg p-1" width={70} height={70} src={image.image} /></div> )}
        </div>
            </div>
            {/* select size */}
            <div>
              <p className="font-bold">Select Size</p>
              <div className="grid grid-cols-5 gap-2 px-1 py-3">
                {Allsizes.map((allsize) => {
                  const matchingSize = product.sizes.find(
                    (size) => size.name === allsize
                  );
                  if (matchingSize) {
                    return (
                      <button
                        key={matchingSize.name}
                        className="font-enter font-bold text-lg bg-inherit hover:bg-slate-300 rounded-sm  p-1 border border-gray-400"
                      >
                        {matchingSize.name}
                      </button>
                    );
                  } else {
                    return (
                      <button
                        key={allsize}
                        className="text-gray-700 font-enter font-bold text-lg bg-inherit rounded-sm  rounded-sm  p-1 border border-gray-400"
                        disabled
                      >
                        <del>{allsize}</del>
                      </button>
                    );
                  }
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductDetails;
