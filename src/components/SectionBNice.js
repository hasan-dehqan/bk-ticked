import React from "react";
import styled from "../styles/style.module.css";

const SectionBNice = ({ chairs, chairState }) => {
    const sectionB = chairs.filter((chair) => chair.section === "B");

    return (
        <div className={styled["nice-b"]}>
            {sectionB.map((chair) => (
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

export default SectionBNice;