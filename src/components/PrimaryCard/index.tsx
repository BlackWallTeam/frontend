import react from 'react'
import {Card, Checkbox, Typography} from 'antd'
import './style.css'
import { CardChart } from '../CardChart';

interface IPrimaryCard{
    prices: {
        days: number,
        price: number 
    }[],
    community: string;
    status: string;
    risk: string;
    floor: string;
    area: number;
    days_to_be_done: number;
    developer: string;
    increase_procent: string;
    days_for_increase: number;
}

export const PrimaryCard: react.FC<IPrimaryCard> = (props) => {

    var deal_text = (deal_type: string) => {
        if (deal_type == 'bad') return {
            status: 'Сделка плохая',
            color: 'red'
        }
        if (deal_type == 'riskey') return {
            status: 'Сделка рискованная',
            color: 'black'
        }
        if (deal_type == 'good') return {
            status: 'Сделка хорошая',
            color: 'green'
        }
    }
    var mapped_price = props.prices.map((e) => e.price);
    var mapped_days = props.prices.map((e) => e.days);

    return <Card title={props.community} style={{width: 400}}>
        <div className="container">
            <div className='ch-b__text'>
                <Checkbox checked={props.status == 'short'}/>
                <Typography.Text>Шорт</Typography.Text>
            </div>
            <Typography.Text>
                Рекомендация: <strong style={{color: deal_text(props.risk)?.color as any}}>
                    {deal_text(props.risk)?.status}
                </strong>
            </Typography.Text>
            <Typography.Text>Предполагаемая прибыль <strong style={{fontWeight: 'bold'}}>{props.increase_procent}%</strong></Typography.Text>
            <Typography.Text>Ждать прибыли: <strong style={{fontWeight: 'bold'}}>{props.days_for_increase} дней (дня)</strong></Typography.Text>
            <Typography.Text>
                Застрощик: <strong>{props.developer}</strong>
            </Typography.Text>
            <Typography.Text>
                Дней до сдачи: <strong>{props.days_to_be_done}</strong>
            </Typography.Text>
            
            
            <Typography.Text>Этаж: <strong>{props.floor}</strong></Typography.Text>
            <Typography.Text>Площадь: <strong>{props.area} кв.м</strong></Typography.Text>
            <CardChart data={mapped_price} days={mapped_days}/>
        </div>
    </Card>
}