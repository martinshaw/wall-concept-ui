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
            <WallInterfaceBoard>
                <WallInterfaceCard
                    id={createCardId()}
                    initialPosition={{ x: 0, y: 0 }}
                    initialDimensions={{ w: 200, h: 200 }}
                    draggable={true}
                    focusable={false}
                    scaleContent={true}
                >
                    ABCDEFGHJKLMNOPQRSTUVWXTZ ABCDEFGHJKLMNOPQRSTUVWXTZ ABCDEFGHJKLMNOPQRSTUVWXTZ ABCDEFGHJKLMNOPQRSTUVWXTZ ABCDEFGHJKLMNOPQRSTUVWXTZ ABCDEFGHJKLMNOPQRSTUVWXTZ ABCDEFGHJKLMNOPQRSTUVWXTZ ABCDEFGHJKLMNOPQRSTUVWXTZ ABCDEFGHJKLMNOPQRSTUVWXTZ ABCDEFGHJKLMNOPQRSTUVWXTZ ABCDEFGHJKLMNOPQRSTUVWXTZ ABCDEFGHJKLMNOPQRSTUVWXTZ ABCDEFGHJKLMNOPQRSTUVWXTZ ABCDEFGHJKLMNOPQRSTUVWXTZ ABCDEFGHJKLMNOPQRSTUVWXTZ ABCDEFGHJKLMNOPQRSTUVWXTZ ABCDEFGHJKLMNOPQRSTUVWXTZ ABCDEFGHJKLMNOPQRSTUVWXTZ 
                </WallInterfaceCard>
                <WallInterfaceCard
                    id={createCardId()}
                    initialPosition={{ x: 300, y: 0 }}
                    initialDimensions={{ w: 200, h: 200 }}
                    draggable={'after-focus'}
                >
                    defksad asjd sadjaksksda ajd askdads ajds kaskdamsdi si
                </WallInterfaceCard>
                <WallInterfaceCard
                    id={createCardId()}
                    initialPosition={{ x: 600, y: 0 }}
                    initialDimensions={{ w: 123, h: 321 }}
                    draggable={'after-focus'}
                >
                    ghi
                </WallInterfaceCard>
            </WallInterfaceBoard>
        </div>
    );
}

export default App;
