import {
	CostumerDetails,
	Costumers,
	Dashboard,
	ProductDetails,
	Products,
	Settings,
	Staff,
	StaffDetails,
} from '../pages';
import {
	ADMIN,
	COSTUMERS,
	COSTUMER_DETAILS,
	PRODUCTS,
	PRODUCT_DETAILS,
	SETTINGS,
	STAFF,
	STAFF_DETAILS,
} from './paths';

export const privateRoutes = [
	{
		path: ADMIN,
		element: <Dashboard />,
	},
	{
		path: PRODUCTS,
		element: <Products />,
	},
	{
		path: PRODUCT_DETAILS,
		element: <ProductDetails />,
	},
	{
		path: COSTUMERS,
		element: <Costumers />,
	},
	{
		path: COSTUMER_DETAILS,
		element: <CostumerDetails />,
	},
	{
		path: STAFF,
		element: <Staff />,
	},
	{
		path: STAFF_DETAILS,
		element: <StaffDetails />,
	},
	{
		path: SETTINGS,
		element: <Settings />,
	},
];
