import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live';

import React from 'react';

const Test = () => {
  return (
    <LiveProvider code="<strong>Hello World!</strong>">
      <LiveEditor />
      <LiveError />
      <LivePreview />
    </LiveProvider>
  );
};

export default Test;
