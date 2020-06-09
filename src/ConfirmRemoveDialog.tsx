import React from 'react'
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import CheckIcon from '@material-ui/icons/Check';
import CancelIcon from '@material-ui/icons/Close';
import red from '@material-ui/core/colors/red';
import blue from '@material-ui/core/colors/blue';

type Props = {
    isOpen: boolean;
    paletteName: string;
    shouldDelet: (shoult: boolean) => void;
}

export const ConfirmRemoveDialog: React.FC<Props> = ({shouldDelet, isOpen, paletteName}) => {
    return (
        <Dialog aria-labelledby="dialog-remove" open={isOpen} onClose={()=>shouldDelet(false)}>
        <DialogTitle id="simple-dialog-title">Delete {paletteName.replace(/-/g, " ").toUpperCase()}?</DialogTitle>
        <List>
            <ListItem button onClick={() => {shouldDelet(true)}}>
              <ListItemAvatar>
                <Avatar style={{backgroundColor: red[100], color: red[600]}}>
                  <CheckIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Delete" />
            </ListItem>
            <ListItem button onClick={() => shouldDelet(false)}>
              <ListItemAvatar>
              <Avatar style={{backgroundColor: blue[100], color: blue[600]}}>
                  <CancelIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Cancel" />
            </ListItem>
        </List>
      </Dialog>
    )
}
