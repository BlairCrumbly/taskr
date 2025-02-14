import React from 'react';
import { PieChart } from '@mui/x-charts';

const ProgressCircle = ({ totalTasks, completedTasks }) => {
  const remainingTasks = totalTasks - completedTasks;
  const percentage = Math.round((completedTasks / totalTasks) * 100);
  const COMPLETED_COLOR = '#4CAF50';  // green
  const REMAINING_COLOR = '#E0E0E0';  // light gray ish
  const data = [
    { id: 0, value: completedTasks, label: 'Completed', color: COMPLETED_COLOR },
    { id: 1, value: remainingTasks, label: 'Remaining', color: REMAINING_COLOR},
  ];

  return (
    <div className="progress-circle-container">
      <PieChart
        series={[
          {
            data,
            innerRadius: 80,
            outerRadius: 100,
            highlightScope: { faded: 'global', highlighted: 'item' },
            faded: { innerRadius: 80, additionalRadius: -30 },
          },
        ]}
        slotProps={{
          legend: { hidden: true }
        }}
        width={400}
        height={200}
        margin={{ right: 65 }}
      >
        <text
          x="170" 
          y="90"
          textAnchor="middle"
          dominantBaseline="middle"
          style={{
            
            fontSize: '16px',
            fontWeight: 'bold',
            fill: 'white' 
          }}
        >
          Completed
        </text>
        <text
          x="170" //! center text
          y="110"
          textAnchor="middle"
          dominantBaseline="middle"
          style={{
            fontSize: '14px',
            fill: 'white' 
          }}
        >
          {percentage}%
        </text>
      </PieChart>
    </div>
  );
};

export default ProgressCircle;