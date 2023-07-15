import React, { useEffect, useReducer, useState } from "react";
import style from "../styles/style.module.css"
import SectionBNice from "./SectionBNice";
import SectionAPremium from "./SectionAPremium.js";
import SectionCAcceptable from "./SectionCAcceptable";
import SectionDWeak from "./SectionDWeak";
import axios from "axios";

/////////////////////////
const initState = {
    chairs: [],
    showError: ""
};

const reducer = function (state, action) {
    switch (action.type) {
        case "SET_CHAIRS":
            return { ...state, chairs: action.payload };
        case "SET_ERROR":
            return { ...state, showError: action.payload };
        default:
            return state;
    }
};

const MyChair = () => {
    const [count, setCount] = useState(0);
    const [price, setPrice] = useState(0);
    const [data, dispatch] = useReducer(reducer, initState);

    useEffect(() => {
        axios.get("./chairs.json")
            .then((response) => {
                dispatch(
                    { type: "SET_CHAIRS", payload: response.data }
                );
            })
            .catch((error) => {
                dispatch(
                    { type: "SET_ERROR", error: error.message }
                );
            });
    }, []);

    const chairState = (event) => {
        const value = event.target.value;
        const price = event.target.title;
        const button = event.target;

        // ba estefade az 'switch case' baraye har 'value' yek kary tarif shode ke 'value' ba har 'case' motabeghat dasht haman anjam mishawad.
        switch (value) {
            case "unselected":
                button.value = "selected";
                button.style.backgroundColor = "green";
                button.style.color = "white";
                break;
            case "selected":
                button.value = "reserve";
                button.style.backgroundColor = "orange";
                break;
            case "reserve":
                button.value = "chosen";
                button.style.backgroundColor = "red";
                setCount((prevCount) => prevCount + 1);
                setPrice((prevPrice) => parseInt(prevPrice) + parseInt(price));
                break;
            case "chosen":
                alert("قبلا رزرو شده");
                break;
            default:
                return false;
        }
    }

    return (
        <div className={style.wrapper}>
            <div className={style.header}>
                <h1>Stage</h1>
            </div>
            <div className={style.items}>
                <h3>Count: {count}</h3>
                <h3>Sum: {price}</h3>
            </div>
            {data.chairs.length > 0 ? (
                <div className={style["section"]}>
                    <SectionBNice chairs={data.chairs} chairState={chairState} />
                    <SectionAPremium chairs={data.chairs} chairState={chairState} />
                    <SectionCAcceptable chairs={data.chairs} chairState={chairState} />
                    <SectionDWeak chairs={data.chairs} chairState={chairState} />
                </div>
            ) : (
                <h2>{data.showError}</h2>
            )}
            wrapper        </div>
    );
};

export default MyChair;