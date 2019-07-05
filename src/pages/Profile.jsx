import React from 'react'
import { Grid, Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import DefaultLayout from '../components/DefaultLayout'
import NewInvitesSection from '../components/NewInvites'
import ProfileEdit from '../components/ProfileEdit'

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(5)
    },
  
}))

export default function ProfilePage(props) {
    const classes = useStyles()

    return (
        <DefaultLayout>
            <Container>
                <Grid container className={classes.root} spacing={4}>
                    <Grid item xs={12} md={8}>
                        <ProfileEdit />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <NewInvitesSection />
                    </Grid>
                </Grid>
            </Container>
        </DefaultLayout>
    )
}

