/*
Copyright 2024 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/

import { FocusEvent, MutableRefObject, useCallback, useMemo } from "react";

interface useFocusProps {
    formRef: MutableRefObject<HTMLElement | null>;
    resultsRef: MutableRefObject<HTMLElement | null>;
    setActive: StateSetter<boolean>;
}

interface FocusHookOptions {
    onBlur: (e: any) => void;
    onKeyDown: (e: any) => void;
    onClick: (e: any) => void;
    onFocus: () => void;
}

type useFocusHook = (props: useFocusProps) => FocusHookOptions;

const useFocus: useFocusHook = ({ formRef, resultsRef, setActive }) => {
    const handleMouseClick = useCallback(
        (e: any) => {
            e.stopPropagation();
            const windowEvent = e || window.event;
            const target = windowEvent.target || windowEvent.srcElement;

            const popoverClassNames = [
                "search-autocomplete",
                "input-text",
                "popover-container",
                "products-container",
            ];
            let closePopover = true;
            for (let i = 0; i < popoverClassNames.length; i++) {
                const className = popoverClassNames[i];
                if (
                    typeof target.className.includes !== "undefined" &&
                    target?.className.includes(className)
                ) {
                    // If user clicks inside input/popover
                    closePopover = false;
                }
            }
            if (closePopover) {
                setActive(false);
            }
        },
        [formRef, resultsRef, setActive],
    );

    const handleKeyboardDown = useCallback(
        (e: KeyboardEvent) => {
            e.stopPropagation();
            const { key } = e;
            const isEscape = key === "Escape" || key === "Esc";
            if (isEscape) {
                // Hide popup if user press escape key
                setActive(false);
            }
        },
        [formRef, resultsRef, setActive],
    );

    const handleBlurChange = useCallback(
        (e: FocusEvent<HTMLInputElement>) => {
            e.stopPropagation();
            const resultsElement = resultsRef.current as HTMLElement;
            const hasResults =
                !!resultsElement?.querySelectorAll(".product-result")?.length;
            if (hasResults) {
                // prevent popover closing if user press 'Done'
                setActive(true);
            }
        },
        [formRef, resultsRef, setActive],
    );

    const handleFocusChange = useCallback(() => {
        const { activeElement } = document;
        const resultsElement = resultsRef.current as HTMLElement;

        const isForm = formRef.current?.contains(activeElement);
        const isResults =
            resultsElement?.parentElement?.querySelector(":hover") ===
            resultsElement;

        setActive(isForm || (isResults as boolean));
    }, [formRef, resultsRef, setActive]);

    const focusProps = useMemo(
        () => ({
            onBlur: handleBlurChange,
            onFocus: handleFocusChange,
            onKeyDown: handleKeyboardDown,
            onClick: handleMouseClick,
        }),
        [handleFocusChange],
    );
    return focusProps;
};

export { useFocus };
export type { FocusHookOptions };
