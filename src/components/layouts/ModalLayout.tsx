import { ReactNode } from "react";

import { toTitleCase } from "../../utility";
import OverlayLayout from "./OverlayLayout";
import { useKeyUpEvent } from "../../hooks/useKeyUpEvent";

interface IDialogProps {
	showHeader?: boolean;
	parameters: {
		isOpened: boolean;
		title?: string;
		subTitle?: string;
	};
	modalResult?: (data?: string) => void;
	children: ReactNode;
}

export default function ModalLayout({ parameters, modalResult, children, }: IDialogProps) {

	useKeyUpEvent({
		keys: ["escape"],
		returnedAction: () => {
			modalResult && modalResult();
		}
	});

	return (
		<OverlayLayout isOpened={parameters.isOpened} onClick={() => modalResult && modalResult()}>
			<div className='flex justify-center items-center fixed mx-auto z-50 inset-0 py-6 xs:px-2 max-w-lg'>
				<div className="overflow-auto relative w-full h-auto max-h-full rounded-lg shadow-lg animate__animated animate__zoomIn animate__faster bg-white">
					<div className="sticky bg-white top-0 px-4 md:px-6 py-4 border-b border-slate-300">
						<div className="flex items-center justify-between">
							<p className="text-lg mb-1 text-blue-500">{toTitleCase(parameters.title)}</p>
							<p onClick={() => modalResult && modalResult()} className="pl-4 cursor-pointer text-red-600">Close</p>
						</div>
						{parameters?.subTitle && <p className="text-xs text-slate-500">{parameters?.subTitle}</p>}
					</div>
					<div className="px-4 md:px-6 py-4">{children}</div>
				</div>
			</div>
		</OverlayLayout>
	);
}
