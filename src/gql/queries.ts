/*
Copyright 2024 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/

import { Product } from "./fragments";

const QUICK_SEARCH_QUERY = `
    query quickSearch(
        $phrase: String!
        $pageSize: Int = 20
        $currentPage: Int = 1
        $filter: [SearchClauseInput!]
        $sort: [ProductSearchSortInput!]
        $context: QueryContextInput
    ) {
        productSearch(
            phrase: $phrase
            page_size: $pageSize
            current_page: $currentPage
            filter: $filter
            sort: $sort
            context: $context
        ){
            items {
                ...Product
            }
            page_info {
                current_page
                page_size
                total_pages
            }
        }
    }
    ${Product}
`;

export { QUICK_SEARCH_QUERY };
