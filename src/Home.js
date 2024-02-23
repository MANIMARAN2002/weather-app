import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFrown } from '@fortawesome/free-solid-svg-icons';
import './home.css';
import { FcSearch } from "react-icons/fc";
const Home = ({input,setInput,weather,search}) => {
    
    const toDateFunction = () => {
        const months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ];
        const WeekDays = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
        ];
        const currentDate = new Date();
        const date = `${WeekDays[currentDate.getDay()]} ${currentDate.getDate()} ${months[currentDate.getMonth()]
            }`;
        return date;
    };
 
  return (
    <div className='container'>
        <div className='input'>
            <label className='inp'>
            <FcSearch className='sea-but'/>
                <input type="text"
                placeholder='Enter City Name'
                value={input}
                className='input1'
                onChange={(e)=>setInput(e.target.value)}
                onKeyDown={(e)=>{
                    if(e.key==='Enter'){
                        search(e);
                    }
                }}
                 />
            </label>
        </div>
        {weather.loading && (
                <>
                    <br />
                    <br />
                   <p className='oval'> Loading Weather...</p>
                </>
            )}
            {weather.error && (
                <>
                    <br />
                    <br />
                    <span className="error-message">
                        <FontAwesomeIcon icon={faFrown} />
                        <span style={{ fontSize: '20px' }}>City not found</span>
                    </span>
                </>
            )}
        {weather && weather.data && weather.data.main &&(
        <div className='main'>
        <div className='city-name'>
            <h2>{weather.data.name},<span>{weather.data.sys.country}</span></h2>
        </div>
        <div className='date'>
        <span>{toDateFunction()}</span>
        </div>
        <div className="icon-temp">
                        <img
                            className=""
                            src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`}
                            alt={weather.data.weather[0].description}
                        />
                        {Math.round(weather.data.main.temp)}
                        <sup className="deg">°C</sup>
                    </div>
                    <div className="des-wind">
                        <p>{weather.data.weather[0].description.toUpperCase()}</p>
                        <p>Wind Speed: {weather.data.wind.speed}m/s</p>
                    </div>
        </div>
)}


    </div>
  )
}

export default Home;