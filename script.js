// Размеры игрового поля (можно изменить)
const rows = 10;
const cols = 10;


let grid = [];


function createGrid() {
    const gameContainer = document.getElementById('game-container');
    gameContainer.innerHTML = '';
    grid = [];
    for (let i = 0; i < rows; i++) {
        let row = [];
        for (let j = 0; j < cols; j++) {
            let cell = document.createElement('div');
            cell.className = 'cell';
            cell.setAttribute('data-row', i);
            cell.setAttribute('data-col', j);
            cell.addEventListener('click', toggleCellState);
            gameContainer.appendChild(cell);
            row.push(0);
        }
        grid.push(row);
    }
}


function generateInitialConfig() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            grid[i][j] = Math.random() < 0.5 ? 1 : 0;
        }
    }
}


function toggleCellState(event) {
    const row = parseInt(event.target.getAttribute('data-row'));
    const col = parseInt(event.target.getAttribute('data-col'));
    grid[row][col] = grid[row][col] === 0 ? 1 : 0;
    event.target.classList.toggle('alive');
}


function updateGame() {
    let newGrid = [];
    for (let i = 0; i < rows; i++) {
        let newRow = [];
        for (let j = 0; j < cols; j++) {
            const neighbors = countNeighbors(i, j);
           
            if (grid[i][j] === 1) {
                if (neighbors < 2 || neighbors > 3) {
                    newRow.push(0); 
                } else {
                    newRow.push(1); 
                }
            } else {
                if (neighbors === 3) {
                    newRow.push(1); 
                } else {
                    newRow.push(0); 
                }
            }
        }
        newGrid.push(newRow);
    }
    grid = newGrid;
    renderGrid();
}

// Функция для подсчета числа живых соседей для клетки с координатами (x, y)
function countNeighbors(x, y) {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            const neighborX = (x + i + rows) % rows;
            const neighborY = (y + j + cols) % cols;
            count += grid[neighborX][neighborY];
        }
    }
    count -= grid[x][y]; 
    return count;
}


function renderGrid() {
    const gameContainer = document.getElementById('game-container');
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const cell = gameContainer.querySelector(`[data-row="${i}"][data-col="${j}"]`);
            if (grid[i][j] === 1) {
                cell.classList.add('alive');
            } else {
                cell.classList.remove('alive');
            }
        }
    }
}


document.addEventListener('DOMContentLoaded', function() {
    createGrid();
    generateInitialConfig();
    updateGame();
});
