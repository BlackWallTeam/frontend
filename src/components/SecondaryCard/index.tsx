import react from 'react'
import {Card, Typography} from 'antd';
import './style.css'

interface ISecondaryCard {
    link: string;
    floor: number;
    rooms_count: number;
    area: number;
    year_of_construction: number;
    living_meters: number;
    kitchen_meters: number;
    pred_price: number;
    diff: number;
    marker: string;
}

export const SecondaryCard: react.FC<ISecondaryCard> = (props) => {
    var color = 'green';
    if (props.marker == 'underpriced') color = 'red';

    return <Card>
        <div className='sec__container'>
            <div className="stat-item">
                <div className="colored" style={{backgroundColor: `${color}!important`}}></div>
                <Typography.Link 
                    href={props.link} strong
                >Ссылка на квартиру
                </Typography.Link>
            </div>
            <Typography.Text>
                Предсказанная цена: <strong style={{fontWeight: 'bold'}}>{props.pred_price.toFixed(0)} р</strong>
            </Typography.Text>
            <Typography.Text>
                Процент отклонения: <strong style={{fontWeight: 'bold'}}>{(props.diff * -1).toFixed(1)}%</strong>
            </Typography.Text>
            <Typography.Text>
                Этаж: <strong>{props.floor}</strong>
            </Typography.Text>
            <Typography.Text>
                Количество комнат: <strong>{props.rooms_count}</strong>
            </Typography.Text>
            <Typography.Text>
                Площадь: <strong>{props.area} кв.м</strong>
            </Typography.Text>
            <Typography.Text>
                Год постройки: <strong>{props.year_of_construction} г.</strong>
            </Typography.Text>


        </div>

    </Card>
}