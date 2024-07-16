/*
Copyright 2024 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/

const searchUnitId = "livesearch-popover";

// Customers will be using these for their custom styling
// do *not* change arbitrarily as it may break their storefronts
const stylingIds = {
    popover: "livesearch popover-container",
    product: "livesearch product-result",
    products: "livesearch products-container",
    productName: "livesearch product-name",
    productBrand: "livesearch product-brand",
    productPrice: "livesearch product-price",
    suggestion: "livesearch suggestion",
    suggestions: "livesearch suggestions-container",
    suggestionsHeader: "livesearch suggestions-header",
    viewAll: "livesearch view-all-footer",
};
// ---

const activeClass = "active";

export { activeClass, searchUnitId, stylingIds };
