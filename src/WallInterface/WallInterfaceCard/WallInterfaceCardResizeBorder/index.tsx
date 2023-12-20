/*
All Rights Reserved, (c) 2023 CodeAtlas LTD.

Author: Martin Shaw (developer@martinshaw.co)
File Name: WallInterfaceCardResizeBorder.ts
Created:  2023-12-20T11:09:20.227Z
Modified: 2023-12-20T11:09:20.227Z

Description: description
*/

import { CSSProperties, MouseEventHandler, ReactNode, RefObject, useCallback, useEffect, useRef, useState } from "react";
import { WallInterfaceCardPropsType } from "..";
import { DimensionsType, PositionType } from "./../../utilities";

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

type WallInterfaceCardResizingType = {
    "top-left"?: boolean;
    "top-right"?: boolean;
    "top"?: boolean;
    "bottom-left"?: boolean;
    "bottom-right"?: boolean;
    "bottom"?: boolean;
    "left"?: boolean;
    "right"?: boolean;
}

type WallInterfaceCardResizeHintingType = {
    "top-left"?: 'hidden' | 'visible' | 'hover';
    "top-right"?: 'hidden' | 'visible' | 'hover';
    "top"?: 'hidden' | 'visible' | 'hover';
    "bottom-left"?: 'hidden' | 'visible' | 'hover';
    "bottom-right"?: 'hidden' | 'visible' | 'hover';
    "bottom"?: 'hidden' | 'visible' | 'hover';
    "left"?: 'hidden' | 'visible' | 'hover';
    "right"?: 'hidden' | 'visible' | 'hover';
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

    const [resizing, setResizing] = useState<WallInterfaceCardResizingType>({
        "top-left": false,
        "top-right": false,
        "top": false,
        "bottom-left": false,
        "bottom-right": false,
        "bottom": false,
        "left": false,
        "right": false,
    });

    const [resizeHinting, setResizeHinting] = useState<WallInterfaceCardResizeHintingType>({
        "top-left": 'hidden',
        "top-right": 'hidden',
        "top": 'hidden',
        "bottom-left": 'hidden',
        "bottom-right": 'hidden',
        "bottom": 'hidden',
        "left": 'hidden',
        "right": 'hidden',
    });

    const hintDimensions: DimensionsType = {
        w: 30,
        h: 30,
    }

    const onMouseMove: MouseEventHandler<HTMLDivElement> = useCallback((event) => {
        event.preventDefault();
        event.stopPropagation();

        if (props.cardProps.resizable === false) return;
        if (props.cardRef.current == null) return;

        const cardRect = props.cardRef.current.getBoundingClientRect();

        const mousePositionRelativeToCard: PositionType = {
            x: event.clientX - cardRect.x,
            y: event.clientY - cardRect.y,
        }

        const newResizeHinting: WallInterfaceCardResizeHintingType = {
            "top-left": 'hidden',
            "top-right": 'hidden',
            "top": 'hidden',
            "bottom-left": 'hidden',
            "bottom-right": 'hidden',
            "bottom": 'hidden',
            "left": 'hidden',
            "right": 'hidden',
        };

        if (mousePositionRelativeToCard.x < hintDimensions.w && (props.cardProps.resizable === true || props.cardProps.resizable?.["left"] === true))
            newResizeHinting["left"] = resizing['left'] ? 'hover' : 'visible';

        if (mousePositionRelativeToCard.x > (cardRect.width - hintDimensions.w) && (props.cardProps.resizable === true || props.cardProps.resizable?.["right"] === true))
            newResizeHinting["right"] = resizing['right'] ? 'hover' : 'visible';

        if (mousePositionRelativeToCard.y < hintDimensions.h && (props.cardProps.resizable === true || props.cardProps.resizable?.["top"] === true))
            newResizeHinting["top"] = resizing['top'] ? 'hover' : 'visible';

        if (mousePositionRelativeToCard.y > (cardRect.height - hintDimensions.h) && (props.cardProps.resizable === true || props.cardProps.resizable?.["bottom"] === true))
            newResizeHinting["bottom"] = resizing['bottom'] ? 'hover' : 'visible';

        if (mousePositionRelativeToCard.x < hintDimensions.w && mousePositionRelativeToCard.y < hintDimensions.h && (props.cardProps.resizable === true || props.cardProps.resizable?.["top-left"] === true))
            newResizeHinting["top-left"] = resizing['top-left'] ? 'hover' : 'visible';

        if (mousePositionRelativeToCard.x > (cardRect.width - hintDimensions.w) && mousePositionRelativeToCard.y < hintDimensions.h && (props.cardProps.resizable === true || props.cardProps.resizable?.["top-right"] === true))
            newResizeHinting["top-right"] = resizing['top-right'] ? 'hover' : 'visible';

        if (mousePositionRelativeToCard.x < hintDimensions.w && mousePositionRelativeToCard.y > (cardRect.height - hintDimensions.h) && (props.cardProps.resizable === true || props.cardProps.resizable?.["bottom-left"] === true))
            newResizeHinting["bottom-left"] = resizing['bottom-left'] ? 'hover' : 'visible';

        if (mousePositionRelativeToCard.x > (cardRect.width - hintDimensions.w) && mousePositionRelativeToCard.y > (cardRect.height - hintDimensions.h) && (props.cardProps.resizable === true || props.cardProps.resizable?.["bottom-right"] === true))
            newResizeHinting["bottom-right"] = resizing['bottom-right'] ? 'hover' : 'visible';

        setResizeHinting(newResizeHinting);
    }, [props, hintDimensions, resizing])

    // useEffect(() => {
    //     if (props.cardRef.current == null) return;
    //     if (resizingBorderRef.current == null) return;

    //     const handle


    // }, [resizingBorderRef, props.cardProps.resizable, props])

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
            cursor: 'nwse-resize',
        }}
    >
        {/* <svg width="100%" height="100%" viewBox="0 0 100 100">
            <path d="M 0 50 L 0 0 L 50 0" style={hintSvgStyle}  />
        </svg> */}
    </div>);

    const topRightHint = (<div
        className="wall-interface__card__resizing-border__hinting wall-interface__card__resizing-border__hinting--top-right"
        style={{
            ...hintCommonStyle,
            top: '0%',
            left: 'calc(100% - ' + hintDimensions.w + 'px)',
            cursor: 'nesw-resize',
        }}
    >
        {/* <svg width="100%" height="100%" viewBox="0 0 100 100">
            <path d="M 50 0 L 100 0 L 100 50" style={hintSvgStyle}  />
        </svg> */}
    </div>);

    const topHint = (<div
        className="wall-interface__card__resizing-border__hinting wall-interface__card__resizing-border__hinting--top"
        style={{
            ...hintCommonStyle,
            top: '0%',
            left: 'calc(50% - ' + (hintDimensions.w / 2) + 'px)',
            cursor: 'ns-resize',
        }}
    >
        <svg width="100%" height="100%" viewBox="0 0 100 100">
            <path d="M 0 0 L 100 0" style={hintSvgStyle} />
        </svg>
    </div>);

    const bottomLeftHint = (<div
        className="wall-interface__card__resizing-border__hinting wall-interface__card__resizing-border__hinting--bottom-left"
        style={{
            ...hintCommonStyle,
            top: 'calc(100% - ' + hintDimensions.h + 'px)',
            left: '0%',
            cursor: 'nesw-resize',
        }}
    >
        {/* <svg width="100%" height="100%" viewBox="0 0 100 100">
            <path d="M 0 50 L 0 100 L 50 100" style={hintSvgStyle}  />
        </svg> */}
    </div>);

    const bottomRightHint = (<div
        className="wall-interface__card__resizing-border__hinting wall-interface__card__resizing-border__hinting--bottom-right"
        style={{
            ...hintCommonStyle,
            top: 'calc(100% - ' + hintDimensions.h + 'px)',
            left: 'calc(100% - ' + hintDimensions.w + 'px)',
            cursor: 'nwse-resize',
        }}
    >
        {/* <svg width="100%" height="100%" viewBox="0 0 100 100">
            <path d="M 50 100 L 100 100 L 100 50" style={hintSvgStyle}  />
        </svg> */}
    </div>);

    const bottomHint = (<div
        className="wall-interface__card__resizing-border__hinting wall-interface__card__resizing-border__hinting--bottom"
        style={{
            ...hintCommonStyle,
            top: 'calc(100% - ' + hintDimensions.h + 'px)',
            left: 'calc(50% - ' + (hintDimensions.w / 2) + 'px)',
            cursor: 'ns-resize',
        }}
    >
        <svg width="100%" height="100%" viewBox="0 0 100 100">
            <path d="M 0 100 L 100 100" style={hintSvgStyle} />
        </svg>
    </div>);

    const leftHint = (<div
        className="wall-interface__card__resizing-border__hinting wall-interface__card__resizing-border__hinting--left"
        style={{
            ...hintCommonStyle,
            top: 'calc(50% - ' + (hintDimensions.h / 2) + 'px)',
            left: '0%',
            cursor: 'ew-resize',
        }}
    >
        <svg width="100%" height="100%" viewBox="0 0 100 100">
            <path d="M 0 0 L 0 100" style={hintSvgStyle} />
        </svg>
    </div>);

    const rightHint = (<div
        className="wall-interface__card__resizing-border__hinting wall-interface__card__resizing-border__hinting--right"
        style={{
            ...hintCommonStyle,
            top: 'calc(50% - ' + (hintDimensions.h / 2) + 'px)',
            left: 'calc(100% - ' + hintDimensions.w + 'px)',
            cursor: 'ew-resize',
        }}
    >
        <svg width="100%" height="100%" viewBox="0 0 100 100">
            <path d="M 100 0 L 100 100" style={hintSvgStyle} />
        </svg>
    </div>);

    return (
        <div
            ref={resizingBorderRef}
            className="wall-interface__card__resizing-border"
            style={containerStyle}
            onMouseMove={onMouseMove}
        >
            <div
                className="wall-interface__card__resizing-border__hints-container"
                style={hintsContainerStyle}
            >
                <div
                    className="wall-interface__card__resizing-border__hints-container__inner"
                    style={hintsContainerInnerStyle}
                >
                    {resizeHinting["top-left"] !== 'hidden' && topLeftHint}
                    {resizeHinting["top-right"] !== 'hidden' && topRightHint}
                    {resizeHinting["top"] !== 'hidden' && topHint}
                    {resizeHinting["bottom-left"] !== 'hidden' && bottomLeftHint}
                    {resizeHinting["bottom-right"] !== 'hidden' && bottomRightHint}
                    {resizeHinting["bottom"] !== 'hidden' && bottomHint}
                    {resizeHinting["left"] !== 'hidden' && leftHint}
                    {resizeHinting["right"] !== 'hidden' && rightHint}
                </div>
            </div>

            {props.children}
        </div>
    )
};

export default WallInterfaceCardResizeBorder;