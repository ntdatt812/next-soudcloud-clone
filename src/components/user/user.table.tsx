import { useEffect, useState } from 'react'
// import '../../styles/user.css'
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';

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

    return (
        <div>
            <h2>Table User</h2>
            <Table
                dataSource={listUser}
                columns={columns}
                rowKey={"_id"}
            />;
        </div>
    )
}

export default UserTable