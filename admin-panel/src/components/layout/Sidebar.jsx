import { NavLink, useLocation, useParams } from 'react-router-dom';
import {
	Collapse,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import InventoryIcon from '@mui/icons-material/Inventory';
import SettingsIcon from '@mui/icons-material/Settings';
import PowerSettingsNewSharpIcon from '@mui/icons-material/PowerSettingsNewSharp';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import PersonIcon from '@mui/icons-material/Person';
import EngineeringIcon from '@mui/icons-material/Engineering';
import useScrollY from '../../hooks/useScrollY';
import useScreenWidth from '../../hooks/useScreenWidth';
import { useAuthContext, useGlobalContext } from '../../contexts';
import { useState } from 'react';
import {
	ADMIN,
	COSTUMERS,
	PRODUCTS,
	SETTINGS,
	STAFF,
} from '../../routes/paths';
import MyToolTip from '../ui/MyToolTip';

const Sidebar = () => {
	const [open, setOpen] = useState(false);
	const { hideMenu } = useGlobalContext();
	const { logout } = useAuthContext();
	const { pathname } = useLocation();
	const { scrollY } = useScrollY();
	const { width } = useScreenWidth();
	const { id } = useParams();

	const handleClick = () => {
		setOpen(!open);
	};

	const menu = [
		{
			label: 'Dashboard',
			icon: <DashboardIcon />,
			path: ADMIN,
			onClick: null,
		},
		{
			label: 'Products',
			icon: <InventoryIcon />,
			path: PRODUCTS,
			onClick: null,
		},
		{
			label: 'Users',
			icon: <GroupIcon />,
			path: null,
			onClick: handleClick,
		},
		{
			label: 'Settings',
			icon: <SettingsIcon />,
			path: SETTINGS,
			onClick: null,
		},
		{
			label: 'Logout',
			icon: <PowerSettingsNewSharpIcon />,
			path: null,
			onClick: logout,
		},
	];

	const INDEXES = {
		'/admin': 0,
		'/admin/products': 1,
		'/admin/settings': 3,
	};

	const USERS_INDEXES = {
		'/admin/costumers': 4,
		'/admin/staff': 5,
	};

	const usersLinkSelected =
		pathname === `/admin/staff/${id}` ? 5 : USERS_INDEXES[pathname];

	const isHidden = (width < 1200 && hideMenu) || (width > 1200 && !hideMenu);

	return (
		<aside
			className={`sidebar ${hideMenu ? 'sidebar--hide' : null} `}
			id={!hideMenu ? null : 'show'}
		>
			<List component='nav' aria-label='main sidebar'>
				{menu
					.filter(item => (scrollY < 70 ? item.label !== 'Logout' : item))
					.map((item, i) => (
						<div key={i}>
							<NavLink to={item.path}>
								<MyToolTip
									title={width < 600 ? item.label : null}
									placement='right'
								>
									<ListItemButton
										className={
											item.label === 'Logout' ? 'sidebar--logout' : null
										}
										selected={INDEXES[pathname] === i}
										onClick={
											item.label === 'Logout' || item.label === 'Users'
												? () => item.onClick()
												: null
										}
									>
										<ListItemIcon>{item.icon}</ListItemIcon>
										<ListItemText primary={item.label} />
										{item.label === 'Users' ? (
											<>
												{open ? (
													<ExpandLess
														className={`${isHidden ? null : 'expand'}`}
													/>
												) : (
													<ExpandMore
														className={`${isHidden ? null : 'expand'}`}
													/>
												)}
											</>
										) : null}
									</ListItemButton>
								</MyToolTip>
							</NavLink>
							{item.label === 'Users' ? (
								<Collapse in={open} timeout='auto' unmountOnExit>
									<NavLink to={COSTUMERS}>
										<MyToolTip
											title={width < 600 ? 'Costumers' : null}
											placement='right'
										>
											<ListItemButton
												className='collapseButton'
												selected={usersLinkSelected === 4}
											>
												<ListItemIcon>
													<PersonIcon
														className={`${isHidden ? 'collapseIcon' : null}`}
													/>
												</ListItemIcon>
												<ListItemText primary='Costumers' />
											</ListItemButton>
										</MyToolTip>
									</NavLink>
									<NavLink to={STAFF}>
										<MyToolTip
											title={width < 600 ? 'Staff' : null}
											placement='right'
										>
											<ListItemButton
												className='collapseButton'
												selected={usersLinkSelected === 5}
											>
												<ListItemIcon>
													<EngineeringIcon
														className={`${isHidden ? 'collapseIcon' : null}`}
													/>
												</ListItemIcon>
												<ListItemText primary='Staff' />
											</ListItemButton>
										</MyToolTip>
									</NavLink>
								</Collapse>
							) : null}
						</div>
					))}
			</List>
		</aside>
	);
};

export default Sidebar;
