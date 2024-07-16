/*
Copyright 2024 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/

const getProductPrice = (
    price: number,
    currencySymbol: string,
    currencyRate: string,
): string => {
    const convertedPrice = currencyRate
        ? price * parseFloat(currencyRate)
        : price;

    if (price === null) {
        return "";
    } else {
        return `${currencySymbol}${convertedPrice.toFixed(2)}`;
    }
};

export { getProductPrice };
