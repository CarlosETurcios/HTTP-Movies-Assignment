import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateMovie = props => {
  const [update, setUpdate] = useState({
    id: '',
    title: '',
    director: '',
    metascore: '',
    stars: []
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${props.match.params.id}`)
      .then(res => {
        console.log(res.data);
        setUpdate(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  const handleChange = e => {
    e.preventDefault();
    setUpdate({
      ...update,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    axios
      .put(`http://localhost:5000/api/movies/${update.id}`, update)
      .then(res => {
        setUpdate(res.data);
      })
      .catch(err => console.error(err));
    props.history.push('/');
  };

  return (
    <div className='update-form'>
      <input
        type='text'
        name='title'
        value={update.title}
        placeholder='Title'
        onChange={handleChange}
      />
      <input
        type='text'
        name='director'
        value={update.director}
        placeholder='Director'
        onChange={handleChange}
      />

      <input
        type='text'
        name='metascore'
        value={update.metascore}
        placeholder='Metascore'
        onChange={handleChange}
      />
      <button onClick={handleSubmit}>Update Movie</button>
    </div>
  );
};
export default UpdateMovie;
