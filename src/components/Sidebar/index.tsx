import { Divider } from 'antd'
import react from 'react'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { getActive } from '../../store/slices/sidebarSlice'
import { BuildingSection } from './BuildingSection'
import { FlatSection } from './FlatSection'
import './style.css'

export const Sidebar: react.FC = () => {

    const opened = useSelector(getActive)

   return <>
    {opened ? <div className='sidebar__container'>
        <BuildingSection />
        <FlatSection />
   </div> : <></>}
   </>
}