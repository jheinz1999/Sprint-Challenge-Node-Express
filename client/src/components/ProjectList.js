import React from 'react';
import axios from 'axios';

export default class ProjectList extends React.Component {

  constructor() {

    super();

    this.state = {

      projects: null,
      failed: false

    }

  }

  async componentDidMount() {

    try {

      const projects = await axios.get('http://localhost:5000/api/projects');
      this.setState({projects: projects.data});

    }

    catch (err) {

      this.setState({failed: true});

    }

  }

  render() {

    const { projects, failed } = this.state;

    if (failed)
      return <h1>Fetching of projects failed. Please try again.</h1>;

    return (

      <div className='project-list'>

        {projects ? projects.map(project => <h2>{project.name}</h2>) : <h2>Loading projects...</h2>}

      </div>

    );

  }

}
