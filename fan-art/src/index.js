import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {UserProfileSetupProvider} from "./contexts/UserProfileSetupContext";
import {AuthProvider} from "./contexts/AuthContext";
import {PayPalScriptProvider} from "@paypal/react-paypal-js";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <AuthProvider>
            <UserProfileSetupProvider>
                <PayPalScriptProvider
                    options={{"client-id": "AXNjBapNMMTgNB2vQNJIHuqZL3emyfPnDvDhgZ1hsDEhqNfe5398Dw3rZLNxZZ47V-UPie9f_6ZO3vBQ"}}>
                <App/>
                </PayPalScriptProvider>
            </UserProfileSetupProvider>
        </AuthProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
