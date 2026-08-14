/*
Copyright 2024 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/

const SearchProductView = `
    fragment SearchProductView on ProductSearchItem {
        productView {
            __typename
            sku
            name
            url
            urlKey
            images(roles: ["thumbnail", "small_image", "image"]) {
                url
                label
                roles
            }
            ... on SimpleProductView {
                price {
                    regular {
                        amount {
                            value
                            currency
                        }
                    }
                    final {
                        amount {
                            value
                            currency
                        }
                    }
                }
            }
            ... on ComplexProductView {
                priceRange {
                    minimum {
                        regular {
                            amount {
                                value
                                currency
                            }
                        }
                        final {
                            amount {
                                value
                                currency
                            }
                        }
                    }
                    maximum {
                        regular {
                            amount {
                                value
                                currency
                            }
                        }
                        final {
                            amount {
                                value
                                currency
                            }
                        }
                    }
                }
            }
        }
    }
`;

export { SearchProductView };
