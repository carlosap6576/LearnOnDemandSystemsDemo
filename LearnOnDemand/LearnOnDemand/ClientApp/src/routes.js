import React from 'react';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import LocationPage from './pages/LocationPage';
import NewsPage from './pages/NewsPage';
import WeatherPage from './pages/WeatherPage';
import { Redirect } from "react-router-dom";

const NavbarRoutes = {
    title: 'Dashboard',
    routes: [
        {
            path: "/login",
            name: "",
            icon: "",
            component: LoginPage
        },
        {
            path: "/weather",
            name: "Weather",
            icon: "",
            component: WeatherPage
        },
        {
            path: "/news",
            name: "News",
            icon: "",
            component: NewsPage
        },
        {
            path: "/",
            name: "root",
            hidden: true,
            icon: "",
            component: () => <Redirect to="/login" />
        },
    ]
}
export default NavbarRoutes;