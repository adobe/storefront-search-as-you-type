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
    const item = product.productView;

    const image = item.images?.find(({ roles }) =>
        roles?.some(role =>
            ["thumbnail", "small_image", "image"].includes(role),
        ),
    );

    return image?.url ?? item.images?.[0]?.url ?? "";
};

export { getProductImageURL };
