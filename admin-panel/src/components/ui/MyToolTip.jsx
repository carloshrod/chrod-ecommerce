import { Tooltip, Zoom } from '@mui/material';

const MyToolTip = ({ title, placement, children }) => {
	return (
		<Tooltip
			title={title}
			placement={placement}
			arrow
			TransitionComponent={Zoom}
		>
			<span>{children}</span>
		</Tooltip>
	);
};

export default MyToolTip;
