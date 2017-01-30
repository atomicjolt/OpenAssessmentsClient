// if you use jsx, you have to import React
import React                          from 'react';
import { Router, Route, IndexRoute }  from 'react-router';

import appHistory                     from './history';
import Index                          from './components/layout/index';
import HomePage                       from './components/_index';
import NotFound                       from './components/common/not_found';

export default (
  <Router history={appHistory}>
    <Route path="/" component={Index}>
      <IndexRoute component={HomePage} />
    </Route>
    <Route path="*" component={NotFound} />
  </Router>
);
