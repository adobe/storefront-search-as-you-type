/*
Copyright 2024 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/

import AttachedPopover from "components/AttachedPopover";
import { default as React } from "react";
import { createRoot } from "react-dom/client";
import {
    QueryContextInput,
    RedirectRouteFunc,
    StoreDetailsConfig,
} from "types/interface";
import { handleMobileDisplay, LiveSearch, searchUnitId } from "utils";

interface LiveSearchProps {
    formSelector?: string;
    inputSelector?: string;
    resultsSelector?: string;
}

interface StoreDetailsProps {
    environmentId: string;
    websiteCode: string;
    storeCode: string;
    storeViewCode: string;
    config: StoreDetailsConfig;
    context: QueryContextInput;
    apiUrl?: string;
    // Configurable callback to handle routing to product page
    route?: RedirectRouteFunc;
    searchRoute?: {
        route: string;
        query: string;
    };
}

class LiveSearchAutocomplete {
    private formSelector: string;
    private inputSelector: string;
    private resultsSelector: string;
    private search: LiveSearch;
    private storeDetails: StoreDetailsProps;
    private minQueryLength: number;
    private searchButton: HTMLLabelElement;
    private pageSize: number;
    private currencyCode: string;
    private currencyRate: string;
    private displayOutOfStock: string | boolean;
    private locale: string;
    private context: QueryContextInput;

    constructor(storeDetails: StoreDetailsProps);
    constructor(storeDetails: StoreDetailsProps, minQueryLength: number);
    constructor(
        storeDetails: StoreDetailsProps,
        minQueryLength = 3,
        formSelector: LiveSearchProps["formSelector"] = "search_mini_form",
        inputSelector: LiveSearchProps["inputSelector"] = "search",
        resultsSelector: LiveSearchProps["resultsSelector"] = "search_autocomplete",
    ) {
        this.storeDetails = storeDetails;
        this.formSelector = formSelector;
        this.inputSelector = inputSelector;
        this.resultsSelector = resultsSelector;
        this.minQueryLength =
            storeDetails.config?.minQueryLength ?? minQueryLength; //default to original
        this.pageSize = Number(storeDetails.config?.pageSize)
            ? Number(storeDetails.config?.pageSize)
            : 6; // default to 6
        this.currencyCode = storeDetails.config?.currencyCode ?? "USD";
        this.currencyRate = storeDetails.config?.currencyRate ?? "1";
        this.displayOutOfStock = storeDetails.config?.displayOutOfStock ?? "1"; // default to display out of stock items
        this.locale = storeDetails.config?.locale ?? "en_US";
        this.context = storeDetails.context;

        this.search = new LiveSearch({
            environmentId: this.storeDetails.environmentId,
            websiteCode: this.storeDetails.websiteCode,
            storeCode: this.storeDetails.storeCode,
            storeViewCode: this.storeDetails.storeViewCode,
            searchUnitId: searchUnitId,
            config: {
                minQueryLength: this.minQueryLength,
                pageSize: this.pageSize,
                currencyCode: this.currencyCode,
                currencyRate: this.currencyRate,
                displayOutOfStock: this.displayOutOfStock,
            },
            context: this.context,
            apiUrl: API_URL,
            route: this.storeDetails.route,
        });

        const { performSearch, displayInStockOnly } = this.search;

        this.searchButton = document
            .getElementById(this.formSelector)
            ?.querySelector("label") as HTMLLabelElement;

        this.searchButton?.addEventListener("click", () =>
            handleMobileDisplay(this.searchButton),
        );

        const root = createRoot(
            document.getElementById(this.resultsSelector) as Element,
        );

        root.render(
            <AttachedPopover
                performSearch={performSearch}
                formSelector={this.formSelector}
                inputSelector={this.inputSelector}
                resultsSelector={this.resultsSelector}
                pageSize={this.pageSize}
                minQueryLength={this.minQueryLength}
                currencyCode={this.currencyCode}
                currencyRate={this.currencyRate}
                displayInStockOnly={displayInStockOnly}
                locale={this.locale}
                route={this.storeDetails.route}
                searchRoute={this.storeDetails.searchRoute}
            />,
        );
    }
}

// =====================
if (typeof window !== "undefined") {
    window.LiveSearchAutocomplete = LiveSearchAutocomplete;
}

export default LiveSearchAutocomplete;
