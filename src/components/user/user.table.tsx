import { useEffect, useState } from 'react'
import { Button, message, notification, Popconfirm, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { PlusOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import CreateUserModal from './create.user.modal';
import UpdateUserModal from './update.user.modal';

export interface IUser {
    _id: string,
    email: string,
    name: string,
    password: string,
    role: string,
    address: string,
    age: string,
    gender: string,
    isVerify: boolean,
}

const UserTable = () => {
    const access_token = localStorage.getItem("access_token") as string;
    const [listUser, setListUser] = useState([]);
    const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
    const [dataUpdate, setDataUpdate] = useState<IUser | null>(null);

    useEffect(() => {
        getData()
    }, []);

    const getData = async () => {
        const res = await fetch('http://localhost:8000/api/v1/users/all',
            {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${access_token}`
                }
            }
        )
        const d = await res.json();
        if (!d.data) {
            notification.error({
                message: JSON.stringify(d.message)
            })
        }
        setListUser(d.data.result)
    }

    const handleDeleteUser = async (record: IUser) => {

        const res = await fetch(`http://localhost:8000/api/v1/users/${record._id}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${access_token}`
                }
            }
        )
        const d = await res.json();
        if (d.data) {
            message.success("Xoá thành công!");
            getData();
        } else {
            notification.error({
                message: "Có lỗi xảy ra!",
                description: JSON.stringify(d.message)
            });
        }
    }

    const columns: ColumnsType<IUser> = [
        {
            title: 'Email',
            dataIndex: 'email',
            render(_, record) {
                return (
                    <a href="#">{record.email}</a>
                )
            },
        },
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Role',
            dataIndex: 'role',
        },
        {
            title: 'Action',
            render(_, record) {
                return (
                    <div>
                        <button onClick={() => {
                            setDataUpdate(record);
                            setIsModalUpdateOpen(true);
                        }}>
                            Edit
                        </button>
                        <Popconfirm
                            title="Xoá người dùng"
                            description={<>Bạn có chắc chắn muốn xoá <strong>{record.name}</strong> không?</>}
                            onConfirm={() => {
                                handleDeleteUser(record)
                            }}
                            placement="left"
                            okText="Xoá"
                            cancelText="Huỷ"
                            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                        >
                            <Button
                                style={{ marginLeft: "20px" }}
                                danger
                            >Delete</Button>
                        </Popconfirm>
                    </div>
                )
            },
        },
    ];

    return (
        <div>
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
            }}>
                <h2>Table User</h2>
                <Button
                    type='primary'
                    onClick={() => {
                        setIsModalCreateOpen(true);
                    }}
                    icon={<PlusOutlined />}
                >
                    Thêm mới
                </Button>
            </div>
            <Table
                dataSource={listUser}
                columns={columns}
                rowKey={"_id"}
            />
            <CreateUserModal
                isModalCreateOpen={isModalCreateOpen}
                setIsModalCreateOpen={setIsModalCreateOpen}
                access_token={access_token}
                getData={getData}
            />
            <UpdateUserModal
                isModalUpdateOpen={isModalUpdateOpen}
                setIsModalUpdateOpen={setIsModalUpdateOpen}
                access_token={access_token}
                getData={getData}
                setDataUpdate={setDataUpdate}
                dataUpdate={dataUpdate}
            />
        </div >
    );
}

export default UserTable