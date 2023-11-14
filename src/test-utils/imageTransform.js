/*
Copyright 2024 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/

module.exports = {
    process() {
        return { code: "module.exports = {};" };
    },
    getCacheKey() {
        // The output is always the same.
        return "imageTransform";
    },
};
