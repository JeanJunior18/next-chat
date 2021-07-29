import SidebarItem from './SidebarItem';

const Sidebar: React.FC = () => {
	const items = [
		{
			title: 'Chat',
			icon: 'chat',
			path: '/',
		},
		// {
		// 	title: 'Atendimentos',
		// 	icon: 'record_voice_over',
		// 	path: '/atendimentos',
		// },
		// {
		// 	title: 'Agenda',
		// 	icon: 'today',
		// 	path: '/agenda',
		// },
		{
			title: 'Clientes',
			icon: 'people',
			path: '/clientes',
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
