/*
Copyright 2024 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/

import { useAttachListeners, useAutocomplete, useFocus } from "hooks";
import React, { FC, useEffect } from "react";

import Popover from "../Popover";
import { ProductSearchResponse, RedirectRouteFunc } from "../types/interface";

interface AttachedPopoverProps {
    performSearch: (
        phrase: string,
        displayInStockOnly?: boolean,
    ) => Promise<ProductSearchResponse>;
    pageSize?: number;
    minQueryLength?: number;
    currencyCode?: string;
    currencyRate?: string;
    displayInStockOnly?: boolean;
    locale?: string;
    formSelector?: string;
    inputSelector?: string;
    resultsSelector?: string;
    route?: RedirectRouteFunc;
    searchRoute?: {
        route: string;
        query: string;
    };
}

const AttachedPopover: FC<AttachedPopoverProps> = (
    props: AttachedPopoverProps,
) => {
    const {
        performSearch,
        pageSize,
        minQueryLength,
        currencyCode,
        currencyRate,
        formSelector,
        inputSelector,
        resultsSelector,
        displayInStockOnly,
        locale,
        route,
        searchRoute,
    } = props;

    const {
        active,
        formProps,
        formRef,
        inputProps,
        inputRef,
        results,
        resultsRef,
        minQueryLengthHit,
        setActive,
    } = useAutocomplete(performSearch, minQueryLength, displayInStockOnly);

    const focusProps = useFocus({
        formRef,
        resultsRef,
        setActive,
    });

    useAttachListeners({
        focusProps,
        formId: formSelector ?? "search_mini_form",
        formProps,
        formRef,
        inputId: inputSelector ?? "search",
        inputProps,
        inputRef,
        resultsId: resultsSelector ?? "search_autocomplete",
        resultsRef,
    });

    useEffect(() => {
        // If the searchRoute is provided, we need to update the form action and input name
        // which is used for 'View all' and on Enter redirect
        const form = formRef.current;
        const target = inputRef.current;
        if (searchRoute && form?.action && target?.name) {
            form.action = searchRoute.route;
            target.name = searchRoute.query;
        }
    }, [searchRoute]);

    return (
        <Popover
            active={active}
            resultsRef={resultsRef}
            formRef={formRef}
            inputRef={inputRef}
            response={results}
            pageSize={pageSize}
            currencyCode={currencyCode}
            currencyRate={currencyRate}
            locale={locale}
            minQueryLengthHit={minQueryLengthHit}
            route={route}
            {...focusProps}
        />
    );
};

export { AttachedPopover };
