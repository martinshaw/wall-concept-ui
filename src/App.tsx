import React from "react";
import "./App.css";
import WallInterfaceBoard from "./WallInterface/WallInterfaceBoard";
import WallInterfaceCard from "./WallInterface/WallInterfaceCard";

function App() {
    const createCardId = () => (new Date()).getTime().toString() + '_' + Math.random().toString(36).substr(2, 9);

    return (
        <div className="App">
            <WallInterfaceBoard>
                <WallInterfaceCard
                    id={createCardId()}
                    initialPosition={{ x: 0, y: 0 }}
                    initialDimensions={{ w: 200, h: 200 }}
                    draggable={true}
                    focusable={false}
                >
                    Draggable, not focusable
                </WallInterfaceCard>
                <WallInterfaceCard
                    id={createCardId()}
                    initialPosition={{ x: 0, y: 200 }}
                    initialDimensions={{ w: 200, h: 200 }}
                    draggable={false}
                    focusable={true}
                >
                    Not draggable, focusable
                </WallInterfaceCard>

                <WallInterfaceCard
                    id={createCardId()}
                    initialPosition={{ x: 0, y: 400 }}
                    initialDimensions={{ w: 200, h: 200 }}
                    draggable={true}
                    focusable={true}
                    resizable={{
                        "top-left": true,
                    }}
                >
                    Draggable, focusable
                </WallInterfaceCard>

                <WallInterfaceCard
                    id={createCardId()}
                    initialPosition={{ x: 200, y: 0 }}
                    initialDimensions={{ w: 200, h: 200 }}
                    draggable={'after-focus'}
                    focusable={true}
                >
                    Draggable after focus, focusable    
                </WallInterfaceCard>
            </WallInterfaceBoard>
        </div>
    );
}

export default App;
