import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { useMap, useMyPresence, useOthers } from "./liveblocks";

const COLORS = ["#DC2626", "#D97706", "#059669", "#7C3AED", "#DB2777"];

function getRandomInt(max: any) {
  return Math.floor(Math.random() * max);
}

function getRandomColor() {
  return COLORS[getRandomInt(COLORS.length)];
}

function App() {
  const shapes = useMap("shapes");

  if (shapes == null) {
    return <div className="loading">Loading</div>;
  }

  return <Canvas shapes={shapes} />;
}

function Canvas({ shapes }: any) {
  const [{ selectedShape }, setPresence] = useMyPresence();
  const others = useOthers();
  const [isDragging, setIsDragging] = useState(false);

  const onShapePointerDown = (e: any, shapeId: any) => {
    e.stopPropagation();
    setPresence({ selectedShape: shapeId });
    setIsDragging(true);
  };

  const onCanvasPointerUp = (e: any) => {
    if (!isDragging) {
      setPresence({ selectedShape: null });
    }

    setIsDragging(false);
  };

  const onCanvasPointerMove = (e: any) => {
    e.preventDefault();

    if (isDragging) {
      const shape = shapes.get(selectedShape);
      if (shape) {
        shapes.set(selectedShape, {
          ...shape,
          x: e.clientX - 50,
          y: e.clientY - 50,
        });
      }
    }
  };

  const insertRectangle = () => {
    const shapeId = Date.now().toString();
    const rectangle = {
      x: getRandomInt(300),
      y: getRandomInt(300),
      fill: getRandomColor(),
    };
    shapes.set(shapeId, rectangle);
  };

  const deleteRectangle = () => {
    shapes.delete(selectedShape);
    setPresence({ selectedShape: null });
  };

  return (
    <>
      <div
        className="canvas"
        onPointerMove={onCanvasPointerMove}
        onPointerUp={onCanvasPointerUp}
      >
        {Array.from(shapes, ([shapeId, shape]) => {
          let selectionColor =
            selectedShape === shapeId
              ? "blue"
              : others
                  .toArray()
                  .some((user) => user.presence?.selectedShape === shapeId)
              ? "green"
              : undefined;
          return (
            <Rectangle
              key={shapeId}
              shape={shape}
              id={shapeId}
              onShapePointerDown={onShapePointerDown}
              selectionColor={selectionColor}
            />
          );
        })}
      </div>
      <div className="toolbar">
        <button onClick={insertRectangle}>Rectangle</button>
        <button onClick={deleteRectangle} disabled={selectedShape == null}>
          Delete
        </button>
      </div>
    </>
  );
}

const Rectangle = ({ shape, id, onShapePointerDown, selectionColor }: any) => {
  const { x, y, fill } = shape;

  return (
    <div
      onPointerDown={(e) => onShapePointerDown(e, id)}
      className="rectangle"
      style={{
        transform: `translate(${x}px, ${y}px)`,
        backgroundColor: fill ? fill : "#CCC",
        borderColor: selectionColor || "transparent",
      }}
    ></div>
  );
};

export default App;
