import React from 'react';
import axios from 'axios';

import ProjectPreview from './ProjectPreview';

import './ProjectList.scss';

export default class ProjectList extends React.Component {

  constructor() {

    super();

    this.state = {

      projects: null,
      failed: false

    }

  }

  fetchData = async () => {

    try {

      const projects = await axios.get('http://localhost:5000/api/projects');
      this.setState({projects: projects.data});

    }

    catch (err) {

      this.setState({failed: true});

    }

  }

  componentDidMount() {

    this.fetchData();

  }

  render() {

    const { projects, failed } = this.state;

    if (failed)
      return <h1>Fetching of projects failed. Please try again.</h1>;

    return (

      <div className='project-list'>

        {projects ? projects.map(project =>
          <ProjectPreview
            key={project.id}
            data={project}
            update={this.fetchData}
          />) : <h2>Loading projects...</h2>}

      </div>

    );

  }

}
