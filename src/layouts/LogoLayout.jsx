import React from 'react';
import { Outlet } from 'react-router-dom';

export default function LogoLayout() {
	return (
		<div>
			<Outlet />
		</div>
	);
}
