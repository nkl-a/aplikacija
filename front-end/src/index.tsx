import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './components/Home/Home';
import NewGame from './components/NewGame';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'jquery/dist/jquery.js'
import 'popper.js/dist/popper.js'
import '@fortawesome//fontawesome-free/css/fontawesome.min.css'
import { MainMenu, MainMenuItem } from './components/MainMenu';
import { HashRouter, Route, Switch} from 'react-router-dom';

const items = [
  new MainMenuItem("Pocetna", '/'),
  new MainMenuItem("Nova igra", '/new/game'),
  new MainMenuItem("Log in", '/login'),
]

ReactDOM.render(
  <React.StrictMode>
      <MainMenu items={items}></MainMenu>
      <HashRouter>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/new/game' component={NewGame}/>
        </Switch>
      </HashRouter>
      <Home />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
