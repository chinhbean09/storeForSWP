
import React, { useState } from 'react';
import { Select } from 'antd';
function MultipleSelect(props) {
  //  const [selectedValue, setSelectedValue] = useState([]);
  const { options, name, onChange } = props

  //  const handleChange = (e) => {
  //      setSelectedValue(e);

  // }


  return (



    <Select
      mode="multiple"
      size='small'
      placeholder="Vui lòng chọn giá trị"
      options={options}
      onChange={onChange}
      name="materials"
      allowClear={true}

    />

  );

}

export default MultipleSelect;