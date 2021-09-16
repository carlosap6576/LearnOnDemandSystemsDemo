import React, {useContext} from 'react';
import {AppContext} from '../contexts/AppContext';
import {makeStyles} from '@material-ui/core/styles'
import {AppBar, Card, CardContent, Divider, List, ListItem, Toolbar, Typography, Paper, Button, Grid} from '@material-ui/core'
import _ from "lodash";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        overflow: 'hidden',
        padding: theme.spacing(0, 3),

    },
    articles: {
        flexDirection: "column",
        alignItems: 'flex-start'
    },
    image: {
        display: 'flex',
        justifyContent: 'center',
        margin: '10px 0'
    },
    paper: {
        maxWidth: 900,
        margin: `${theme.spacing(1)}px auto`,
        padding: theme.spacing(3),
    },
}));


const News = () => {
    const {state} = useContext(AppContext)
    const styles = useStyles()
    const newsArticles = state.news ?  state.news.value  :''

    if (_.isEmpty(state.news)) {
        return (<div></div>)
    }


    const getArticles = (articles) => {
        if (articles) {
            return articles.map((article, index) => {
                if (index === 0) {
                    return (
                        <div key={index}>
                            <ListItem>
                                <div style={{marginTop: '-20px'}}>

                                    <div>
                                        <Typography color="secondary" variant='h6'>
                                            <a href={article.url} target="_blank" rel="noopener noreferrer">
                                                {article.name}
                                            </a>
                                        </Typography>

                                    </div>

                                    <div className={styles.image}>
                                        <img
                                            src={article.image.thumbnail.contentUrl + "?width=" + article.image.thumbnail.width + "&height=" + article.image.thumbnail.height}
                                            alt={article.image.thumbnail.contentUrl}
                                        />

                                    </div>

                                    <div>
                                        <Typography
                                            variant='subtitle2'>{article.description} - {article.provider[0].name}</Typography>
                                    </div>
                                </div>
                            </ListItem>

                            <Divider/>

                        </div>
                    )
                } else {
                    return (
                        <div key={index} className={styles.root}>
                                <Paper className={styles.paper} onClick={() => { console.log('onClick'); }}>
                                    <Grid container wrap="nowrap" spacing={2} justify="space-between" xs={12}  >
                                        <Grid item xs={2} >
                                                <Typography color="textSecondary" variant='subtitle1'>
                                                    {article.provider[0].name}
                                                </Typography>
                                        </Grid>

                                        <Grid item  xs={8} >
                                            <Typography>{article.name}</Typography>
                                        </Grid>

                                        <Grid item xs={2}>
                                                    <Button color="primary" variant="outlined" style={{fontSize : '12px'}} target="_blank" href={article.url}>
                                                            View Article
                                                    </Button>
                                        </Grid>

                                    </Grid>

                                </Paper>

                        </div>
                    )
                }

            })
        } else {
            return (
                <div>
                    No News capture.
                </div>
            )
        }

    }

    return (
        <Card raised>
            <AppBar style={{backgroundColor: "#003366"}} position='static'>
                <Toolbar>
                    <Typography color="inherit" variant='h5'>Recent News Headlines</Typography>
                </Toolbar>
            </AppBar>

            <CardContent style={{marginBottom: '-25px'}}>
                <List>
                    {getArticles(newsArticles)}
                </List>
            </CardContent>
        </Card>
    )
}

export default News;