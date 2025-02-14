import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Paper, Typography } from '@mui/material';



// TaskCategoryBarChart Component
const TaskCategoryBarChart = ({ tasks }) => {
  
  const colorPriority = (task) => {
    const today = new Date();
    const dueDate = new Date(task.dueDate);
    const redZone = 7;
    const yellowZone = 14;

    if (dueDate < today && dueDate.getDay() !== today.getDay()) {
      return 'overdue';
    }
    const differenceInDays = Math.floor((dueDate - today) / (1000 * 60 * 60 * 24));

    if (differenceInDays < redZone) {
      return 'red';
    } else if (differenceInDays < yellowZone && differenceInDays >= redZone) {
      return 'yellow';
    } else {
      return 'green';
    }
  };
  const categories = {
    green: 0,
    red: 0,
    yellow: 0,
    overdue: 0,
  };

  // Categorize tasks
  tasks.forEach((task) => {
    const priority = colorPriority(task);
    if (priority === 'overdue') {
      categories.overdue++;
    } else if (priority === 'red') {
      categories.red++;
    } else if (priority === 'yellow') {
      categories.yellow++;
    } else if (priority === 'green') {
      categories.green++;
    }
  });

  // Prepare data for the bar chart
  const data = [
    { category: 'Green', count: categories.green },
    { category: 'Red', count: categories.red },
    { category: 'Yellow', count: categories.yellow },
    { category: 'Overdue', count: categories.overdue },
  ];

  return (
    
    <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
      <Typography variant="h4" align="center"gutterBottom>
        Task Category Overview
      </Typography>
      <ResponsiveContainer width="70%" height={300} style={{ marginLeft: '15%' }}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="purple" />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default TaskCategoryBarChart;
