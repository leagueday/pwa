import BasicLayout from '../BasicLayout';
import React from 'react';

const Fail = () => {
  return (
    <BasicLayout home>
      <div>
        <h1>Transaction failed</h1>
        <p>Please reload the page or try again later.</p>
      </div>
    </BasicLayout>
  );
};

export default Fail;
