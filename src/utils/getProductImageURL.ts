/*
Copyright 2024 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/

/*
 * Copyright © Adobe, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

import { Product } from "../types/interface";

const getProductImageURL = (product: Product): string => {
    const item = product.product;

    let url = null;

    if (item.thumbnail) {
        url = item.thumbnail.url;
    } else if (item.small_image) {
        url = item.small_image.url;
    } else if (item.image) {
        url = item.image.url;
    }

    return url ?? "";
};

export { getProductImageURL };
