import DoneIcon from '@mui/icons-material/Done';
import { Close } from '@mui/icons-material';
import { useContext, useState } from 'react';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteDoc, doc, getFirestore } from 'firebase/firestore';
import toast, { Toaster } from 'react-hot-toast';
import { useAuthState } from 'react-firebase-hooks/auth';
import { ContextLogin } from '../index';
import PropTypes from 'prop-types';

function DeleteTicketButton({ rowUserUid, id, completed }) {
  const [acceptDelete, changeAcceptDelete] = useState(false);
  const db = getFirestore();
  const docRef = doc(db, 'tickets', id);
  const { auth } = useContext(ContextLogin);
  const [user] = useAuthState(auth);

  const showDeleteTicket = (e) => {
    e.stopPropagation();
    changeAcceptDelete(!acceptDelete);
  };

  const deleteTicket = async (e) => {
    e.stopPropagation();
    await deleteDoc(docRef);
    changeAcceptDelete(!acceptDelete);
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
}

DeleteTicketButton.propTypes = {
  rowUserUid: PropTypes.string,
  id: PropTypes.string,
  completed: PropTypes.bool,
};

export default DeleteTicketButton;
