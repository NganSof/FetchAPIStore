import { Breadcrumb } from "antd";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { FC } from "react";
import { useParams } from "react-router-dom";
import "./Product.css";

export const Product: FC = () => {
  const { id } = useParams();
  return (
    <div className="bgProd">
      <div>
        <Breadcrumb className="headerBread">
          <Breadcrumb.Item href={"/"}>
            <HomeOutlined />
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <UserOutlined />
            <span style={{ cursor: "not-allowed" }}>Product {id}</span>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="contentProd">
        <p style={{ textAlign: "center" }}>Hiện chưa có thông tin chi tiết</p>
      </div>
    </div>
  );
};
