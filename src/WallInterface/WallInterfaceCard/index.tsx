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

export type WallInterfaceCardDraggingCursorPositionType =
    | "top-left"
    | "center"
    | "mouse"
    | 'top-right'
    | 'bottom-left'
    | 'bottom-right';

export type WallInterfaceCardProps = {
    id: string;
    initialPosition: { x: number; y: number };
    initialDimensions: { w: number; h: number };
    focusable?: boolean;
    draggable?: boolean | 'after-focus';
    dragCursorPosition?: WallInterfaceCardDraggingCursorPositionType;
    reorderToTopInHeirarchyOnFocus?: boolean;
    reorderToTopInHeirarchyOnDrag?: boolean;
    children: ReactNode;
};

// Draggable card component using requestAnimationFrame and CSS transforms instead of top, left properties

const WallInterfaceCard = (props: WallInterfaceCardProps) => {
    props = {
        focusable: true,
        draggable: true,
        dragCursorPosition: 'center',
        reorderToTopInHeirarchyOnFocus: true,
        reorderToTopInHeirarchyOnDrag: true,
        ...props,
    }

    const wallInterfaceDraggingContext = useContext(WallInterfaceDraggingContext);

    const cardRef = useRef<HTMLDivElement>(null);

    const [position, setPosition] = useState<{ x: number, y: number }>(props.initialPosition);
    const [dimensions, setDimensions] = useState<{ w: number, h: number }>(props.initialDimensions);
    const [dragging, setDragging] = useState<boolean>(false);

    // Mouse offset from card's position (top-left corner), because card position is only updated on mouse up
    const [mouseOffsetFromCardOnDrag, setMouseOffsetFromCardOnDrag] = useState<{ x: number, y: number }>({ x: 0, y: 0 });

    const onMouseDown: MouseEventHandler<HTMLDivElement> = (event) => {
        if (event.button !== 0) return;
        if (cardRef.current == null) return;

        setDragging(true);

        const cardRect = cardRef.current?.getBoundingClientRect();
        setMouseOffsetFromCardOnDrag({
            x: event.clientX - cardRect.left,
            y: event.clientY - cardRect.top,
        });

        console.log('set mouse offset', {
            x: event.clientX - cardRect.left,
            y: event.clientY - cardRect.top,
        })

        event.stopPropagation();
        event.preventDefault();
    };

    const onMouseUp: MouseEventHandler<HTMLDivElement> = (event) => {
        setDragging(false);
        event.stopPropagation();
        event.preventDefault();
    };

    const determineNewCardPosition = useCallback<
        (
            cardDimensionsW: number,
            cardDimensionsH: number,
            cardPositionX: number,
            cardPositionY: number,
            mousePositionX: number,
            mousePositionY: number,
            boardPositionX: number,
            boardPositionY: number,
        ) => { x: number; y: number }
    >((
        cardDimensionsW, cardDimensionsH,
        cardPositionX, cardPositionY,
        mousePositionX, mousePositionY,
        boardPositionX, boardPositionY
    ) => {
        if (props.dragCursorPosition === 'center') {
            return {
                x: (mousePositionX - boardPositionX) - cardDimensionsW / 2,
                y: (mousePositionY - boardPositionY) - cardDimensionsH / 2,
            };
        }

        console.log('move',
            'cardDimensionsW', cardDimensionsW, 'cardDimensionsH', cardDimensionsH,
            'cardPositionX', cardPositionX, 'cardPositionY', cardPositionY,
            'mousePositionX', mousePositionX, 'mousePositionY', mousePositionY,
            'boardPositionX', boardPositionX, 'boardPositionY', boardPositionY
        )

        if (props.dragCursorPosition === 'mouse') {
            return {
                x: (mousePositionX - boardPositionX) - mouseOffsetFromCardOnDrag.x,
                y: (mousePositionY - boardPositionY) - mouseOffsetFromCardOnDrag.y,
            };
        }

        if (props.dragCursorPosition === 'top-left') {
            return {
                x: (mousePositionX - boardPositionX),
                y: (mousePositionY - boardPositionY),
            };
        }

        if (props.dragCursorPosition === 'top-right') {
            return {
                x: (mousePositionX - boardPositionX) - cardDimensionsW,
                y: (mousePositionY - boardPositionY),
            };
        }

        if (props.dragCursorPosition === 'bottom-left') {
            return {
                x: (mousePositionX - boardPositionX),
                y: (mousePositionY - boardPositionY) - cardDimensionsH,
            };
        }

        if (props.dragCursorPosition === 'bottom-right') {
            return {
                x: (mousePositionX - boardPositionX) - cardDimensionsW,
                y: (mousePositionY - boardPositionY) - cardDimensionsH,
            };
        }

        throw new Error(`Invalid dragCursorPosition: ${props.dragCursorPosition}`);
    }, [
        props.dragCursorPosition, 
        mouseOffsetFromCardOnDrag
    ]);

    useEffect(() => {
        if (wallInterfaceDraggingContext.boardElement == null) return;
        if (cardRef.current == null) return;

        if (props.draggable !== true) return;

        const boardRect = wallInterfaceDraggingContext.boardElement.getBoundingClientRect();
        const cardRect = cardRef.current.getBoundingClientRect();

        const onMouseMove = (event: MouseEvent) => {
            if (!dragging) return;

            const newPosition = determineNewCardPosition(
                cardRect.width,
                cardRect.height,
                position.x,
                position.y,
                event.clientX,
                event.clientY,
                boardRect.left,
                boardRect.top,
            );

            setPosition(newPosition);
        };

        const onMouseUp = (event: MouseEvent) => {
            setDragging(false);
        };

        wallInterfaceDraggingContext.boardElement?.removeEventListener("mousemove", onMouseMove);
        wallInterfaceDraggingContext.boardElement?.removeEventListener("mouseup", onMouseUp);

        wallInterfaceDraggingContext.boardElement.addEventListener("mousemove", onMouseMove);
        wallInterfaceDraggingContext.boardElement.addEventListener("mouseup", onMouseUp);

        return () => {
            if (wallInterfaceDraggingContext.boardElement == null) return;

            wallInterfaceDraggingContext.boardElement?.removeEventListener("mousemove", onMouseMove);
            wallInterfaceDraggingContext.boardElement?.removeEventListener("mouseup", onMouseUp);
        };
    }, [
        wallInterfaceDraggingContext.boardElement,
        dragging,
        props.draggable,
    ])

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
