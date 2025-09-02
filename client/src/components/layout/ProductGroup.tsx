// import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
// import GET_PRODUCTS from '@/Graphql/Query';
import ProductCard from '../ui/ProductCard';
import Product from '@/Interfaces/Product';
import { dummyProducts } from '@/data/dummyProducts';

function ProductGroup() {
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
    <div className='w-100 flex overflow-hidden'> 
      {/* Removed loading check since we're using dummy data */}
      {products.map( product =><ProductCard  key={product.id} productInfo={product}/>)}
    </div>
  )
}

export default ProductGroup