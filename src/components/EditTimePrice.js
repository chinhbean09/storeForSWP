import React, { useEffect, useState } from 'react';
import { Form, Input, InputNumber, Popconfirm, Table, Typography, Button, Modal, Alert } from 'antd';
import ModalTime  from './ModalTime';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {Switch} from 'antd';

const URL = "https://magpie-aware-lark.ngrok-free.app/api/v1/store";
const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    min,
    ...restProps
}) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;

    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{
                        margin: 0,
                    }}
                    rules={[
                        {
                            required: true,
                            message: `Vui lòng nhập ${title}!`,
                        },
                    ]}>
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};
const EditTimePrice = () => {
    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const [form] = Form.useForm();


    const [editingKey, setEditingKey] = useState('');
    const { userInfoDTO } = useSelector((state) => state.auth);

    useEffect(() => {
        getPricesOfTime(userInfoDTO.id);
    }, []);

    console.log(data)

    //lấy tất cả giá 
    const getPricesOfTime = async (id) => {
        try {
            const res = await axios.get(`${URL}/store-time`, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('access_token'))}`,
                    Accept: "application/json",
                    "Access-Control-Allow-Origin": "*",
                    'ngrok-skip-browser-warning': 'true'
                },
            });
            if (res.status === 200) {
                setData(res.data);
            }
        } catch (error) {
            console.error("Error in getPricesOfTime:", error);
        }
    }



    const updateTime = async (id, data) => {
        try {
            const res = await axios.put(`${URL}/store-time/update/${id}`,data, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('access_token'))}`,
                    Accept: "application/json",
                    "Access-Control-Allow-Origin": "*",
                    'ngrok-skip-browser-warning': 'true'
                },
            });
            if (res.status === 200) {
                toast.success(`Cập nhật thành công !!!`);
                getPricesOfTime(userInfoDTO.id);
                navigate('/admin/manage-time');
            }
        } catch (error) {
            console.error("Error in updateTime:", error);
        }
    };
    

    const isEditing = (record) => record.key === editingKey;

    const edit = (record) => {
        form.setFieldsValue({
            price: '',
            dateRange:'',
            ...record,
        });
        setEditingKey(record.key);
    };
    const cancel = () => {
        setEditingKey('');
    };

    const save = async (key) => {
        try {
            const row = await form.validateFields();
            const newData = [...dataSource];
            const index = newData.findIndex((item) => key === item.key);
            if (index > -1) {
                const item = newData[index];
            newData.splice(index, 1, {
                ...item,
                ...row,
            });
                updateTime(key, row)
                setData(newData);
                setEditingKey('');
            } else {
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
       
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            width: '20%',
            
        },
        {
            title: 'Time Range',
            dataIndex: 'dateRange',
            width: '20%',
            editable: true,
        },
        {
            title: 'Price',
            dataIndex: 'price',
            width: '20%',
            editable: true,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            width: '15%',
            
        },
        {
            title: 'Operation',
            dataIndex: 'operation',

            render: (_, record) => {
console.log(record)
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Typography.Link
                            onClick={() => save(record.key)}
                            style={{
                                marginRight: 8,
                            }}
                        >
                            Save
                        </Typography.Link>

                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                            <a style={{ color: "red" }}>Cancel</a>
                        </Popconfirm>
                    </span>
                ) : (<div className='px-1'>
                    <Typography.Link disabled={editingKey !== ''} style={{
                        marginRight: 8,
                    }} onClick={() => edit(record)}>
                        Edit
                    </Typography.Link>

                    
                    <span>
                        {dataSource.length >= 1 ? (
                            <Popconfirm disabled={editingKey !== ''} title="Sure to delete?" onConfirm={() => (record.key)} >
                                <a style={{ color: "red" }}></a>
                            </Popconfirm>
                        ) : null}

                    </span>

                </div>
                );
            },
        },
    ];
    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: col.dataIndex === 'dateRange' ? 'text' : 'number',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
                min: col.dataIndex === 'price' ? 10 : 1
            }),
        };
    });
    const [switchStates, setSwitchStates] = useState(
        data.reduce((acc, data) => ({ ...acc, [data.id]: data.status }), {})
      );
    
      useEffect(() => {
        setSwitchStates(
          data.reduce((acc, data) => ({ ...acc, [data.id]: data.status }), {})
        );
      }, [data]);
    
      const handleToggle = (id) => {
        setSwitchStates((prevStates) => {
          const newStatus = prevStates[id] === 0 ? 1 : 0;
          axios
            .put(
              `https://magpie-aware-lark.ngrok-free.app/api/v1/store/store-time/${id}?status=${newStatus}`,
              {
                status: newStatus,
              },
              {
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('access_token'))}`,
                    Accept: "application/json",
                    "Access-Control-Allow-Origin": "*",
                    'ngrok-skip-browser-warning': 'true'
    
                },
            }
            )
            .then((response) => {
              console.log("Success:", response.data);
              setData((prevData) =>
                prevData.map((data) =>
                  data.id === id ? { ...data, status: newStatus } : data
                )
              );
              
            })
            .catch((error) => {
              console.error("Error:", error);
           
            });
    
          return { ...prevStates, [id]: newStatus };
        });
      };
    

      const dataSource = data.map((item) => ({
        key: item.id,
        name: item.timeCategory ? item.timeCategory.name : '',
        dateRange: item.dateRange,
        price: item.price,
        status: (
            <Switch
                checked={switchStates[item.id] === 1}
                onChange={() => handleToggle(item.id)}
                color="warning"
                className="custom-icon"
            />
        ),
    }));

    return (
        <div className='p-4'>
            <div className='p-3 d-flex float-end'>
                <Button
                    type="primary"
                    onClick={() => {
                        setOpen(true);
                    }}
                >
                    Thêm giá mới
                </Button>
                <ModalTime
                    open={open}
                    onCreate={save}
                    onCancel={() => {
                        setOpen(false);
                    }}
                    reset={() => {
                        getPricesOfTime(userInfoDTO.id)
                    }}
                />
            </div>

            {data.length === 0 ? (
                <Alert
                    message="Chưa có phương thức giao hàng cho cửa hàng."
                    type="info"
                    showIcon
                />
            ) : (
                <Form form={form} component={false}>
                    <Table
                        components={{
                            body: {
                                cell: EditableCell,
                            },
                        }}
                        bordered
                        dataSource={dataSource}
                        columns={mergedColumns}
                        rowClassName="editable-row"
                        pagination={false}
                    />
                </Form>
            )}
        </div>
    );
};
export default EditTimePrice;