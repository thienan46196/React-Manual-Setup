import * as AllPractices from 'BestPractices/index';

import { PracticePrinter, Select } from 'Components/index';

import React from 'react';

let options = [];

for (const key of Object.keys(AllPractices)) {
  // options.push(AllPractices[`${key}`]()); // Call function

  options.push({ value: `${key}`, label: `${key}` });
}

const BestPractices = () => {
  const [picked, setPicked] = React.useState();
  return (
    <div>
      <h1>Đây là trang best-practice</h1>
      <Select options={options} masterLabel="Test thử xem sao" />
      <PracticePrinter name={'test'} body={'test'} />
    </div>
  );
};

export default BestPractices;
