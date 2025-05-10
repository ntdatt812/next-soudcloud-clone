import { useEffect, useState } from 'react'
// import '../../styles/user.css'
import { Button, Input, Modal, notification, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { PlusOutlined } from '@ant-design/icons';
interface IUser {
    _id: string,
    email: string,
    name: string,
    role: string,
    address: string,
    age: number,
    gender: string,
    isVerify: boolean,
}

const UserTable = () => {
    const access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0b2tlbiBsb2dpbiIsImlzcyI6ImZyb20gc2VydmVyIiwiX2lkIjoiNjgwMGY3NzkzY2U0MmVjOWExMGRmYzY1IiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJhZGRyZXNzIjoiVmlldE5hbSIsImlzVmVyaWZ5Ijp0cnVlLCJuYW1lIjoiSSdtIGFkbWluIiwidHlwZSI6IlNZU1RFTSIsInJvbGUiOiJBRE1JTiIsImdlbmRlciI6Ik1BTEUiLCJhZ2UiOjY5LCJpYXQiOjE3NDY4OTM4NDgsImV4cCI6MTgzMzI5Mzg0OH0.CB7_HTAhiCFtlqbhfFxJdyW7hVdv3AikO-GOHITrJDk"

    const [listUser, setListUser] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [address, setAddress] = useState("");
    const [role, setRole] = useState("");


    useEffect(() => {
        getData()
    }, [])

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


    const handleOk = async () => {
        const data = {
            name, email, password, age, address, role, gender
        }
        console.log("check data", data);
        const res = await fetch('http://localhost:8000/api/v1/users',
            {
                method: "POST",
                body: JSON.stringify({ ...data }),
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${access_token}`
                }
            }
        )
        const d = await res.json();
        if (d.data) {
            getData();
            handleCloseCreateModal();
        } else {
            notification.error({
                message: "Có lỗi xảy ra",
                description: JSON.stringify(d.message)

            })
        }
        console.log(d)

    };
    const handleCloseCreateModal = () => {
        setIsModalOpen(false);
        setName("");
        setEmail("");
        setPassword("");
        setAge("");
        setGender("");
        setAddress("");
        setRole("");
    }

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
                        setIsModalOpen(true);
                    }}
                    icon={<PlusOutlined />}
                >Thêm mới</Button>
            </div>
            <Table
                dataSource={listUser}
                columns={columns}
                rowKey={"_id"}
            />
            <Modal
                title="Add new user"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={() => { setIsModalOpen(false); }}
                maskClosable={false}
            >
                <div>
                    <label>Name:</label>
                    <Input
                        value={name}
                        onChange={(event) => { setName(event.target.value) }}
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <Input
                        value={email}
                        onChange={(event) => { setEmail(event.target.value) }}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <Input
                        value={password}
                        onChange={(event) => { setPassword(event.target.value) }}
                    />
                </div>
                <div>
                    <label>Age:</label>
                    <Input
                        value={age}
                        onChange={(event) => { setAge(event.target.value) }}
                    />
                </div>
                <div>
                    <label>Gender:</label>
                    <Input
                        value={gender}
                        onChange={(event) => { setGender(event.target.value) }}
                    />
                </div>
                <div>
                    <label>Address:</label>
                    <Input
                        value={address}
                        onChange={(event) => { setAddress(event.target.value) }}
                    />
                </div>
                <div>
                    <label>Role:</label>
                    <Input
                        value={role}
                        onChange={(event) => { setRole(event.target.value) }}
                    />
                </div>
            </Modal >
        </div >
    )
}

export default UserTable