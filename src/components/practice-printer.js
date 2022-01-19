import React from 'react';

export const PracticePrinter = (props) => {
  const { name, body } = props;

  return (
    <div>
      <p>{name}</p>
      <div>{body}</div>
    </div>
  );
};
