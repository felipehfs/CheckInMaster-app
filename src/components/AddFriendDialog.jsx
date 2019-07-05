import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios'
import { APP_URI } from '../helpers/consts'

export default function FormDialog({ open, handleClose }) {

  const [email, setEmail] = React.useState('')

  function handleConfirm() {
    if (/\w+@\w+\.\w+/.test(email)) {
      const { token } = JSON.parse(localStorage.getItem('authToken'))
      axios.post(`${APP_URI}/api/invites`, { email }, {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      .then(res => console.log(res.data))
      .finally(() => handleClose())
    }
  }
  
  return (
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Invite your friends</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add the your friend's email here and They will receive the invite to group. 
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            value={email}
            onChange={e => setEmail(e.target.value)}
            label="Email Address"
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirm} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
  );
}
