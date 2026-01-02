import { useState } from "react";
import { useAuth } from '/public/ctx/FirebaseAuth'
import { useNavigate } from "react-router"

const weatherIcons = {
  'partly-cloudy-day': "☁️",
  cloudy: "☁️",
  rain: "🌧️",
  snow: "❄️",
  sunny: "☀️",
  thunder: "⛈️"
};

export default function CurrentWeather() {

  const [city, setCity] = useState("");
  const [weather, setWeather] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [lastCity, setLastCity] = useState(""); //last city
  
  const { user, isAuthenticated } = useAuth(); //! auth ctx

  const navigate = useNavigate();

  const fetchWeather = async () => {
    if (!isAuthenticated) {
        navigate("/login");
        return alert('You must be logged in to check weather conditions.');
    }
    if (!city || city === lastCity) return;
    setLoading(true);
    setError();
    setLastCity(city);

    try {
      const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&elements=datetime%2CdatetimeEpoch%2Cname%2Ctempmax%2Ctempmin%2Ctemp%2Chumidity%2Csnow%2Cwindspeed%2Cwindspeedmax%2Cwindspeedmin%2Cwinddir%2Cpressure%2Cuvindex%2Csunrise%2Csunset%2Cconditions%2Cdescription%2Cicon&include=days%2Chours%2Calerts%2Ccurrent&key=LQCFA6SWM9Q5TPK4T79HSX2U7&contentType=json`);
      if (!response.ok) throw new Error("City not found");

      const data = await response.json();
      setWeather(data);
      // console.log(data);
      
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
      >🌙 Current Weather 🌤</h1>

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

      {/* {loading && <p className="flex justify-center spinner mt-5"></p>} */}
      {error && <p className="mt-4 text-red-500">{error}</p>}

      {weather && (
        <div
          className="mt-6 p-4 rounded-lg shadow-md text-center border-2 border-bg-gray-800"
          style={{
          background: "linear-gradient(135deg,rgb(83, 152, 242) 5%,rgb(235, 129, 29) 100%)",
        }}>

            
          <h2 className="text-2xl font-semibold text-gray-900">{weather.resolvedAddress} {weather.currentConditions.datetime}</h2>
          <p className="text-lg">{weather.currentConditions.conditions}</p>
          {/* <img src={weather.currentConditions.icon} alt="Weather Icon" className="mx-auto" /> */}
          <span className="mx-auto w-10 h-10">
          {weatherIcons[weather.currentConditions.icon] || "❓"} {/* Fallback icon */}
          </span>
          <p className="text-lg">💦 Humidity: {weather.currentConditions.humidity}%</p>
          <p className="text-lg">💨 speed: {weather.currentConditions.windspeed} m/s</p>
          <p className="text-lg">⚖️ pressure: {((weather.currentConditions.pressure)*0.001).toFixed(3)} bar</p>
          <p className="text-3xl font-bold">{weather.currentConditions.temp}°C</p>
        </div>
      )}
    </div>
  );

}