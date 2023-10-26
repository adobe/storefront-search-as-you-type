/*
Copyright 2024 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/

import styled, { CSSProperties } from "styled-components";
interface ImageProps {
    maxHeight?: CSSProperties["maxHeight"];
    gridArea?: CSSProperties["gridArea"];
    customWidth?: CSSProperties["width"];
}

const ProductImage = styled.img`
    object-fit: cover;
    grid-area: ${(props: ImageProps) => props.gridArea};
    max-height: ${(props: ImageProps) => props.maxHeight ?? "100%"};
    width: ${(props: ImageProps) => props.customWidth};
    max-width: 100%;
    vertical-align: middle;
    align-self: center;
`;

export { ProductImage };
