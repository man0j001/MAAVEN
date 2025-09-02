interface ProductImage {
    color: string;
    image: string;
  }
  
  interface Size {
    name: string;
  }
  
  interface Product {
    id: string;
    productName: string;
    images: ProductImage[];
    sizes: Size[];
    price: number;
}

export default Product