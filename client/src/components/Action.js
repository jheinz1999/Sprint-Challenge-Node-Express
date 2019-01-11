import React from 'react';
import axios from 'axios';

import './Action.scss';

const setCompleted = async (id, val, update) => {

  console.log(id);

  try {

    await axios.put(`http://localhost:5000/api/actions/${id}`, {completed: val});
    update();

  }

  catch (err) {

    console.log(err.response.data);

  }

}

export default ({data, update}) => {

  const { description, notes, completed, id } = data;

  return (

    <li className='action'>

    <p>{description}</p>

    <p>{notes}</p>

    <span>Completed</span>

    <input
      type='checkbox'
      checked={completed}
      onChange={() => setCompleted(id, !completed, update)}
    />

    </li>

  );

}
