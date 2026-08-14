/*
Copyright 2024 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/

import { Product, ProductSearchResponse } from "../types/interface";

const generateProducts = (amount = 1): Array<Product> => {
    const sampleProduct = {
        productView: {
            __typename: "SimpleProductView",
            name: "Sprite Foam Yoga Brick",
            sku: "24-WG084",
            url: "//master-7rqtwti-eragxvhtzr4am.us-4.magentosite.cloud/sprite-foam-yoga-brick.html",
            urlKey: "sprite-foam-yoga-brick",
            images: [
                {
                    url: "//master-7rqtwti-eragxvhtzr4am.us-4.magentosite.cloud/media/catalog/product/l/u/luma-yoga-brick.jpg",
                    label: null,
                    roles: ["thumbnail"],
                },
            ],
            price: {
                regular: { amount: { value: 5, currency: "USD" } },
                final: { amount: { value: 5, currency: "USD" } },
            },
        },
        highlights: [
            {
                attribute: "name",
                value: "Sprite Foam <em>Yoga</em> Brick",
                matched_words: [],
            },
            {
                attribute: "description",
                value: '<p>Our top-selling <em>yoga</em> prop, the 4-inch, high-quality Sprite Foam <em>Yoga</em> Brick is popular among <em>yoga</em> novices and studio professionals alike. An essential <em>yoga</em> accessory, the <em>yoga</em> brick is a critical tool for finding balance and alignment in many common <em>yoga</em> poses. Choose from 5 color options.</p>\n<ul>\n<li>Standard Large Size: 4" x 6" x 9".\n<li>Beveled edges for ideal contour grip.\n<li>Durable and soft, scratch-proof foam.\n<li>Individually wrapped.\n<li>Ten color choices.\n</ul>',
                matched_words: [],
            },
        ],
    };

    return Array(amount).fill(sampleProduct);
};

const generateSuggestions = (amount = 1): Array<string> => {
    const sampleSuggestion = "foam yoga brick";

    return Array(amount).fill(sampleSuggestion);
};

const generateResponseData = ({
    products = 1,
    suggestions = 5,
}: {
    products?: number;
    suggestions?: number;
}): ProductSearchResponse => {
    return {
        extensions: { "request-id": "sample-request-id" },
        data: {
            productSearch: {
                total_count: 35,
                items: generateProducts(products),
                facets: [],
                suggestions: generateSuggestions(suggestions),
                related_terms: null,
                page_info: { current_page: 1, page_size: 1, total_pages: 35 },
            },
        },
        errors: [],
    };
};

export { generateResponseData, generateSuggestions, generateProducts };
