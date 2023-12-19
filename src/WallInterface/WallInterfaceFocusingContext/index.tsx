/*
All Rights Reserved, (c) 2023 CodeAtlas LTD.

Author: Martin Shaw (developer@martinshaw.co)
File Name: index.tsx
Created:  2023-12-18T20:29:28.254Z
Modified: 2023-12-18T20:29:28.254Z

Description: description
*/

import { createContext, useCallback, useState } from "react";

export type WallInterfaceFocusingContextValue = {
    currentlyFocusingCardIds: string[];
    setCurrentlyFocusingCardIds: (cardIds: string[]) => void;
    clearCurrentlyFocusingCardIds: () => void;
    addCurrentlyFocusingCardId: (cardId: string) => void;
    removeCurrentlyFocusingCardId: (cardId: string) => void;
    hasCurrentlyFocusingCardId: (cardId: string) => boolean;
};

const WallInterfaceFocusingContext = createContext<WallInterfaceFocusingContextValue>({
    currentlyFocusingCardIds: [],
    setCurrentlyFocusingCardIds: () => { },
    clearCurrentlyFocusingCardIds: () => { },
    addCurrentlyFocusingCardId: () => { },
    removeCurrentlyFocusingCardId: () => { },
    hasCurrentlyFocusingCardId: () => false,
});

const useWallInterfaceFocusingContextValue = (): WallInterfaceFocusingContextValue => {
    const [currentlyFocusingCardIds, setCurrentlyFocusingCardIds] = useState<
        string[]
    >([]);

    const clearCurrentlyFocusingCardIds = useCallback(() => {
        setCurrentlyFocusingCardIds([]);
    }, []);

    const addCurrentlyFocusingCardId = useCallback((cardId: string) => {
        setCurrentlyFocusingCardIds((prev) => [...prev, cardId]);
    }, []);

    const removeCurrentlyFocusingCardId = useCallback((cardId: string) => {
        setCurrentlyFocusingCardIds((prev) => prev.filter((id) => id !== cardId));
    }, []);

    const hasCurrentlyFocusingCardId = useCallback((cardId: string) => {
        return currentlyFocusingCardIds.includes(cardId);
    }, [currentlyFocusingCardIds]);

    return {
        currentlyFocusingCardIds,
        setCurrentlyFocusingCardIds,
        clearCurrentlyFocusingCardIds,
        addCurrentlyFocusingCardId,
        removeCurrentlyFocusingCardId,
        hasCurrentlyFocusingCardId,
    };
};

export default WallInterfaceFocusingContext;
export { useWallInterfaceFocusingContextValue };
