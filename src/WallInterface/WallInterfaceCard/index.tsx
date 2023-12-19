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

export type WallInterfaceCardProps = {
    id: string;
    initialPosition: PositionType;
    initialDimensions: DimensionsType;
    focusable?: boolean;
    draggable?: boolean | 'after-focus';
    dragCursorPosition?: WallInterfaceCardDraggingCursorPositionType;
    reorderToTopInHeirarchyOnFocus?: boolean;
    reorderToTopInHeirarchyOnDrag?: boolean;
    children: ReactNode;
};

const WallInterfaceCard = (props: WallInterfaceCardProps) => {
    props = {
        focusable: true,
        draggable: true,
        dragCursorPosition: 'center',
        reorderToTopInHeirarchyOnFocus: true,
        reorderToTopInHeirarchyOnDrag: true,
        ...props,
    }

    const cardRef = useRef<HTMLDivElement>(null);

    const [position, setPosition] = useState<PositionType>(props.initialPosition);
    const [dimensions, setDimensions] = useState<DimensionsType>(props.initialDimensions);

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

    return (
        <div
            ref={cardRef}
            className="card"
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            style={{
                position: "absolute",
                transform: `translate(${position.x}px, ${position.y}px)`,
                width: `${dimensions.w}px`,
                height: `${dimensions.h}px`,
                userSelect: "none",
                cursor: dragging ? "grabbing" : "grab",
                backgroundColor: "#eee",
                boxShadow: "0 0 0 1px #ddd",
                borderRadius: "3px",
            }}
        >
            <div>{props.children}</div>
        </div>
    );
};

export default WallInterfaceCard;
