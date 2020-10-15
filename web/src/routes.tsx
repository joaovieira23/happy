import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import InstitutionMap from './pages/InstitutionMap';
import Institutions from './pages/Institutions';
import CreateInstitution from './pages/CreateInstitution';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/app" component={InstitutionMap} />

        <Route path="/institutions/create" component={CreateInstitution} />
        <Route path="/institutions/:id" component={Institutions} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;