import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import ProjectsView from './views/ProjectsView';
import ActionsView from './views/ActionsView';
import ProjectView from './views/ProjectView';
import ActionView from './views/ActionView';

class App extends Component {
  render() {
    return (
      <div className="app">

        <Route
          exact
          path='/projects'
          render={props => <ProjectsView {...props} />}
        />

        <Route
          exact
          path='/projects/:id'
          render={props => <ProjectView {...props} />}
        />

        <Route
          exact
          path='/actions'
          render={props => <ActionsView {...props} />}
        />

        <Route
          exact
          path='/actions/:id'
          render={props => <ActionView {...props} />}
        />

      </div>
    );
  }
}

export default App;
