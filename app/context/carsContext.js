"use client";

import { useSearchParams } from "next/navigation";
import React, { createContext, useContext, useEffect, useReducer } from "react";

const CarContext = createContext();

const initialState = {
  cars: [],
  error: false,
  errorMessage: "",
  filter: {},
  isLoading: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "uploadCars":
      return {
        ...state,
        cars: action.payload,
        isLoading: false,
      };
    case "error":
      return {
        ...state,
        error: true,
        errorMessage: action.payload,
        isLoading: false,
      };
    case "uploadFilter":
      return {
        ...state,
        filter: action.payload,
      };
    case "loading":
      return {
        ...state,
        isLoading: true,
      };

    case "carSearch":
      return {
        ...state,
        cars: action.payload,
        isLoading: false,
      };

    default:
      return state;
  }
}

function CarProvider({ children }) {
  const [{ cars, error, errorMessage, isLoading, filter }, dispatch] =
    useReducer(reducer, initialState);

  const params = useSearchParams();

  useEffect(() => {
    const fetchCars = async () => {
      dispatch({ type: "loading" });

      try {
        const response = await fetch(
          `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=audi&model=q5&limit=7`,
          {
            method: "GET",
            headers: {
              "X-RapidAPI-Key":
                "KJwZZIJSFimshuivMSVGaiYzkRomp15f2vKjsnK4bKzuUzVLzA",
              "X-RapidAPI-Host": "cars-by-api-ninjas.p.rapidapi.com",
            },
          }
        );

        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();
        dispatch({ type: "uploadCars", payload: data });
      } catch (error) {
        console.error("Error fetching cars:", error);
        dispatch({
          type: "error",
          payload: "Something went wrong while trying to upload cars :(",
        });
      }
    };

    fetchCars();
  }, []);

  useEffect(() => {
    const filter = {
      car: params.get("car"),
      model: params.get("model"),
      fuel: params.get("fuel"),
      year: params.get("year"),
      limit: params.get("limit"),
    };

    dispatch({ type: "uploadFilter", payload: filter });
  }, [params]);

  const carSearch = async (make, model, limit = "7") => {
    dispatch({ type: "loading" });

    try {
      const response = await fetch(
        `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${make}&model=${model}&limit=${limit}`,
        {
          method: "GET",
          headers: {
            "X-RapidAPI-Key":
              "KJwZZIJSFimshuivMSVGaiYzkRomp15f2vKjsnK4bKzuUzVLzA",
            "X-RapidAPI-Host": "cars-by-api-ninjas.p.rapidapi.com",
          },
        }
      );

      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      dispatch({ type: "carSearch", payload: data });
    } catch (error) {
      console.error("Error fetching specific car:", error);
      dispatch({
        type: "error",
        payload: "Something went wrong while trying to fetch the car :(",
      });
    }
  };

  return (
    <CarContext.Provider
      value={{
        cars,
        error,
        errorMessage,
        isLoading,
        filter,
        carSearch,
      }}
    >
      {children}
    </CarContext.Provider>
  );
}

function useCars() {
  const context = useContext(CarContext);
  if (!context) {
    alert("You try to use context in an invalid location");
  }
  return context;
}

export { useCars, CarProvider };
