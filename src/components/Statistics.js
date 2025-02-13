//make and pass total tasks and total completed tasks
//calc remaining tasks
//data for pie chart + percentages
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { useOutletContext } from 'react-router-dom';
import '../styles/Stats.css';

let Statistics = () =>{
    const { totalTasks, completedTasks } = useOutletContext();
    const remainingTasks = totalTasks - completedTasks;
    const data = [
        { id: 0, value: (completedTasks / totalTasks) * 100, label: 'Completed' },
        { id: 1, value: (remainingTasks / totalTasks) * 100, label: 'Remaining' },
      ];
    return(
        <PieChart className='pieChart'
        series={[{
        data,
        arcLabel: (item) => `${item.value.toFixed(1)}%`,
        arcLabelMinAngle: 35,
        arcLabelRadius: '60%',
        }]}
        sx={{
            [`& .${pieArcLabelClasses.root}`]: {
            fontWeight: 'bold',
        },
        }}
        width={400}
        height={200}
    />
    );
};




export default Statistics