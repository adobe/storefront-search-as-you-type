/*
Copyright 2024 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/

import { MagentoStorefrontEvents } from "@adobe/magento-storefront-events-sdk";

declare global {
    module "*.svg";

    interface Window {
        LiveSearchAutocomplete: typeof import("../LiveSearchAutocomplete").default;
        magentoStorefrontEvents: MagentoStorefrontEvents;
    }

    const API_URL: string;
    const REACT_APP: boolean;
}
