import React from 'react';
import { Provider } from 'react-redux';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';
import './App.scss';
import { History } from "history";
import { persistedStore, store } from './redux/store';
import { ConnectedRouter } from 'connected-react-router';
import Navbar from './components/navbar/navbar.component';
import HomeComponent from './components/home/home.component';
import OnboardingPageComponent from './components/onboarding/onboarding.component';
import MyServicesPage from './components/services-page/my-services-page';
import MyProfileComponent from './components/my-profile/my-profile.component'
import { PersistGate } from 'redux-persist/integration/react';
import AddServiceComponent from  './components/services-page/add-service.component'
import ServicesMainPage from './components/services-page/services-main-page';
import ServiceDetailsPage from './components/service-details/service-details.component';
import CartPageComponent from './components/cart/cart-page.component';
import OrderHistoryTable from './components/order-history-table/order-history-table.component';
interface AppProps {
  history: History;
}

// Add a TODO

function renderContentDetailsPage(routeProps: any) {
  return <React.Fragment>
      <ServiceDetailsPage routeParams={routeProps.match.params} />
  </React.Fragment>;
}

const App = (props: AppProps) => {
  const { history } = props;

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistedStore}>

        <div className="App">
          <ConnectedRouter history={history}>
            <Navbar />
            <Switch>
              <Route exact={true} path="/" component={HomeComponent} />
              <Route exact={true} path="/onboarding" component={OnboardingPageComponent} />
              <Route exact={true} path='/learn-more' component={HomeComponent} />
              <Route exact={true} path='/my-services' component={MyServicesPage} />
              <Route exact={true} path='/my-profile' component={MyProfileComponent} />
              <Route exact={true} path ='/add-new-service' component={AddServiceComponent} />
              <Route exact={true} path='/services' component={ServicesMainPage} />
              <Route exact={true} path='/cart' component={CartPageComponent} />
              <Route exact={true} path='/order-history-table' component={OrderHistoryTable}/>
              <Route path={'/service/:id/category/:category'} render={(routeProps: RouteComponentProps) =>
                            renderContentDetailsPage({ ...routeProps })} exact={true}
                        />
            </Switch>
          </ConnectedRouter>
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
