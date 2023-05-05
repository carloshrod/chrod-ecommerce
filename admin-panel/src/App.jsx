import { useEffect, useState } from 'react';
import './App.scss';
import { ThemeProvider } from '@mui/material/styles';
import { Routes, Route, Link } from 'react-router-dom';
import { theme } from './theme';
import { ForgotPassword, SignIn } from './pages';
import {
	NavBar,
	MyContainer,
	Sidebar,
	Loader,
	Footer,
	Modal,
	PrivateRoute,
	PublicRoute,
} from './components';
import { privateRoutes } from './routes/privateRoutes';
import { ADMIN, FORGOT_PASSWORD, SIGNIN } from './routes/paths';
import { useAuthContext, useGlobalContext } from './contexts';
import { Toaster } from 'react-hot-toast';
import { Box, Button } from '@mui/material';

function App() {
	const [isLoading, setIsLoading] = useState();
	const { hideMenu } = useGlobalContext();
	const { isAuthenticated } = useAuthContext();

	useEffect(() => {
		setIsLoading(true);
		setTimeout(() => {
			setIsLoading(false);
		}, 1000);
	}, [isAuthenticated]);

	return (
		<ThemeProvider theme={theme}>
			<main className={hideMenu ? '' : null}>
				{isLoading ? (
					<Loader preLoader={true} />
				) : (
					<Routes>
						<Route exact path={SIGNIN} element={<PublicRoute />}>
							<Route index element={<SignIn />} />
							<Route path={FORGOT_PASSWORD} element={<ForgotPassword />} />
						</Route>
						<Route path={ADMIN} element={<PrivateRoute />}>
							{privateRoutes.map((item, index) => (
								<Route
									key={index}
									index={item.path === ADMIN}
									path={item.path !== ADMIN ? item.path : null}
									element={
										<>
											<NavBar />
											<Sidebar />
											<MyContainer>{item.element}</MyContainer>
											<Footer />
										</>
									}
								/>
							))}
						</Route>
						<Route
							path='*'
							element={
								<Box
									sx={{
										height: '100%',
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
										flexDirection: 'column',
										gap: 2,
									}}
								>
									<h1>404 not found!</h1>
									<Link to={-1}>
										<Button variant='outlined'>Back</Button>
									</Link>
								</Box>
							}
						/>
					</Routes>
				)}
				<Modal />
				<Toaster
					position='bottom-right'
					toastOptions={{ className: 'myToast' }}
				/>
			</main>
		</ThemeProvider>
	);
}

export default App;
