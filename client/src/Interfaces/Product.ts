interface ProductImage {
    color: string;
    image: string;
  }

  interface Size {
    name: string;
  }

  // Parsed sections of a product's description blob.
  // All optional so older/simpler data (and the dummy fallback) still type-checks.
  interface ProductDetailSections {
    highlights?: string;
    fitSuggestion?: string;
    materials?: string;
    description?: string;
  }

  interface Product {
    id: string;
    productName: string;
    images: ProductImage[];
    sizes: Size[];
    price: number;
    // Catalog metadata (optional — added for the imported catalog)
    category?: string;
    gender?: string;
    type?: string;
    details?: ProductDetailSections;
}

export default Product
