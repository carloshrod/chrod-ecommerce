import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PublicIcon from '@mui/icons-material/Public';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import TaskIcon from '@mui/icons-material/Task';
import DescriptionIcon from '@mui/icons-material/Description';
import { ar, co, mx, us, ve } from './svg';

export const countryCodes = [
	{
		value: '+1',
		label: 'United States',
		flag: us,
	},
	{
		value: '+52',
		label: 'Mexico',
		flag: mx,
	},
	{
		value: '+54',
		label: 'Argentina',
		flag: ar,
	},
	{
		value: '+57',
		label: 'Colombia',
		flag: co,
	},
	{
		value: '+58',
		label: 'Venezuela',
		flag: ve,
	},
];

export const permissions = [
	{
		value: 'manageUsers',
		label: 'Manage Users',
	},
	{
		value: 'manageProducts',
		label: 'Manage Products',
	},
	{
		value: 'manageOrders',
		label: 'Manage Orders',
	},
];

export const inputUserProps = [
	{
		id: 'idName',
		name: 'displayName',
		label: 'Name',
		icon: <PersonIcon />,
		placeholder: 'User name',
	},
	{
		id: 'idEmail',
		name: 'email',
		label: 'Email',
		icon: <EmailIcon />,
		placeholder: 'example@mail.com',
	},
	{
		id: 'idCountryCode',
		name: 'countryCode',
		label: 'Country code',
		icon: <PublicIcon />,
		type: 'select',
		options: countryCodes,
	},
	{
		id: 'idPhone',
		name: 'phoneNumber',
		label: 'Phone number',
		icon: <PhoneIphoneIcon />,
		placeholder: '(123) 456-7890',
		mask: `(999) 999-9999`,
	},
	{
		id: 'idRole',
		name: 'role',
		label: 'Select a role',
		icon: <AssignmentIndIcon />,
		type: 'select',
		options: countryCodes,
	},
];

export const inputRoleProps = [
	{
		id: 'idRoleName',
		name: 'roleName',
		label: 'Role name',
		icon: <AssignmentIndIcon />,
	},
	{
		id: 'idPermissions',
		name: 'permissions',
		label: 'Permissions',
		icon: <TaskIcon />,
		type: 'autocomplete',
		options: permissions,
		multiple: true,
	},
	{
		id: 'idDescription',
		name: 'description',
		label: 'Description',
		icon: <DescriptionIcon />,
		multiline: true,
		rows: 4,
	},
];

export const ITEMS_WIDTH = {
	countryCodeXs: 4,
	countryCodeSm: 3.3,
	phoneNumberXs: 8,
	phoneNumberSm: 4.2,
	roleSm: 4.5,
};
