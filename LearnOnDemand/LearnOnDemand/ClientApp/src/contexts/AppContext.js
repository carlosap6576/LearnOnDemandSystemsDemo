import React, {createContext, useReducer, useEffect, useState} from 'react';
import {appReducer} from '../reducers/appReducer';
import r from '../utils/request';

export const AppContext = createContext();

const AppContextProvider = (props) => {


    const [state, dispatch] = useReducer(appReducer, {}, () => {
        const weather = localStorage.getItem('weather');
        const news = localStorage.getItem('news');

        return {
            weather: weather ? JSON.parse(weather) : {},
            news: news ? JSON.parse(news) : {},
            loading: false,
            error: ''
        }
    });

    useEffect(() => {
        const fetchData = async () => {
            updateErrorMsg('');
            updateIsLoading(true);
            await UpdateAllApi();
            updateIsLoading(false);
        };
         fetchData();

    }, []);



    const UpdateAllApi = async () => {
        await GetWeather();
        await GetHeadline();
    }

    const GetWeather = async () => {
        const url = r.getWeatherUrl();
        const results = await r.get(url)
        if (results.isError) {
            console.log("failed weather request: ", results.error)
        }

        dispatch({type: 'SET_WEATHER', payload: results.data});
    }

    const GetHeadline = async () => {
        const url = r.getHeadlineUrl();
        const results = await r.get(url)
        if (results.isError) {
            console.log("failed headline request: ", results.error)
        }

        dispatch({type: 'SET_NEWS', payload: results.data});
    }

    const updateErrorMsg = msg => {
        dispatch({type: 'SET_ERROR', payload: msg});
    }
    const updateIsLoading = value => {
        dispatch({type: 'SET_LOADING', payload: value});
    }


    return (
        <AppContext.Provider value={{state, dispatch}}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;
