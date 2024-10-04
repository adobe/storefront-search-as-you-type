/*
Copyright 2024 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/

import { v4 as uuidv4 } from "uuid";

import { QUICK_SEARCH_QUERY } from "../gql/queries";
import {
    ClientProps,
    MagentoHeaders,
    ProductSearchResponse,
    RedirectRouteFunc,
    SearchClauseInput,
} from "../types/interface";
import { updateSearchInputCtx, updateSearchResultsCtx } from "./context";
import { getUserViewHistory } from "./getUserViewHistory";

export interface StoreDetailsProps {
    environmentId: string;
    websiteCode: string;
    storeCode: string;
    storeViewCode: string;
    searchUnitId: string;
    config: StoreDetailsConfig;
    context?: QueryContextInput;
    apiUrl?: string;
    route?: RedirectRouteFunc;
    searchRoute?: {
        route: string;
        query: string;
    };
}

interface QueryContextInput {
    customerGroup: string;
    userViewHistory?: UserViewHistory[];
}

interface StoreDetailsConfig {
    minQueryLength?: number;
    pageSize?: number;
    currencySymbol?: string;
    currencyRate?: string;
    displayOutOfStock?: string | boolean; 
}

const getHeaders = (headers: MagentoHeaders) => {
    return {
        "Magento-Environment-Id": headers.environmentId,
        "Magento-Website-Code": headers.websiteCode,
        "Magento-Store-Code": headers.storeCode,
        "Magento-Store-View-Code": headers.storeViewCode,
        "X-Api-Key": headers.apiKey,
        "Content-Type": headers.contentType,
        "X-Request-Id": headers.xRequestId,
    };
};

class LiveSearch {
    public minQueryLength: number;
    public pageSize: number;
    public currencySymbol: string;
    public currencyRate: string;
    public displayInStockOnly: boolean;
    private search: ClientProps;
    private context: QueryContextInput | undefined;
    private searchUnitId: string;
    private apiUrl: string;

    constructor({
        environmentId,
        websiteCode,
        storeCode,
        storeViewCode,
        searchUnitId,
        config,
        context,
        apiUrl,
    }: StoreDetailsProps) {
        this.minQueryLength = config?.minQueryLength ?? 3;
        this.pageSize = Number(config?.pageSize) ? Number(config?.pageSize) : 6;
        this.currencySymbol = config?.currencySymbol ?? "";
        this.currencyRate = config?.currencyRate ?? "1";
        this.displayInStockOnly =
        config?.displayOutOfStock === "1" || config?.displayOutOfStock === true ? false : true;
        this.searchUnitId = searchUnitId;
        this.context = context || { customerGroup: "" };
        this.context.userViewHistory = getUserViewHistory() || [];
        this.apiUrl = apiUrl ?? API_URL;

        if (!environmentId || !websiteCode || !storeCode || !storeViewCode) {
            throw new Error("Store details not found.");
        }

        this.search = {
            environmentId: environmentId,
            websiteCode: websiteCode,
            storeCode: storeCode,
            storeViewCode: storeViewCode,
            apiKey: "search_gql",
            contentType: "application/json",
            apiUrl: this.apiUrl,
        };
    }

    public performSearch = async (
        phrase: string,
        displayInStockOnly?: boolean,
    ): Promise<ProductSearchResponse> => {
        // ======  initialize data collection =====
        const searchRequestId = uuidv4();
        const defaultFilters: SearchClauseInput[] = [
            {
                attribute: "visibility",
                in: ["Search", "Catalog, Search"],
            },
        ];

        const inStockFilter = {
            attribute: "inStock",
            eq: "true",
        };

        if (displayInStockOnly) {
            defaultFilters.push(inStockFilter);
        }

        updateSearchInputCtx(
            this.searchUnitId,
            searchRequestId,
            phrase,
            defaultFilters,
            this.pageSize,
        );

        window.magentoStorefrontEvents?.publish.searchRequestSent(
            this.searchUnitId,
        );
        // ======  end of data collection =====
        const headers = getHeaders({
            environmentId: this.search.environmentId,
            websiteCode: this.search.websiteCode,
            storeCode: this.search.storeCode,
            storeViewCode: this.search.storeViewCode,
            apiKey: "search_gql",
            contentType: "application/json",
            xRequestId: searchRequestId,
        });

        const variables = {
            phrase: phrase ?? "",
            pageSize: this.pageSize,
            filter: defaultFilters,
            context: this.context,
        };

        const response = await fetch(this.apiUrl, {
            method: "POST",
            headers,
            body: JSON.stringify({
                query: QUICK_SEARCH_QUERY,
                variables: { ...variables },
            }),
        });

        const results = await response.json();

        // ======  initialize data collection =====
        updateSearchResultsCtx(
            this.searchUnitId,
            searchRequestId,
            results?.data?.productSearch,
        );

        window.magentoStorefrontEvents?.publish.searchResponseReceived(
            this.searchUnitId,
        );

        window.magentoStorefrontEvents?.publish.searchResultsView(
            this.searchUnitId,
        );
        // ======  end of data collection =====

        return results;
    };
}

export { LiveSearch };
