import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { IconContext } from "react-icons";
import { GiSunrise, GiSunset } from 'react-icons/gi';
import { FaLocationArrow } from 'react-icons/fa';

import Loader from '../Loader';

const dayArray = [
    'Sunday',
    'Monday',
    'Tueday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
];
const monthArray = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
];
const getCurrentIcon = (type) => {
    return `https://openweathermap.org/img/wn/${type}@2x.png`
};
const getCurrentDate = (dateUTC) => {
    return new Date(+`${dateUTC}000`)
};
const getDailyArrayInfo = (array) => {
    return array.map((element, index) => {
        const dayOfWeek = dayArray[getCurrentDate(element.dt).getUTCDay()];
        const month = monthArray[getCurrentDate(element.dt).getUTCMonth()]
        const day = getCurrentDate(element.dt).getUTCDate();
        const year = getCurrentDate(element.dt).getUTCFullYear();
        return <DayWeatherInfoContainer key={index}>
            <DayText>{dayOfWeek}</DayText>
            <DayText>{`${month} ${day} ${year}`}</DayText>
            <ImageWeatherDays src={getCurrentIcon(element.weather[0].icon)} size={45}/>
            <InfoTempText>{`Min ${Math.round(element.temp.min)}°C`}</InfoTempText><InfoTempText>{`Max ${Math.round(element.temp.max)}°C`}</InfoTempText>
            <div>
                <IconArrowWind deg={element.wind_deg - 45} size={15}/>
                <p>{`${element.wind_speed} m/s`}</p>
            </div>
        </DayWeatherInfoContainer>
    })
};
const verifyMinutes = (min) => {
    let string = min + '';
    if(string.length === 1) {
        return '0' + string
    } else {
        return min
    }
}

const CurrentWeatherInfo = () => {
    const dataWeatherRedux = useSelector(s => s.CurrentDataReducer);
    const locationRedux = useSelector(s => s.CurrentLocationReducer);
    const [loading, setLoading] = useState(true);
    const [dailyInfo, setDailyInfo] = useState(null)
    const [currentData, setCurrentData] = useState(null);
    
   useEffect(() => {
      if(dataWeatherRedux.response !== null && !dataWeatherRedux.isBusy && dataWeatherRedux.isError === null){
         setCurrentData(dataWeatherRedux.response.current)
         setDailyInfo(getDailyArrayInfo(dataWeatherRedux.response.daily))
         setLoading(false)
      } else {
         setLoading(true)
      }
   },[dataWeatherRedux])

    return (
        <Widget>
           {loading ? 
           <Loader/> : 
           <>
            <MainInfo>
                <h3>{`${locationRedux.city}, ${locationRedux.country}`}</h3>
                <p>{`${dayArray[getCurrentDate(currentData.dt).getUTCDay()]}, ${monthArray[getCurrentDate(currentData.dt).getUTCMonth()]} ${getCurrentDate(currentData.dt).getUTCDate()} ${getCurrentDate(currentData.dt).getUTCFullYear()}`}</p>
                <p>{currentData.weather[0].main}</p>
            </MainInfo>
            <WeatherIcon>
                <ImageWeatherDays src={getCurrentIcon(currentData.weather[0].icon)} size={120}/>
                <WeatherGroup>
                    <MainTemp>
                        <p>{Math.round(currentData.temp)}°C</p>
                    </MainTemp>
                    <SecondaryTemp>
                        <h4>Feels</h4>
                        <p>{Math.round(currentData.feels_like)}°C</p>
                    </SecondaryTemp>
                </WeatherGroup>
            </WeatherIcon>
            <InfoCurrentDate>
                <InfoSun>
                    <div>
                        <IconContext.Provider value={{ size: '22px', color: "#ffdd00" }}>
                            <GiSunrise/>
                        </IconContext.Provider>
                        <h4>Sunrise at</h4>
                        <p>{`${getCurrentDate(currentData.sunrise).getHours()}:${verifyMinutes(getCurrentDate(currentData.sunrise).getMinutes())}`}</p>
                    </div>
                    <div>
                        <IconContext.Provider value={{ size: '22px', color: "#e38202" }}>
                            <GiSunset/>
                        </IconContext.Provider>
                        <h4>Sunset at</h4>
                        <p>{`${getCurrentDate(currentData.sunset).getHours()}:${getCurrentDate(currentData.sunset).getMinutes()}`}</p>
                    </div>
                </InfoSun>
                <InfoPressure>
                    <h4>Pressure</h4>
                    <p>{currentData.pressure}mm</p>
                </InfoPressure>
                <InfoHumidity>
                    <h4>Humidity</h4>
                    <p>{currentData.humidity}%</p>
                </InfoHumidity>
                <InfoWind>
                    <h4>Wind</h4>
                    <div>
                        <IconArrowWind deg={currentData.wind_deg - 45} size={30}/>
                        <p>{currentData.wind_speed} m/s</p>
                    </div>
                </InfoWind>
            </InfoCurrentDate>
            <DaysWeatherInfo>
                {dailyInfo}
            </DaysWeatherInfo>
            </>
            }
        </Widget>
    )
}

