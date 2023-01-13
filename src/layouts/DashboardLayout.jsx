import { Outlet } from 'react-router';
import Page from '../components/Page';
import Navbar from './Navbar';
import { useState } from 'react';
import Sidebar from './Sidebar';

export default function DashboardLayout() {
	const [openSB, setOpenSB] = useState(false);

	// window.onload = function () {
	// dispatch(getUserAsync(accessToken));
	// };

	return (
		<>
			<Navbar onOpenSidebar={() => setOpenSB(true)} />
			<Sidebar openSideBar={openSB} onCloseSideBar={() => setOpenSB(false)} />
				<Outlet />
				{/* <Footer /> */}
		</>
	);
}
