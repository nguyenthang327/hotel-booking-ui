import { Table } from 'ant-design-vue'

export const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id'
  },
  {
    title: 'Tên người dùng',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email'
  },
  {
    title: 'Vai trò',
    dataIndex: 'role',
    key: 'role'
  },
  {
    title: 'Ngày tạo',
    dataIndex: 'created_at',
    key: 'created_at'
  },
  {
    title: 'Cập nhật',
    dataIndex: 'updated_at',
    key: 'updated_at'
  },
  {
    title: "",
    dataIndex: "action",
    key: "action",
  },
]
