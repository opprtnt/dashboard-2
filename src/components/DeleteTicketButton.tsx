import DoneIcon from '@mui/icons-material/Done';
import { Close } from '@mui/icons-material';
import React, { MouseEvent, useState, FC, useContext } from 'react';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteDoc, doc, increment, updateDoc } from 'firebase/firestore';
import toast, { Toaster } from 'react-hot-toast';
import { useAppSelector } from '../store';
import { DeleteButtonProps } from '../interface';
import { useTheme } from 'styled-components';
import { ContextLogin } from '..';

const DeleteTicketButton: FC<DeleteButtonProps> = ({ rowUserUid, id, completed }) => {
  const [acceptDelete, changeAcceptDelete] = useState(false);
  const { db } = useContext(ContextLogin);
  const docRef = doc(db, 'tickets', id);
  const user = useAppSelector((state) => state.user.userData);
  const docCount = doc(db, 'count', 'count');
  const theme = useTheme();

  const showDeleteTicket = (e: MouseEvent) => {
    e.stopPropagation();
    changeAcceptDelete((prev) => !prev);
  };

  const deleteTicket = async (e: MouseEvent) => {
    e.stopPropagation();
    await deleteDoc(docRef);
    changeAcceptDelete((prev) => !prev);
    await updateDoc(docCount, {
      count: increment(-1),
    });
    toast.success('Delete successfully');
  };

  return (
    <>
      {user.uid === rowUserUid && !acceptDelete && !completed && (
        <IconButton className="delete-btn" onClick={showDeleteTicket}>
          <DeleteIcon />
        </IconButton>
      )}
      {acceptDelete && (
        <>
          <IconButton onClick={(e) => deleteTicket(e)}>
            <DoneIcon sx={{ color: theme.colors.normal }} />
          </IconButton>
          <IconButton onClick={(e) => showDeleteTicket(e)}>
            <Close sx={{ color: theme.colors.high }} />
          </IconButton>
        </>
      )}
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
};

export default DeleteTicketButton;
