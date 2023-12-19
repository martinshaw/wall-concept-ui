/*
All Rights Reserved, (c) 2023 CodeAtlas LTD.

Author: Martin Shaw (developer@martinshaw.co)
File Name: index.tsx
Created:  2023-12-18T20:07:29.076Z
Modified: 2023-12-18T20:07:29.076Z

Description: description
*/

import { ReactNode } from "react";
import BoardCardDraggingContext, {
    useBoardCardDraggingContextValue,
} from "./BoardCardDraggingContext";

export type BoardProps = {
    children: ReactNode;
};

const Board = (props: BoardProps) => {
    const boardCardDraggingContextValue = useBoardCardDraggingContextValue();

    return (
        <div
            className="board"
            style={{
                userSelect: "none",
                width: "100%",
                height: "100%",
                position: "absolute",
                overflow: "hidden",
                top: 0,
                left: 0,
                zIndex: 10,
            }}
            ref={(element) => boardCardDraggingContextValue.setBoardElement(element)}
        >
            <BoardCardDraggingContext.Provider
                value={boardCardDraggingContextValue}
            >
                {props.children}
            </BoardCardDraggingContext.Provider>
        </div>
    );
};

export default Board;
