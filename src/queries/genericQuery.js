import { createStorefrontApiClient } from "@shopify/storefront-api-client";

const client = createStorefrontApiClient({
  storeDomain: process.env.REACT_APP_STORE_DOMAIN,
  apiVersion: "2024-10",
  publicAccessToken: process.env.REACT_APP_ACCESS_TOKEN,
});

export const genericQuery = async (node) => {
  const querySchema = `
query Node {
    node(id: "${node}") {
        id
        ... on Collection {
            products(first: 10) {
                edges {
                    node {
                        id
                        title
                        totalInventory
                        priceRange {
                            maxVariantPrice {
                                amount
                                currencyCode
                            }
                        }
                        variants(first: 1) {
                            edges {
                                node {
                                    price {
                                        amount
                                        currencyCode
                                    }
                                    image {
                                        altText
                                        height
                                        id
                                        src
                                        width
                                    }
                                }
                            }
                        }
                        featuredImage {
                            altText
                            height
                            id
                            src
                            width
                        }
                        images(first: 1) {
                            edges {
                                node {
                                    altText
                                    height
                                    src
                                    id
                                    width
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
`;
  const { data, errors } = await client.request(querySchema);
  return [data, errors];
};

//
