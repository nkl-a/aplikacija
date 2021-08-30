import React from 'react';
import logo from '../../logo.svg';
import './App.css';
import {faHome} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function App() {
  return (
    <div className="container">
      Prva linija
      <FontAwesomeIcon icon={faHome}></FontAwesomeIcon>
    </div>
  );
}

export default App;

