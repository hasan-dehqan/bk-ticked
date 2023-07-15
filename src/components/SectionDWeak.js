import React from "react";
import styled from "../styles/style.module.css";

const SectionDWeak = ({ chairs, chairState }) => {
    const sectionD = chairs.filter((chair) => chair.section === "D");

    return (
        <div className={styled["weak-d"]}>
            {sectionD.map((chair) => (
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

export default SectionDWeak;