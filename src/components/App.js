import React, { useState, useEffect } from "react";
import "../styles/App.css";
import LocationDetails from "./LocationDetails";
import ForecastSummaries from "./ForecastSummaries";
import ForecastDetails from "./ForecastDetails";
import getForecast from "../requests/getForecast";
import SearchForm from "./SearchForm";
import blueSkyCloudsImage from "../images/blue-sky-clouds-image.jpg";
import cloudsImage from "../images/clouds-image.jpg";
import rainImage from "../images/rain-image.jpg";
import sunImage from "../images/sun-image.jpg";

const App = () => {
  const [forecasts, setForecasts] = useState([]);
  const [location, setLocation] = useState({ city: "", country: "" });
  const [selectedDate, setSelectedDate] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    getForecast(
      searchText,
      setErrorMessage,
      setSelectedDate,
      setForecasts,
      setLocation
    );
  }, []);

  const selectedForecast = forecasts.find(
    (forecast) => forecast.date === selectedDate
  );

  // change background image based on weather

  let backgroundImage;

  if (selectedForecast) {
    switch (selectedForecast.description) {
      case "Clouds":
        backgroundImage = cloudsImage;
        break;
      case "Rain":
        backgroundImage = rainImage;
        break;
      case "Clear":
        backgroundImage = sunImage;
        break;
      default:
        backgroundImage = blueSkyCloudsImage;
    }
  } else {
    backgroundImage = blueSkyCloudsImage;
  }

  const handleCitySearch = () => {
    getForecast(
      searchText,
      setErrorMessage,
      setSelectedDate,
      setForecasts,
      setLocation
    );
  };

  const handleForecastSelect = (date) => setSelectedDate(date);

  return (
    <div
      className="weather-app"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <SearchForm
        searchText={searchText}
        setSearchText={setSearchText}
        onSubmit={handleCitySearch}
      />
      <LocationDetails
        city={location.city}
        country={location.country}
        errorMessage={errorMessage}
      />
      {!errorMessage && (
        <>
          {selectedForecast && <ForecastDetails forecast={selectedForecast} />}
        </>
      )}
      <ForecastSummaries
        forecasts={forecasts}
        onForecastSelect={handleForecastSelect}
      />
    </div>
  );
};

export default App;
