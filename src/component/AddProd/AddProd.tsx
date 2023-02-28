import { FC } from "react";
import { useCreateProductMutation } from "../../service/ProductService";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Upload } from "antd";

const { TextArea } = Input;

export const AddProd: FC<{ setOpen: any }> = ({ setOpen }) => {
  const [createProd, createProdResult] = useCreateProductMutation();
  const [form] = Form.useForm();

  const onFinish = async (val: any) => {
    setOpen(true);
    await createProd({ body: { ...val, img: val?.img?.file?.name } }).unwrap();
    form.resetFields();
  };

  const props = {
    name: "file",
    accept: ".txt, .csv",
    headers: {
      authorization: "authorization-text",
    },
  };

  return (
    <>
      <Form
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
      >
        <Form.Item
          label="ID"
          name="id"
          rules={[
            { required: true, message: "Bạn thiếu nhập ID cho sản phẩm" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Tên sản phẩm" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="Giá sản phẩm" name="price">
          <Input />
        </Form.Item>
        <Form.Item label="Mô tả sản phẩm" name="description">
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item label="Upload" name="img">
          <Upload listType="picture-circle" {...props}>
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};
