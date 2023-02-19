import react from 'react'
import { TheMap } from '../../components/TheMap'
import { Sidebar } from '../../components/Sidebar'

export const MapPage: react.FC = () => {

    return <>
        <TheMap />
        <Sidebar />
    </>
}