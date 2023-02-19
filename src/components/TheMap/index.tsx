import react, {useRef, useState, useEffect} from 'react'
import * as mapboxgl from 'mapbox-gl';

import 'mapbox-gl/dist/mapbox-gl.css';
import { useDispatch } from 'react-redux/es/exports';
import { setActive, setName } from '../../store/slices/sidebarSlice';
import './style.css'
(mapboxgl as any).accessToken = 'pk.eyJ1IjoiaWxpYXZhcyIsImEiOiJjazcwdXU0dHkwMGViM21ta3VxaHB2YWNqIn0.yHEDUiatwp4dy4MM3ywnOQ';


const points = {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "coordinates": [
            39.08647667577779,
            45.0039321850457
          ],
          "type": "Point"
        }
      },
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "coordinates": [
            39.04491379939927,
            45.03243514655392
          ],
          "type": "Point"
        }
      },
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "coordinates": [
            38.97323072498696,
            45.06542932356558
          ],
          "type": "Point"
        }
      },
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "coordinates": [
            38.95386129652343,
            45.10189657981991
          ],
          "type": "Point"
        }
      },
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "coordinates": [
            38.97872396028441,
            45.13042706066193
          ],
          "type": "Point"
        }
      },
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "coordinates": [
            38.96503174898015,
            45.01385308177049
          ],
          "type": "Point"
        }
      },
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "coordinates": [
            39.112531237076155,
            45.04610100871051
          ],
          "type": "Point"
        }
      },
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "coordinates": [
            39.11927597081987,
            45.0588865314364
          ],
          "type": "Point"
        }
      },
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "coordinates": [
            38.94055848744463,
            45.045496678942584
          ],
          "type": "Point"
        }
      }
    ]
  }


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
           
            map.current.loadImage('/location_pin.png', (error: any, image: any) => {
                if (error) throw error;
                map.current.addImage('point_icon', image)
                map.current.addSource('building_points', {
                    type: 'geojson',
                    data: '/points.geojson'
                })
                map.current.addLayer({
                    'id': 'building_points_geojson', 
                    'type': 'symbol',
                    'source': 'building_points',
                    'layout': {
                        'icon-image': 'point_icon',
    
                    }
                })
                map.current.on('click', 'building_points_geojson', (e: any) => {
                    console.log(e.features[0].properties.name)
                    dispatch(setActive(true));
                    dispatch(setName(e.features[0].properties.name))
                });
                map.current.on('mouseenter', 'building_points_geojson', () => {
                    map.current.getCanvas().style.cursor = 'pointer';
                });
                map.current.on('mouseleave', 'building_points_geojson', () => {
                    map.current.getCanvas().style.cursor = '';
                });
            })
            
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