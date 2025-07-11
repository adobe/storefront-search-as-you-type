/*
Copyright 2024 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/

import { useAutocomplete, useFocus } from "hooks";
import React, { FC, Fragment } from "react";

import Popover from "../Popover";
import { ProductSearchResponse } from "../types/interface";

interface AutocompleteProps {
    performSearch: (phrase: string) => Promise<ProductSearchResponse>;
    submitSearchRedirect: (phrase: string) => void;
    pageSize?: number;
    currencyCode?: string;
    currencyRate?: string;
    minQueryLength?: number;
}

const FormWithPopover: FC<AutocompleteProps> = (props: AutocompleteProps) => {
    const {
        performSearch,
        minQueryLength,
        pageSize,
        currencyCode,
        currencyRate,
        submitSearchRedirect,
    } = props;

    const {
        active,
        formProps,
        formRef,
        inputProps,
        inputRef,
        minQueryLengthHit,
        searchTerm,
        results,
        resultsRef,
        setActive,
    } = useAutocomplete(performSearch, minQueryLength);

    const focusProps = useFocus({ formRef, resultsRef, setActive });

    const handleSubmitRedirect: OnSubmitEvent = event => {
        event.preventDefault();
        formProps.onSubmit(event);
        const input = inputRef.current?.value || "";
        submitSearchRedirect(input);
    };

    return (
        <Fragment>
            <form
                ref={formRef}
                className="form"
                id="search_mini_form"
                onSubmit={handleSubmitRedirect}
                {...focusProps}
            >
                <input
                    ref={inputRef}
                    autoComplete="off"
                    className="search"
                    id="search"
                    name="search"
                    type="search"
                    value={searchTerm}
                    {...inputProps}
                />
            </form>
            <Popover
                active={active}
                response={results}
                formRef={formRef}
                inputRef={inputRef}
                resultsRef={resultsRef}
                pageSize={pageSize}
                currencyCode={currencyCode}
                currencyRate={currencyRate}
                minQueryLengthHit={minQueryLengthHit}
            />
        </Fragment>
    );
};

export { FormWithPopover };
