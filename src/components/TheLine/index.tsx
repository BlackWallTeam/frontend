import 'chart.js/auto';

import react, {useRef} from 'react'

import { Line } from "react-chartjs-2";

interface IChart{
    data: number[]
}

export const TheChart: react.FC<IChart> = (props) => {
    const ref = useRef();
    const data = {
        labels: ['1 мес.', '2 мес.', '3 мес.'],
        datasets: [
          {
            data: props.data,
            fill: true,
            backgroundColor: 'rgba(75,192,192,0.2)',
            borderColor: 'rgba(75,192,192,1)'
          },
        ],
        
      };
    return <div style={{width: 340, 
        height: 170,}}>
        <Line 
        data={data} 
        ref={ref} 
        style={{
            width: 340, 
            height: 170,
            transform: 'translateX(-10px)'
        }} 
        options={{
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        text: "млн. руб",
                        display: true
                    }
                }
            },
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                }
            }
      }
  }></Line>
    </div> 
}