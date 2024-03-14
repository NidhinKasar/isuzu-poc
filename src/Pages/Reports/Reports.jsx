import React from 'react';
import { Table } from 'antd';

const dataSource = [
  { key: '1', name: 'John Doe', time: 28, emotion: 'Serious' },
  { key: '2', name: 'Jane Smith', time: 35, emotion: 'Casual' },
  { key: '3', name: 'Bob Johnson', time: 42, emotion: 'Very serious' },
];

const columns = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Time Spent(in min)', dataIndex: 'time', key: 'time' },
  { title: 'Emotion', dataIndex: 'emotion', key: 'emotion' },
];

const Reports = () => {
  return (
    <Table dataSource={dataSource} columns={columns} />
  );
};

export default Reports;
