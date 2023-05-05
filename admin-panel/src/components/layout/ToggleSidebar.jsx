import { IconButton } from '@mui/material';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import MenuIcon from '@mui/icons-material/Menu';
import { useGlobalContext } from '../../contexts';
import useScreenWidth from '../../hooks/useScreenWidth';
import { GLOBAL_TYPES as TYPES } from '../../actions';

const ToggleSidebar = () => {
	const { hideMenu, dispatch } = useGlobalContext();

	const handleToggle = () => {
		dispatch({ type: TYPES.TOGGLE_MENU, payload: !hideMenu });
	};

	const { width } = useScreenWidth();

	return (
		<div className='toggleSidebar'>
			<IconButton onClick={handleToggle}>
				{(width < 1200 && hideMenu) || (width > 1200 && !hideMenu) ? (
					<MenuOpenIcon />
				) : (
					<MenuIcon />
				)}
			</IconButton>
		</div>
	);
};

export default ToggleSidebar;
