import React from "react";
import { Modal, Form, Input, InputNumber } from "antd";

const UpdateBookingModal = ({
  isModalVisible,
  handleOk,
  handleCancel,
  form,
}) => {
  return (
    <Modal
      title="Update Booking"
      open={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Update"
      cancelText="Cancel"
    >
      <Form form={form} layout="vertical" name="update_booking_form">
        <Form.Item name="arena_id" label="Arena ID">
          <Input />
        </Form.Item>

        <Form.Item name="date" label="Date">
          <Input />
        </Form.Item>

        <Form.Item name="time_start" label="Time_Start">
          <Input />
        </Form.Item>

        <Form.Item name="time_end" label="Time_End">
          <Input />
        </Form.Item>

        <Form.Item name="duration" label="Duration">
          <InputNumber min={1} max={100} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item name="total_price" label="Total_price">
          <InputNumber min={0} step={0.01} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          name="status"
          label="Booking Status"
          rules={[{ required: true, message: "Wait to confirm or Complete" }]}
        >
          <Input min={0} step={0.01} style={{ width: "100%" }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateBookingModal;
