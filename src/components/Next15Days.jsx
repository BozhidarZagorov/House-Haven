import { useState } from "react";
import { useAuth } from '/public/ctx/FirebaseAuth'
import { useNavigate } from "react-router"

const weatherIcons = {
  'partly-cloudy-day': "☁️",
  cloudy: "☁️",
  rain: "🌧️",
  snow: "❄️",
  sunny: "☀️",
  thunder: "⛈️",
  "clear-day": "☀️"
};

export default function Next15Days() {

  const [city, setCity] = useState("");
  const [weather, setWeather] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [lastCity, setLastCity] = useState("");
  const [selectedDay, setSelectedDay] = useState(null);

  const { user, isAuthenticated } = useAuth(); //! auth ctx

  const navigate = useNavigate();

  const fetchWeather = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return alert('You must be logged in to check weather forecast.');
  }
    if (!city || city === lastCity) return;
    setLoading(true);
    setError();
    setLastCity(city);

    try {
      const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&elements=datetime%2CdatetimeEpoch%2Cname%2Ctempmax%2Ctempmin%2Ctemp%2Chumidity%2Csnow%2Cwindspeed%2Cwindspeedmax%2Cwindspeedmin%2Cwinddir%2Cpressure%2Cuvindex%2Csunrise%2Csunset%2Cconditions%2Cdescription%2Cicon&include=days%2Chours%2Calerts%2Ccurrent&key=LQCFA6SWM9Q5TPK4T79HSX2U7&contentType=json`);
      if (!response.ok) throw new Error("City not found");

      const data = await response.json();
      setWeather(data.days);
      console.log(data.days);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4 rounded-md shadow-md border-2 bg-gray-800 text-center"
      style={{
        background: `linear-gradient(135deg,rgb(93, 138, 227) 25%,rgb(227, 155, 79) 75%)`,
      }}
      >🌙 15-Days Weather Forecast 🌤</h1>

      <div className="flex space-x-4 justify-center">
        <input
          type="text"
          className="p-2 text-white rounded-md outline-none border-2 border-gray-800"
          placeholder="Enter city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && fetchWeather()}
        />
        <button
          className="btn-orange"
          onClick={fetchWeather}
        >
          Get Weather
        </button>
      </div>
      {loading ? 
        <span className="flex justify-center mt-5">
          <svg className="spinner"></svg>
        </span> 
      : null }

      {/* {loading && <div className="flex justify-center items-center spinner mt-5 h-32"></div>} */}
      {error && <p className="mt-4 text-red-500 text-center">{error}</p>}

      {weather && (
        <div className="w-full flex justify-center">
          {selectedDay === null ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4">
          {weather.map((day, index) => (

            <div key={index} className="p-3 rounded-lg shadow-md text-center border border-gray-700 bg-gray-900 text-white">
              <h2 className="text-lg font-semibold">{day.datetime}</h2>
              <p className="text-sm">{day.conditions}</p>
              {/* <img src={`${day.icon}.png`} alt="Weather Icon" className="mx-auto w-10 h-10"/> */}
              <span className="mx-auto w-10 h-10">
              {weatherIcons[day.icon] || "❓"} {/* Fallback icon */}
              </span>
              <p className="text-sm">🌡 {day.temp}°C</p>
              <p className="text-xs">💦 Humidity: {day.humidity}%</p>
              <p className="text-xs">💨 Wind: {day.windspeed} m/s</p>
              <p className="text-xs">🌅 Sunrise: {day.sunrise}</p>
              <p className="text-xs">🌇 Sunset: {day.sunset}</p>

              {/* Details Button */}
              <button
                className="btn-orange mt-2"
                onClick={() => setSelectedDay(selectedDay === index ? null : index)}
              >
                {selectedDay === index ? "Hide Details" : "Show Details"}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-4 flex flex-col items-center">
          <div className="p-3 rounded-lg shadow-md text-center border border-gray-700 bg-gray-900 text-white w-80">
            <h2 className="text-lg font-semibold">{weather[selectedDay].datetime}</h2>
            <p className="text-sm">{weather[selectedDay].conditions}</p>
            {/* <img src={`${weather[selectedDay].icon}.png`} alt="Weather Icon" className="mx-auto w-10 h-10" /> */}
            <span className="mx-auto w-10 h-10">
            {weatherIcons[weather[selectedDay].icon] || "❓"} {/* Fallback icon */}
            </span>
            <p className="text-sm">🌡 {weather[selectedDay].temp}°C</p>
            <p className="text-xs">💦 Humidity: {weather[selectedDay].humidity}%</p>
            <p className="text-xs">💨 Wind: {weather[selectedDay].windspeed} m/s</p>
            <p className="text-xs">🌅 Sunrise: {weather[selectedDay].sunrise}</p>
            <p className="text-xs">🌇 Sunset: {weather[selectedDay].sunset}</p>

              <button className="btn-orange mt-2" onClick={() => setSelectedDay(null)}>
                Hide Details
              </button>
          </div>

        {/* Hourly Details Table */}
{/* Hourly Details Table */}
{weather[selectedDay].hours && (
  <div className="mt-6 p-4 border-t border-gray-600 w-full">
    <h3 className="text-xl font-bold text-center text-white mb-4">
      Hourly Forecast for {weather[selectedDay].datetime}
    </h3>

    {/* Scrollable Wrapper */}
    <div
      className="overflow-x-auto overflow-y-hidden w-full"
      style={{
        WebkitOverflowScrolling: "touch",
      }}
    >
      {/* Make table wide so it can scroll to fix a little bit*/}
      <table className="min-w-[25px] border border-gray-700 text-white bg-gray-800 rounded-lg"> 
        <thead className="bg-gray-900">
          <tr>
            <th className="p-2 border border-gray-700">Time</th>
            <th className="p-2 border border-gray-700">Temp (°C)</th>
            <th className="p-2 border border-gray-700">Humidity (%)</th>
            <th className="p-2 border border-gray-700">Pressure (bar)</th>
            <th className="p-2 border border-gray-700">Wind (m/s)</th>
            <th className="p-2 border border-gray-700">Conditions</th>
          </tr>
        </thead>
        <tbody>
          {weather[selectedDay].hours.map((hour, hourIndex) => (
            <tr
              key={hourIndex}
              className="text-center border-t border-gray-700 hover:bg-gray-700/40"
            >
              <td className="p-2 border border-gray-700">{hour.datetime}</td>
              <td className="p-2 border border-gray-700">{hour.temp}</td>
              <td className="p-2 border border-gray-700">{hour.humidity}%</td>
              <td className="p-2 border border-gray-700">
                {((hour.pressure) * 0.001).toFixed(3)}
              </td>
              <td className="p-2 border border-gray-700">{hour.windspeed}</td>
              <td className="p-2 border border-gray-700">{hour.conditions}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)}
        </div>
        )}
      </div>
      )}
    </div>
    )}