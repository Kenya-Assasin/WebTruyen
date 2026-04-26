'use client';

import React, { useState, useEffect } from 'react';
import { Tabs, Table, Button, Modal, Form, Input, Select, Upload, message, Switch, Statistic, Card, Row, Col, Input as AntInput } from 'antd';
import { UploadOutlined, EditOutlined, DeleteOutlined, PlusOutlined, EyeOutlined, LockOutlined, UnlockOutlined } from '@ant-design/icons';
import storyService, { manga, CreateMangaType, UpdateMangaType } from '../../services/manga/manga.services';

const { Option } = Select;
const { TextArea } = Input;

export default function AdminPage() {
  const [stories, setStories] = useState<manga[]>([]);
  const [users, setUsers] = useState<any[]>([
    { id: '1', username: 'user1', role: 'author', status: 'active' },
    { id: '2', username: 'user2', role: 'reader', status: 'locked' },
  ]); // Placeholder for users
  const [comments, setComments] = useState<any[]>([
    { id: '1', user: 'user1', content: 'Great story!', story: 'Story A' },
    { id: '2', user: 'user2', content: 'Spam comment', story: 'Story B' },
  ]); // Placeholder for comments
  const [categories, setCategories] = useState<string[]>(['Tiên hiệp', 'Kiếm hiệp', 'Ngôn tình', 'Hành động', 'Kinh dị']);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingStory, setEditingStory] = useState<manga | null>(null);
  const [form] = Form.useForm();
  const [systemConfig, setSystemConfig] = useState({
    banner: '',
    notification: '',
    maintenance: false,
    regulations: '',
  });

  const handleConfigChange = (key: string, value: any) => {
    setSystemConfig({ ...systemConfig, [key]: value });
  };

  const handleApprove = async (id: string, status: 'approved' | 'rejected') => {
    try {
      await storyService.updateStory(id, { status });
      message.success(`Story ${status}`);
      loadStories();
    } catch (error: any) {
      console.error('Error:', error);
      message.error(error?.response?.data?.message || 'Failed to update status');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await storyService.deleteStory(id);
      message.success('Story deleted successfully');
      loadStories();
    } catch (error: any) {
      console.error('Error:', error);
      message.error(error?.response?.data?.message || 'Failed to delete story');
    }
  };

  const handleLockUser = (id: string) => {
    setUsers(users.map(user => user.id === id ? { ...user, status: user.status === 'locked' ? 'active' : 'locked' } : user));
    message.success('User status updated');
  };

  useEffect(() => {
    loadStories();
    // Load other data as needed
  }, []);

  const loadStories = async () => {
    try {
      const data = await storyService.setStories();
      setStories(data);
    } catch (error: any) {
      console.error('Failed to load stories:', error);
      message.error(error?.response?.data?.message || 'Failed to load stories');
    }
  };

  const handleCreateOrUpdate = async (values: any) => {
    try {
      const submitData = {
        ...values,
        view: editingStory?.view || 0,
        likes: editingStory?.likes || 0,
        createdAt: editingStory?.createdAt || new Date().toISOString(),
      };
      
      console.log('Submitting:', submitData);
      
      if (editingStory) {
        await storyService.updateStory(editingStory.id, submitData);
        message.success('Story updated successfully');
      } else {
        await storyService.createStory(submitData);
        message.success('Story created successfully');
      }
      setIsModalVisible(false);
      form.resetFields();
      setEditingStory(null);
      loadStories();
    } catch (error: any) {
      console.error('Error:', error);
      message.error(error?.response?.data?.message || error?.message || 'Operation failed');
    }
  };

  const handleDeleteComment = (id: string) => {
    setComments(comments.filter(comment => comment.id !== id));
    message.success('Comment deleted');
  };

  const showModal = (story?: manga) => {
    setEditingStory(story || null);
    setIsModalVisible(true);
    setTimeout(() => {
      if (story) {
        form.setFieldsValue({
          title: story.title,
          author: story.author,
          type: story.type,
          cover: story.cover,
        });
      } else {
        form.resetFields();
      }
    }, 100);
  };

  const storyColumns = [
    { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: 'Author', dataIndex: 'author', key: 'author' },
    { title: 'Type', dataIndex: 'type', key: 'type' },
    { title: 'Status', dataIndex: 'status', key: 'status', render: (status: string) => status || 'pending' },
    { title: 'Views', dataIndex: 'view', key: 'view' },
    { title: 'Likes', dataIndex: 'likes', key: 'likes' },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: manga) => (
        <>
          <Button icon={<EyeOutlined />} onClick={() => showModal(record)} />
          <Button icon={<EditOutlined />} onClick={() => showModal(record)} />
          <Button danger onClick={() => handleApprove(record.id, 'approved')}>Duyệt</Button>
          <Button danger onClick={() => handleApprove(record.id, 'rejected')}>Từ chối</Button>
          <Button icon={<DeleteOutlined />} danger onClick={() => handleDelete(record.id)} />
        </>
      ),
    },
  ];

  const userColumns = [
    { title: 'Username', dataIndex: 'username', key: 'username' },
    { title: 'Role', dataIndex: 'role', key: 'role' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: any) => (
        <Button icon={record.status === 'locked' ? <UnlockOutlined /> : <LockOutlined />} onClick={() => handleLockUser(record.id)} />
      ),
    },
  ];

  const commentColumns = [
    { title: 'User', dataIndex: 'user', key: 'user' },
    { title: 'Content', dataIndex: 'content', key: 'content' },
    { title: 'Story', dataIndex: 'story', key: 'story' },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: any) => <Button icon={<DeleteOutlined />} danger onClick={() => handleDeleteComment(record.id)} />,
    },
  ];

  const tabItems = [
    {
      key: '1',
      label: 'Quản lý Nội dung',
      children: (
        <>
          <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal()}>
            Thêm Truyện Mới
          </Button>
          <Table dataSource={stories} columns={storyColumns} rowKey="id" />
          <div style={{ marginTop: '20px' }}>
            <h3>Quản lý Danh mục</h3>
            <Select mode="tags" style={{ width: '100%' }} placeholder="Thêm thể loại mới" value={categories} onChange={setCategories} />
          </div>
        </>
      ),
    },
    {
      key: '2',
      label: 'Quản lý Người dùng',
      children: <Table dataSource={users} columns={userColumns} rowKey="id" />,
    },
    {
      key: '3',
      label: 'Kiểm soát Tương tác',
      children: (
        <>
          <Table dataSource={comments} columns={commentColumns} rowKey="id" />
          <Row gutter={16} style={{ marginTop: '20px' }}>
            <Col span={6}>
              <Card>
                <Statistic title="Truyện Hot Nhất" value={stories.length > 0 ? stories.reduce((prev, current) => (prev.view > current.view ? prev : current)).title : 'Không có truyện'} />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic title="Tổng Truyện" value={stories.length} />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic title="Tổng Người dùng" value={users.length} />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic title="Tổng Bình luận" value={comments.length} />
              </Card>
            </Col>
          </Row>
        </>
      ),
    },
    {
      key: '4',
      label: 'Cấu hình Hệ thống',
      children: (
        <Form layout="vertical">
          <Form.Item label="Banner Quảng cáo">
            <Upload>
              <Button icon={<UploadOutlined />}>Upload Banner</Button>
            </Upload>
          </Form.Item>
          <Form.Item label="Thông báo Đẩy">
            <TextArea rows={4} placeholder="Nội dung thông báo" value={systemConfig.notification} onChange={(e: any) => handleConfigChange('notification', e.target.value)} />
          </Form.Item>
          <Form.Item label="Chế độ Bảo trì">
            <Switch checked={systemConfig.maintenance} onChange={(checked) => handleConfigChange('maintenance', checked)} />
          </Form.Item>
          <Form.Item label="Cập nhật Quy định">
            <TextArea rows={4} placeholder="Quy định mới" value={systemConfig.regulations} onChange={(e: any) => handleConfigChange('regulations', e.target.value)} />
          </Form.Item>
          <Button type="primary">Lưu Cấu hình</Button>
        </Form>
      ),
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h1>Admin Dashboard</h1>
      <Tabs items={tabItems} defaultActiveKey="1" />

      <Modal
        title={editingStory ? 'Sửa Truyện' : 'Thêm Truyện'}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form 
          form={form} 
          onFinish={handleCreateOrUpdate} 
          layout="vertical"
        >
          <Form.Item name="title" label="Tiêu đề" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="author" label="Tác giả" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="type" label="Loại" rules={[{ required: true }]}>
            <Select>
              <Option value="text">Text</Option>
              <Option value="comic">Comic</Option>
            </Select>
          </Form.Item>
          <Form.Item name="cover" label="Ảnh bìa">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingStory ? 'Cập nhật' : 'Tạo'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
