import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router';

import Project from '../components/Project';
import Action from '../components/Action';

import './ProjectView.scss';

class ProjectView extends React.Component {

  constructor() {

    super();

    this.state = {

      project: null

    }

  }

  componentDidMount() {

    this.fetchData();

  }

  fetchData = async () => {

    try {

      const project = await axios.get(`http://localhost:5000/api/projects/${this.props.match.params.id}`);
      this.setState({project: project.data});

    }

    catch (err) {

      console.log(err.response.message);

    }

  }

  render() {

    const { project } = this.state;

    return (

      <div className='project-page'>

        <h1>{project ? project.name : 'Loading project...'}</h1>

        {project && <Project data={project} />}
        {project && <ul>{project.actions.map((action, id) => <Action data={action} key={id} update={this.fetchData} />)}</ul>}

      </div>

    )

  }

}

export default withRouter(ProjectView);
