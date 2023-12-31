/*
All Rights Reserved, (c) 2023 CodeAtlas LTD.

Author: Martin Shaw (developer@martinshaw.co)
File Name: useWallInterfaceCardFocusing.ts
Created:  2023-12-19T17:23:23.846Z
Modified: 2023-12-19T17:23:23.846Z

Description: description
*/

import { MouseEventHandler, RefObject, useCallback, useContext } from "react";
import { WallInterfaceCardPropsType } from ".";
import WallInterfaceFocusingContext from "../WallInterfaceFocusingContext";

type useWallInterfaceCardFocusingPropsType = {
    cardProps: WallInterfaceCardPropsType;
    cardRef: RefObject<HTMLDivElement>;
}

const useWallInterfaceCardFocusing = (props: useWallInterfaceCardFocusingPropsType) => {
    const focusingContext = useContext(WallInterfaceFocusingContext);

    const focusing = focusingContext.hasCurrentlyFocusingCardId(props.cardProps.id);

    const handleFocusingOnClick = useCallback<MouseEventHandler<HTMLDivElement>>((event) => {
        if (event.button !== 0) return;
        if (props.cardRef.current == null) return;

        if (props.cardProps.focusable !== true) return;

        focusingContext.clearCurrentlyFocusingCardIds();
        focusingContext.addCurrentlyFocusingCardId(props.cardProps.id);
    }, [props.cardRef, props.cardProps.id, props.cardProps.focusable, focusingContext]);

    return {
        focusing,
        handleFocusingOnClick,
    };
};

export default useWallInterfaceCardFocusing;