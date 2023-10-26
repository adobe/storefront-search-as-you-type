/*
Copyright 2024 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/

import styled, { CSSObject, CSSProperties } from "styled-components";

interface GridProps extends CSSProperties {
    children?: unknown;
    hoverColor?: CSSProperties["backgroundColor"];
    hoverFontWeight?: CSSProperties["fontWeight"];
    hoverPointer?: CSSProperties["cursor"];
}

const Grid = styled.div`
    ${(props: GridProps) => {
        delete props.children;

        return props as CSSObject;
    }}

    display: grid;
    &:hover {
        background-color: ${(props: GridProps) => props.hoverColor};
        cursor: ${(props: GridProps) => props.hoverPointer};
        font-weight: ${(props: GridProps) => props.hoverFontWeight};
    }
`;

export { Grid };
