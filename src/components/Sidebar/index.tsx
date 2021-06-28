import SidebarItem from './SidebarItem';

const Sidebar: React.FC = () => {
	const items = [
		{
			title: 'Chat',
			icon: 'chat',
		},
		{
			title: 'Atendimentos',
			icon: 'chat',
		},
		{
			title: 'Agenda',
			icon: 'today',
		},
		{
			title: 'Clientes',
			icon: 'people',
		},
	];
	return (
		<aside className="sidebar">
			{items.map((item) => (
				<SidebarItem key={item.title} {...item} />
			))}
		</aside>
	);
};

export default Sidebar;
