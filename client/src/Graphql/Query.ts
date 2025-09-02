import { gql } from '@apollo/client';


const GET_PRODUCTS = gql`
query{
    allProducts{
      id,
      productName,
      price,
      slug,
      sizes{
        name
      },
      images{
        color,image
      }
    }
  }
`;

export default GET_PRODUCTS;