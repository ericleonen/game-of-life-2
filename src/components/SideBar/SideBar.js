import { useState } from "react"
import "./SideBar.css"
import { GENERATION_COLORS } from "../../config";

export default function SideBar({ rules, setRules }) {
    const [newRule, setNewRule] = useState("");

    const handleChangeNewRule = (e) => {
        setNewRule(e.target.value);
    };

    const checkSubRule = (subRule) => {
        const possibleDigits = new Set("012345678".split(""));

        for (let i = 0; i < subRule.length; i++) {
            const char = subRule.charAt(i);

            if (possibleDigits.has(char)) {
                possibleDigits.delete(char);
            } else {
                return false;
            }
        }

        return true;
    };

    const handleAddNewRule = () => {
        const SBG = newRule.split("/");

        if (SBG.length === 3) {
            let [S, B, G] = SBG;
            G = +G;

            if (!checkSubRule(S)) {
                window.alert("The given S is invalid. S must be a string of distinct digits from 0-8.")
                return;
            } else if (!checkSubRule(B)) {
                window.alert("The given B is invalid. B must be a string of distinct digits from 0-8.")
                return
            } else if (isNaN(G) || G > GENERATION_COLORS.length || G < 2) {
                window.alert(`The given G is invalid. G must be an integer from 2-${GENERATION_COLORS.length}`);
            } else {
                setRules(prevRules => [newRule, ...prevRules]);
                setNewRule("");
                return;
            }
        }

        window.alert('New rules must include exactly two "/"s.');
    }

    return (
        <div className="SideBar-container">
            <h1 className="SideBar-title">Game of Life 2</h1>
            <p className="SideBar-description">This is a random cellular automaton simulation where the rules are encoded as "S/B/G". S is a string of digits from 0-8 describing how many neighbors must be "alive" for an "alive" cell to stay "alive". B is a string of digits from 0-8 describing how many neighbors must be "alive" for a "dead" cell to become "alive". G is an integer from 2-{GENERATION_COLORS.length} describing how many generations a cell goes through.</p>
            <p className="SideBar-description">For example, "23/3/2" means if an "alive" cell has 2 or 3 "alive" neighbors, it stays alive and if a "dead" cell has 3 "alive" neighbors it becomes "alive".</p>
            <p className="SideBar-description">One rule from the given rule set is randomly chosen for the simulation to follow for some time.</p>
            <div className="SideBar-input">
                <input 
                    placeholder="Enter new rule as S/B/G"
                    type="text"
                    value={newRule}
                    onChange={handleChangeNewRule}
                />
                <button onClick={handleAddNewRule}>Add rule</button>
            </div>
            <ol className="SideBar-rules">
                <p className="SideBar-rules-header">Rules</p>
                {
                    rules.map(rule => (
                        <li className="SideBar-rule">{rule}</li>
                    ))
                }
            </ol>
        </div>
    )
}