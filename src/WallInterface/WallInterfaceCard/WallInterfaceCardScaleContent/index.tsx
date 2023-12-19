/*
All Rights Reserved, (c) 2023 CodeAtlas LTD.

Author: Martin Shaw (developer@martinshaw.co)
File Name: index.tsx
Created:  2023-12-19T18:20:48.357Z
Modified: 2023-12-19T18:20:48.357Z

Description: description
*/

import { ReactNode, RefObject, useEffect, useRef, useState } from "react";
import { WallInterfaceCardProps } from "..";
import { DimensionsType, PositionType } from "../../utilities";

type WallInterfaceCardScaleContentPropsType = {
    cardProps: WallInterfaceCardProps;
    cardRef: RefObject<HTMLDivElement>;
    scaleContent: boolean;
    cardPosition: PositionType;
    cardDimensions: DimensionsType;
    children: ReactNode;
};

const WallInterfaceCardScaleContent = (props: WallInterfaceCardScaleContentPropsType) => {
    if (props.scaleContent === true) {
        console.warn('WallInterfaceCardScaleContent functionality is currently experimental and will not work as expected.');
        console.warn('I recommend that you remove use of the scaleContent prop from your WallInterfaceCard component.');
    }

    const realDimensions = useRef<DimensionsType>({w: 0, h: 0});
    const [zoomed, setZoomed] = useState<boolean>(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (props.scaleContent !== true) return;
        if (ref.current === null) return;

        let zoomFactor: number = 1;

        ref.current.style.width = `auto`;
        ref.current.style.height = `auto`;

        realDimensions.current.w = ref.current.offsetWidth;
        realDimensions.current.h = ref.current.offsetHeight;

        console.log('realDimensions', (realDimensions.current.h*zoomFactor), props.cardDimensions.h, props.cardProps.id);

        // while (realDimensions.current.w > props.cardDimensions.w && zoomFactor > 0) {
        while ((realDimensions.current.h*zoomFactor) > props.cardDimensions.h && zoomFactor > 0) {
            zoomFactor -= 0.05;
            ref.current.style.fontSize = `${zoomFactor*100}%`;
            // Tried to use transform scale but it doesn't fix line breaks and doesn't affect width
            // Tried to use zoom but SAME it doesn't reflow the text
            // TODO: Font size kinda works, but it will not work for complex content with images etc...
        }

        if (zoomFactor > 0 && zoomFactor < 1) {
            setZoomed(true);
        } else {
            setZoomed(false);

        }
         
        ref.current.style.width = `100%`;
        ref.current.style.height = `100%`;

    }, [props.scaleContent]);

    return props.scaleContent ? (
        <div
            ref={ref}
            style={{
                // width: '100%',
                // height: '100%',
                width: 'auto',
                height: 'auto',
                top: 0,
                left: 0,
                lineBreak: zoomed ? 'anywhere' : 'normal',
                fontSize: '200%'
            }}
        >
            {props.children}
        </div>
    ) : <div ref={ref}>
        {props.children}
    </div>;
};

export default WallInterfaceCardScaleContent;