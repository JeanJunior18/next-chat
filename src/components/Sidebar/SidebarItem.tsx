import { useRouter } from 'next/router';
interface SidebarItemProps {
	title: string;
	icon: string;
	path?: string;
}

const SidebarItem: React.FC<SidebarItemProps> = (props) => {
	const { pathname, push } = useRouter();

	const handleCLick = () => {
		if (props.path) {
			push(props.path);
		}
	};
	return (
		<div
			className={`item ${(props.path === pathname && 'active') || ''}`}
			onClick={handleCLick}
		>
			<span className="material-icons">{props.icon}</span>
			{/* <span>{props.title}</span> */}
		</div>
	);
};

export default SidebarItem;
