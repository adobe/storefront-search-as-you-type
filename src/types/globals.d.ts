import { MagentoStorefrontEvents } from "@adobe/magento-storefront-events-sdk";

declare global {
    module "*.svg";

    interface Window {
        LiveSearchAutocomplete: typeof import("../LiveSearchAutocomplete").default;
        magentoStorefrontEvents: MagentoStorefrontEvents;
    }

    const API_URL: string;
}
