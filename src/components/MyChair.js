import React, { useEffect, useReducer, useState } from "react";
import style from "../styles/style.module.css";
import swal from "sweetalert";
import SectionBNice from "./SectionBNice";
import SectionAPremium from "./SectionAPremium.js";
import SectionCAcceptable from "./SectionCAcceptable";
import SectionDWeak from "./SectionDWeak";
import ColorSelecttor from "./ColorSelector;.js";

import axios from "axios";

/////////////////////////
const initState = {
  chairs: [],
  showError: "",
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
    axios
      .get("./chairs.json")
      .then((response) => {
        dispatch({ type: "SET_CHAIRS", payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: "SET_ERROR", error: error.message });
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
        swal({
          title: "قبلاْ رزرو شده",
          text: "یک صندلی دیگر رزرو بکنید",
          icon: "warning",
          button: "Stage ورود به",
        });

        break;
      default:
        return false;
    }
  };

  return (
    <div className={style.content}>
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
      <div className="toggle_darkmode">
        <button className="active_darkmode" id="ligthModeBtn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
          >
            <path
              d="M9 4.90909C6.74182 4.90909 4.90909 6.74182 4.90909 9C4.90909 11.2582 6.74182 13.0909 9 13.0909C11.2582 13.0909 13.0909 11.2582 13.0909 9C13.0909 6.74182 11.2582 4.90909 9 4.90909ZM0.818182 9.81818H2.45455C2.90455 9.81818 3.27273 9.45 3.27273 9C3.27273 8.55 2.90455 8.18182 2.45455 8.18182H0.818182C0.368182 8.18182 0 8.55 0 9C0 9.45 0.368182 9.81818 0.818182 9.81818ZM15.5455 9.81818H17.1818C17.6318 9.81818 18 9.45 18 9C18 8.55 17.6318 8.18182 17.1818 8.18182H15.5455C15.0955 8.18182 14.7273 8.55 14.7273 9C14.7273 9.45 15.0955 9.81818 15.5455 9.81818ZM8.18182 0.818182V2.45455C8.18182 2.90455 8.55 3.27273 9 3.27273C9.45 3.27273 9.81818 2.90455 9.81818 2.45455V0.818182C9.81818 0.368182 9.45 0 9 0C8.55 0 8.18182 0.368182 8.18182 0.818182ZM8.18182 15.5455V17.1818C8.18182 17.6318 8.55 18 9 18C9.45 18 9.81818 17.6318 9.81818 17.1818V15.5455C9.81818 15.0955 9.45 14.7273 9 14.7273C8.55 14.7273 8.18182 15.0955 8.18182 15.5455ZM4.08273 2.92909C4.00703 2.85324 3.91713 2.79307 3.81815 2.75201C3.71917 2.71095 3.61307 2.68982 3.50591 2.68982C3.39875 2.68982 3.29265 2.71095 3.19367 2.75201C3.09469 2.79307 3.00478 2.85324 2.92909 2.92909C2.85324 3.00478 2.79307 3.09469 2.75201 3.19367C2.71095 3.29265 2.68982 3.39875 2.68982 3.50591C2.68982 3.61307 2.71095 3.71917 2.75201 3.81815C2.79307 3.91713 2.85324 4.00703 2.92909 4.08273L3.79636 4.95C4.11545 5.26909 4.63909 5.26909 4.95 4.95C5.26091 4.63091 5.26909 4.10727 4.95 3.79636L4.08273 2.92909ZM14.2036 13.05C14.1279 12.9742 14.038 12.914 13.9391 12.8729C13.8401 12.8319 13.734 12.8107 13.6268 12.8107C13.5197 12.8107 13.4136 12.8319 13.3146 12.8729C13.2156 12.914 13.1257 12.9742 13.05 13.05C12.9742 13.1257 12.914 13.2156 12.8729 13.3146C12.8319 13.4136 12.8107 13.5197 12.8107 13.6268C12.8107 13.734 12.8319 13.8401 12.8729 13.9391C12.914 14.038 12.9742 14.1279 13.05 14.2036L13.9173 15.0709C14.2364 15.39 14.76 15.39 15.0709 15.0709C15.1468 14.9952 15.2069 14.9053 15.248 14.8063C15.289 14.7074 15.3102 14.6012 15.3102 14.4941C15.3102 14.3869 15.289 14.2808 15.248 14.1819C15.2069 14.0829 15.1468 13.993 15.0709 13.9173L14.2036 13.05ZM15.0709 4.08273C15.1468 4.00703 15.2069 3.91713 15.248 3.81815C15.289 3.71917 15.3102 3.61307 15.3102 3.50591C15.3102 3.39875 15.289 3.29265 15.248 3.19367C15.2069 3.09469 15.1468 3.00478 15.0709 2.92909C14.9952 2.85324 14.9053 2.79307 14.8063 2.75201C14.7074 2.71095 14.6012 2.68982 14.4941 2.68982C14.3869 2.68982 14.2808 2.71095 14.1819 2.75201C14.0829 2.79307 13.993 2.85324 13.9173 2.92909L13.05 3.79636C12.7309 4.11545 12.7309 4.63909 13.05 4.95C13.3691 5.26091 13.8927 5.26909 14.2036 4.95L15.0709 4.08273ZM4.95 14.2036C5.02585 14.1279 5.08602 14.038 5.12708 13.9391C5.16814 13.8401 5.18927 13.734 5.18927 13.6268C5.18927 13.5197 5.16814 13.4136 5.12708 13.3146C5.08602 13.2156 5.02585 13.1257 4.95 13.05C4.87431 12.9742 4.7844 12.914 4.68542 12.8729C4.58644 12.8319 4.48034 12.8107 4.37318 12.8107C4.26603 12.8107 4.15992 12.8319 4.06094 12.8729C3.96197 12.914 3.87206 12.9742 3.79636 13.05L2.92909 13.9173C2.61 14.2364 2.61 14.76 2.92909 15.0709C3.24818 15.3818 3.77182 15.39 4.08273 15.0709L4.95 14.2036Z"
              fill="#14161D"
            />
          </svg>
          <span>Light</span>
        </button>
        <button id="darkModeBtn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
          >
            <path
              d="M8 16C5.77778 16 3.88889 15.2222 2.33333 13.6667C0.777778 12.1111 0 10.2222 0 8C0 5.77778 0.777778 3.88889 2.33333 2.33333C3.88889 0.777778 5.77778 0 8 0C8.20741 0 8.41126 0.00740749 8.61156 0.0222223C8.81185 0.0370371 9.008 0.0592592 9.2 0.0888888C8.59259 0.518518 8.10726 1.07793 7.744 1.76711C7.38074 2.4563 7.19941 3.20059 7.2 4C7.2 5.33333 7.66667 6.46667 8.6 7.4C9.53333 8.33333 10.6667 8.8 12 8.8C12.8148 8.8 13.563 8.61837 14.2444 8.25511C14.9259 7.89185 15.4815 7.40681 15.9111 6.8C15.9407 6.99259 15.963 7.18874 15.9778 7.38844C15.9926 7.58815 16 7.792 16 8C16 10.2222 15.2222 12.1111 13.6667 13.6667C12.1111 15.2222 10.2222 16 8 16Z"
              fill="#8C77ED"
            />
          </svg>
          <span>Dark</span>
        </button>
      </div>
      <ColorSelecttor />
    </div>
  );
};

export default MyChair;
