import React, { useState } from "react";

const numRows = 50;
const numCols = 50;

const Game = () => {
  const [grid, setGrid] = useState(() => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      //initializing sells as 0 because they're all gonna be dead by default
      rows.push(Array.from(Array(numCols), () => 0));
    }

    return rows;
  });

  console.log(grid);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${numCols}, 20px)`,
      }}
    >
      {grid.map((rows, rowIndex) =>
        rows.map((col, colIndex) => (
          <div
            key={`${rowIndex} - ${colIndex}`}
            style={{
              width: 20,
              height: 20,
              backgroundColor: grid[rowIndex][colIndex] ? "pink" : undefined,
              border: "solid 1px black",
            }}
          />
        ))
      )}
    </div>
  );
};

export default Game;
