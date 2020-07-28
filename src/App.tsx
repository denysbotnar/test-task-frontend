import React from 'react';

import {
  Route,
  Switch,
  Redirect
} from 'react-router-dom'

import './App.scss';

import Home from './components/Home/Home'
import View from './components/View/View';
import { BrowserHistory } from 'history';

interface IRecipeProps {
  history: BrowserHistory;
}

interface IRecipeState {
}

class App extends React.Component<IRecipeProps, IRecipeState> {
  render() {
    const { history } = this.props;

    return (
      <div className="App">
        <Switch>
          <Route history={history} path='/home' component={Home} />
          <Route history={history} path='/watch/:id' component={View} />
          <Redirect from='/' to='/home'/>
        </Switch>
      </div>
    );
  }
}

export default App