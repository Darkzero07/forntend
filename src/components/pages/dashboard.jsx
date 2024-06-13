import React, { useState, useEffect } from "react";
import { Button, message, Form } from "antd";
import axios from "../../config/axios";
import "../styles/dashboard.css";
import AddArenaModal from "../addArenaModal";
import UpdateArenaModal from "../updateArenaModal";
import UpdateBookingModal from "../updateBookingModal";
import BookingTable from "../bookingTable";

const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [isUpdateBookingModalVisible, setIsUpdateBookingModalVisible] =
    useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);

    try {
      const responseBooking = await axios.get("/booking/getAllBooked");
      const responseUser = await axios.get("/user/getAllUser");
      const responseArena = await axios.get("/arena/getArenas");
      const bookingsData = responseBooking.data;
      const usersData = responseUser.data;
      const arenaData = responseArena.data;

      const updatedBookingsData = await Promise.all(
        bookingsData.map(async (booking) => {
          let pathSlip = booking.status;

          if (booking.status === "") {
            const responseSlip = await axios.get(`/slip/getSlip/${booking.id}`);
            pathSlip = responseSlip.data[0]?.slip_path || "";
            if (pathSlip) {
              const bookingStatus = { status: pathSlip };
              await axios.put(
                `/booking/updateBooking/${booking.id}`,
                bookingStatus
              );
            }
          }

          const user = usersData.find((user) => user.id === booking.user_id);
          const arena = arenaData.find(
            (arena) => arena.id === booking.arena_id
          );

          return {
            ...booking,
            username: user?.username,
            firstname: user?.firstname,
            phone: user?.phone,
            email: user?.email,
            status: booking?.status,
            arena_name: arena?.arena_name,
          };
        })
      );

      setBookings(updatedBookingsData);
    } catch (error) {
      console.error("Failed to fetch bookings", error);
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
      fetchBookings();
    } catch (error) {
      console.error("Error adding arena", error);
      message.error("Failed to add arena");
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
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
      await axios.put(
        `/arena/updateArena/${bookings[selectedRowKeys[0]].arena_id}`,
        body
      );
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

  const showUpdateBookingModal = () => {
    if (selectedRowKeys.length === 1) {
      setIsUpdateBookingModalVisible(true);
    } else {
      message.error("Please select exactly one booking to update");
    }
  };

  const handleUpdateBookingOk = async () => {
    if (!bookings[selectedRowKeys[0]]) {
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
        `/booking/updateBooking/${bookings[selectedRowKeys[0]].id}`,
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

  const handleDeleteArena = async () => {
    setLoading(true);
    try {
      await axios.delete(
        `/arena/delete/${bookings[selectedRowKeys[0]].arena_id}`
      );
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

  return (
    <div className="dashboard">
      <BookingTable
        bookings={bookings}
        loading={loading}
        selectedRowKeys={selectedRowKeys}
        setSelectedRowKeys={setSelectedRowKeys}
        fetchBookings={fetchBookings}
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

        {/* <Button
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
        </Button> */}
      </div>
    </div>
  );
};

export default Dashboard;
