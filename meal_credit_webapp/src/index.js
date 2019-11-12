import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import GeneralFormContainer from './login';
import APIWrapper from './api_wrapper';

document.title = "Meal Credit App";

var apiWrapper = new APIWrapper();

ReactDOM.render (
    <GeneralFormContainer api={apiWrapper} />,
    document.getElementById('root')
);