/*
Copyright 2024 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/

import { QUICK_SEARCH_QUERY } from "./queries";

test("quick search requests productView instead of deprecated product", () => {
    expect(QUICK_SEARCH_QUERY).toContain("productView");
    expect(QUICK_SEARCH_QUERY).toContain("...SearchProductView");
    expect(QUICK_SEARCH_QUERY).not.toContain("product {");
    expect(QUICK_SEARCH_QUERY).not.toContain("...Product");
});
