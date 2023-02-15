import { Outlet } from 'react-router';
import Navbar from './Navbar';
import { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Footer from '../components/Footer';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { getunidades } from '../store/UnidadSlice';
import { getPublicDocuments } from '../store/DocumentSlice';
import { getNews } from '../store/NewsSlice';

export default function DashboardLayout({ navlinks }) {
	const [openSB, setOpenSB] = useState(false);
	const { token, rol } = useSelector(state => state.account);

	// window.onload = function () {
	// dispatch(getUserAsync(token));
	// };
	const dispatch = useDispatch();
	useEffect(() => {
		rol !== 'guest' && dispatch(getunidades(token));
		// dispatch(getPublicDocuments('token'));
		// dispatch(getNews('token'));
	}, []);

	return (
		<>
			<Navbar onOpenSidebar={() => setOpenSB(true)} navlinks={navlinks} />
			<Sidebar openSideBar={openSB} onCloseSideBar={() => setOpenSB(false)} />
			<Outlet />
		</>
	);
}
