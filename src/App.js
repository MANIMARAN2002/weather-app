import './App.css';
import React, { useState,useEffect } from 'react';
import axios from 'axios';
import Home from './Home';

function App() {
  const [input,setInput]=useState('');
  const [weather,setWeather]=useState({
    loading:false,
    data:{},
    errormsg:false
  });
useEffect(() => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    console.log("Geolocation not supported");
  }

  function success (position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    setInput('');
    setWeather({ loading: true });
    const url=`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}`;
   const api_key = '5bf75ea536574aa684e2cb4edd2f121a';
    axios.get(url,{
    params:{
      q:input,
      units:'metric',
      appid:api_key
    }
   })
      .then(res => {
        setWeather({ data: res.data, loading: false, errormsg: false });
        console.log(res.data);
      })
      .catch(error => {
        console.log("Error fetching weather data:", error);
      });
  }

  function error(error) {
    console.log("Error getting geolocation:", error);
  }
}, []);

  
  const search=async(e)=>{
    e.preventDefault();
    setInput('')
    setWeather({...weather,loading:true});
    const url='https://api.openweathermap.org/data/2.5/weather';
   const api_key = '5bf75ea536574aa684e2cb4edd2f121a';
   await axios.get(url,{
    params:{
      q:input,
      units:'metric',
      appid:api_key
    }
   })
   .then((res)=>{
    console.log(res.data);
    setWeather({data:res.data,loading:false,errormsg:false})
   })
   .catch((error)=>{
    setWeather({...weather,data:{},error:true})
    setInput('')
    console.log('error',error);
   })
  }
  return (
    <div className="App">
    <Home
    input={input}
    setInput={setInput}
    weather={weather}
    search={search}
    />
    </div>
  );
}
export default App;
