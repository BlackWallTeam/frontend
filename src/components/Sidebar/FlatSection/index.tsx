import {Typography} from 'antd';
import Divider from 'antd/es/divider';
import react from 'react'
import { TheChart } from '../../TheLine';
import './style.css'


export const FlatSection: react.FC = () => {

   return <div className='flat__container'>
    <Typography.Title level={5}>Статистика по квартире</Typography.Title>
    <Typography.Text>Площадь: <strong>35.2 кв.м</strong></Typography.Text>
    <Typography.Text>Цена: <strong>3.5 млн. руб</strong></Typography.Text>
    <Typography.Text>Этаж: <strong>3-10</strong></Typography.Text>
    <Typography.Text>Дата сдачи: <strong>Сдан</strong></Typography.Text>
    <div style={{marginTop: 15}}>
        <Typography.Text strong>Предсказание цены</Typography.Text>
        <TheChart data={[1.1, 4.3, 9]}/>
    </div>
    
   </div>
}