import react from 'react'
import {Switch, Typography, Slider, Button, Divider} from 'antd';
import './style.css'
import axios from 'axios';
import { PrimaryCard } from '../../components/PrimaryCard';
import { SecondaryCard } from '../../components/SecondaryCard';

var secondary_url = 'https://dev.akarpov.ru/api/search/secondary';
var primary_url = 'https://dev.akarpov.ru/api/search/primary';

export const SearchPage: react.FC = () => {

    const [searchType, setSearchType] = react.useState('perv');
    const [shortLong, setShortLong] = react.useState('short');
    const [minMaxPrice, setMinMaxPrice] = react.useState([0, 0]);
    const [underOver, setUnderOver] = react.useState('overpriced')
    
    const [pervData, setPervData] = react.useState([]);
    const [secData, setSecData] = react.useState([]);
    
    var maxPrices = {
        'perv': {
            'min': 4.1,
            'max': 17.3
        },
        'vtor': {
            'min': 1,
            'max': 10
        }
    }
    return <div className='filters__centered'>
        <div className="filters">
            <Typography.Title level={4}>Фильтры</Typography.Title>
            <div className="perv-sec__container">
                <Typography.Text style={{textAlign: 'center'}}>Первичка</Typography.Text>
                <Switch onChange={(e) => {
                    if (e) {
                        setSearchType('vtor')
                    } else {
                        setSearchType('perv')
                    }
                }}></Switch>
                <Typography.Text>Вторичка</Typography.Text>
            </div>
            {
            searchType == 'perv' ? <div className="perv-sec__container">
                <Typography.Text>Краткосрочные инвестиции</Typography.Text>
                <Switch onChange={(e) => {
                    if (e) setShortLong('long')
                    else setShortLong('short')
                }}></Switch>
                <Typography.Text>Долгосрочные инвестиции</Typography.Text>
            </div> : <></>
            }
            {
            searchType == 'vtor' ? <div className="perv-sec__container">
                <Typography.Text>Недооцененные квартиры</Typography.Text>
                <Switch onChange={(e) => {
                    if (e) setUnderOver('overpriced')
                    else setUnderOver('underpriced')
                }}></Switch>
                <Typography.Text>Переоцененные квартиры</Typography.Text>
            </div> : <></>
            }
            <div>
                <Typography.Text>Фильтр цены (млн. руб)</Typography.Text>
                <Slider 
                    range 
                    min={((maxPrices as any)[searchType] as any)['min']} 
                    max={((maxPrices as any)[searchType] as any)['max']} 
                    step={0.1}
                    onChange={(e) => {
                        setMinMaxPrice(e)
                    }}
                ></Slider>
            </div>

            <Button 
                type='primary'
                onClick={async () => {
                    var origin = secondary_url
                    if (searchType == 'perv') {
                        origin = primary_url;
                        origin += `?status=${shortLong}&price_max=${minMaxPrice[1] * 1000000}&price_min=${minMaxPrice[0] * 1000000}`
                        const answer = await axios.get(origin);
                        console.log(answer)
                        setPervData(answer.data.reverse());
                        setSecData([]);
                           
                    } else {
                        origin += `?price_max=${minMaxPrice[1] * 1000000}&price_min=${minMaxPrice[0] * 1000000}&marker=${underOver}`
                        const answer = await axios.get(origin);
                        setSecData(answer.data);
                        setPervData([]);
                    }
                    
                }}
            >Найти</Button>
        </div>
        <Divider></Divider>
        <div className="content">
            {pervData.map((e) => {
                return <PrimaryCard {...e as any}/>
            })}
            {
                secData.map((e) => {
                    return <SecondaryCard {...e as any}/>
                })
            }
        </div>
    </div>
}