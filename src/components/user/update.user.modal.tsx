import { Input, Modal, notification } from "antd";
import { useEffect, useState } from "react";
import { IUser } from "./user.table";

interface IProps {
    isModalUpdateOpen: boolean;
    setIsModalUpdateOpen: (v: boolean) => void;
    access_token: string;
    getData: () => void;
    dataUpdate: IUser | null;
    setDataUpdate: (v: IUser | null) => void;
}
const UpdateUserModal = ({
    setDataUpdate,
    isModalUpdateOpen,
    getData,
    access_token,
    setIsModalUpdateOpen,
    dataUpdate
}: IProps) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [address, setAddress] = useState("");
    const [role, setRole] = useState("");

    useEffect(() => {
        if (dataUpdate) {
            setName(dataUpdate?.name);
            setEmail(dataUpdate?.email);
            setAge(dataUpdate?.age);
            setGender(dataUpdate?.gender);
            setAddress(dataUpdate?.address);
            setRole(dataUpdate?.role);
        }
    }, [dataUpdate])
    const handleOk = async () => {
        const _id = dataUpdate?._id
        const data = {
            _id, name, email, age, address, role, gender
        }
        console.log("check data", data);
        const res = await fetch('http://localhost:8000/api/v1/users',
            {
                method: "PATCH",
                body: JSON.stringify({ ...data }),
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${access_token}`
                }
            }
        )
        const d = await res.json();
        if (d.data) {
            await getData();
            handleCloseUpdateModal();
            notification.success({
                message: "Cập nhật user thành công!"
            })
        } else {
            notification.error({
                message: "Có lỗi xảy ra",
                description: JSON.stringify(d.message)

            })
        }
    };

    const handleCloseUpdateModal = () => {
        setIsModalUpdateOpen(false);
        setName("");
        setEmail("");
        setAge("");
        setGender("");
        setAddress("");
        setRole("");
        setDataUpdate(null)
    };

    return (
        <div>
            <Modal
                title="Update a user"
                open={isModalUpdateOpen}
                onOk={handleOk}
                onCancel={() => { handleCloseUpdateModal() }}
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

export default UpdateUserModal