import { Button, Form, Input, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { FC, Fragment, useEffect, useState } from "react";
import { Product } from "../../store/Products/ProductReducer";
import couple1 from "../../asset/couple1.jpg";
import couple2 from "../../asset/couple2.jpg";
import couple3 from "../../asset/couple3.jpg";
import couple4 from "../../asset/couple4.jpg";
import { useNavigate } from "react-router-dom";
import {
  useDeletedProductMutation,
  useUpdateProductMutation,
} from "../../service/ProductService";

export const ListProd: FC<{ prods: Product[] }> = ({ prods }) => {
  const [dataSource, setDataSource] = useState<Product[]>([]);
  const [edittingRow, setEdittingRow] = useState<any>(null);
  const [updateProd, updateProdResult] = useUpdateProductMutation();
  const [deleteProd, deleteProdResult] = useDeletedProductMutation();
  const renderImg: string[] = [
    `${couple1}`,
    `${couple2}`,
    `${couple3}`,
    `${couple4}`,
  ];
  const navigate = useNavigate();
  const [form] = Form.useForm();
  useEffect(() => {
    if (prods) {
      setDataSource(prods);
    }
  }, [prods]);

  const columns: ColumnsType<Product> = [
    {
      title: "ID",
      dataIndex: "id",
      align: "center",
      render: (val: string, record: Product) => (
        <Button
          type="link"
          onClick={() => {
            navigate(`/Product/${record.id}`);
          }}
        >
          {val ? val : ""}
        </Button>
      ),
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      align: "center",
      render: (val, record) => {
        if (edittingRow === record.id) {
          return (
            <Form.Item
              name="name"
              rules={[{ required: true, message: "Nhập tên sản phẩm" }]}
            >
              <Input value={record.name} />
            </Form.Item>
          );
        } else {
          return (
            <Button
              type="link"
              onClick={() => {
                navigate(`/Product/${record.id}`);
              }}
            >
              {val ? val : ""}
            </Button>
          );
        }
      },
    },
    {
      title: "Hình ảnh",
      dataIndex: "img",
      align: "center",
      render: (val: string) => (
        <>
          <img
            src={val ? val : renderImg[(Math.random() * renderImg.length) | 0]}
            alt="hình ảnh"
            style={{ width: 200, height: 200, objectFit: "cover" }}
          />
        </>
      ),
    },
    {
      title: "Giá",
      dataIndex: "price",
      align: "center",
      render: (val, record) => {
        if (edittingRow === record.id) {
          return (
            <Form.Item
              name="price"
              rules={[{ required: true, message: "Nhập giá sản phẩm" }]}
            >
              <Input value={record.price} />
            </Form.Item>
          );
        } else {
          return (
            <Button type="dashed" style={{ width: 100, overflow: "hidden" }}>
              ${val ? val : "000"}
            </Button>
          );
        }
      },
    },
    {
      title: "Mô tả sản phẩm",
      dataIndex: "description",
      align: "center",
      render: (val, record) => {
        if (edittingRow === record.id) {
          return (
            <Form.Item
              name="description"
              rules={[{ required: true, message: "Nhập mô tả sản phẩm" }]}
            >
              <Input value={record.description} />
            </Form.Item>
          );
        } else {
          return <p>{val}</p>;
        }
      },
    },
    {
      title: "Actions",
      dataIndex: "operation",
      align: "center",
      render: (_, record: Product) => (
        <>
          {record.id ? (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 10,
              }}
            >
              <Button
                type="primary"
                style={{ width: 80 }}
                onClick={() => {
                  setEdittingRow(record.id);
                }}
              >
                Edit
              </Button>
              {edittingRow ? (
                <Button type="primary" style={{ width: 80 }} htmlType="submit">
                  Save
                </Button>
              ) : (
                <Button
                  type="primary"
                  style={{ width: 80 }}
                  danger
                  onClick={() => handleDeleteProd(record.id)}
                >
                  Deleted
                </Button>
              )}
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 10,
              }}
            >
              <Button
                disabled
                style={{ width: 80 }}
                type="primary"
                onClick={() => {
                  setEdittingRow(record.id);
                }}
              >
                Edit
              </Button>
              <Button
                disabled
                style={{ width: 80 }}
                type="primary"
                danger
                onClick={() => handleDeleteProd(record.id)}
              >
                Deleted
              </Button>
            </div>
          )}
        </>
      ),
    },
  ];

  const handleDeleteProd = async (val: string) => {
    if (val) {
      await deleteProd({ id: val }).unwrap;
    }
  };

  const onFinish = async (val: any) => {
    if (val) {
      await updateProd({ id: edittingRow, body: val }).unwrap;
    }
    setEdittingRow(null);
  };

  return (
    <Form form={form} onFinish={onFinish}>
      <Table
        scroll={{ y: 600 }}
        columns={columns}
        pagination={{ position: ["bottomCenter"] }}
        dataSource={dataSource}
        rowKey="id"
      />
    </Form>
  );
};
