import SidebarItem from './SidebarItem';

const Sidebar: React.FC = () => {
	return (
		<div className="sidebar">
			<SidebarItem />
			<SidebarItem isActive />
			<SidebarItem />
			<SidebarItem />
		</div>
	);
};

export default Sidebar;
