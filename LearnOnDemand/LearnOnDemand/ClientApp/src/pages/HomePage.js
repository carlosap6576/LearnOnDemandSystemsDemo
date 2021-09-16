import React, { Fragment, useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import { makeStyles } from '@material-ui/core/styles'
import { Grid } from "@material-ui/core"
import Weather from "../components/Weather"
import TimeCard from "../components/TimeCard"
import IpInfo from "../components/IpInfo"
import DigitalFootPrint from "../components/DigitalFootPrint"
import News from "../components/News"
import Loader from "react-loader-spinner";

const useStyles = makeStyles((theme) => ({
    gridContainer: {
        padding: theme.spacing(3),
        width: "100%"
    },
    centered:{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
}))

const HomePage = () => {
    const { state } = useContext(AppContext)
    const styles = useStyles()
    const { isLoading } = state;

    console.log('the state is: ', isLoading);
    return (
        <Fragment>
            {isLoading ? (
               <div className={styles.centered} > <Loader
                type="Puff"
                color="#00BFFF"
                height={100}
                width={100}
              /></div>
            ) : (
                    <Grid className={styles.gridContainer} container spacing={4} justify='center'>

                        <Grid item sm={2} container direction="column" spacing={2}>
                            <Grid item>
                                <TimeCard />
                            </Grid>

                            <Grid item>
                                <Weather />
                            </Grid>
                        </Grid>

                        <Grid item sm={6}>
                            <News />
                        </Grid>

                        <Grid item sm={3} >
                            <div>
                                <IpInfo />
                            </div>
                            <div style={{ marginTop: '20px' }}>
                                <DigitalFootPrint />
                            </div>
                        </Grid>
                    </Grid>
                )}

        </Fragment>

    )
}

export default HomePage;