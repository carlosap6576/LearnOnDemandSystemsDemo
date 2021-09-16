import React from 'react';
import NavbarRoutes from '../routes';
import { makeStyles } from '@material-ui/core/styles';
import {Link} from "react-router-dom"
import {AppBar, Toolbar, Typography} from '@material-ui/core'
import { SignInButton } from "../azure/SignInButton";
import { SignOutButton } from "../azure/SignOutButton";
import { useIsAuthenticated } from "@azure/msal-react";
import { Redirect, Route, Switch, BrowserRouter } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    title:{
        flexGrow: 1,
        paddingLeft:50
    },
    linksContainer: {
        display: "flex",
    },
    menuItems: {
        margin: theme.spacing(1),
        color:"white"
    }
}))

const Navbar = () => {
    const styles = useStyles()

    const isAuthenticated = useIsAuthenticated();
    return (
        <AppBar style={{backgroundColor:"#00264d"}} position="static">
            <Toolbar>
            { isAuthenticated ? <SignOutButton /> :<Redirect from="/" to="/login" />}
                <Typography color="inherit" variant="h5" className={styles.title}>
                    {NavbarRoutes.title}
                </Typography>
                
                <div className={styles.linksContainer}>
                    {NavbarRoutes.routes.map((menuItem, index) => {
                        if(!menuItem.hidden) {
                            return (
                                <Typography key={index} variant="subtitle1" >
                                    <Link to={menuItem.path} className={styles.menuItems}>
                                        {menuItem.name}
                                    </Link>
                                </Typography>
                            )
                        }
                    })}
                </div>
                
            </Toolbar>
        </AppBar>
    )
}

export default Navbar;