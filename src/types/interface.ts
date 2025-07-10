/*
Copyright 2024 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/

// API Specific Types
export interface RequestError {
    message: string;
    locations: Array<{ line: number; column: number }>;
    path: Array<string>;
    extensions: {
        errorMessage: string;
        classification: string;
    };
}

export interface ClientProps {
    apiUrl: string;
    environmentId: string;
    websiteCode: string;
    storeCode: string;
    storeViewCode: string;
    apiKey?: string;
    contentType?: string;
    xRequestId?: string;
}

export interface StoreDetailsConfig {
    minQueryLength?: number;
    pageSize?: number;
    currencyCode?: string;
    currencyRate?: string;
    currentCategoryUrlPath?: string;
    categoryName?: string;
    displaySearchBox?: boolean;
    displayOutOfStock?: string | boolean;
    allowAllProducts?: string | boolean;
    displayMode?: string;
    locale?: string;
}

export type RedirectRouteFunc = ({
    sku,
    urlKey,
    identifier,
}: {
    sku: string;
    urlKey?: string;
    identifier?: string;
}) => string;
// Types
export type BucketTypename = "ScalarBucket" | "RangeBucket" | "StatsBucket";

export interface MagentoHeaders {
    environmentId: string;
    websiteCode: string;
    storeCode: string;
    storeViewCode: string;
    apiKey: string;
    contentType: string;
    xRequestId: string;
}

export interface ProductSearchQuery {
    phrase: string;
    pageSize?: number;
    currentPage?: number;
    displayOutOfStock?: string | boolean;
    filter?: SearchClauseInput[];
    sort?: ProductSearchSortInput[];
    xRequestId?: string;
    context?: QueryContextInput;
    data?: QueryData;
    categorySearch?: boolean;
}

export type QueryResponse<T> = Promise<T>;

export interface SearchClauseInput {
    attribute: string;
    in?: string[];
    eq?: string;
    range?: {
        from: number;
        to: number;
    };
}

export interface ProductSearchSortInput {
    attribute: string;
    direction: "ASC" | "DESC";
}

export interface QueryContextInput {
    customerGroup?: string;
    userViewHistory?: { sku: string; dateTime: string }[];
}

export interface QueryData {
    products: boolean;
    facets: boolean;
    suggestions: boolean;
}

export type ProductSearchPromise = QueryResponse<ProductSearchResponse>;

export type Sortable = {
    attribute: string;
    label: string;
    numeric: boolean;
};

export interface ProductSearchResponse {
    extensions: {
        "request-id": string;
    };
    data: {
        productSearch: {
            total_count: null | number;
            items: null | Array<Product>;
            facets: null | Array<Facet>;
            suggestions?: null | Array<string>;
            related_terms?: null | Array<string>;
            page_info: null | PageInfo;
        };
    };
    errors: Array<RequestError>;
}

export interface Product {
    product: {
        __typename: string;
        id: number;
        uid: string;
        name: string;
        sku: string;
        description: null | ComplexTextValue;
        short_description: null | ComplexTextValue;
        attribute_set_id: null | number;
        meta_title: null | string;
        meta_keyword: null | string;
        meta_description: null | string;
        image: null | Media;
        small_image: null | Media;
        thumbnail: null | Media;
        new_from_date: null | string;
        new_to_date: null | string;
        created_at: null | string;
        updated_at: null | string;
        price_range: {
            minimum_price: Price;
            maximum_price: Price;
        };
        gift_message_available: null | string;
        canonical_url: null | string;
        media_gallery: null | Media;
        custom_attributes: null | CustomAttribute;
        add_to_cart_allowed: null | boolean;
    };
    highlights: Array<Highlights>;
}

export interface ComplexTextValue {
    html: string;
}
export interface Money {
    value: number;
    currency: string;
}

export interface Price {
    fixed_product_taxes: null | { amount: Money; label: string };
    regular_price: Money;
    final_price: Money;
    discount: null | { percent_off: number; amount_off: number };
}

export interface Media {
    url: null | string;
    label: null | string;
    position: null | number;
    disabled: null | boolean;
}

export interface CustomAttribute {
    code: string;
    value: string;
}

export interface Highlights {
    attribute: string;
    value: string;
    matched_words: Array<string>;
}

export interface PageInfo {
    current_page: number;
    page_size: number;
    total_pages: number;
}

export interface Facet {
    __typename?: BucketTypename;
    title: string;
    attribute: string;
    type?: "PINNED" | "INTELLIGENT" | "POPULAR";
    buckets: Array<RangeBucket | ScalarBucket | StatsBucket>;
}

export interface RangeBucket {
    __typename: "RangeBucket";
    title: string;
    from: number;
    to: number;
    count: number;
}

export interface ScalarBucket {
    __typename: "ScalarBucket";
    title: string;
    id?: string;
    count: number;
}

export interface StatsBucket {
    __typename: "StatsBucket";
    title: string;
    min: number;
    max: number;
}

export interface PriceFacet extends Facet {
    buckets: RangeBucket[];
}

export interface FacetFilter {
    attribute: string;
    in?: string[];
    eq?: string;
    range?: {
        from: number;
        to: number;
    };
}
