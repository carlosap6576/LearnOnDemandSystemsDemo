import React, {useContext} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import { AppContext } from '../contexts/AppContext';
import {Card, CardContent, Divider, Typography} from '@material-ui/core'

const useStyles = makeStyles({
    headerText: {
        fontWeight: 'bold',
        color: '#204060', // Dark Blue
        marginBottom: '5px'
    }
})

const DigitalFootPrintCard = () => {
    const {state} = useContext(AppContext)
    const ipinfo = state.ipinfo;
    const styles = useStyles()

    return (
        <Card raised>
            <CardContent>  
                    <Typography className={styles.headerText} variant='h5'>
                        Digital Footprint
                    </Typography>
                    <Divider/>
                <div style={{marginTop:'5px', width:'100%'}}>
                    {/* div for general info text */}
                    
                    <div className="DigitalFP-IP">
                        <Typography variant="subtitle1">
                            IP: {ipinfo.ip}
                        </Typography>

                        <Typography variant="subtitle1">
                            Type: {ipinfo.type}
                        </Typography>
                    </div>

                </div>    
            </CardContent>
        </Card>
    )
}

export default DigitalFootPrintCard 