import React, { useState } from 'react';
import Select from 'react-select';


const MultipleSelect = ({ selectedOptions, handleChange, options }) => {

  return (
      <Select
        Value={selectedOptions}
        isMulti
        name="raidMembers"
        options={options}
        className="basic-multi-select"
        classNamePrefix="select"
        onChange={handleChange}
      />
  );
};

export default MultipleSelect;
