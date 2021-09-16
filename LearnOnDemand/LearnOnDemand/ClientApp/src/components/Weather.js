import React, { useContext, useState } from 'react';
import {makeStyles} from "@material-ui/core/styles"
import { AppContext } from '../contexts/AppContext';
import {Card, Divider, Icon, Switch, Typography} from '@material-ui/core'
import LocationOnIcon from '@material-ui/icons/LocationOn';
import _ from 'lodash';

const useStyles = makeStyles({
    center: {
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    cityFont: {
        fontWeight: 'bold',
        color: '#204060'// Dark Blue
    },
})

const Weather = () => {
    const {state} = useContext(AppContext)
    const [isCelcius, setIsCelcius] = useState(false)
    const styles = useStyles()

    if(_.isEmpty(state.weather)) {
        return (<div></div>)
    }

    
   

    const currentWeather = state.weather; //.weather[0] // Current weather within JSON
    const {wind}= currentWeather;
    const {temp}= currentWeather.main;

    const getConvertedTemperature = (celcius, temp, trailingDecimals) => {
        // If fahrenheit
        if(!celcius){
            return ((temp - 273.15) * (9/5) + 32).toFixed(trailingDecimals)
        } else { // else return celcius
            return (temp - 273.15).toFixed(trailingDecimals)
        }
    }

    // Get Cardinal Angle of Wind
    const getCardinal = (angle) => {
        const degreePerDirection = 360 / 8;

        /**
         * Offset the angle by half of the degrees per direction
         * Example: in 4 direction system North (320-45) becomes (0-90)
         */
        const offsetAngle = angle + degreePerDirection / 2;

        return (offsetAngle >= 0 * degreePerDirection && offsetAngle < 1 * degreePerDirection) ? "N"
          : (offsetAngle >= 1 * degreePerDirection && offsetAngle < 2 * degreePerDirection) ? "NE"
            : (offsetAngle >= 2 * degreePerDirection && offsetAngle < 3 * degreePerDirection) ? "E"
              : (offsetAngle >= 3 * degreePerDirection && offsetAngle < 4 * degreePerDirection) ? "SE"
                : (offsetAngle >= 4 * degreePerDirection && offsetAngle < 5 * degreePerDirection) ? "S"
                  : (offsetAngle >= 5 * degreePerDirection && offsetAngle < 6 * degreePerDirection) ? "SW"
                    : (offsetAngle >= 6 * degreePerDirection && offsetAngle < 7 * degreePerDirection) ? "W"
                      : "NW";
    }

    // Returns icon for current weather
    // Weather codes can be found in OpenWeather API. However, each icon component has a description that
    // are pretty self explanatory
    const getWeatherIcon = (iconCode) => {
        switch(iconCode) {
            // code ending with d means day time
            // code ending with n means night time
            case '01d':
            case '01n':
                return <Icon fontSize='large' className="meteocons" color="action">sun</Icon>
            case '02d':
            case '03d':
            case '04d':
            case '02n':
            case '03n':
            case '04n':
                return <Icon fontSize='large' className="meteocons text-36" color="action">cloudy2</Icon>
            case '09d':
            case '10d':
            case '09n':
            case '10n':
                return <Icon fontSize='large' className="meteocons text-36" color="action">rainy2</Icon>
            case '11d':
            case '11n':
                return <Icon fontSize='large' className="meteocons text-36" color="action">lightning3</Icon>
            case '13d':
            case '13n':
                return <Icon fontSize='large' className="meteocons text-36" color="action">snowy3</Icon>
            case '50d':
            case '50n':
                return <Icon fontSize='large' className="meteocons text-36" color="action">weather3</Icon>
           default:
               return
        }
    }

    // Capitalize the first letter of each word
    const formatDescription = (description) => {
        var splitStr = description.split(' ')

        for(var i = 0; i < splitStr.length; i++){
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1)
        }

        return splitStr.join(' ')
    }

   

    return (
        <Card raised>

            <Divider variant="middle"/>

            <div className={styles.center} style={{ margin: '10px 5px 0 5px'}}>
                {getWeatherIcon(currentWeather.icon)}

                <Typography style={{marginLeft:'4px'}} variant='h5' color="textPrimary">
                    {currentWeather.description ?
                    formatDescription(currentWeather.description) : null}
                </Typography>
            </div>


            <div className={styles.center} style={{marginTop:'10px'}}>
                <Typography color="textPrimary">F°</Typography>
                    <Switch checked={isCelcius} onChange={() => setIsCelcius(!isCelcius)}></Switch>
                <Typography color="textPrimary">C°</Typography>
            </div>

            <div className={styles.center} style={{marginTop:'5px'}}>
                <Typography variant='h4' color="textPrimary">{getConvertedTemperature(isCelcius, temp.temp, 2)}</Typography>
                <Typography className="ml-4" variant='h4' color="textPrimary">°</Typography>
                <Typography variant='h4' color="textPrimary">
                    {isCelcius ? 'C' : 'F'}
                </Typography>
            </div>

            <div className={styles.center} style={{marginTop:'5px'}}>
                <Typography variant='h6' color="textSecondary">High/Low </Typography>
            </div>

            <div className={styles.center}>
                <Typography style={{marginLeft: '5px'}} variant='h6' color="textSecondary">
                    {getConvertedTemperature(isCelcius, temp.temp_max, 0)}°/
                    {getConvertedTemperature(isCelcius, temp.temp_min, 0)}°
                </Typography>
            </div>

            <Divider style={{marginTop:'5px'}}/>

            <div className={styles.center} style={{padding: '10px 0'}}>
                <Icon style={{margin:"0 5px"}} className="meteocons" color="action">wind</Icon>
                <Typography style={{marginRight: '8px'}}color='textSecondary' variant='subtitle1'>
                    {wind.speed} M/S
                </Typography>

                <Icon style={{margin:"0 5px"}} className="meteocons" color="action">compass</Icon>
                <Typography color='textSecondary' variant='subtitle1'>
                    {getCardinal(wind.deg)}
                </Typography>
            </div>
        </Card>
    )
}

export default Weather;
