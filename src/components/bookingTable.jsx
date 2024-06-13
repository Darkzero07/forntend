import React from "react";
import { Table, Button, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const BookingTable = ({
  bookings,
  loading,
  selectedRowKeys,
  setSelectedRowKeys,
  fetchBookings,
}) => {
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

  const columns = [
    { title: "Booking_ID", dataIndex: "id", key: "id" },
    { title: "Arena ID", dataIndex: "arena_id", key: "arena_id" },
    { title: "Arena Name", dataIndex: "arena_name", key: "arena_name" },
    { title: "Date", dataIndex: "date", key: "date" },
    { title: "Start Time", dataIndex: "time_start", key: "time_start" },
    { title: "End Time", dataIndex: "time_end", key: "time_end" },
    { title: "Duration", dataIndex: "duration", key: "duration" },
    { title: "Total Price", dataIndex: "total_price", key: "total_price" },
    { title: "Booking Status", dataIndex: "status", key: "status" },
    { title: "User ID", dataIndex: "user_id", key: "user_id" },
    { title: "Username", dataIndex: "username", key: "username" },
    { title: "Firstname", dataIndex: "firstname", key: "firstname" },
    { title: "Phone number", dataIndex: "phone", key: "phone" },
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
