import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components';
import { isMobile } from 'react-device-detect';
import { IconContext } from 'react-icons';
import { ImLocation2 } from 'react-icons/im';
import { FaCity } from 'react-icons/fa'
import { CSSTransition } from 'react-transition-group';
import './styles.css'

import { getCurrentData } from '../../redux/modules/CurrentData'
import { getStorage, setStorage } from '../../utils/localStorage';
import { removeCity } from '../../redux/modules/CitiesFolder'
import ModalInput from '../Modal'

const Header = () => {
    const [viewLocation, setViewLocation] = useState(false);

    const [viewCitiesList, setViewCitiesList] = useState(false);
    const [viewModal, setViewModal] = useState(false);

    const [location, setLocation] = useState('Not chosen');

    const dispatch = useDispatch();

    const locationRedux = useSelector(s => s.CurrentLocationReducer);
    const citiesFolder = useSelector(s => s.CitiesFolder);

    const showHideSetLocation = () => {
        setViewLocation((prev) => !prev)
    };
    const showHideCitiesList = () => {
        setViewCitiesList((prev) => !prev)
    };
    const showHideModal = () => {
        setViewModal(true)
        setViewLocation(false)
    }
    async function success(pos) {
        let crd = pos.coords;
        dispatch(getCurrentData(crd.latitude, crd.longitude))
    }
    const getCurrentInfoLocationMobile = () => {
        navigator.geolocation.getCurrentPosition(success)
    }
    const deleteCity = (lat,lon) => {
        if(citiesFolder.length > 1){
            removeCity(lat, lon)
            const history = getStorage('CitiesDataWeatherApp');
            let citiesArray = [];
            if(history.includes(' / ')){
              let arr = history.split(' / ');
              let array = arr.map( el => {
                let elementArray = el.split(', ');
                return {
                  latitude: elementArray[0],
                  longitude: elementArray[1],
                  city: elementArray[2],
                  country: elementArray[3]
                }
              })
              citiesArray.push(array)
            } else {
              let arr = history.split(', ');
              citiesArray.push({latitude: arr[0], longitude: arr[1], city: arr[2], country: arr[3]})
            }
            const filteredArr = citiesArray.filter(el => (
                el.latitude+'' !== lat+'' && el.longitude+'' !== lon+''
            ))
            const string = filteredArr.map(el => (
                `${el.latitude}, ${el.longitude}, ${el.city}, ${el.country}`
            ))
            setStorage('CitiesDataWeatherApp', string.join(', '))
        }
    }
    useEffect(() => {
        if(locationRedux.city !== null && locationRedux.country !== null){
            setLocation(`${locationRedux.city}, ${locationRedux.country}`)
        }

    }, [locationRedux, citiesFolder])

    return (
        <>
        <Nav>
            <Logo>Weather App</Logo>
            <CurrentLocation onClick={showHideSetLocation}>
                <IconContext.Provider value={{size: '13px', style: {marginRight: '5px'}}}>
                    <ImLocation2/>
                </IconContext.Provider>
                <span>{location}</span>
            </CurrentLocation>
            <CitiesClick onClick={showHideCitiesList}>
                <IconContext.Provider value={{size: '13px', style: {marginRight: '5px'}}}>
                    <FaCity/>
                </IconContext.Provider>
                <span>Cities List</span>
            </CitiesClick>
            <CSSTransition
                in={viewLocation}
                timeout={1000}
                classNames="header_animation"
            >
                {viewLocation ? <MenuLocation>
                    {isMobile ? <div onClick={getCurrentInfoLocationMobile}><p>Use current location</p></div> : <></>}
                    <div onClick={showHideModal}><p>Use location from input</p></div>
                    <div><p>Save this location</p></div>
                </MenuLocation> : <></>}
            </CSSTransition>
            <CSSTransition
                in={viewCitiesList}
                timeout={1000}
                classNames="header_animation"
            >
                {viewCitiesList && citiesFolder.length >= 1 ? <CitiesList>
                    {citiesFolder.map((el, index) => (
                        <div key={index}>
                            <p>{el.city}, {el.country}</p>
                            <button onClick={deleteCity}>Delete</button>
                        </div>
                    ))}
                </CitiesList> : <></>}
            </CSSTransition>
        </Nav>
        {viewModal ? <ModalInput isModal={viewModal} setIsModal={setViewModal}/> : <></>}
        </>
    )
};

export default Header

const Nav = styled.nav`
    position: relative;
    background: linear-gradient(90deg, rgba(224,226,0,0.7) 0%, rgba(204,128,12,0.7) 22%, rgba(6,12,160,0.7) 54%, rgba(2,208,216,0.7) 81%, rgba(0,212,255,0.7) 100%);
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
`
const Logo = styled.div`
    font-weight: 600;
    font-size: 19px;
    font-style: italic;
    color: white;
`
const CurrentLocation = styled.div`
    position: absolute;
    right: 20px;
    color: white;
    font-size: 15px;
    cursor: pointer;
    &:hover {
        text-decoration: underline;
    }
`
const CitiesClick = styled.div`
    position: absolute;
    left: 20px;
    color: white;
    font-size: 15px;
    cursor: pointer;
    &:hover {
        text-decoration: underline;
    }
`
const MenuLocation = styled.div`
    background: linear-gradient(0deg, rgba(34,193,195,0.5) 0%, rgba(253,187,45,0.5) 100%);
    border: 1px black solid;
    z-index: 5;
    border-radius: 10px;
    height: 70px;
    width: 180px;
    position: absolute;
    right: 20px;
    top: 35px;
    font-size: 14px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    justify-content: space-around;
    div{
        width: 100%;
        height: 100%;
        box-sizing: content-box;
        cursor: pointer;
        border-bottom: 1px black solid;
        &:last-child{
            border-bottom: none;
        }
        p {
            margin: 0;
        }
        &:hover{
            text-decoration: underline;
        }
    }
`
const CitiesList = styled.div`
    background: linear-gradient(0deg, rgba(34,193,195,0.5) 0%, rgba(253,187,45,0.5) 100%);
    border: 1px black solid;
    z-index: 5;
    border-radius: 10px;
    width: 180px;
    position: absolute;
    left: 20px;
    top: 35px;
    font-size: 14px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    justify-content: space-around;
    div{
        width: 100%;
        height: 100%;
        box-sizing: content-box;
        padding: 10px 0;
        border-bottom: 1px black solid;
        display: flex;
        justify-content: space-around;
        &:last-child{
            border-bottom: none;
        }
        p {
            margin: 0;
        }
        button {
            background-color: white;
            border: 1px black solid;
            border-radius: 5px;
            cursor: pointer;
            &:hover{
                background-color: rgba(227, 57, 0, 0.5);
            }
        }
    }
`
