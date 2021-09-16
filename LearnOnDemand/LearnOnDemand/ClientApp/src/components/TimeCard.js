import React, {useState, useEffect} from 'react'
import {makeStyles} from "@material-ui/core/styles"
import {AppBar, Card, CardContent, Toolbar, Typography} from '@material-ui/core'
import AccessTimeIcon from '@material-ui/icons/AccessTime';

const useStyles = makeStyles({
    dateFont: {
        fontWeight: 'bold',
        color: '#204060'// Dark Blue
    },
    appBar: {
        alignItems: 'center',
        backgroundColor:"#d9d9d9" // Light Grey
    },
    center: {
        display: 'flex',
        justifyContent: 'center'
    }
})

const TimeCard = () => {  
    const [dayName, setDayName] = useState("")
    const [month, setMonth] = useState("")
    const [calendarDay, setCalendarDay] = useState("")
    const [year, setYear] = useState("")
    const [time, setTime] = useState("")
    const styles = useStyles()
    
    useEffect(() => {
        let interval = setInterval(() => {
            var date = new Date()
    
            var dateString = date.toDateString()
            var dateStringArray = dateString.split(' ')
    
            var time = `${date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}:${date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()}`
            
            var dayName
            switch(dateStringArray[0]) {
                case 'Tue':
                    dayName = 'Tuesday'
                    break
                case 'Wed':
                    dayName = 'Wednesday'
                    break
                case 'Thu':
                    dayName = 'Thursday'
                    break
                case 'Sat':
                    dayName = 'Saturday'
                    break
                default:
                    dayName = dateStringArray[0] + 'day'
            }
            
            setDayName(dayName)
            setMonth(dateStringArray[1])
            setCalendarDay(dateStringArray[2])
            setYear(dateStringArray[3])
            setTime(time)  
        },1000)

        return function cleanup() {
            clearInterval(interval)
        }
    })

    

    return (
        
        <Card raised className='TimeCard-Container'>
            <AppBar className={styles.appBar} position='static'>
                <Toolbar>
                    <Typography className={styles.dateFont} variant='h4'>
                        {month} {calendarDay}, {year}
                    </Typography>                
                </Toolbar>
            </AppBar>
            <CardContent>
                <div className={styles.center}>
                    <Typography color='textSecondary' variant='subtitle1'>{dayName}</Typography>
                </div>
                
                <div className={styles.center}>
                    <AccessTimeIcon style={{marginTop:'4px'}} fontSize='small' color='action' />
                    <Typography color='textSecondary' variant='subtitle1'>{time}</Typography>
                </div>
            </CardContent>
            
        </Card>
    )
}

export default TimeCard