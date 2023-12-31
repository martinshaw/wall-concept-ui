/*
All Rights Reserved, (c) 2023 CodeAtlas LTD.

Author: Martin Shaw (developer@martinshaw.co)
File Name: useWallInterfaceCardDragging.ts
Created:  2023-12-19T16:56:22.568Z
Modified: 2023-12-19T16:56:22.568Z

Description: description
*/

import { Dispatch, MouseEventHandler, SetStateAction, useCallback, useContext, useEffect, useState } from "react";
import { DimensionsType, PositionType } from "../utilities";
import WallInterfaceDraggingContext from "../WallInterfaceDraggingContext";
import { WallInterfaceCardPropsType } from ".";

export type WallInterfaceCardDraggingCursorPositionType =
    | "top-left"
    | "center"
    | "mouse"
    | 'top-right'
    | 'bottom-left'
    | 'bottom-right';

type useWallInterfaceCardDraggingPropsType = {
    cardProps: WallInterfaceCardPropsType;
    cardRef: React.RefObject<HTMLDivElement>;
    position: PositionType;
    setPosition: Dispatch<SetStateAction<PositionType>>;
    dimensions: DimensionsType;
    setDimensions: Dispatch<SetStateAction<DimensionsType>>;
    focusing: boolean;
}

const useWallInterfaceCardDragging = (props: useWallInterfaceCardDraggingPropsType) => {
    const draggingContext = useContext(WallInterfaceDraggingContext);

    const [dragging, setDragging] = useState<boolean>(false);

    // Mouse offset from card's position (top-left corner), because card position is only updated on mouse up
    const [mouseOffsetFromCardOnDrag, setMouseOffsetFromCardOnDrag] = useState<PositionType>({ x: 0, y: 0 });

    const handleDraggingOnMouseDown = useCallback< MouseEventHandler<HTMLDivElement>>((event) => {
        if (event.button !== 0) return;
        if (props.cardRef.current == null) return;

        setDragging(true);

        const cardRect = props.cardRef.current?.getBoundingClientRect();
        setMouseOffsetFromCardOnDrag({
            x: event.clientX - cardRect.left,
            y: event.clientY - cardRect.top,
        });

        event.stopPropagation();
        event.preventDefault();
    }, [props]);

    const handleDraggingOnMouseUp = useCallback<MouseEventHandler<HTMLDivElement>>((event) => {
        setDragging(false);

        if (props.cardProps.onDragEnd != null) props.cardProps.onDragEnd(props.cardProps);

        event.stopPropagation();
        event.preventDefault();
    }, [props]);

    const determineNewCardPosition = useCallback<
        ( 
            cardDimensionsW: number, cardDimensionsH: number,
            cardPositionX: number, cardPositionY: number,
            mousePositionX: number, mousePositionY: number,
            boardPositionX: number, boardPositionY: number,
        ) => PositionType
    >((
        cardDimensionsW, cardDimensionsH,
        cardPositionX, cardPositionY,
        mousePositionX, mousePositionY,
        boardPositionX, boardPositionY
    ) => {
        if (props.cardProps.dragCursorPosition === 'center') {
            return {
                x: (mousePositionX - boardPositionX) - cardDimensionsW / 2,
                y: (mousePositionY - boardPositionY) - cardDimensionsH / 2,
            };
        }

        if (props.cardProps.dragCursorPosition === 'mouse') {
            return {
                x: (mousePositionX - boardPositionX) - mouseOffsetFromCardOnDrag.x,
                y: (mousePositionY - boardPositionY) - mouseOffsetFromCardOnDrag.y,
            };
        }

        if (props.cardProps.dragCursorPosition === 'top-left') {
            return {
                x: (mousePositionX - boardPositionX),
                y: (mousePositionY - boardPositionY),
            };
        }

        if (props.cardProps.dragCursorPosition === 'top-right') {
            return {
                x: (mousePositionX - boardPositionX) - cardDimensionsW,
                y: (mousePositionY - boardPositionY),
            };
        }

        if (props.cardProps.dragCursorPosition === 'bottom-left') {
            return {
                x: (mousePositionX - boardPositionX),
                y: (mousePositionY - boardPositionY) - cardDimensionsH,
            };
        }

        if (props.cardProps.dragCursorPosition === 'bottom-right') {
            return {
                x: (mousePositionX - boardPositionX) - cardDimensionsW,
                y: (mousePositionY - boardPositionY) - cardDimensionsH,
            };
        }

        throw new Error(`Invalid dragCursorPosition: ${props.cardProps.dragCursorPosition}`);
    }, [
        props.cardProps.dragCursorPosition,
        mouseOffsetFromCardOnDrag
    ]);

    useEffect(() => {

        if (draggingContext.boardElement == null) return;
        if (props.cardRef.current == null) return;

        if (props.cardProps.draggable !== true) {
            if (props.focusing !== true || props.cardProps.draggable !== 'after-focus') {
                return
            }
        }

        const boardRect = draggingContext.boardElement.getBoundingClientRect();
        const cardRect = props.cardRef.current.getBoundingClientRect();

        const onMouseMove = (event: MouseEvent) => {
            if (!dragging) return;

            const newPosition = determineNewCardPosition(
                cardRect.width,
                cardRect.height,
                props.position.x,
                props.position.y,
                event.clientX,
                event.clientY,
                boardRect.left,
                boardRect.top,
            );

            props.setPosition(newPosition);
        };

        const onMouseUp = (event: MouseEvent) => {
            setDragging(false);

            if (props.cardProps.onDragEnd != null) props.cardProps.onDragEnd(props.cardProps);
        };

        draggingContext.boardElement?.removeEventListener("mousemove", onMouseMove);
        draggingContext.boardElement?.removeEventListener("mouseup", onMouseUp);

        draggingContext.boardElement.addEventListener("mousemove", onMouseMove);
        draggingContext.boardElement.addEventListener("mouseup", onMouseUp);

        return () => {
            if (draggingContext.boardElement == null) return;

            draggingContext.boardElement?.removeEventListener("mousemove", onMouseMove);
            draggingContext.boardElement?.removeEventListener("mouseup", onMouseUp);
        };
    }, [
        draggingContext.boardElement,
        dragging,
        props.cardProps.draggable,
        determineNewCardPosition,
        props.cardProps.onDragEnd,
        props.cardRef,
        props.position,
        props.focusing,
        props,
    ])

    return {
        dragging,
        handleDraggingOnMouseDown,
        handleDraggingOnMouseUp,
    };
}

export default useWallInterfaceCardDragging;