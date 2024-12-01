import "./Simulation.css";
import { useEffect, useRef, useState } from "react";
import simulate, { createRandomState } from "../../game";
import { GENERATION_COLORS, RULE_MS, SIMULATION_DIM } from "../../config";

const initialState = createRandomState();

export default function Simulation({ rules }) {
    const [state, setState] = useState(initialState);
    const [currentRule, setCurrentRule] = useState(null);
    const canvasRef = useRef();

    useEffect(() => {
        if (!currentRule) return;

        const interval = setInterval(() => {
            setState(prevState => simulate(prevState, currentRule))
        }, 50);

        return () => clearInterval(interval);
    }, [currentRule, setState]);

    useEffect(() => {
        if (rules.length === 0) return;

        if (currentRule) {
            const interval = setInterval(() => {
                setCurrentRule(rules[Math.floor(Math.random() * rules.length)]);
            }, RULE_MS);
    
            return () => clearInterval(interval);
        } else {
            setCurrentRule(rules[Math.floor(Math.random() * rules.length)]);
        }
    }, [currentRule, rules]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        if (!canvas) return;

        context.clearRect(0, 0, SIMULATION_DIM, SIMULATION_DIM);

        for (let row = 0; row < SIMULATION_DIM; row++) {
            for (let col = 0; col < SIMULATION_DIM; col++) {
                context.fillStyle = GENERATION_COLORS[state[row][col]];
                context.fillRect(col, row, 1, 1);
            }
        }
    }, [state]);

    return (
        <div 
            className="Simulation-container"
            onClick={() => {
                setState(createRandomState())
            }}
        >
            <p className="Simulation-instructions">Click on the simulation below to restart it.</p>
            <canvas 
                ref={canvasRef}
                className="Simulation-canvas"
                height={SIMULATION_DIM}
                width={SIMULATION_DIM}
            />
        </div>
    )
}