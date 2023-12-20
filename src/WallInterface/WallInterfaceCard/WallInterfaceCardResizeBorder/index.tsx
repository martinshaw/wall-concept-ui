/*
All Rights Reserved, (c) 2023 CodeAtlas LTD.

Author: Martin Shaw (developer@martinshaw.co)
File Name: WallInterfaceCardResizeBorder.ts
Created:  2023-12-20T11:09:20.227Z
Modified: 2023-12-20T11:09:20.227Z

Description: description
*/

import { CSSProperties, ReactNode, RefObject, useEffect, useRef, useState } from "react";
import { WallInterfaceCardPropsType } from "..";
import { DimensionsType } from "./../../utilities";

export type WallInterfaceCardPropsResizableType = boolean | {
    "top-left"?: boolean;
    "top-right"?: boolean;
    "top"?: boolean;
    "bottom-left"?: boolean;
    "bottom-right"?: boolean;
    "bottom"?: boolean;
    "left"?: boolean;
    "right"?: boolean;
}

export type WallInterfaceCardResizeHintingType = {
    "top-left"?: boolean;
    "top-right"?: boolean;
    "top"?: boolean;
    "bottom-left"?: boolean;
    "bottom-right"?: boolean;
    "bottom"?: boolean;
    "left"?: boolean;
    "right"?: boolean;
}

type WallInterfaceCardResizingPropsType = {
    cardProps: WallInterfaceCardPropsType;
    cardRef: RefObject<HTMLDivElement>;
    focusing: boolean;
    dimensions: DimensionsType
    setDimensions: (newDimensions: DimensionsType) => void;
    children: ReactNode;
};

