import React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import './App.scss';
import { History } from "history";
import { store } from './redux/store';
import { ConnectedRouter } from 'connected-react-router';
import Navbar from './components/navbar/navbar.component';
import HomeComponent from './components/home/home.component';
import OnboardingPageComponent from './components/onboarding/onboarding.component';


interface AppProps {
  history: History;
}

const App = (props: AppProps) => {
  const { history } = props;

  return (
    <Provider store={store}>
      <div className="App">
        <ConnectedRouter history={history}>
          <Navbar/>
          <Switch>
            <Route exact={true} path="/" component={HomeComponent} />
            <Route exact={true} path="/onboarding" component={OnboardingPageComponent} />
          </Switch>
        </ConnectedRouter>
      </div>
    </Provider>
  );
}

export default App;
