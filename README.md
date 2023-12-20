# React Wall Interface

## Drag-and-Drop "Post-It Notes on a Wall" User Interface Library 

### Introduction
I need to create a user interface for a project I am working on which allows the user to drag-and-drop "post-it notes" around a wall. I couldn't find a library which did exactly what I wanted, so I created this one.

### Notice
This is a great library which I have created for my own personal use as part of a larger product. While I will continue to develop new features and to fix bugs, I cannot guarantee that this library will be maintained in the long term and I am not able to provide support for your use of the library. I am making it available to the public in the hope that it will be useful to others, but I cannot guarantee that it will be useful to you. If you have any questions, please feel free to contact me at [developer@martinshaw.co](mailto:hello@martinshaw.co)

### Usage
To use the library, you need to include the following package:
```typescript
import { WallInterfaceCard as Card, WallInterfaceBoard as Board } from 'react-wall-interface';

const Wall = () => {
    const createCardId = () => (new Date()).getTime().toString() + '_' + Math.random().toString(36).substr(2, 9);

    return (
        <div className="App">
            <Board>
            
                <Card
                    id={createCardId()}
                    initialPosition={{ x: 0, y: 0 }}
                    initialDimensions={{ w: 200, h: 200 }}
                    draggable={true}
                    focusable={false}
                >
                    Draggable, not focusable
                </Card>
                
                <Card
                    id={createCardId()}
                    initialPosition={{ x: 0, y: 200 }}
                    initialDimensions={{ w: 200, h: 200 }}
                    draggable={false}
                    focusable={true}
                >
                    Not draggable, focusable
                </Card>

                <Card
                    id={createCardId()}
                    initialPosition={{ x: 0, y: 400 }}
                    initialDimensions={{ w: 200, h: 200 }}
                    draggable={true}
                    focusable={true}
                >
                    Draggable, focusable
                </Card>

                <Card
                    id={createCardId()}
                    initialPosition={{ x: 200, y: 0 }}
                    initialDimensions={{ w: 200, h: 200 }}
                    draggable={'after-focus'}
                    focusable={true}
                >
                    Draggable only after focus, focusable    
                </Card>
                
            </Board>
        </div>
}

export default Wall;
```