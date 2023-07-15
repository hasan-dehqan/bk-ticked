import React from "react";
import styled from "../styles/style.module.css";

// ba 'filter' tamam sandalyhay bakhshe ['A'|'B'|'C'|'D'] joda mishawad wa dar 'sectionA' zakhire mishawad wa ba 'map' baraye har sandali yek dokme sakhte mishawad ke vazeiyate sandali wa range dokme ke taghyeer mikonad ra anjam midahad...

const SectionCAcceptable = ({ chairs, chairState }) => {
    const sectionC = chairs.filter((chair) => chair.section === "C");

    return (
        <div className={styled["accept-c"]}>
            {sectionC.map((chair) => (
                <button
                    key={chair.number}
                    name={chair.number}
                    value={chair.state}
                    title={chair.price}
                    onClick={chairState}
                >
                    {chair.number}
                </button>
            ))}
        </div>
    );
};

export default SectionCAcceptable;