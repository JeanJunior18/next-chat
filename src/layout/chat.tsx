import React from 'react';
import AppBar from '../components/AppBar';
import Sidebar from '../components/Sidebar';

const Layout: React.FC = ({ children }) => {
	return (
		<div className="grid">
			<AppBar />
			<Sidebar />
			{children}
		</div>
	);
};

export default Layout;