export default CurrentWeatherInfo

const Widget = styled.div`
    width: 80%;
    max-width: 715px;
    margin: 0 auto;
    padding: 15px;
    border-radius: 20px;
    background: rgba(255, 255, 255, 0.3);
    box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.3);
    display: grid;
    grid-template: 
        "mainInfo mainInfo mainInfo"
        "iconWeather infoData infoData"
        "daysInfo daysInfo daysInfo";
   position: relative;
   min-height: 120px;
   @media (max-width: 768px) {
      grid-template: 
            "mainInfo"
            "iconWeather"
            "infoData"
            "daysInfo"
            "daysInfo";
    }
`
const WeatherIcon = styled.div`
    position: relative;
    grid-area: iconWeather;
    display: flex;
    align-items: center;
    justify-content: center;
`
const WeatherGroup = styled.div`
    display: flex;
    flex-direction: column;
`
const MainTemp = styled.div`
    margin: 0;
    font-size: 50px;
    display: flex;
    justify-content: start;
    p{
        margin: 0;
    }
`
const SecondaryTemp = styled.div`
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    h4{
        margin: 0;
        margin-left: 10px;
    }
    p{
        margin: 0;
    }
`
const MainInfo = styled.div`
    grid-area: mainInfo;
    h3{
        margin: 0;
        font-size: 16px;
    }
    p{
        margin: 0;
        font-size: 14px;
    }

`
const DaysWeatherInfo = styled.div`
    grid-area: daysInfo;
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    padding-top: 30px;
    @media (max-width: 768px) {
      grid-template-columns: repeat(4, 1fr);
      grid-row-gap: 20px;
   }
`
const InfoCurrentDate = styled.div`
    grid-area: infoData;
    display: grid;
    grid-template: 
        "sun sun sun"
        "press hum wind" / 1fr 1fr 1fr
   ;
   @media (max-width: 768px) {
      grid-template: 
            "sun sun"
            "press hum"
            "wind wind" / 1fr 1fr;
   }
`
const InfoSun = styled.div`
    display: flex;
    justify-content: center;
    grid-area: sun;
    margin-bottom: 5px;
    div{
        display: flex;
        margin: 0 10px;
        align-items: center;
        h4 {
            margin: 0;
            font-weight: 500;
            font-size: 12px;
        }
        p{
            margin: 0;
            margin-left: 5px;
            font-size: 15px;
            @media (max-width: 768px) {
                font-size: 10px;
            }
        }
    }
`
const InfoPressure = styled.div`
    grid-area: press;
    display: flex;
    flex-direction: column;
    align-items: center;
    h4{
        margin: 0;
        margin-bottom: 5px;
    }
    p {
        margin: 0;
        font-size: 20px;
    }
`
const InfoHumidity = styled.div`
    grid-area: hum;
    display: flex;
    flex-direction: column;
    align-items: center;
    h4{
        margin: 0;
        margin-bottom: 5px;
    }
    p {
        margin: 0;
        font-size: 20px;
    }
`
const InfoWind = styled.div`
    grid-area: wind;
    display: flex;
    flex-direction: column;
    align-items: center;
    h4{
        margin: 0 0 5px 0;
    }
    div{
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        width: 100%;
        p{
            margin: 0;
            display: inline-block;
            font-size: 20px;
        }
    }
    
`
const IconArrowWind = styled(FaLocationArrow)`
    ${props => 
    `transform: rotate(${props.deg}deg);
    height: ${props.size}px`};
    color: #b5b5b5;
`
const DayWeatherInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    div{
        display: flex;
        padding-top: 10px;
        p{
            font-size: 10px;
            margin: 0 0 0 5px;
        }
    }
`
const DayText = styled.p`
    margin: 0;
    font-size: 12px;
    @media (max-width: 768px) {
        font-size: 10px;
   }
`
const ImageWeatherDays = styled.img`
    ${props => 
    `height: ${props.size}px`};
`
const InfoTempText = styled.p`
    margin: 0;
    font-size: 10px;
`