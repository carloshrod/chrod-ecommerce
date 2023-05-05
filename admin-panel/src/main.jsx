import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { AuthProvider, GlobalProvider, UsersProvider } from './contexts';

ReactDOM.createRoot(document.getElementById('root')).render(
	<Router>
		<GlobalProvider>
			<AuthProvider>
				<UsersProvider>
					<App />
				</UsersProvider>
			</AuthProvider>
		</GlobalProvider>
	</Router>
);
