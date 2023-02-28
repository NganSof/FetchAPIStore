import { FC, useState, useEffect } from "react";
import { useGetListProductsQuery } from "../../service/ProductService";
import { AutoComplete, Button, message, Modal, Select } from "antd";
import {
  FileExcelOutlined,
  PlusOutlined,
  ReloadOutlined,
  SettingOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import { ListProd } from "../../component/ListProd/ListProd";
import "./ListProducts.css";
import { Product } from "../../store/Products/ProductReducer";
import { AddProd } from "../../component/AddProd/AddProd";

export const ListProducts: FC = () => {
  const { data } = useGetListProductsQuery();
  const [stateData, setStateData] = useState<Product[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  useEffect(() => {
    setStateData(data ? data : []);
  }, [data]);
  // handleAddProd
  const showModal = () => {
    setOpen(true);
  };
  const hideModal = () => {
    setOpen(false);
  };
  // handle select
  const handleSelVal = (value: string) => {
    if (value.trim() !== "") {
      let ab = data?.filter((item: Product) => {
        if (item.name === value) return item;
      });
      setStateData(ab ? ab : []);
      return;
    }
    setStateData(data ? data : []);
    return;
  };

  // handle search
  const options = data?.map((opt) => {
    return { value: opt.name };
  });

  // handle onClick
  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: "success",
      content: "Chưa được chỉnh sửa",
      duration: 3,
      icon: <SmileOutlined style={{ color: "#108ee9" }} />,
    });
  };

  return (
    <div className="bodyList">
      {/* search and select */}
      <div className="header">
        <div className="headerSearch">
          <AutoComplete
            style={{ width: 600 }}
            options={options}
            placeholder="Tìm kiếm theo mã, tên sản phẩm..."
            onClick={(input: any) => {
              handleSelVal(input.target.innerHTML);
            }}
            filterOption={(inputValue, option) =>
              option!.value
                .trim()
                .toUpperCase()
                .indexOf(inputValue.toUpperCase()) !== -1
            }
          />
        </div>
        <div>
          {/* <Dropdown
            className="headerFilter"
            menu={{ items, onClick }}
            trigger={["click"]}
          >
            <Button className="fleFilter">
              <Space>Hiển thị</Space>
              <DownOutlined />
            </Button>
          </Dropdown> */}
          <Select
            showSearch
            style={{ width: 150 }}
            placeholder="Hiển thị"
            onClick={(input: any) => {
              handleSelVal(input.target.innerHTML);
            }}
            options={options}
          />
        </div>
      </div>
      {/* table products */}

      {/* CRUD */}
      <div className="table">
        <div className="listButton">
          <Button
            type="text"
            style={{ color: "green" }}
            icon={<FileExcelOutlined />}
            onClick={() => {
              success();
            }}
          />
          <Button
            type="text"
            style={{ color: "Cyan" }}
            icon={<PlusOutlined />}
            onClick={showModal}
          />
          <Button
            type="text"
            icon={<ReloadOutlined />}
            onClick={() => {
              success();
            }}
          />
          {contextHolder}
          <Button
            type="text"
            icon={<SettingOutlined />}
            onClick={() => {
              success();
            }}
          />
        </div>
        {/* table products */}
        <ListProd prods={stateData ? stateData : []} />
      </div>
      <Modal
        title="Add New Product"
        open={open}
        onCancel={hideModal}
        footer={null}
      >
        <AddProd setOpen={hideModal} />
      </Modal>
    </div>
  );
};
