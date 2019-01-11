import React, { Component } from 'react';
import { Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="app">

        <Route
          exact
          path='/projects'
          render={props => <h1>Projects</h1>}
        />

        <Route
          exact
          path='/projects/:id'
          render={props => <h1>Specific Project</h1>}
        />

        <Route
          exact
          path='/actions'
          render={props => <h1>Actions</h1>}
        />

        <Route
          exact
          path='/actions/:id'
          render={props => <h1>Specific actions</h1>}
        />

      </div>
    );
  }
}

export default App;
