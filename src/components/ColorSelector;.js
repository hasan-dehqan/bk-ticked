import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  direction: rtl;
  width: 520px;
  display: flex;
  justify-content: center;
  margin: -14px auto;
  input {
    transform: scale(2.2);
    margin-left: 10px;
  }
  label {
    font-size: 16px;
  }
`;

const ColorDiv = styled.div`
  border: 3px solid yellow;
  border-radius: 5px;
  padding: 10px;
  width: 120px;
  color: #fff;
`;

const colors = ["gray", "green", "orange", "red"];
const colorLabels = ["آزاد", "منتظر پرداخت", "خریداری شده", "خرید شما"];

const ColorSelector = () => {
  const [currentColorIndex, setCurrentColorIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleColorChange = (index) => {
    setCurrentColorIndex(index);
  };

  return (
    <Container>
      {colors.map((color, index) => (
        <ColorDiv key={color} style={{ backgroundColor: color }}>
          <input
            type="radio"
            name="color"
            id={color}
            checked={index === currentColorIndex}
            onChange={() => handleColorChange(index)}
          />
          <label htmlFor={color}>{colorLabels[index]}</label>
        </ColorDiv>
      ))}
    </Container>
  );
};

export default ColorSelector;
