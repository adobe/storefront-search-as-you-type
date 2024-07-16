const config = {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    roots: ["<rootDir>/src"],
    clearMocks: true,
    moduleFileExtensions: ["ts", "tsx", "js"],
    setupFilesAfterEnv: [
        "@testing-library/jest-dom/extend-expect",
        "jest-styled-components",
    ],
    transform: {
        "^.+\\.tsx?$": "ts-jest",
        "^.+\\.svg$": "<rootDir>/src/test-utils/imageTransform.js",
    },
    moduleDirectories: ["<rootDir>/src", "node_modules"],
    moduleNameMapper: {
        "\\.css$": "identity-obj-proxy",
        "^components(.*)$": "<rootDir>/src/components$1",
        "^styles(.*)$": "<rootDir>/src/styles$1",
        "^utils(.*)$": "<rootDir>/src/utils$1",
        "^.+\\.svg$": "<rootDir>/src/test-utils/imageTransform.js",
        // Add aliases here ---> "^alias(.*)$": "<rootDir>/src/alias-path$1", <---
    },
};

module.exports = config;
