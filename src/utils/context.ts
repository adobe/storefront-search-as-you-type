/*
Copyright 2024 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/

import {
    SearchBucket,
    SearchFacet,
    SearchFilter,
    SearchInputUnit,
    SearchResultProduct,
    SearchResultSuggestion,
    SearchResultUnit,
} from "@adobe/magento-storefront-events-sdk/dist/types/types/schemas";

import { ProductSearchResponse } from "../types/interface";

const updateSearchInputCtx = (
    searchUnitId: string,
    searchRequestId: string,
    phrase: string,
    filters: Array<SearchFilter>,
    pageSize: number,
): void => {
    const mse = window.magentoStorefrontEvents;
    if (!mse) {
        // don't break search if events are broken/not loading
        return;
    }
    const searchInputCtx = mse.context.getSearchInput() ?? { units: [] };

    // create search input unit
    const searchInputUnit: SearchInputUnit = {
        searchUnitId,
        searchRequestId,
        queryTypes: ["products", "suggestions"],
        phrase,
        pageSize,
        currentPage: 1,
        filter: filters,
        sort: [],
    };

    // find search input unit index
    const searchInputUnitIndex = searchInputCtx?.units?.findIndex(
        unit => unit?.searchUnitId === searchUnitId,
    );

    // update search input unit
    if (searchInputUnitIndex === undefined || searchInputUnitIndex < 0) {
        searchInputCtx.units.push(searchInputUnit);
    } else {
        searchInputCtx.units[searchInputUnitIndex] = searchInputUnit;
    }

    mse.context.setSearchInput(searchInputCtx);
};

const updateSearchResultsCtx = (
    searchUnitId: string,
    searchRequestId: string,
    results: ProductSearchResponse["data"]["productSearch"],
): void => {
    const mse = window.magentoStorefrontEvents;
    if (!mse) {
        // don't break search if events are broken/not loading
        return;
    }
    const searchResultsCtx = mse?.context?.getSearchResults() ?? { units: [] };

    // find search result unit index
    const searchResultUnitIndex = searchResultsCtx?.units?.findIndex(
        unit => unit?.searchUnitId === searchUnitId,
    );

    // create search result unit
    const searchResultUnit: SearchResultUnit = {
        searchUnitId,
        searchRequestId,
        products: createProducts(results?.items),
        categories: [],
        suggestions: createSuggestions(results?.suggestions),
        page: results?.page_info?.current_page || 1,
        perPage: results?.page_info?.page_size || 6,
        facets: createFacets(results?.facets),
    };

    // update search result unit
    if (searchResultUnitIndex === undefined || searchResultUnitIndex < 0) {
        searchResultsCtx.units.push(searchResultUnit);
    } else {
        searchResultsCtx.units[searchResultUnitIndex] = searchResultUnit;
    }

    mse.context.setSearchResults(searchResultsCtx);
};

const createProducts = (
    items: ProductSearchResponse["data"]["productSearch"]["items"],
): SearchResultProduct[] => {
    if (!items) {
        return [];
    }

    const products: SearchResultProduct[] = items.map((item, index) => ({
        name: item.product.name,
        sku: item.product.sku,
        // TODO: what is the default value?
        url: item.product.canonical_url ?? "",
        imageUrl: item.product.image?.url ?? "",
        price: item.product.price_range.minimum_price.final_price.value,
        rank: index,
    }));

    return products;
};

const createSuggestions = (
    items: ProductSearchResponse["data"]["productSearch"]["suggestions"],
): SearchResultSuggestion[] => {
    if (!items) {
        return [];
    }

    const suggestions: SearchResultSuggestion[] = items.map(
        (suggestion, index) => ({
            suggestion: suggestion,
            rank: index,
        }),
    );

    return suggestions;
};

const createFacets = (
    items: ProductSearchResponse["data"]["productSearch"]["facets"],
): SearchFacet[] => {
    if (!items) {
        return [];
    }

    const facets = items.map<SearchFacet>(item => ({
        attribute: item.attribute,
        title: item.title,
        // TODO: what is the default value?
        type: item.type || "PINNED",
        buckets: item.buckets.map<SearchBucket>(bucket => bucket),
    }));

    return facets;
};

export { updateSearchInputCtx, updateSearchResultsCtx };
