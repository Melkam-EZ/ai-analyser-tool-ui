
import { useForm } from 'react-hook-form'
import { CreateAnalysisDto } from '../interface'
import { useAnalysisStore } from '../stores'
import { ApplicationNamesEnum } from '../types'
import { toTitleCase } from '../utility'
import SelectInput from './SelectInput'
import TextareaInput from './TextareaInput'
import TextInput from './TextInput'

export default function AnalysisFormComponent({ onSuccess }: { onSuccess: () => void; }) {

	const { createAnalysis } = useAnalysisStore();

	const promptFormGroup = useForm<CreateAnalysisDto & { feature: string; }>({
		mode: 'onChange',
		defaultValues: {
			isRawPrompt: false,
			applicationFeatures: []
		}
	});

	const watchPrompt = promptFormGroup.watch('isRawPrompt')!;

	function getFeatures() {
		return promptFormGroup.getValues()?.applicationFeatures || [];
	}

	function onSubmit() {
		createAnalysis(promptFormGroup.getValues()).then(isSuccesful => {
			if (isSuccesful) {
				onSuccess();
				// promptFormGroup.reset();
			}
		})
	}


	return <form onSubmit={promptFormGroup.handleSubmit(onSubmit)}>

		<SelectInput name="applicationName" label="Application name" placeholder="Select application..." required control={promptFormGroup.control} options={Object.values(ApplicationNamesEnum).map(appName => {
			return {
				label: toTitleCase(appName.replace('-', ' ')),
				value: appName
			}
		})} rules={{ required: true }} />

		<p className='text-xs mb-1'>Application feature list</p>

		{getFeatures().length === 0 && <div className='border border-slate-300 text-center italic p-2 rounded text-xs mb-2'>
			No application features added yet.
		</div>}

		{getFeatures().map((feature, index) => <div key={index} className='flex justify-between border border-slate-300 px-2 py-1 rounded text-xs mb-1'>
			<p>{index + 1}. <span>{feature}</span></p>
			<p onClick={() => {
				const features = getFeatures().filter(f => f !== feature);
				promptFormGroup.setValue('applicationFeatures', features, {
					// shouldDirty: true,
					// shouldTouch: true,
					// shouldValidate: true
				});
			}} className='text-red-600 hover:underline cursor-pointer'>Delete</p>
		</div>)}

		<TextInput stylingClass='!mb-' icon={<div className='border-l hover:text-emerald-500 px-2'>Save</div>} options={{
			name: 'feature',
			disabled: watchPrompt,
			placeholder: 'Add feature...'
		}} control={promptFormGroup.control} action={{
			onClick: () => {
				const singleFeature = promptFormGroup.getValues().feature;
				if (singleFeature) {
					const featureList = getFeatures();
					featureList.push(singleFeature);
					promptFormGroup.setValue('applicationFeatures', featureList, {
						shouldDirty: true,
						shouldTouch: true,
						shouldValidate: true
					});
					promptFormGroup.resetField('feature');
				}
			},
		}} />

		<div className="grid grid-cols-6 gap-2">
			<div className="col-span-6 md:col-span-2">
				<TextInput options={{
					name: 'userCount',
					type: 'number',
					required: true,
					disabled: watchPrompt,
					label: 'No. of users',
					placeholder: 'No. of users...'
				}} control={promptFormGroup.control} rules={{ required: true }} />
			</div>

			<div className="col-span-3 md:col-span-2">
				<TextInput options={{
					name: 'monthlyExpense',
					type: 'number',
					required: true,
					disabled: watchPrompt,
					label: 'Monthly expense',
					placeholder: 'e.g $4000'
				}} control={promptFormGroup.control} rules={{ required: true }} />
			</div>
			<div className="col-span-3 md:col-span-2">
				<TextInput options={{
					name: 'annualExpense',
					type: 'number',
					required: true,
					disabled: watchPrompt,
					label: 'Yearly expense',
					placeholder: 'e.g $500...'
				}} control={promptFormGroup.control} rules={{ required: true }} />
			</div>
		</div>

		<label className="inline-flex items-center space-x-2 cursor-pointer mb-6">
			<input type="checkbox" {...promptFormGroup.register("isRawPrompt")}
				className="peer hidden" />
			<div className="w-4 h-4 rounded border-2 border-slate-300 peer-checked:border-blue-600 peer-checked:bg-blue-600 flex items-center justify-center">
				<svg className="hidden w-3 h-3 text-white peer-checked:block" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
					<path d="M5 13l4 4L19 7" />
				</svg>
			</div>
			<span>Use raw prompt</span>
		</label>

		<TextareaInput options={{
			name: 'rawPromptMessage',
			placeholder: 'Raw prompt message...',
			label: 'Raw prompt message',
			required: true,
			disabled: !watchPrompt,
		}} control={promptFormGroup.control} rules={{ required: true }} />

		<button type="submit" className="bg-blue-500 text-white w-full px-6 py-2.5 rounded-lg cursor-pointer text-base">Submit</button>
	</form>
}
