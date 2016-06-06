"use strict";

import 'babel-polyfill';
import React                   from 'react';
import ReactDOM                from 'react-dom';
import { Provider }            from 'react-redux';
import Immutable               from 'immutable';
import _                       from 'lodash';
import $                       from 'jquery';

import routes                  from './routes';
import DevTools                from './dev/dev_tools';
import configureStore          from './store/configure_store';
import jwt                     from './loaders/jwt';
import QueryString             from './utils/query_string';
import { loadAssessment }      from './actions/assessment';

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();


class Root extends React.Component {
  render(){
    const devTools = __DEV__ ? <DevTools /> : null;
    const { store } = this.props;
    return (
      <Provider store={store}>
        <div>
          {routes}
          {devTools}
        </div>
      </Provider>
    );
  }
}

var settings = Immutable.fromJS(_.merge(window.DEFAULT_SETTINGS, QueryString.params()));

// Load the assessment
loadAssessment(settings, $('#srcData').text());

const store = configureStore({settings});

if (window.DEFAULT_SETTINGS.jwt){
  // Setup JWT refresh
  jwt(store.dispatch, window.DEFAULT_SETTINGS.userId);
}

ReactDOM.render(
  <Root store={store} />,
  document.getElementById("main-app")
);
