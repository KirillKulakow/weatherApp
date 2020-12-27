import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { getLocationName } from '../../utils/api'
import { setCurrentLocation } from '../../redux/modules/CurrentLocation';
import useDebounce from '../../utils/debounceHook';

const debounce = (f, ms) => {
    let isCooldown = false;
  
    return function() {
      if (isCooldown) return;
      f();
      isCooldown = true;
      setTimeout(() => isCooldown = false, ms);
    };
  
}

const ModalInput = ({isModal, setIsModal}) => {
    const [cities, setCities] = useState([]);
    const [inputCity, setInputCity] = useState('');
    const [currentCityToAdd, setCurrentCityToAdd] = useState({});
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const closeTab = () => {
        setIsModal(false)
    }
    const handleChange = (e) => {
        setInputCity(e.target.value)
    }
    const fetchData = async (name) => {
        try{
            setLoading(true)
            let response = await getLocationName(name)
            let array = response.data.map(el => {
                return {
                    name: el.name,
                    lat: el.lat,
                    lon: el.lon,
                    country: el.country
                }
            })
            return array
        } catch (e) {
            console.log(e)
            return e
        }
    }
    const clickToAdd = (obj, index) => {
        setCurrentCityToAdd({
            city: obj.name,
            country: obj.country,
            latitude: obj.lat,
            longtitude: obj.lon,
        });
        setInputCity('');
        setCities([cities[index]]);
    }
    const getAutocomplete = () => (
        cities.map((el, index) => (
            <Autocomplete key={index} onClick={() => clickToAdd(el, index)}>
                <p>{el.name}, {el.country}</p>
            </Autocomplete>
        ))
    )
    const debouncedSearchTerm = useDebounce(inputCity, 500);

    useEffect(() => {
        if (debouncedSearchTerm) {
            setLoading(true);
            fetchData(debouncedSearchTerm)
            .then(res => {
                setCities(res)
                setLoading(false)
            })
        }
    }, [debouncedSearchTerm])
    const verifyCity = () => {
        return Object.keys(currentCityToAdd).length < 1
    }
    const addNewCityModal = () => {
        dispatch(setCurrentLocation(currentCityToAdd.city, currentCityToAdd.country, currentCityToAdd.latitude, currentCityToAdd.longtitude))
        closeTab()
    }
    return (
        <>
            <Background>
            <Modal>
                <CloseTab onClick={closeTab}>X</CloseTab>
                <input type="text" value={inputCity} onChange={handleChange}/>
                {cities.length >= 1 ? 
                <AutoContainer>{getAutocomplete()}</AutoContainer> : <> </>}
                <button disabled={verifyCity()} onClick={addNewCityModal}>Add to list</button>
            </Modal>
            </Background>
        </>
    )
}

export default ModalInput

const Modal = styled.div`
    position: absolute;
    border: 1px solid rgb(204, 204, 204);
    background: rgb(255, 255, 255);
    overflow: auto;
    border-radius: 4px;
    outline: none;
    padding: 20px;
    width: 80%;
    right: 50%;
    transform: translate(50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    input{
        width: 80%;
        margin-bottom: 10px;
    }
    button{
        background-color: white;
        border: 1px solid;
        border-radius: 5px;
    }
`
const CloseTab = styled.button`
    position: absolute;
    top: 0;
    right: 0;
    height: 20px;
    width: 20px;
    background-color: white;
    border-radius: 50%;
    padding: 0;
`
const Background = styled.div`
    position: fixed;
    height: 100%;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.75);
    z-index: 10;
`
const Autocomplete = styled.div`
    border-bottom: 1px black solid;
    width: 100%;
    cursor: pointer;
    &:last-child {
        border-bottom: none;
    }
    &:hover{
        text-decoration: underline;
    }
    p{
        padding: 7px;
        margin: 0;
    }
`
const AutoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px black solid;
    border-radius: 20px;
    margin-bottom: 10px;
`