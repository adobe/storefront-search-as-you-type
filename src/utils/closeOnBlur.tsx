/*
Copyright 2024 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/

import { activeClass } from "utils";

import { isMobile, toggleActiveClass } from "./mobileHelperFunctions";

const isHovered = (targetId: string): boolean => {
    const targetElement = document.getElementById(targetId) as HTMLElement;

    return (
        targetElement?.parentElement?.querySelector(":hover") === targetElement
    );
};

const isFocused = (targetId: string): boolean => {
    const targetElement = document.getElementById(targetId) as HTMLElement;

    return document.activeElement === targetElement;
};

function closeOnBlur(
    inputSelector: string,
    resultsSelector: string,
    formSelector: string,
): void {
    const handler = () => {
        const focused = isFocused(inputSelector);
        const hovered = isHovered(resultsSelector);

        if (!focused && !hovered) {
            const target = document.getElementById(
                resultsSelector,
            ) as HTMLElement;
            target.style.display = "none";

            if (isMobile) {
                const searchButton = document
                    .getElementById(formSelector)
                    ?.querySelector("label") as HTMLLabelElement;

                toggleActiveClass(searchButton);
            }

            target.classList.remove(activeClass);
            document.removeEventListener("mousemove", handler);
            document.removeEventListener("click", handler);
            document.removeEventListener("blur", handler);
        }
    };

    document.addEventListener("mousemove", handler);
    document.addEventListener("click", handler);
    document.addEventListener("blur", handler);
}

export { isFocused, isHovered, closeOnBlur };
