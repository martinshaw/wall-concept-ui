/*
All Rights Reserved, (c) 2023 CodeAtlas LTD.

Author: Martin Shaw (developer@martinshaw.co)
File Name: index.tsx
Created:  2023-12-18T20:29:28.254Z
Modified: 2023-12-18T20:29:28.254Z

Description: description
*/

import { createContext, useState } from "react";

export type WallInterfaceDraggingContextValue = {
    currentlyDraggingCardId: string | null;
    setCurrentlyDraggingCardId: (cardId: string | null) => void;

    boardElement: HTMLDivElement | null;
    setBoardElement: (element: HTMLDivElement | null) => void;
};

const WallInterfaceDraggingContext = createContext<WallInterfaceDraggingContextValue>({
    currentlyDraggingCardId: null,
    setCurrentlyDraggingCardId: () => { },

    boardElement: null,
    setBoardElement: () => { },
});

const useWallInterfaceDraggingContextValue = (): WallInterfaceDraggingContextValue => {
    const [currentlyDraggingCardId, setCurrentlyDraggingCardId] = useState<
        string | null
    >(null);

    const [boardElement, setBoardElement] = useState<
        HTMLDivElement | null
    >(null);

    return {
        currentlyDraggingCardId,
        setCurrentlyDraggingCardId,

        boardElement: boardElement,
        setBoardElement: setBoardElement,
    };
};

export default WallInterfaceDraggingContext;
export { useWallInterfaceDraggingContextValue };
