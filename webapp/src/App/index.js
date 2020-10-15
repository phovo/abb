import React, { Component, Suspense } from 'react';
import { Switch, Route, Router, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';

import '../../node_modules/font-awesome/scss/font-awesome.scss';

import Loader from './layout/Loader'
import Aux from "../hoc/_Aux";
import ScrollToTop from './layout/ScrollToTop';
import routes from "../_config/route";
import { history } from '../_helpers/history';

const AdminLayout = Loadable({
    loader: () => import('./layout/AdminLayout'),
    loading: Loader
});

class App extends Component {
    render() {
        const menu = routes.map((route, index) => {
          return (route.component) ? (
              <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  render={props => ( localStorage.getItem('token') ? 
                      <Redirect to={{ pathname: '/sku', state: { from: props.location } }}/> :
                      <route.component {...props} />
                  )} />
          ) : (null);
        });
        return (
            <Aux>
                <ScrollToTop>
                    <Suspense fallback={<Loader/>}>
                        <Router history={history}>
                        <Switch>
                            {menu}
                            <Route path="/" render={props => ( localStorage.getItem('token') ? 
                            <AdminLayout />:
                      <Redirect to={{ pathname: '/login', state: { from: props.location } }}/>
                  )}
                             />
                        </Switch>
                        </Router>
                    </Suspense>
                </ScrollToTop>
            </Aux>
        );
    }
   
}

export default App;
