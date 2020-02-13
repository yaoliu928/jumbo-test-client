import React from 'react';

const Card = (props) => {
  const {
    title, releaseMonth, releaseYear, posterPath, vote, id,
  } = props.movie;
  return (
    <div className="popular__card-list__card">
      <a href={`/movies/${id}`}>
        <img className="ui medium image" src={posterPath} alt="poster" />
      </a>
      <div className={`label ${vote >= 80 ? 'label--high' : `${vote >= 60 ? 'label--medium' : 'label--low'}`}`}>
        <p>
          {vote}
          %
        </p>
      </div>
      <h4>{title}</h4>
      <p>
        {releaseMonth}
        {' '}
        {releaseYear}
      </p>
    </div>
  );
};

export default Card;
