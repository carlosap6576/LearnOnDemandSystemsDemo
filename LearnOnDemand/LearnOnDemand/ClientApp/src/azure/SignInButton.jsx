import React ,{useState,useContext} from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "./authConfig";
import Button from "react-bootstrap/Button";
import {makeStyles} from '@material-ui/core/styles'
function handleLogin(instance) {
    instance.loginPopup(loginRequest).catch(e => {
        console.error(e);
    });
}

/**
 * Renders a button which, when selected, will open a popup for login
 */
export const SignInButton = () => {
    const { instance } = useMsal();

    return (
        <Button variant="secondary" className="ml-auto" style={{ background: '#000' }} onClick={() => handleLogin(instance)}><i class="fa fa-cloud-download"></i> Sign in With Microsoft Authentication Library</Button>
    );
}