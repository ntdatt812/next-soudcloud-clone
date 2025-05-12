import { Form, Input, InputNumber, Modal, notification, Select } from "antd";
import { Option } from "antd/es/mentions";
import { IUser } from "./user.table";


interface IProps {
    isModalCreateOpen: boolean;
    setIsModalCreateOpen: (v: boolean) => void;
    access_token: string;
    getData: () => void
}

const CreateUserModal = ({ isModalCreateOpen, getData, access_token, setIsModalCreateOpen }: IProps) => {
    const [form] = Form.useForm()

    const onFinish = async (values: IUser) => {
        const res = await fetch('http://localhost:8000/api/v1/users',
            {
                method: "POST",
                body: JSON.stringify(values),
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${access_token}`
                }
            }
        )
        const d = await res.json();
        if (d.data) {
            getData();
            handleCloseModal();
            notification.success({
                message: "Tạo user thành công!"
            })
        } else {
            notification.error({
                message: "Có lỗi xảy ra",
                description: JSON.stringify(d.message)

            });
        }
    };

    const handleCloseModal = () => {
        setIsModalCreateOpen(false);
        form.resetFields();
    }


    return (
        <div>
            <Modal
                title="Add new user"
                open={isModalCreateOpen}
                onOk={() => form.submit()}
                onCancel={() => { setIsModalCreateOpen(false); }}
                maskClosable={false}
            >
                <Form
                    form={form}
                    name="create-user"
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
                        rules={[{ required: true, message: 'Please input user password!' }]}
                    >
                        <Input.Password />
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
                            <Option value="MALE">Male</Option>
                            <Option value="FEMALE">Female</Option>
                            <Option value="OTHER">Other</Option>
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
                            <Option value="ADMIN">Admin</Option>
                            <Option value="USER">User</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal >
        </div >
    )
}

export default CreateUserModal