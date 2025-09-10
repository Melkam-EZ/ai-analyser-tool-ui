import { useState } from "react";

import { useAnalysisStore } from "../stores";
import PageLayout from "../components/layouts/PageLayout";
import HeaderComponent from "../components/HeaderComponent";
import ModalLayout from "../components/layouts/ModalLayout";
import NotificationComponent from "../components/NotificationComponent";
import AnalysisFormComponent from "../components/AnalysisFormComponent";

export default function HomePage() {

	const [modalIsOpened, setModalIsOpened] = useState<boolean>(false);

	const { analysis } = useAnalysisStore();

	return <>
		<NotificationComponent />
		<HeaderComponent />
		<PageLayout className="pt-20 pb-6 px-4 md:px-6 container mx-auto">
			<div className="flex justify-end mb-4">
				<button type="button" onClick={() => setModalIsOpened(true)} className="bg-blue-500 text-white px-8 py-2 rounded-lg cursor-pointer">New Analysis</button>
			</div>

			<div className="border border-slate-300 rounded-lg p-3 bg-white">

				{!analysis && <div className="py-6">
					<p className="text-center">No analysis done yet. <span onClick={() => setModalIsOpened(true)} className="text-blue-500 hover:underline cursor-pointer">Create new</span> </p>
				</div>}

				{analysis && <>

					<div className="flex flex-wrap md:gap-4 mb-3">
						<div className="mb-1 md:mb-0">Response ID:</div>
						<div className="">{analysis.id}</div>
					</div>

					<div className="flex gap-4 mb-3">
						<div className="shrink-0">Model name:</div>
						<div className="">{analysis.model}</div>
					</div>

					<div className="flex gap-4 mb-3">
						<div className="shrink-0">Usage:</div>
						<div className="">{JSON.stringify(analysis.usage)}</div>
					</div>

					<div className="flex gap-4 mb-2 items-start">
						<div className="shrink-0 grow">Responses :</div>
						<div className="">{analysis.responses.map(content => {
							return <>
								<pre className="whitespace-pre-wrap font-jost break-words" key={Math.random()} >{content}</pre>
								<hr className="my-6 text-slate-400" />
							</>
						})}</div>
					</div>

				</>}

			</div >
		</PageLayout >

		<ModalLayout parameters={{
			isOpened: modalIsOpened,
			title: 'Submit Prompt for analysis',
			subTitle: 'Provide a detailed prompt for analysis using AWS Bedrock\'s foundation models'
		}} modalResult={() => setModalIsOpened(false)}>
			<AnalysisFormComponent onSuccess={() => setModalIsOpened(false)} />
		</ModalLayout>
	</>
}
