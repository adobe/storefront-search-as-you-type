/*
Copyright 2024 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/

import getSymbolFromCurrency from "currency-symbol-map";

import { Product } from "../types/interface";

const getFormatPriceByLocale = (
    price: string,
    currencyCode = "USD",
    locale = "en-US",
) => {
    let formatLocale = locale.replaceAll("_", "-");

    if (formatLocale === "zh-Hans-CN") {
        formatLocale = "zh-CN";
    } else if (formatLocale === "zh-Hant-TW") {
        formatLocale = "zh-TW";
    }

    const formattedPrice = new Intl.NumberFormat(formatLocale, {
        style: "currency",
        currency: currencyCode,
    }).format(Number(price));
    return formattedPrice ?? `${getSymbolFromCurrency(currencyCode)}${price}`;
};

const getProductPrice = (
    product: Product,
    currencyCode: string,
    currencyRate: string,
    locale: string,
): string => {
    const productPrice =
        product.productView.price ?? product.productView.priceRange?.minimum;

    const price = productPrice?.final.amount.value;

    if (price === undefined || price === null) {
        return "";
    }

    let currency = productPrice?.regular.amount.currency ?? "USD";
    // if base currency is configured within Commerce, that symbol should be used
    if (currencyCode) {
        currency = currencyCode;
    }

    const convertedPrice = currencyRate
        ? price * parseFloat(currencyRate)
        : price;

    return getFormatPriceByLocale(convertedPrice.toFixed(2), currency, locale);
};

export { getProductPrice };
