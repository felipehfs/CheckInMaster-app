import React from 'react'
import { Paper, Typography, TextField, Box, Button} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import axios from 'axios'
import { APP_URI} from '../helpers/consts'

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3)
    },
    input: {
        paddingTop: theme.spacing(2)
    },
    actions: {
        marginTop: 12,
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    }
}))

export default function(props) {
    const classes = useStyles()
    const [username, setUsername] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [id, setId] = React.useState(null)

    React.useEffect(() => {
        const { token } = JSON.parse(localStorage.getItem('authToken'))
        axios.get(`${APP_URI}/api/users`,{
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        .then(({ data }) => {
            setId(data._id)
            setUsername(data.username)
            setEmail(data.email)
        })
    }, [])
    
    function handleSubmit(e) {
        e.preventDefault()
        const { token } = JSON.parse(localStorage.getItem('authToken'))
        axios.put(`${APP_URI}/api/users/${id}`, {
            email,
            username
        },{
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        .then(() => alert("Salvo com sucesso!"))
    }

    return (
        <Paper className={classes.root}>
            <Typography variant="h5">
                Profile
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField 
                    className={classes.input} 
                    value={username} 
                    placeholder="Username"
                    onChange={e => setUsername(e.target.value)}
                    type="text" fullWidth/>
                <TextField 
                    className={classes.input} 
                    value={email} 
                    placeholder="E-mail"
                    onChange={e => setEmail(e.target.value)}
                    type="email" fullWidth/>
                <Box component="div" className={classes.actions}>
                    <Button type="submit" color="primary">Salvar</Button>
                </Box>
            </form>
        </Paper>
    )
}