import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import Header from '../../components/Header';
import CurrentWeatherInfo from '../../components/CurrentWeatherInfo';
import {getCurrentData} from '../../redux/modules/CurrentData'

const Home = () => {
    const {CurrentLocationReducer, CurrentDataReducer} = useSelector(s => s)
    const dispatch = useDispatch()

    useEffect(() => {
        if(CurrentLocationReducer.lat !== null && CurrentLocationReducer.lon !== null && !CurrentDataReducer.isBusy){
            dispatch(getCurrentData(CurrentLocationReducer.lat, CurrentLocationReducer.lon))
        }
    }, [CurrentLocationReducer, dispatch])

    return (
        <HomeContainer>
            <Header/>
            <CurrentWeatherInfo/>
        </HomeContainer>
    )
};

export default Home

const HomeContainer = styled.div`
    width: 100%;
    height: 100%;
    min-height: 100vh;
    background: linear-gradient(230deg, rgba(224,226,0,0.3) 0%, rgba(204,128,12,0.3) 22%, rgba(6,12,160,0.3) 54%, rgba(2,208,216,0.3) 81%, rgba(0,212,255,0.3) 100%);
    @media (max-width: 768px) {
        padding-bottom: 15px;
    }
`