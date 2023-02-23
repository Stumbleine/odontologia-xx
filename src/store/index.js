import { configureStore } from '@reduxjs/toolkit';
import AccountSlice from './AccountSlice';
import AuthSlice from './AuthSlice';
import UsersSlice from './UsersSlice';
import NewsSlice from './NewsSlice';
import DocumentSlice from './DocumentSlice';
import UnidadSlice from './UnidadSlice';

const localStorageMiddleware = ({ getState }) => {
	return next => action => {
		const result = next(action);
		const st = getState();
		const appState = {
			auth: st.auth,
			account: st.account,
		};
		localStorage.setItem('app', JSON.stringify(appState));
		return result;
	};
};

const reHydrateStore = () => {
	if (localStorage.getItem('app') !== null) {
		return JSON.parse(localStorage.getItem('app'));
	}
};

export default configureStore({
	reducer: {
		auth: AuthSlice,
		account: AccountSlice,
		users: UsersSlice,
		news: NewsSlice,
		documents: DocumentSlice,
		unidad: UnidadSlice,
	},
	middleware: curryGetDefaultMiddleware =>
		curryGetDefaultMiddleware().concat(localStorageMiddleware),
	preloadedState: reHydrateStore(),
});
