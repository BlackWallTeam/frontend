import react, {useRef, useState, useEffect} from 'react'
import * as mapboxgl from 'mapbox-gl';

import 'mapbox-gl/dist/mapbox-gl.css';
import { useDispatch } from 'react-redux/es/exports';
import { setActive, setName } from '../../store/slices/sidebarSlice';

(mapboxgl as any).accessToken = 'pk.eyJ1IjoiaWxpYXZhcyIsImEiOiJjazcwdXU0dHkwMGViM21ta3VxaHB2YWNqIn0.yHEDUiatwp4dy4MM3ywnOQ';


export const TheMap: react.FC = () => {
    const mapContainer = useRef(null);
    const map = useRef(null as any);
    const [lng, setLng] = useState(38.960);
    const [lat, setLat] = useState(45.035);
    const [zoom, setZoom] = useState(9);
    const dispatch = useDispatch();

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current as any,
            style: 'mapbox://styles/iliavas/cle9o5pi3000501kn1o6myhxp',
            center: [lng, lat],
            zoom: zoom
        });

        map.current.on('load', () => {
            map.current.addSource('buildings', {
                type: 'geojson',
                // Use a URL for the value for the `data` property.
                data: '/schema.geojson'
                });
                 
            map.current.addLayer({
                'id': 'buildings-layer',
                'type': 'fill',
                'source': 'buildings',
                'paint': {
                    'fill-color': 'rgba(75,192,192,0.3)'
                }
            });
            map.current.addLayer({
                'id': 'buildings-layer-outline',
                'type': 'line',
                'source': 'buildings',
                'paint': {
                    'line-color': 'rgba(75,192,192,1)',
                    'line-width': 2
                }
            });
            map.current.on('click', 'buildings-layer', (e: any) => {
                console.log(e.features[0].properties.name)
                dispatch(setActive(true));
                dispatch(setName(e.features[0].properties.name))
            });
            map.current.on('mouseenter', 'buildings-layer', () => {
                map.current.getCanvas().style.cursor = 'pointer';
            });
            map.current.on('mouseleave', 'buildings-layer', () => {
                map.current.getCanvas().style.cursor = '';
            });
        })
    });
        

    return <div ref={mapContainer} className="map-container" style={{width: '100vw', height: '100vh'}}/>
}