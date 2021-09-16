import React, { useContext } from 'react';
import {Card, CardContent, Divider, Typography} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import LeafletMap from './LeafletMap';
import { AppContext } from '../contexts/AppContext';
import '../styles/news.css'

const useStyles = makeStyles({
    headerText: {
        fontWeight: 'bold',
        color: '#204060', // Dark Blue
        marginBottom: '5px'
    }
})
const IpInfo = () => {
    const { state } = useContext(AppContext)
    const styles = useStyles()
    const ip = state.ipinfo;
    

    return (
        <Card raised>
            <CardContent>
                {/* div for general information */}
                <div>
                    <Typography className={styles.headerText} variant='h5'>
                        Point of Presence
                    </Typography>
                    <Divider/>
                    <div style={{marginTop:'5px', width:'100%', display: 'flex'}}>
                        {/* div for general info text */}
                        <div>
                            <Typography color='inherit' variant='subtitle1'>
                                Continent: {ip.continent_name} ({ip.continent_code})
                            </Typography>
                            <Typography color='inherit' variant='subtitle1'>
                                Country: {ip.country_name} ({ip.country_code})
                            </Typography>
                            <Typography color='inherit' variant='subtitle1'>
                                Region: {ip.region_name}
                            </Typography>

                            <Typography color='inherit' variant='subtitle1'>
                                City: {ip.city}
                            </Typography>

                            <Typography color='inherit' variant='subtitle1'>
                                Latitude: {ip.latitude}
                            </Typography>

                            <Typography style={{marginBottom: '5px'}} color='inherit' variant='subtitle1'>
                                Longitude: {ip.longitude}
                            </Typography>
                        </div>
                        
 
                    </div>
                </div>

                <div style={{width:"100%", height:"25vh"}}>
                    <LeafletMap
                        location={ip}
                    />
                </div>
            </CardContent>
        </Card>
    )
}

export default IpInfo;