import DoneIcon from '@mui/icons-material/Done';
import { Close } from '@mui/icons-material';
import React, { MouseEvent, useState, FC } from 'react';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteDoc, doc, getFirestore, increment, updateDoc } from 'firebase/firestore';
import toast, { Toaster } from 'react-hot-toast';
import { useAppSelector } from '../store';
import { DeleteButtonProps } from '../interface';

const DeleteTicketButton: FC<DeleteButtonProps> = ({ rowUserUid, id, completed }) => {
  const [acceptDelete, changeAcceptDelete] = useState(false);
  const db = getFirestore();
  const docRef = doc(db, 'tickets', id);
  const user = useAppSelector((state) => state.user.userData);
  const docCount = doc(db, 'count', 'count');

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
            <DoneIcon sx={{ color: '#219653' }} />
          </IconButton>
          <IconButton onClick={(e) => showDeleteTicket(e)}>
            <Close sx={{ color: '#EB5757' }} />
          </IconButton>
        </>
      )}
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
};

export default DeleteTicketButton;
