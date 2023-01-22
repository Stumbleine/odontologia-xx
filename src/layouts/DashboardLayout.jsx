import { Outlet } from 'react-router';
import Navbar from './Navbar';
import { useState } from 'react';
import Sidebar from './Sidebar';
import Footer from '../components/Footer';
import styled from '@emotion/styled';

export default function DashboardLayout() {
	const [openSB, setOpenSB] = useState(false);

	// window.onload = function () {
	// dispatch(getUserAsync(token));
	// };

	return (
		<>
			<Navbar onOpenSidebar={() => setOpenSB(true)} />
			<Sidebar openSideBar={openSB} onCloseSideBar={() => setOpenSB(false)} />


				<Outlet />
			
		</>
	);
}
