import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import { useGlobalContext } from '../../contexts';
import { GLOBAL_TYPES as TYPES } from '../../actions';

const Modal = () => {
	const { modal, dispatch } = useGlobalContext();

	const handleClose = () => {
		dispatch({ type: TYPES.CLOSE_MODAL });
		dispatch({ type: TYPES.CLEAN_DATA_TO_EDIT });
	};

	if (!modal.state) return null;

	return (
		<Dialog
			open={modal.state}
			onClose={handleClose}
			sx={{ '@media (450px < width < 600px )': { px: 6 } }}
		>
			<DialogTitle>{modal.title}</DialogTitle>
			<DialogContent>{modal.child}</DialogContent>
		</Dialog>
	);
};

export default Modal;
