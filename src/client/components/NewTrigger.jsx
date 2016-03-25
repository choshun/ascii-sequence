import React from 'react';

const NewTrigger = ({onChange}) => (
  <div>
    <h3>New</h3>
    <input type="text" onKeyUp={onChange}/>
  </div>
)

export default NewTrigger;