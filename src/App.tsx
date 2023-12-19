import React from "react";
import "./App.css";
import Board from "./Board";
import Card from "./Card";

function App() {
    const createCardId = () => {
        return Math.random().toString(36).substr(2, 9);
    };

    return (
        <div className="App">
            <Board>
                <Card
                    id={createCardId()}
                    initialPosition={{ x: 0, y: 0 }}
                    initialDimensions={{ w: 200, h: 200 }}
                >
                    abc
                </Card>
                <Card
                    id={createCardId()}
                    initialPosition={{ x: 300, y: 0 }}
                    initialDimensions={{ w: 200, h: 200 }}
                >
                    def
                </Card>
                <Card
                    id={createCardId()}
                    initialPosition={{ x: 600, y: 0 }}
                    initialDimensions={{ w: 200, h: 200 }}
                >
                    ghi
                </Card>
            </Board>
        </div>
    );
}

export default App;
