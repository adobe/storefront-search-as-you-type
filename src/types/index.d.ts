/*
Copyright 2024 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/

type StateSetter<T> = (arg: T) => void;
type OnSubmitEvent = (event: FormEventHandler<HTMLFormElement>) => void;
type OnChangeEvent = (event: ChangeEventHandler<HTMLInputElement>) => void;

type UserViewHistory = { sku: string; dateTime: string };

interface OnSubmitHandler {
    onSubmit: OnSubmitEvent;
}

interface OnChangeHandler {
    onChange: OnChangeEvent;
}
