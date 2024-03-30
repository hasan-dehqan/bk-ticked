import React, { useReducer, useEffect } from "react";
import style from "../styles/style.module.css";
import axios from "axios";

const initialState = {
  seats: [],
  showError: "",
  selectedSeats: [],
  totalCost: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_SEATS":
      return { ...state, seats: action.payload };
    case "SELECT_SEAT":
      const selectedSeats = state.selectedSeats.includes(action.payload)
        ? state.selectedSeats.filter((seat) => seat !== action.payload)
        : [...state.selectedSeats, action.payload];
      return { ...state, selectedSeats };
    case "CALCULATE_COST":
      const totalCost = state.selectedSeats.reduce((total, seat) => {
        const selectedSeat = state.seats.find((s) => s.number === seat);
        return total + selectedSeat.price;
      }, 0);
      return { ...state, totalCost };
    default:
      return state;
  }
};

const ConcertBookingPage = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    axios
      .get("seats.json")
      .then((response) => {
        dispatch({ type: "SET_SEATS", payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: "SET_ERROR", error: error.message });
      });
  }, []);

  const handleSeatClick = (seatNumber) => {
    dispatch({ type: "SELECT_SEAT", payload: seatNumber });
    dispatch({ type: "CALCULATE_COST" });
  };

  return (
    <div className={style.content}>
      <div className={style.header}>
        <h1>Stage</h1>
      </div>
      {/* <h1>Concert Booking</h1> */}
      <div className={style.items}>
        <p>Selected Seats: {state.selectedSeats.join(", ")}</p>
        <p>Total Cost: ${state.totalCost}</p>
      </div>
      <div>
        {state.seats.map((seat) => (
          <div
            key={seat.number}
            onClick={() => handleSeatClick(seat.number)}
            style={{
              backgroundColor: state.selectedSeats.includes(seat.number)
                ? "green"
                : "gray",
            }}
          >
            Seat {seat.number} - ${seat.price}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConcertBookingPage;
