import React from 'react';
import { Modal, Form, Input, InputNumber } from 'antd';

const UpdateArenaModal = ({ isModalVisible, handleOk, handleCancel, form }) => {
  return (
    <Modal
      title="Update Arena"
      open={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Update"
      cancelText="Cancel"
    >
      <Form form={form} layout="vertical" name="update_arena_form">
        <Form.Item
          name="arena_name"
          label="Arena Name"
          // rules={[{ required: true, message: "Please enter arena name" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="arena_location"
          label="Arena Location"
          // rules={[{ required: true, message: "Please enter arena location" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="arena_players"
          label="Number of Players"
          // rules={[ { required: true, message: "Please enter number of players" }, ]}
        >
          <InputNumber min={1} max={100} style={{ width: "100%" }} />
        </Form.Item>
        
        <Form.Item
          name="arena_priceHour"
          label="Price per Hour"
          // rules={[{ required: true, message: "Please enter price per hour" }]}
        >
          <InputNumber min={0} step={0.01} style={{ width: "100%" }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateArenaModal;
