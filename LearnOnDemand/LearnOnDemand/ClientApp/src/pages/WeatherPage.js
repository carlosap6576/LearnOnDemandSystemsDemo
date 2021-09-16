import React from 'react';
import Weather from '../components/Weather';
import Navbar from '../components/Navbar';
const WeatherPage = () => {

    return (
        <div>
            
        <Navbar />
            <h1>Weather</h1>
            <div>
                <Weather />
            </div>

          
        </div>
    )
}

export default WeatherPage;