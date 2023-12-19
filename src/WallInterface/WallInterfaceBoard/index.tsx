/*
All Rights Reserved, (c) 2023 CodeAtlas LTD.

Author: Martin Shaw (developer@martinshaw.co)
File Name: index.tsx
Created:  2023-12-18T20:07:29.076Z
Modified: 2023-12-18T20:07:29.076Z

Description: description
*/

import { ReactNode } from "react";
import WallInterfaceDraggingContext, {
    useWallInterfaceDraggingContextValue,
} from "../WallInterfaceDraggingContext";

export type WallInterfaceBoardProps = {
    children: ReactNode;
};

const WallInterfaceBoard = (props: WallInterfaceBoardProps) => {
    const wallInterfaceDraggingContextValue = useWallInterfaceDraggingContextValue();

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
            ref={(element) => wallInterfaceDraggingContextValue.setBoardElement(element)}
        >
            <WallInterfaceDraggingContext.Provider
                value={wallInterfaceDraggingContextValue}
            >
                {props.children}
            </WallInterfaceDraggingContext.Provider>
        </div>
    );
};

export default WallInterfaceBoard;

