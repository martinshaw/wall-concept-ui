/*
All Rights Reserved, (c) 2023 CodeAtlas LTD.

Author: Martin Shaw (developer@martinshaw.co)
File Name: index.tsx
Created:  2023-12-18T20:07:29.076Z
Modified: 2023-12-18T20:07:29.076Z

Description: description
*/

import { MouseEventHandler, ReactNode, useCallback } from "react";
import WallInterfaceDraggingContext, {
    useWallInterfaceDraggingContextValue,
} from "../WallInterfaceDraggingContext";
import WallInterfaceFocusingContext, { useWallInterfaceFocusingContextValue } from "../WallInterfaceFocusingContext";

export type WallInterfaceBoardProps = {
    children: ReactNode;
};

const WallInterfaceBoard = (props: WallInterfaceBoardProps) => {
    const wallInterfaceFocusingContextValue = useWallInterfaceFocusingContextValue();
    const wallInterfaceDraggingContextValue = useWallInterfaceDraggingContextValue();

    const onClick = useCallback<MouseEventHandler<HTMLDivElement>>((event) => {
        event.preventDefault();
        event.stopPropagation();

        if (event.target !== event.currentTarget) return;
        
        wallInterfaceFocusingContextValue.clearCurrentlyFocusingCardIds();
    }, [wallInterfaceFocusingContextValue]);

    return (
        <div
            ref={(element) => wallInterfaceDraggingContextValue.setBoardElement(element)}
            className="wall-interface__board"
            onClick={onClick}
            style={{
                userSelect: "none",
                width: "100%",
                height: "100%",
                position: "absolute",
                overflow: "hidden",
                top: 0,
                left: 0,
                zIndex: 10,
                // backgroundImage: 'url("' + process.env.PUBLIC_URL + '/45degreee_fabric_result.jpg")',
                // backgroundImage: 'url("' + process.env.PUBLIC_URL + '/blizzard_result.jpg")',
                // backgroundImage: 'url("' + process.env.PUBLIC_URL + '/brillant_result.jpg")',
                // backgroundImage: 'url("' + process.env.PUBLIC_URL + '/cream_dust_result.jpg")',
                // backgroundImage: 'url("' + process.env.PUBLIC_URL + '/crossword.png")',
                // backgroundImage: 'url("' + process.env.PUBLIC_URL + '/dot-grid_result.jpg")',
                backgroundImage: 'url("' + process.env.PUBLIC_URL + '/subtle_dots_result.jpg")',
                backgroundRepeat: 'repeat',
            }}
        >
            <WallInterfaceFocusingContext.Provider value={wallInterfaceFocusingContextValue}>
                <WallInterfaceDraggingContext.Provider value={wallInterfaceDraggingContextValue}>
                    {props.children}
                </WallInterfaceDraggingContext.Provider>
            </WallInterfaceFocusingContext.Provider>
        </div>
    );
};

export default WallInterfaceBoard;

