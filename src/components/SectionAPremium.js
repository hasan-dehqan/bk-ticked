import React from "react";
import styled from "../styles/style.module.css";

// az tabeye 'filter' baray filter kardan sandalyhaye ghesmate ['A'|'B'|'C'|'D'] nemayesh dadam, wa ba 'map' anha ra be onwan eleman haye dokme nemayesh dadam.

const SectionAPremium = ({ chairs, chairState }) => {
    const sectionA = chairs.filter((chair) => chair.section === "A");

    return (
        <div className={styled["premium-a"]}>
            {sectionA.map((chair) => (
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

export default SectionAPremium;