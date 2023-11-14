/*
Copyright 2024 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/

import {
    MutableRefObject,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";

import { ProductSearchResponse } from "../types/interface";
import { useDebounce } from "./useDebounce";

interface AutocompleteHookOptions {
    active: boolean;
    formProps: OnSubmitHandler;
    formRef: MutableRefObject<HTMLFormElement | null>;
    inputProps: OnChangeHandler;
    inputRef: MutableRefObject<HTMLInputElement | null>;
    minQueryLengthHit: boolean;
    loading: boolean;
    searchTerm: string;
    results: ProductSearchResponse | undefined;
    resultsRef: MutableRefObject<HTMLDivElement | null>;
    setActive: StateSetter<boolean>;
    setLoading: StateSetter<boolean>;
    setResults: StateSetter<ProductSearchResponse>;
    setSearchTerm: StateSetter<string>;
    setMinQueryLengthHit: StateSetter<boolean>;
}

type useAutocompleteHook = (
    performSearch: (
        phrase: string,
        displayInStockOnly?: boolean,
    ) => Promise<ProductSearchResponse>,
    minQueryLength?: number,
    inStock?: boolean,
) => AutocompleteHookOptions;

const useAutocomplete: useAutocompleteHook = (
    performSearch: (
        phrase: string,
        displayInStockOnly?: boolean,
    ) => Promise<ProductSearchResponse>,
    minQueryLength = 3,
    displayInStockOnly = false,
) => {
    //REFS
    const formRef = useRef(null);
    const inputRef = useRef(null);
    const resultsRef = useRef(null);

    //STATE
    const [active, setActive] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [results, setResults] = useState<ProductSearchResponse>();
    const [loading, setLoading] = useState<boolean>(false);
    const [minQueryLengthHit, setMinQueryLengthHit] = useState<boolean>(false);

    //CALLBACKS
    const fetchResults = useCallback(
        async (nextSearchTerm: string) => {
            const phrase = nextSearchTerm?.trim();
            if (typeof phrase !== "string" || phrase?.length < minQueryLength)
                return;

            const nextResults = await performSearch(phrase, displayInStockOnly);
            setResults(nextResults);
            if (!active) {
                setActive(true);
            }
        },
        [performSearch],
    );

    const debounceRef = useRef(
        useDebounce(nextPhrase => fetchResults(nextPhrase), 250),
    );

    const handleChange: OnChangeEvent = useCallback(
        event => {
            setSearchTerm((event?.target as HTMLInputElement)?.value);
        },
        [setSearchTerm],
    );

    const handleSubmit: OnSubmitEvent = useCallback(
        event => {
            const data = new FormData(event.target as HTMLFormElement);
            const phrase = data.get("search") as string;

            fetchResults(phrase);
        },
        [fetchResults],
    );

    // CHILD PROPS
    const formProps = useMemo(
        () => ({
            onSubmit: handleSubmit,
        }),
        [handleSubmit],
    );

    const inputProps = useMemo(
        () => ({
            onChange: handleChange,
        }),
        [handleChange],
    );

    // EFFECTS
    useEffect(() => {
        const phrase = searchTerm?.trim();

        if (typeof phrase !== "string" || phrase?.length < minQueryLength) {
            setMinQueryLengthHit(false);
            setResults(current =>
                current ? ({} as ProductSearchResponse) : current,
            );
            return;
        }

        setMinQueryLengthHit(true);
        debounceRef.current(phrase);
    }, [fetchResults, searchTerm]);

    return {
        active,
        formProps,
        formRef,
        inputProps,
        inputRef,
        loading,
        minQueryLengthHit,
        searchTerm,
        results,
        resultsRef,
        setActive,
        setLoading,
        setResults,
        setSearchTerm,
        setMinQueryLengthHit,
    };
};

export { useAutocomplete };
