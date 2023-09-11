import React, { useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const [error, setError] = useState(null);

  const url =`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&APPID=e62dbd1755a605c98bbd2dfc9b7bbb97`;

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url)
      .then((response) => {
        setData(response.data);
        setLocation('');
        setError(null);
        console.log(response.data);
      })
      .catch((error) => {
        setError("Data not available");
        setData({}); 
        console.error(error);
      });
    }
  }




  return (
    <div className="app">
      <div className="search">
        <input 
        value={location} 
        onChange={event => setLocation(event.target.value)} 
        placeholder='Enter Location' 
        onKeyPress={searchLocation} 
        type="text" 
        />
      </div>
      <div className="containter">
        <div className="top"></div>
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
          </div>
          <div className="description">
          {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
          {data.name !== undefined ? (
            <div className="bottom">
              <div className="feels">
              {data.main ? <p className="bold">{data.main.feels_like.toFixed()}°C</p> : null}
                <p>Feels like</p>
              </div>
              <div className="humidity">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
                <p>Humidity</p>
              </div>
              <div className="wind">
              {data.wind ? <p className="bold">{data.wind.speed.toFixed(1)}m/s</p> : null}
                <p>Wind</p>
              </div>
              <div className="rain">
                {data.rain ? (
                  Object.entries(data.rain).map(([key, value]) => (
                    <p key={key} className="bold">
                      {value}mm ({key})
                    </p>
                  ))
                  ) : null}
                <p>Rain</p>
              </div>
            </div>
            ) : null }
      </div>
      {error && <div className="error">{error}</div>}
    </div>
  ) ;
}

export default App;


