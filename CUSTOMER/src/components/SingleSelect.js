

import { Select} from 'antd';
const Option = Select.Option;
function SingleSelect(props) {
  const { options, name, onChange} = props;
  
  const onSearch = (value) => {
    console.log('search:', value);
  };

 


  // Filter `option.label` match the user type `input`
  const filterOption = (input, option) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
  
    return (
    <Select
      showSearch
      placeholder="Vui lòng chọn giá trị"
      optionFilterProp="children"
      onChange={onChange}
      onSearch={onSearch}
      filterOption={filterOption}
      options={options}
      name={name}
      allowClear={true}
     >
      <Option value="all">---SELECT ALL---</Option>
    </Select>
    
  );
}
export default SingleSelect;