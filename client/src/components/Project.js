import React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import './Project.scss';

const setCompleted = async (id, val, update) => {

  try {

    await axios.put(`http://localhost:5000/api/projects/${id}`, {completed: val});
    update();

  }

  catch (err) {

    console.log(err.response.data);

  }

}

export default withRouter(({data, update, history}) => {

  const { completed, description, name, id } = data;

  return (

    <div className='project' onClick={() => history.push(`/projects/${id}`)}>

      <h2>{name}</h2>
      <p>{description}</p>
      <span>Completed</span>
      <input
        type='checkbox'
        checked={completed}
        onClick={e => e.stopPropagation()}
        onChange={() =>setCompleted(id, !completed, update)}
      />

    </div>

  );

}
)
