import { Form, Input, InputNumber, Modal, notification, Select } from "antd";
import { useEffect } from "react";
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
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue(dataUpdate);
    }, [dataUpdate])

    const handleCloseUpdateModal = () => {
        setIsModalUpdateOpen(false);
        setDataUpdate(null)
        form.resetFields();
    };

    const onFinish = async (values: IUser) => {
        const { address, age, email, gender, name, password, role } = values;
        const _id = dataUpdate?._id
        const data = { _id, address, age, email, gender, name, password, role }
        const res = await fetch('http://localhost:8000/api/v1/users',
            {
                method: "PATCH",
                body: JSON.stringify(data),
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

    return (
        <div>
            <Modal
                title="Update a user"
                open={isModalUpdateOpen}
                onOk={() => form.submit()}
                onCancel={() => { handleCloseUpdateModal() }}
                maskClosable={false}
            >
                {dataUpdate && (
                    <Form
                        form={form}
                        name="update-user"
                        onFinish={onFinish}
                        layout="vertical"
                    >
                        <Form.Item
                            style={{ marginBottom: "5px" }}
                            label="Name"
                            name="name"
                            rules={[{ required: true, message: 'Please input user name!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            style={{ marginBottom: "5px" }}
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: 'Please input user email!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            style={{ marginBottom: "5px" }}
                            label="Password"
                            name="password"
                        >
                            <Input.Password disabled />
                        </Form.Item>
                        <Form.Item
                            style={{ marginBottom: "5px" }}
                            label="Age"
                            name="age"
                            rules={[{ required: true, message: 'Please input user age!' }]}
                        >
                            <InputNumber
                                controls={false}
                                style={{ width: "100%" }}
                            />
                        </Form.Item>
                        <Form.Item
                            style={{ marginBottom: "5px" }}
                            label="Address"
                            name="address"
                            rules={[{ required: true, message: 'Please input user address!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            style={{ marginBottom: "5px" }}
                            label="Gender"
                            name="gender"
                            rules={[{ required: true, message: 'Please select user gender!' }]}
                        >
                            <Select
                                placeholder="Select user gender"
                                allowClear
                            >
                                <Select.Option value="MALE">Male</Select.Option>
                                <Select.Option value="FEMALE">Female</Select.Option>
                                <Select.Option value="OTHER">Other</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            style={{ marginBottom: "5px" }}
                            label="Role"
                            name="role"
                            rules={[{ required: true, message: 'Please select user role!' }]}
                        >
                            <Select
                                placeholder="Select user role"
                                allowClear
                            >
                                <Select.Option value="ADMIN">Admin</Select.Option>
                                <Select.Option value="USER">User</Select.Option>
                            </Select>
                        </Form.Item>
                    </Form>)}
            </Modal >
        </div>
    )
}

export default UpdateUserModal