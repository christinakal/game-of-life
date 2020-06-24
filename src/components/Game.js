import React, { useState, useCallback, useRef } from "react";
// immer help us to make immutable state for the grid
import produce from "immer";

const numRows = 50;
const numCols = 50;

// to avoid duplicated code
const operations = [
  [0, 1],
  [0, -1],
  [1, 1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0],
];

const Game = () => {
  // -- STATE

  const [grid, setGrid] = useState(() => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      //initializing sells as 0 because they're all gonna be dead by default
      rows.push(Array.from(Array(numCols), () => 0));
    }

    return rows;
  });
  // store in state if the simulation is currently running or not
  const [running, setRunning] = useState(false);

  //create a referece for running state. Because running will change while our funtion won't change on every render
  const runningRef = useRef(running);
  runningRef.current = running;

  // -- ALGORITHM

  //useCallback hook so the function doesn't run on every render
  const runSimulation = useCallback(() => {
    if (!running) {
      return;
    }
    // -- simulation
    // I need a double for loop, one to loop throught the rows and another to loop throught the columns
    setGrid((g) => {
      // produce creates anew grid and g is the current grid -> with setGrid we update the main grid
      return produce(g, (gridCopy) => {
        for (let i = 0; i < numRows; i++) {
          for (let j = 0; j < numCols; j++) {
            let neighboors = 0;
            operations.forEach(([x, , y]) => {
              const newI = i + x;
              const newJ = j + y;
              // make sure we stay within the boundaries
              if (newI >= 0 && newI < numRows && newJ >= 0 && newJ < numCols) {
                // if we have a live cell add 1 to the neighboors
                neighboors += g[newI][newJ];
              }
            });

            if (neighboors < 2 || neighboors > 3) {
              gridCopy[i][j] = 0;
            } else if (g[i][j] === 0 && neighboors === 3) {
              gridCopy[i][j] = 1;
            }
          }
        }
      });
    });

    setTimeout(runSimulation, 1000);
  }, []);

  return (
    <>
      <button
        onClick={() => {
          setRunning(!running);
        }}
      >
        {running ? "stop" : "start"}
      </button>
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
              onClick={() => {
                const newGrid = produce(grid, (gridCopy) => {
                  // click enables desables the pink color (sets the cell to be alive or dead)
                  gridCopy[rowIndex][colIndex] = grid[rowIndex][colIndex]
                    ? 0
                    : 1;
                });
                setGrid(newGrid);
              }}
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
    </>
  );
};

export default Game;
