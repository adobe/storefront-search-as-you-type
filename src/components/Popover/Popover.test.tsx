/*
Copyright 2024 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/

import { render, screen } from "@testing-library/react";
import React, { useRef } from "react";
import { stylingIds } from "utils";

import { generateResponseData } from "../../test-utils/mock";
import Popover from "./Popover";

jest.mock("utils/mobileHelperFunctions", () => ({
    isMobile: false,
}));

jest.mock("react", () => {
    return {
        ...jest.requireActual<typeof React>("react"),
        useRef: jest.fn(),
    };
});

const selectors = {
    inputField: "search",
    form: "search_mini_form",
    results: "search_autocomplete",
    pageSize: 6,
    currencyCode: "USD",
    currencyRate: "1",
    active: true,
    minQueryLengthHit: true,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockInputRef = (useRef as jest.MockedFunction<any>).mockReturnValueOnce({
    current: document.getElementById(selectors.inputField),
});
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockFormRef = (useRef as jest.MockedFunction<any>).mockReturnValueOnce({
    current: document.getElementById(selectors.form),
});
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockResultsRef = (useRef as jest.MockedFunction<any>).mockReturnValueOnce(
    { current: document.getElementById(selectors.results) },
);

Object.defineProperty(window, "magentoStorefrontEvents", {
    value: {
        publish: {
            searchProductClick: jest.fn(),
            searchSuggestionClick: jest.fn(),
        },
    },
});

/** the suggestions element is currently not used */
// eslint-disable-next-line jest/no-commented-out-tests
// test("Popover renders max 5 suggestions", () => {
//     const { container } = render(
//         <Popover
//             response={generateResponseData({ suggestions: 6 })}
//             inputRef={mockInputRef}
//             formRef={mockFormRef}
//             resultsRef={mockResultsRef}
//             pageSize={selectors.pageSize}
//         />,
//     );

//     const suggestions = container.getElementsByClassName(stylingIds.suggestion);
//     expect(suggestions.length).toBe(5);

//     const suggestions_block = container.getElementsByClassName(
//         stylingIds.suggestions,
//     );
//     expect(suggestions_block.length).toBe(1);
// });

/** the suggestions element is currently not used */
// eslint-disable-next-line jest/no-commented-out-tests
// test("Suggestion section is conditionally rendered", () => {
//     const { container } = render(
//         <Popover
//             response={generateResponseData({ suggestions: 0 })}
//             inputRef={mockInputRef}
//             formRef={mockFormRef}
//             resultsRef={mockResultsRef}
//             pageSize={selectors.pageSize}
//         />,
//     );

//     const suggestions_block = container.getElementsByClassName(
//         stylingIds.suggestions,
//     );
//     expect(suggestions_block.length).toBe(0);
// });

test("Popover renders max 6 products", () => {
    const { container } = render(
        <Popover
            active={true}
            minQueryLengthHit={true}
            response={generateResponseData({ products: 8 })}
            inputRef={mockInputRef}
            formRef={mockFormRef}
            resultsRef={mockResultsRef}
            pageSize={selectors.pageSize}
        />,
    );

    const products = container.getElementsByClassName(stylingIds.product);
    expect(products.length).toBe(6);
});

test("Popover renders currency symbol", () => {
    const { container } = render(
        <Popover
            active={true}
            minQueryLengthHit={true}
            response={generateResponseData({})}
            inputRef={mockInputRef}
            formRef={mockFormRef}
            resultsRef={mockResultsRef}
            pageSize={selectors.pageSize}
            currencyCode={selectors.currencyCode}
            currencyRate={selectors.currencyRate}
        />,
    );

    const products = container.getElementsByClassName(stylingIds.productPrice);

    expect(products.item(0)?.innerHTML).toContain("$5.00");
    expect(screen.queryByText("USD")).not.toBeInTheDocument();
});
