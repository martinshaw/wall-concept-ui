/*
All Rights Reserved, (c) 2023 CodeAtlas LTD.

Author: Martin Shaw (developer@martinshaw.co)
File Name: index.tsx
Created:  2023-12-18T20:07:32.888Z
Modified: 2023-12-18T20:07:32.888Z

Description: description
*/

import { MouseEventHandler, ReactNode, useCallback, useContext, useEffect, useRef, useState } from "react";
import WallInterfaceDraggingContext from "../WallInterfaceDraggingContext";
import useWallInterfaceCardDragging, { WallInterfaceCardDraggingCursorPositionType } from "./useWallInterfaceCardDragging";
import { DimensionsType, PositionType } from "../utilities";
import useWallInterfaceCardFocusing from "./useWallInterfaceCardFocusing";
import WallInterfaceFocusingContext from "../WallInterfaceFocusingContext";
import WallInterfaceCardScaleContent from "./WallInterfaceCardScaleContent";

export type WallInterfaceCardProps = {
    id: string;
    initialPosition: PositionType;
    initialDimensions: DimensionsType;
    focusable?: boolean;
    draggable?: boolean | 'after-focus';
    dragCursorPosition?: WallInterfaceCardDraggingCursorPositionType;
    // TODO: Implement
    reorderToTopInHeirarchyOnFocus?: boolean;
    // TODO: Implement
    reorderToTopInHeirarchyOnDrag?: boolean;
    // TODO: Need to improve
    scaleContent?: boolean;
    onDragEnd?: (cardProps: WallInterfaceCardProps) => void;
    children: ReactNode;
};

const WallInterfaceCard = (props: WallInterfaceCardProps) => {
    props = {
        focusable: true,
        draggable: 'after-focus',
        dragCursorPosition: 'mouse',
        reorderToTopInHeirarchyOnFocus: true,
        reorderToTopInHeirarchyOnDrag: true,
        // scaleContent: true, // TODO: Use `true` once it's working
        scaleContent: false,
        ...props,
    }

    const cardRef = useRef<HTMLDivElement>(null);

    const [position, setPosition] = useState<PositionType>(props.initialPosition);
    const [dimensions, setDimensions] = useState<DimensionsType>(props.initialDimensions);

    const focusingContext = useContext(WallInterfaceFocusingContext);
    const {
        focusing,
        handleFocusingOnClick,
    } = useWallInterfaceCardFocusing({
        cardProps: props,
        cardRef,
        focusingContext,
    });

    const draggingContext = useContext(WallInterfaceDraggingContext);
    const {
        dragging,
        handleDraggingOnMouseDown,
        handleDraggingOnMouseUp,
    } = useWallInterfaceCardDragging({
        cardProps: props,
        cardRef,
        position,
        setPosition,
        dimensions,
        setDimensions,
        draggingContext,
        focusing,
    });

    const onMouseDown = useCallback<MouseEventHandler<HTMLDivElement>>(
        (event) => {
            handleDraggingOnMouseDown(event);
        },
        [handleDraggingOnMouseDown]
    );

    const onMouseUp = useCallback<MouseEventHandler<HTMLDivElement>>(
        (event) => {
            handleDraggingOnMouseUp(event);
        },
        [handleDraggingOnMouseUp]
    );

    const onClick = useCallback<MouseEventHandler<HTMLDivElement>>(
        (event) => {
            handleFocusingOnClick(event);
        },
        [handleFocusingOnClick]
    );

    const determineCursor = useCallback<() => 'grab' | 'grabbing' | 'pointer' | 'default'>(() => {
        if (dragging && props.draggable !== false) return 'grabbing';
        if (props.draggable === 'after-focus' && focusing) return 'grab';
        if (props.draggable === true) return 'grab';
        if (props.focusable && focusing === false) return 'pointer';
        return 'default';
    }, [dragging, focusing, props.draggable, props.focusable]);

    return (
        <div
            ref={cardRef}
            className="wall-interface__card__container"
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onClick={onClick}
            style={{
                width: `${dimensions.w}px`,
                height: `${dimensions.h}px`,
                position: "absolute",
                transform: `translate(${position.x}px, ${position.y}px)`,
                userSelect: "none",
                boxSizing: "border-box",
                cursor: determineCursor(),
            }}
        >   
            <div
                className="wall-interface__card__focus-border"
                style={{
                    width: "100%",
                    height: "100%",
                    padding: "4px",
                    overflow: "hidden",
                    boxSizing: "border-box",
                    boxShadow: focusing ? "0 0 0 2px #aaf8" : "none",
                    borderRadius: "8px",
                }}
            >
                <div
                    className="wall-interface__card__content" 
                    style={{
                        width: "100%",
                        height: "100%",
                        padding: "5px",
                        overflow: "hidden",
                        boxSizing: "border-box",
                        backgroundColor: "#eee",
                        boxShadow: "0 0 0 1px #ddd",
                        borderRadius: "5px",
                    }}
                >
                    <WallInterfaceCardScaleContent
                        cardProps={props}
                        cardRef={cardRef}
                        scaleContent={props.scaleContent ?? true}
                        cardPosition={position}
                        cardDimensions={dimensions}
                    >
                        {props.children}
                    </WallInterfaceCardScaleContent>
                </div>
            </div>
        </div>
    );
};

export default WallInterfaceCard;
