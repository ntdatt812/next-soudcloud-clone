import { Input, Modal, notification } from "antd";
import { useState } from "react";

interface IProps {
    isModalCreateOpen: boolean;
    setIsModalCreateOpen: (v: boolean) => void;
    access_token: string;
    getData: () => void
}

const CreateUserModal = ({ isModalCreateOpen, getData, access_token, setIsModalCreateOpen }: IProps) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [address, setAddress] = useState("");
    const [role, setRole] = useState("");

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
            notification.success({
                message: "Tạo user thành công!"
            })
        } else {
            notification.error({
                message: "Có lỗi xảy ra",
                description: JSON.stringify(d.message)

            })
        }
    };

    const handleCloseCreateModal = () => {
        setIsModalCreateOpen(false);
        setName("");
        setEmail("");
        setPassword("");
        setAge("");
        setGender("");
        setAddress("");
        setRole("");
    };

    return (
        <div>
            <Modal
                title="Add new user"
                open={isModalCreateOpen}
                onOk={handleOk}
                onCancel={() => { handleCloseCreateModal() }}
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
        </div>
    )
}

export default CreateUserModal