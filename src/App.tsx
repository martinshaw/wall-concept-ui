import React from "react";
import "./App.css";
import WallInterfaceBoard from "./WallInterface/WallInterfaceBoard";
import WallInterfaceCard from "./WallInterface/WallInterfaceCard";

function App() {
    const createCardId = () => {
        return Math.random().toString(36).substr(2, 9);
    };

    return (
        <div className="App">
            <WallInterfaceBoard
            >
                <WallInterfaceCard
                    id={createCardId()}
                    initialPosition={{ x: 0, y: 0 }}
                    initialDimensions={{ w: 200, h: 200 }}
                    draggable={true}
                    dragCursorPosition="center"
                >
                    abcabc abcabc abcabc abcabc abcabc abcabc abcabc abcabc abcabc abcabc abcabc abcabc abcabc abcabc abcabc abcabc abcabc abcabc abcabc abcabc abcabc abcabc abcabc abcabc abcabc abcabc abcabc abcabc abcabc abcabc abcabc 
                </WallInterfaceCard>
                <WallInterfaceCard
                    id={createCardId()}
                    initialPosition={{ x: 300, y: 0 }}
                    initialDimensions={{ w: 200, h: 200 }}
                    draggable={true}
                    dragCursorPosition="mouse"
                >
                    def
                </WallInterfaceCard>
                <WallInterfaceCard
                    id={createCardId()}
                    initialPosition={{ x: 600, y: 0 }}
                    initialDimensions={{ w: 123, h: 321 }}
                    draggable={true}
                    dragCursorPosition="bottom-right"
                >
                    ghi
                </WallInterfaceCard>
            </WallInterfaceBoard>
        </div>
    );
}

export default App;
