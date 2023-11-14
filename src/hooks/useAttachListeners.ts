/*
Copyright 2024 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/

import { MutableRefObject, useEffect } from "react";

import { FocusHookOptions } from "./useFocus";

interface useAttachListenersProps {
    focusProps: FocusHookOptions;
    formId: string;
    formProps: OnSubmitHandler;
    formRef: MutableRefObject<HTMLElement | null>;
    inputId: string;
    inputProps: OnChangeHandler;
    inputRef: MutableRefObject<HTMLInputElement | null>;
    resultsId: string;
    resultsRef: MutableRefObject<HTMLElement | null>;
}

type useAttachListenersHook = (props: useAttachListenersProps) => void;

const useAttachListeners: useAttachListenersHook = ({
    focusProps,
    formId,
    formProps,
    formRef,
    inputId,
    inputProps,
    inputRef,
    resultsId,
    resultsRef,
}) => {
    useEffect(() => {
        const formElement = document.getElementById(formId);
        const inputElement = document.getElementById(inputId);
        const resultsElement = document.getElementById(resultsId);

        document?.addEventListener("click", focusProps.onClick);

        formRef.current = formElement as HTMLFormElement;
        inputRef.current = inputElement as HTMLInputElement;
        resultsRef.current = resultsElement as HTMLDivElement;

        // In React, onFocus/onBlur behave like focusin/focusout
        formElement?.addEventListener("focusin", focusProps.onFocus);
        formElement?.addEventListener("focusout", focusProps.onBlur);
        formElement?.addEventListener("keydown", focusProps.onKeyDown);

        formElement?.addEventListener("submit", formProps.onSubmit);
        inputElement?.addEventListener("input", inputProps.onChange);

        return () => {
            // Remove event listeners to avoid memory leaks
            document?.removeEventListener("click", focusProps.onClick);
            formElement?.removeEventListener("focusin", focusProps.onFocus);
            formElement?.removeEventListener("focusout", focusProps.onBlur);
            formElement?.removeEventListener("keydown", focusProps.onKeyDown);
            formElement?.removeEventListener("submit", formProps.onSubmit);
            inputElement?.removeEventListener("input", inputProps.onChange);
        };
    }, [focusProps, formId, formProps, formRef, inputId, inputProps]);
};

export { useAttachListeners };
