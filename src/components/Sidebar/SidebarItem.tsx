interface SidebarItemProps {
	title?: string;
	isActive?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = (props) => {
	return (
		<div>
			<span>{props.title || 'Item'}</span>
		</div>
	);
};

export default SidebarItem;
