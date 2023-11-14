/*
Copyright 2024 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/

import getSymbolFromCurrency from "currency-symbol-map";

import { Product } from "../types/interface";

const getProductPrice = (
    product: Product,
    currencySymbol: string,
    currencyRate: string,
): string => {
    let currency =
        product.product.price_range.minimum_price.regular_price.currency;

    // if currency symbol is configurable within Commerce, that symbol should is used
    if (currencySymbol) {
        currency = currencySymbol;
    } else {
        currency = getSymbolFromCurrency(currency) ?? "";
    }

    const price = product.product.price_range.minimum_price.final_price.value;

    const convertedPrice = currencyRate
        ? price * parseFloat(currencyRate)
        : price;

    if (price === null) {
        return "";
    } else {
        return `${currency}${convertedPrice.toFixed(2)}`;
    }
};

export { getProductPrice };
