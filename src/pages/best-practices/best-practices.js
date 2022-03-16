import * as AllPractices from 'BestPractices/index';

import { PracticePrinter, SimpleSelect } from 'Components/index';
import React, { useState } from 'react';

let options = [];

for (const key of Object.keys(AllPractices)) {
  // options.push(AllPractices[`${key}`]()); // Call function

  options.push({ value: `${key}`, label: `${key}` });
}

const BestPractices = () => {
  const [states, setStates] = useState({ a: '123', b: '456', picked: options[0].value });

  const handleChange = (event, stateName) => {
    setStates({ ...states, [`${stateName}`]: event.target.value });
  };

  return (
    <div>
      <h1>Đây là trang best-practice</h1>
      <SimpleSelect
        options={options}
        masterLabel="Practice list"
        handleChange={(e) => handleChange(e, 'picked')}
      />
      <PracticePrinter name={'test'} body={'test'} />
      <button
        onClick={(e) => {
          console.log({ ...states });
        }}>
        Click
      </button>
    </div>
  );
};

export default BestPractices;
