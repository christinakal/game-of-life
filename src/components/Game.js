// initialize grid
let numRows = 25;
let numColumns = 25;

// Create grid
const resetGrid = () => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
        rows.push(Array.from(Array(numColumns), () => 0))
    }
    return rows;
}


return (
    <div></div>
)