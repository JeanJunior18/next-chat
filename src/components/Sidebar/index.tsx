import SidebarItem from './SidebarItem';

const Sidebar: React.FC = () => {
	const items = [
		{
			title: 'Chat',
			icon: 'chat',
		},
		{
			title: 'Atendimentos',
			icon: 'record_voice_over',
			isActive: true,
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
			<div className="menu">
				<SidebarItem title="Menu" icon="menu" />
			</div>

			<div className="options">
				{items.map((item) => (
					<SidebarItem key={item.title} {...item} />
				))}
			</div>
		</aside>
	);
};

export default Sidebar;
