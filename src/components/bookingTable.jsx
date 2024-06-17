import React, { useState, useRef } from "react";
import { Table, Button, message, Input, Space, Select } from "antd";
import { DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import axios from "../config/axios";
import "./styles/bookingTable.css";

const BookingTable = ({
  bookings,
  loading,
  selectedRowKeys,
  setSelectedRowKeys,
  fetchBookings,
}) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const handleDelete = async () => {
    try {
      await axios.delete(
        `/booking/deleteBooking/${bookings[selectedRowKeys[0]].id}`
      );
      message.success("Selected bookings deleted successfully");
      fetchBookings();
      setSelectedRowKeys([]);
    } catch (error) {
      console.error("Error deleting booking", error);
      message.error("Failed to delete selected bookings");
    }
  };

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownOpenChange: (open) => {
      if (open) {
        setTimeout(() => searchInput.current.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <span style={{ backgroundColor: "#ffc069", padding: 0 }}>{text}</span>
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "Booking_ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Arena ID",
      dataIndex: "arena_id",
      key: "arena_id",
      sorter: (a, b) => a.arena_id - b.arena_id,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Arena Name",
      dataIndex: "arena_name",
      key: "arena_name",
      ...getColumnSearchProps("arena_name"),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      ...getColumnSearchProps("date"),
    },
    { title: "Start Time", dataIndex: "time_start", key: "time_start" },
    { title: "End Time", dataIndex: "time_end", key: "time_end" },
    { title: "Duration", dataIndex: "duration", key: "duration" },
    { title: "Total Price", dataIndex: "total_price", key: "total_price" },
    { title: "Booking Status", dataIndex: "status", key: "status" },
    { title: "User ID", dataIndex: "user_id", key: "user_id" },
    // { title: "Username", dataIndex: "username", key: "username", ...getColumnSearchProps("username") },
    {
      title: "Firstname",
      dataIndex: "firstname",
      key: "firstname",
      ...getColumnSearchProps("firstname"),
    },
    {
      title: "Phone number",
      dataIndex: "phone",
      key: "phone",
      ...getColumnSearchProps("phone"),
    },
    { title: "Email", dataIndex: "email", key: "email" },
  ];

  const hasSelected = selectedRowKeys.length > 0;

  return (
    <div>
      <div className="dashboard-button">
        <Button
          type="primary"
          onClick={fetchBookings}
          disabled={!hasSelected}
          loading={loading}
          style={{
            backgroundColor: "#1677f",
            color: "#ffffff",
            marginLeft: "16px",
            fontWeight: 700,
            justifyContent: "center",
          }}
        >
          Reload
        </Button>
        <Button
          type="primary"
          onClick={handleDelete}
          disabled={!hasSelected}
          loading={loading}
          style={{
            backgroundColor: "#ff0000",
            color: "#ffffff",
            marginLeft: "16px",
            fontWeight: 700,
            justifyContent: "center",
          }}
        >
          Delete
        </Button>
        <span style={{ marginLeft: 16, color: "#ffffff" }}>
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
        </span>
      </div>
      <Table 
        rowSelection={rowSelection}
        columns={columns}
        dataSource={bookings.map((booking, index) => ({
          ...booking,
          key: index,
        }))}
        loading={loading}
      />
    </div>
  );
};

export default BookingTable;
