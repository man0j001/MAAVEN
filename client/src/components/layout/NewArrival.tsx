import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
// import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
// import GET_PRODUCTS from '@/Graphql/Query';
import ProductCard from '../ui/ProductCard';
import Product from '@/Interfaces/Product';
import { dummyProducts } from '@/data/dummyProducts';

export function NewArrival() {
    // Commented out GraphQL API call
    // const { loading, error, data } = useQuery(GET_PRODUCTS);
    const [products, setProducts] = useState<Product[]>([])

    useEffect(() => {
      // Using dummy data instead of API
      setProducts(dummyProducts);
      
      // Commented out API data handling
      // if (data){
      //   setProducts(data.allProducts)
      // }
    }, [])
  return (
    <>
    <Carousel className="w-full">
      <CarouselContent className="-ml-1">
      {/* Removed loading check since we're using dummy data */}
      {products.map( (product,index) =>
      <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
      <div className="p-1">
      <ProductCard  key={product.id} productInfo={product}/>
      </div>
    </CarouselItem>
     )}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
    </>
  )
}
