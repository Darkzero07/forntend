import React, { useState, useEffect } from "react";
import { Button, Table, message, Form } from "antd";
import axios from "../../config/axios";
import "../styles/dashboard.css";
import AddArenaModal from "../../services/addArena";
import UpdateArenaModal from "../../services/updateArena";
import UpdateBookingModal from "../../services/updateBooking";
import DeleteOutlined from "@ant-design/icons";

const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [isUpdateBookingModalVisible, setIsUpdateBookingModalVisible] = useState(false);
  const [form] = Form.useForm();

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

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);

    try {
      const responseBooking = await axios.get("/booking/getAllBooked");
      const responeUser = await axios.get("/user/getAllUser");
      const bookingsData = responseBooking.data;
      const usersData = responeUser.data;
      const combinedData = bookingsData.map((booking) => {
        const user = usersData.find((user) => user.id === booking.user_id);
        return {
          ...booking,
          username: user?.username,
          firstname: user?.firstname,
          phone: user?.phone,
          email: user?.email,
        };
      });

      setBookings(combinedData);

      for (const booking of combinedData) {
        if (booking.status === "") {
          const responseSlip = await axios.get(`/slip/getSlip/${booking.id}`);
          const pathSlip = responseSlip.data[0]?.slip_path;
          if (pathSlip) {
            const bookingStatus = { status: pathSlip };
            await axios.put(
              `/booking/updateBooking/${booking.id}`,
              bookingStatus
            );
          }
        }
      }

      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch bookings", error);
      setLoading(false);
    }
  };

  const key = Object.values(selectedRowKeys);

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
      title: "Booking Satatus",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "User ID",
      dataIndex: "user_id",
      key: "user_id",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Firstname",
      dataIndex: "firstname",
      key: "firstname",
    },
    {
      title: "Phone number",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
  ];

  const handleDelete = async () => {
    setLoading(true);
    try {
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

  const handleAddOk = async () => {
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

  const handleDeleteArena = async () => {
    setLoading(true);
    try {
      await axios.delete(`/arena/delete/${bookings[key].arena_id}`);
      message.success("Selected arena deleted successfully");
      fetchBookings();
      setSelectedRowKeys([]);
    } catch (error) {
      console.error("Error deleting arena", error);
      message.error("Failed to delete selected arena");
    } finally {
      setLoading(false);
    }
  };

  const showUpdateModal = () => {
    if (selectedRowKeys.length === 1) {
      setIsUpdateModalVisible(true);
    } else {
      message.error("Please select exactly one booking to update");
    }
  };

  const handleUpdateOk = async () => {
    try {
      const values = await form.validateFields();
      const body = {
        arena_name: values.arena_name,
        arena_location: values.arena_location,
        arena_players: values.arena_players,
        arena_priceHour: values.arena_priceHour,
      };
      await axios.put(`/arena/updateArena/${bookings[key].arena_id}`, body);
      message.success("Arena updated successfully");
      setIsUpdateModalVisible(false);
      form.resetFields();
      fetchBookings();
    } catch (error) {
      console.error("Error updating arena", error);
      message.error("Failed to update arena");
    }
  };

  const handleUpdateCancel = () => {
    setIsUpdateModalVisible(false);
    form.resetFields();
  };

  const hasSelected = selectedRowKeys.length > 0;

  const showUpdateBookingModal = () => {
    if (selectedRowKeys.length === 1) {
      setIsUpdateBookingModalVisible(true);
    } else {
      message.error("Please select exactly one booking to update");
    }
  };

  const handleUpdateBookingOk = async () => {
    console.log(bookings[key].id);
    if (!bookings[key]) {
      message.error("Selected booking not found");
      return;
    }
    try {
      const values = await form.validateFields();
      const bookingBody = {
        arena_id: values.arena_id,
        date: values.date,
        time_start: values.time_start,
        time_end: values.time_end,
        duration: values.duration,
        total_price: values.total_price,
        status: values.status,
      };
      await axios.put(
        `/booking/updateBooking/${bookings[key].id}`,
        bookingBody
      );
      message.success("Booking updated successfully");
      setIsUpdateBookingModalVisible(false);
      form.resetFields();
      fetchBookings();
    } catch (error) {
      console.error("Error updating booking", error);
      message.error("Failed to update booking");
    }
  };

  const handleUpdateBookingCancel = () => {
    setIsUpdateBookingModalVisible(false);
    form.resetFields();
  };

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
            marginLeft: 16,
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

      <div className="button-controller">
        <Button
          type="primary"
          onClick={showModal}
          style={{
            backgroundColor: "#4ABB47",
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
          handleOk={handleAddOk}
          handleCancel={handleCancel}
          form={form}
        />

        <Button
          type="primary"
          onClick={showUpdateModal}
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
          Update Arena
        </Button>
        <UpdateArenaModal
          isModalVisible={isUpdateModalVisible}
          handleOk={handleUpdateOk}
          handleCancel={handleUpdateCancel}
          form={form}
        />

        <Button
          type="primary"
          onClick={showUpdateBookingModal}
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
          Update Booking
        </Button>
        <UpdateBookingModal
          isModalVisible={isUpdateBookingModalVisible}
          handleOk={handleUpdateBookingOk}
          handleCancel={handleUpdateBookingCancel}
          form={form}
        />

        <Button
          onClick={handleDeleteArena}
          style={{
            backgroundColor: "#ff0000",
            color: "#ffffff",
            fontWeight: 700,
            justifyContent: "center",
            marginTop: "16px",
            marginLeft: "16px",
            padding: "8px 8px  8px 8px",
            height: "48px",
          }}
        >
          Delete Arena
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
