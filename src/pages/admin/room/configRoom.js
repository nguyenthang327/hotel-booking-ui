import { Table } from 'ant-design-vue';

export const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Mã",
    dataIndex: "code",
    key: "code",
  },
  {
    title: "Tên phòng",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Loại phòng",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "Giá",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Tình trạng",
    dataIndex: "status",
    key: "status",
  },
  // Table.EXPAND_COLUMN,
  {
    title: "",
    dataIndex: "action",
    key: "action",
  },
];