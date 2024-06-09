import React, { useState, useEffect } from "react";
import { Button, Table, message, Form } from "antd";
import axios from "../../config/axios";
import "../styles/dashboard.css";
import AddArenaModal from "../../services/addArena";

const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/booking/getAllBooked");
      setBookings(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch bookings", error);
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Booking_ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Arena ID",
      dataIndex: "arena_id",
      key: "arena_id",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Start Time",
      dataIndex: "time_start",
      key: "time_start",
    },
    {
      title: "End Time",
      dataIndex: "time_end",
      key: "time_end",
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
    },
    {
      title: "Total Price",
      dataIndex: "total_price",
      key: "total_price",
    },
    {
      title: "User ID",
      dataIndex: "user_id",
      key: "user_id",
    },
  ];

  const start = () => {
    setLoading(true);
    fetchBookings();
    setSelectedRowKeys([]);
  };

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleDelete = async () => {
    setLoading(true);
    const key = Object.values(selectedRowKeys);
    try {
      // for (let key of selectedRowKeys) {
      //   await axios.delete(`/booking/deleteBooking/${bookings[key].id}`);
      // }

      await axios.delete(`/booking/deleteBooking/${bookings[key].id}`);
      message.success("Selected bookings deleted successfully");
      fetchBookings();
      setSelectedRowKeys([]);
    } catch (error) {
      console.error("Error deleting booking", error);
      message.error("Failed to delete selected bookings");
    } finally {
      setLoading(false);
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const body = {
        arena_name: values.arena_name,
        arena_location: values.arena_location,
        arena_players: values.arena_players,
        arena_priceHour: values.arena_priceHour,
      };
      await axios.post("/arena/newArena", body);
      message.success("Arena added successfully");
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error("Error adding arena", error);
      message.error("Failed to add arena");
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const hasSelected = selectedRowKeys.length > 0;

  return (
    <div className="dashboard">
      <div className="dashboard-button">
        <Button
          type="primary"
          onClick={start}
          disabled={!hasSelected}
          loading={loading}
          style={{
            backgroundColor: "#1677ff",
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

        <span
          style={{
            marginLeft: 32,
            color: "#ffffff",
          }}
        >
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

      <Button
        type="primary"
        onClick={showModal}
        style={{
          backgroundColor: "#1677ff",
          color: "#ffffff",
          fontWeight: 700,
          justifyContent: "center",
          marginTop: "16px",
          marginLeft: "8px",
          padding: "8px 8px  8px 8px",
          height: "48px",
        }}
      >
        Add Arena
      </Button>

      <AddArenaModal
        isModalVisible={isModalVisible}
        handleOk={handleOk}
        handleCancel={handleCancel}
        form={form}
      />
    </div>
  );
};

export default Dashboard;
