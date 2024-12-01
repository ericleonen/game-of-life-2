import { SIMULATION_DIM } from "../config";

/**
 * Accepts state, a 2D binary matrix, and rules, a list of "S/B/G" encoded rules, and returns the
 * next state according to the given rule.
 */
export default function simulate(state, rule) {
    const newState = createEmptyState(0);

    for (let row = 0; row < SIMULATION_DIM; row++) {
        for (let col = 0; col < SIMULATION_DIM; col++) {

            let [S, B, G] = rule.split("/");

            const aliveNeighborsCount = countAliveNeighbors(state, row, col);

            if (state[row][col] === 0) { // cell is currently dead
                if (B.indexOf(aliveNeighborsCount + "") !== -1) {
                    newState[row][col] = 1;
                    continue;
                } else {
                    continue;
                }
            } else if (state[row][col] === 1) { // cell is currently alive
                if (S.indexOf(aliveNeighborsCount + "") !== -1) {
                    newState[row][col] = 1;
                    continue;
                }
            }

            newState[row][col] = (state[row][col] + 1) % G;
        }
    }

    return newState;
}

/**
 * Returns a SIMULATION_DIM by SIMULATION_DIM matrix filled with the given fill value.
 */
export function createEmptyState(fill) {
    const state = [];

    for (let row = 0; row < SIMULATION_DIM; row++) {
        state.push([]);
        for (let col = 0; col < SIMULATION_DIM; col++) {
            state[row].push(fill);
        }
    }

    return state;
}

export function createRandomState() {
    const state = [];

    for (let row = 0; row < SIMULATION_DIM; row++) {
        state.push([]);
        for (let col = 0; col < SIMULATION_DIM; col++) {
            state[row].push(Math.floor(Math.random() * 2));
        }
    }

    return state;
}

export function countAliveNeighbors(state, row, col) {
    let aliveCount = 0;

    for (let r = row - 1; r <= row + 1; r++) {
        for (let c = col - 1; c <= col + 1; c++) {
            if (r === row && c === col) continue;

            let fixedR = (r + SIMULATION_DIM) % SIMULATION_DIM;
            let fixedC = (c + SIMULATION_DIM) % SIMULATION_DIM;

            if (state[fixedR][fixedC] === 1) aliveCount++;
        }
    }

    return aliveCount;
}