import React, { useEffect, useState } from 'react';
import { Form, Input, InputNumber, Popconfirm, Table, Typography, Button, Modal } from 'antd';
import ModalForm from './ModalForm';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const URL = "https://magpie-aware-lark.ngrok-free.app/api/v1/store/standard-service";
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
                    ]}

                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};
const TableEditable = () => {


    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const [form] = Form.useForm();


    const [editingKey, setEditingKey] = useState('');
    const { userInfoDTO } = useSelector((state) => state.auth);
    useEffect(() => {
        getPricesOfStandardService(userInfoDTO.id);
        console.log(getPricesOfStandardService);
    }, []);

    const getPricesOfStandardService = async (id) => {
        const res = await axios.get(`${URL}/prices?store=${id}`, {
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
    }



    const updateService = async (id, data) => {
        const res = await axios.put(`${URL}/prices/update/${id}`, data, {
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('access_token'))}`,
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
                'ngrok-skip-browser-warning': 'true'

            },
        });
        if (res.status === 200) {
            toast.success(`Cập nhật thành công !!!`);
            getPricesOfStandardService(userInfoDTO.id);
            navigate('/admin/laundry');
        }
    }
    const deleteService = async (id) => {
        const res = await axios.delete(`${URL}/prices/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('access_token'))}`,
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
                'ngrok-skip-browser-warning': 'true'

            },
        });
        if (res.status === 200) {
            toast.success(`Xóa thành công !!!`);
            getPricesOfStandardService(userInfoDTO.id);
            navigate('/admin/laundry');
        }
    }

    const isEditing = (record) => record.key === editingKey;
    const edit = (record) => {
        form.setFieldsValue({
            from: '',
            to: '',
            price: '',
            unit: '',
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
                updateService(key, row)
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
            title: 'Từ',
            dataIndex: 'from',
            width: '15%',
            editable: true,
        },
        {
            title: 'Đến',
            dataIndex: 'to',
            width: '15%',
            editable: true,
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            width: '20%',
            editable: true,
        },
        {
            title: 'Đơn vị',
            dataIndex: 'unit',
            width: '10%',
            editable: true,
        },
        {
            title: 'operation',
            dataIndex: 'operation',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Typography.Link
                            onClick={() => save(record.key)}
                            style={{
                                marginRight: 8,
                            }}
                        >
                            Lưu
                        </Typography.Link>
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                            <a style={{ color: "red" }}>Hủy</a>
                        </Popconfirm>
                    </span>
                ) : (<div className='px-1'>
                    <Typography.Link disabled={editingKey !== ''} style={{
                        marginRight: 8,
                    }} onClick={() => edit(record)}>
                        Chỉnh sửa
                    </Typography.Link>

                    <span>
                        {dataSource.length >= 1 ? (
                            <Popconfirm disabled={editingKey !== ''} title="Sure to delete?" onConfirm={() => deleteService(record.key)} >
                                <a style={{ color: "red" }}>Xóa</a>
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
                inputType: col.dataIndex === 'unit' ? 'text' : 'number',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
                min: col.dataIndex === 'price' ? 10000 : 1
            }),
        };
    });


    const dataSource = []
    for (let i = 0; i < data.length; i++) {
        dataSource.push({
            key: data[i].id,
            from: data[i].from,
            to: data[i].to,
            price: data[i].price,
            unit: data[i].unit,
        })
    }

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
                <ModalForm
                    open={open}
                    onCreate={save}
                    onCancel={() => {
                        setOpen(false);
                    }}
                    reset={() => {
                        getPricesOfStandardService(userInfoDTO.id)
                    }}
                    

                />
            </div>

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

        </div>

    );
};
export default TableEditable;