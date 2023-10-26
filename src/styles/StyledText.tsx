/*
Copyright 2024 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/

import styled, { CSSProperties } from "styled-components";

interface FontProps {
    color?: CSSProperties["color"];
    customFontWeight?: CSSProperties["fontWeight"];
    customFontSize?: CSSProperties["fontSize"];
    customLineHeight?: CSSProperties["lineHeight"];
    hoverColor?: CSSProperties["backgroundColor"];
    hoverPointer?: CSSProperties["cursor"];
    padding?: CSSProperties["padding"];
    textAlign?: CSSProperties["textAlign"];
    textTransform?: CSSProperties["textTransform"];
    userSelect?: CSSProperties["userSelect"];
}

const StyledText = styled.span`
    font-weight: ${(props: FontProps) => props.customFontWeight};
    font-size: ${(props: FontProps) => props.customFontSize};
    line-height: ${(props: FontProps) => props.customLineHeight};
    color: ${(props: FontProps) => props.color};
    padding: ${(props: FontProps) => props.padding};
    text-align: ${(props: FontProps) => props.textAlign};
    text-transform: ${(props: FontProps) => props.textTransform};
    user-select: ${(props: FontProps) => props.userSelect};
    align-self: center;

    &:hover {
        background-color: ${(props: FontProps) => props.hoverColor};
        cursor: ${(props: FontProps) => props.hoverPointer};
    }
`;

export { StyledText };
