import { ReactNode } from "react";

export default function OverlayLayout({ isOpened = false, onClick, children }: {
	isOpened: boolean;
	children: ReactNode;
	onClick?: () => void;
}) {
	return <>
		{isOpened && <div onClick={() => onClick && onClick()} className='fixed z-50 left-0 top-0 w-full h-full bg-black/50'></div>}
		{isOpened && children}
	</>
}
