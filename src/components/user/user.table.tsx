import { useEffect, useState } from 'react'
// import '../../styles/user.css'
import { Button, Modal, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { PlusOutlined } from '@ant-design/icons';
interface IUser {
    _id: string;
    name: string;
    email: string;
    role: string;
}

const UserTable = () => {
    const [listUser, setListUser] = useState([])
    useEffect(() => {

        getData()
    }, [])

    const getData = async () => {
        const access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0b2tlbiBsb2dpbiIsImlzcyI6ImZyb20gc2VydmVyIiwiX2lkIjoiNjgwMGY3NzkzY2U0MmVjOWExMGRmYzY1IiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJhZGRyZXNzIjoiVmlldE5hbSIsImlzVmVyaWZ5Ijp0cnVlLCJuYW1lIjoiSSdtIGFkbWluIiwidHlwZSI6IlNZU1RFTSIsInJvbGUiOiJBRE1JTiIsImdlbmRlciI6Ik1BTEUiLCJhZ2UiOjY5LCJpYXQiOjE3NDY4MDYxMjYsImV4cCI6MTgzMzIwNjEyNn0.kxHl6YROrRQ4Xvp706sc2sOmjuwy-KMrEie_cYLRkso"
        const res = await fetch('http://localhost:8000/api/v1/users/all',
            {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${access_token}`
                }
            }
        )
        const d = await res.json();
        setListUser(d.data.result)
    }

    const columns: ColumnsType<IUser> = [
        {
            title: 'Email',
            dataIndex: 'email',
            render(value, record) {
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
    ];

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

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
                    onClick={showModal}
                    icon={<PlusOutlined />}
                >Thêm mới</Button>
            </div>
            <Table
                dataSource={listUser}
                columns={columns}
                rowKey={"_id"}
            />
            <Modal
                title="Basic Modal"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        </div>
    )
}

export default UserTable