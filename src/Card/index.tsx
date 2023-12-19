/*
All Rights Reserved, (c) 2023 CodeAtlas LTD.

Author: Martin Shaw (developer@martinshaw.co)
File Name: index.tsx
Created:  2023-12-18T20:07:32.888Z
Modified: 2023-12-18T20:07:32.888Z

Description: description
*/

import { MouseEventHandler, ReactNode, useContext, useEffect, useState } from "react";
import BoardCardDraggingContext from "../Board/BoardCardDraggingContext";

export type CardProps = {
    id: string;
    initialPosition: { x: number; y: number };
    initialDimensions: { w: number; h: number };
    children: ReactNode;
};

// Draggable card component using requestAnimationFrame and CSS transforms instead of top, left properties

const Card = (props: CardProps) => {
    const boardCardDraggingContext = useContext(BoardCardDraggingContext);

    const [position, setPosition] = useState(props.initialPosition);
    const [dimensions, setDimensions] = useState(props.initialDimensions);
    const [dragging, setDragging] = useState(false);

    const onMouseDown: MouseEventHandler<HTMLDivElement> = (event) => {
        if (event.button !== 0) return;

        setDragging(true);
        event.stopPropagation();
        event.preventDefault();
    };

    const onMouseUp: MouseEventHandler<HTMLDivElement> = (event) => {
        setDragging(false);
        event.stopPropagation();
        event.preventDefault();
    };
    
    useEffect(() => {
        if (boardCardDraggingContext.boardElement == null) return;

        const boardRect = boardCardDraggingContext.boardElement.getBoundingClientRect();

        const onMouseMove = (event: MouseEvent) => {
            if (!dragging) return;

            setPosition({
                x: event.clientX - boardRect.left,
                y: event.clientY - boardRect.top,
            });
        };

        const onMouseUp = (event: MouseEvent) => {
            setDragging(false);
        };

        boardCardDraggingContext.boardElement?.removeEventListener("mousemove", onMouseMove);
        boardCardDraggingContext.boardElement?.removeEventListener("mouseup", onMouseUp);

        boardCardDraggingContext.boardElement.addEventListener("mousemove", onMouseMove);
        boardCardDraggingContext.boardElement.addEventListener("mouseup", onMouseUp);

        return () => {
            if (boardCardDraggingContext.boardElement == null) return;

            boardCardDraggingContext.boardElement?.removeEventListener("mousemove", onMouseMove);
            boardCardDraggingContext.boardElement?.removeEventListener("mouseup", onMouseUp);
        };
    }, [
        boardCardDraggingContext.boardElement,
        dragging,
    ])

    return (
        <div
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

export default Card;
