import react from 'react'
import {Typography, Button} from 'antd'
import { TheChart } from '../../TheLine'
import {CloseOutlined} from '@ant-design/icons'
import './style.css'
import { useDispatch } from 'react-redux/es/hooks/useDispatch'
import { setActive, setName } from '../../../store/slices/sidebarSlice'


export const BuildingSection: react.FC = () => {
    const dispatch = useDispatch();
    return <div className='building-section__container'>
        <div className="cross">
            <Button 
                icon={<CloseOutlined />} 
                type='text'
                onClick={() => {
                    dispatch(setActive(false));
                    dispatch(setName(''))
                }}
            />
            <Typography.Title level={5} style={{margin: 0}}>Статистика по ЖК</Typography.Title>
        </div>
        
        <Typography.Text>Количество квартир: <strong>315</strong></Typography.Text>
        <Typography.Text>Медиана кв.м: <strong>25 кв.м</strong></Typography.Text>
        <Typography.Text>Кто застройщик: <strong>ООО "Рога и копыта"</strong></Typography.Text>
        <div style={{marginTop: 15}}>
            <Typography.Text strong>Предсказание средней цены квартиры</Typography.Text>
            <TheChart data={[1.2, 2.4, 5]} />
        </div>
    </div>
   }