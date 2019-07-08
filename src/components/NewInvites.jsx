import React from 'react'
import { Paper, Typography, List, 
    ListItem, ListItemText, 
    ListItemSecondaryAction, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { APP_URI } from '../helpers/consts'
import axios from 'axios'
import DoneIcon from '@material-ui/icons/Done'
import CloseIcon from '@material-ui/icons/Close'

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3),
        height: 200,
        display: 'flex',
        flexDirection: 'column'
    },
    list: {
        flexGrow: 1,
        overflow: 'auto',
        width: '100%'
    }
}))

export default function NewInvites(props) {
    const classes = useStyles()
    const [invites, setInvites] = React.useState([])

    const getInvites = () => {
        const { token } = JSON.parse(localStorage.getItem("authToken"))
        axios.get(`${APP_URI}/api/invites`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        }).then(({data}) => setInvites(data))
    }

    function replyInvite(inviteId, accept=false) {
        const { token } = JSON.parse(localStorage.getItem("authToken"))
        axios.post(`${APP_URI}/api/invites/${accept? 'accept': 'negate'}`, {inviteId}, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        .finally(getInvites)
    }

    React.useEffect(() => {
        getInvites()
    }, [])

    return (
        <Paper className={classes.root}>
            <Typography variant="h6">Events</Typography>
            <List className={classes.list}>
               {
                   invites.map(invite => (
                       <ListItem key={invite._id}>
                           <ListItemText primary="Solicitação de amizade" secondary={`${invite.from.username} solicitou amizade`} />
                           <ListItemSecondaryAction>
                                <IconButton color="primary" edge="end" onClick={e => replyInvite(invite._id, true)}>
                                    <DoneIcon />
                                </IconButton>
                                <IconButton color="secondary" edge="end" onClick={e => replyInvite(invite._id)}>
                                    <CloseIcon />
                                </IconButton>
                           </ListItemSecondaryAction>
                       </ListItem>
                   ))
               }
            </List>
        </Paper>
    )
}