import React, { useState } from 'react';
import { Input, Button, List, Typography, Layout, Modal, message } from 'antd';
import 'antd/dist/reset.css'; // Ant Design minimal styling

const { Header, Content } = Layout;
const { Text } = Typography;

function TodoList() {
  const [tasks, setTasks] = useState([]); // State to store tasks
  const [task, setTask] = useState(''); // State to store the current input value
  const [isEditing, setIsEditing] = useState(false); // State to handle editing modal visibility
  const [currentTask, setCurrentTask] = useState({}); // State to store the task being edited

  // Handle adding a new task
  const addTask = () => {
    if (task.trim() !== '') {
      setTasks([...tasks, { text: task, completed: false }]);
      setTask(''); // Clear input field after adding a task
      message.success('Task added successfully!');
    } else {
      message.error('Task cannot be empty!');
    }
  };

  // Handle toggling task completion
  const toggleTaskCompletion = (index) => {
    const updatedTasks = tasks.map((t, i) =>
      i === index ? { ...t, completed: !t.completed } : t
    );
    setTasks(updatedTasks);
  };

  // Handle deleting a task
  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    message.success('Task deleted successfully!');
  };

  // Open edit modal
  const openEditModal = (index) => {
    setCurrentTask({ ...tasks[index], index });
    setIsEditing(true);
  };

  // Handle task editing
  const editTask = () => {
    const updatedTasks = tasks.map((t, i) =>
      i === currentTask.index ? { ...t, text: currentTask.text } : t
    );
    setTasks(updatedTasks);
    setIsEditing(false);
    setCurrentTask({});
    message.success('Task updated successfully!');
  };

  return (
    <Layout  >
      <Header style={{ background: '#001529', color: '#fff', textAlign: 'center', padding: '10px' }}>
        <h1 style={{ color: '#fff', margin: 0 }}>To-Do List</h1>
      </Header>
      <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
        <div style={{ width: '100%', maxWidth: '400px' }}>
          <Input.Search
            value={task}
            onChange={(e) => setTask(e.target.value)}
            enterButton="Add"
            onSearch={addTask}
            placeholder="Enter a task"
            size="large"
            style={{ marginBottom: '20px' }}
          />

          <List
            bordered
            dataSource={tasks}
            renderItem={(item, index) => (
              <List.Item
                actions={[
                  <Button type="link" onClick={() => openEditModal(index)}>
                    Edit
                  </Button>,
                  <Button type="link" danger onClick={() => deleteTask(index)}>
                    Delete
                  </Button>,
                ]}
                style={{
                  background: item.completed ? '#d9f7be' : '#fff',
                  textDecoration: item.completed ? 'line-through' : 'none',
                }}
                onClick={() => toggleTaskCompletion(index)}
              >
                <Text>{item.text}</Text>
              </List.Item>
            )}
          />

          {tasks.length === 0 && (
            <Text type="secondary" style={{ display: 'block', marginTop: '20px', textAlign: 'center' }}>
              No tasks added yet.
            </Text>
          )}
        </div>
      </Content>

      <Modal
        title="Edit Task"
        visible={isEditing}
        onOk={editTask}
        onCancel={() => setIsEditing(false)}
      >
        <Input
          value={currentTask.text}
          onChange={(e) => setCurrentTask({ ...currentTask, text: e.target.value })}
        />
      </Modal>
    </Layout>
  );
}

export default TodoList;
