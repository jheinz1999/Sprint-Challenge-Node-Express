import React from 'react';
import axios from 'axios';

import './ProjectPreview.scss';

const setCompleted = async (id, val, update) => {

  try {

    await axios.put(`http://localhost:5000/api/projects/${id}`, {completed: val});
    update();

  }

  catch (err) {

    console.log(err.response.data);

  }

}

export default ({data, update}) => {

  const { completed, description, name, id } = data;

  return (

    <div className='project'>

      <h2>{name}</h2>
      <p>{description}</p>
      <span>Completed</span>
      <input type='checkbox' checked={completed} onChange={() => setCompleted(id, !completed, update)} />

    </div>

  );

}
