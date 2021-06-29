interface SidebarItemProps {
	title: string;
	icon: string;
	isActive?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = (props) => {
	return (
		<div className={`item ${(props.isActive && 'active') || ''}`}>
			<span className="material-icons">{props.icon}</span>
			{/* <span>{props.title}</span> */}
		</div>
	);
};

export default SidebarItem;
