import React from 'react';

import ProjectList from '../components/ProjectList';

import './ProjectsView.scss';

export default props => {

  return (

    <div className='projects-page'>

      <h1>Projects</h1>

      <ProjectList />

    </div>

  )

}