const WallInterfaceCardResizeBorder = (props: WallInterfaceCardResizingPropsType) => {
    const resizingBorderRef = useRef<HTMLDivElement>(null);

    const [resizeHinting, setResizeHinting] = useState<WallInterfaceCardResizeHintingType>({
        "top-left": true,
        "top-right": true,
        "top": true,
        "bottom-left": true,
        "bottom-right": true,
        "bottom": true,
        "left": true,
        "right": true,
    });

    useEffect(() => {
        if (props.cardRef.current == null) return;
        if (resizingBorderRef.current == null) return;

        const resizingBorderRect = resizingBorderRef.current.getBoundingClientRect();

        console.log('resizingBorderRect', resizingBorderRect);

    }, [props.cardProps.resizable, props])

    const hintDimensions: DimensionsType = {
        w: 30,
        h: 30,
    }

    const containerStyle: CSSProperties = {
        width: '100%',
        height: '100%',
        position: 'relative',
    }

    const hintsContainerStyle: CSSProperties = {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
    }

    const hintsContainerInnerStyle: CSSProperties = {
        marginLeft: '-2px',
        marginTop: '-2px',
        width: 'calc(100% + 4px)',
        height: 'calc(100% + 4px)',
        position: 'relative',
    }

    const hintCommonStyle: CSSProperties = {
        width: hintDimensions.w + 'px',
        height: hintDimensions.h + 'px',
        position: 'absolute',
        top: 0,
        left: 0,
        // backgroundColor: 'red',
    };

    const hintSvgStyle: CSSProperties = {
        fill: 'none',
        stroke: '#0005',
        strokeWidth: '10px',
        strokeLinejoin: 'round',
        strokeLinecap: 'butt',
    }

    const topLeftHint = (<div
        className="wall-interface__card__resizing-border__hinting wall-interface__card__resizing-border__hinting--top-left"
        style={{
            ...hintCommonStyle,
            top: '0%',
            left: '0%',
        }}
    >
        <svg width="100%" height="100%" viewBox="0 0 100 100">
            <path d="M 0 50 L 0 0 L 50 0" style={hintSvgStyle}  />
        </svg>
    </div>);

    const topRightHint = (<div
        className="wall-interface__card__resizing-border__hinting wall-interface__card__resizing-border__hinting--top-right"
        style={{
            ...hintCommonStyle,
            top: '0%',
            left: 'calc(100% - ' + hintDimensions.w + 'px)',
        }}
    >
        <svg width="100%" height="100%" viewBox="0 0 100 100">
            <path d="M 50 0 L 100 0 L 100 50" style={hintSvgStyle}  />
        </svg>
    </div>);

    const topHint = (<div
        className="wall-interface__card__resizing-border__hinting wall-interface__card__resizing-border__hinting--top"
        style={{
            ...hintCommonStyle,
            top: '0%',
            left: 'calc(50% - ' + (hintDimensions.w / 2) + 'px)',
        }}
    >
        <svg width="100%" height="100%" viewBox="0 0 100 100">
            <path d="M 0 0 L 100 0" style={hintSvgStyle}  />
        </svg>
    </div>);

    const bottomLeftHint = (<div
        className="wall-interface__card__resizing-border__hinting wall-interface__card__resizing-border__hinting--bottom-left"
        style={{
            ...hintCommonStyle,
            top: 'calc(100% - ' + hintDimensions.h + 'px)',
            left: '0%',
        }}
    >
        <svg width="100%" height="100%" viewBox="0 0 100 100">
            <path d="M 0 50 L 0 100 L 50 100" style={hintSvgStyle}  />
        </svg>
    </div>);

    const bottomRightHint = (<div
        className="wall-interface__card__resizing-border__hinting wall-interface__card__resizing-border__hinting--bottom-right"
        style={{
            ...hintCommonStyle,
            top: 'calc(100% - ' + hintDimensions.h + 'px)',
            left: 'calc(100% - ' + hintDimensions.w + 'px)',
        }}
    >
        <svg width="100%" height="100%" viewBox="0 0 100 100">
            <path d="M 50 100 L 100 100 L 100 50" style={hintSvgStyle}  />
        </svg>
    </div>);

    const bottomHint = (<div
        className="wall-interface__card__resizing-border__hinting wall-interface__card__resizing-border__hinting--bottom"
        style={{
            ...hintCommonStyle,
            top: 'calc(100% - ' + hintDimensions.h + 'px)',
            left: 'calc(50% - ' + (hintDimensions.w / 2) + 'px)',
        }}
    >
        <svg width="100%" height="100%" viewBox="0 0 100 100">
            <path d="M 0 100 L 100 100" style={hintSvgStyle}  />
        </svg>
    </div>);

    const leftHint = (<div
        className="wall-interface__card__resizing-border__hinting wall-interface__card__resizing-border__hinting--left"
        style={{
            ...hintCommonStyle,
            top: 'calc(50% - ' + (hintDimensions.h / 2) + 'px)',
            left: '0%',
        }}
    >
        <svg width="100%" height="100%" viewBox="0 0 100 100">
            <path d="M 0 0 L 0 100" style={hintSvgStyle}  />
        </svg>
    </div>);

    const rightHint = (<div
        className="wall-interface__card__resizing-border__hinting wall-interface__card__resizing-border__hinting--right"
        style={{
            ...hintCommonStyle,
            top: 'calc(50% - ' + (hintDimensions.h / 2) + 'px)',
            left: 'calc(100% - ' + hintDimensions.w + 'px)',
        }}
    >
        <svg width="100%" height="100%" viewBox="0 0 100 100">
            <path d="M 100 0 L 100 100" style={hintSvgStyle}  />
        </svg>
    </div>);

    return (
        <div
            ref={resizingBorderRef}
            className="wall-interface__card__resizing-border"
            style={containerStyle}
        >
            <div
                className="wall-interface__card__resizing-border__hints-container"
                style={hintsContainerStyle}
            >
                <div
                    className="wall-interface__card__resizing-border__hints-container__inner"
                    style={hintsContainerInnerStyle}
                >
                    {resizeHinting["top-left"] && topLeftHint}
                    {resizeHinting["top-right"] && topRightHint}
                    {resizeHinting["top"] && topHint}
                    {resizeHinting["bottom-left"] && bottomLeftHint}
                    {resizeHinting["bottom-right"] && bottomRightHint}
                    {resizeHinting["bottom"] && bottomHint}
                    {resizeHinting["left"] && leftHint}
                    {resizeHinting["right"] && rightHint}
                </div>
            </div>

            {props.children}
        </div>
    )
};

export default WallInterfaceCardResizeBorder;