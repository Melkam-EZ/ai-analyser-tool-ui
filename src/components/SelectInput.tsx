import { SelectHTMLAttributes } from "react";

import { Control, RegisterOptions, useController } from "react-hook-form";
import classnames from 'classnames';


interface ISelectInputProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'className'> {
	name: string;
	label?: string;
	control: Control<any>;
	disabled?: boolean;
	action?: {
		name: string;
		onClick: () => void;
	}
	options: { label: string, value: string }[];
	rules?: Omit<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>;
}

export default function SelectInput(selectProps: ISelectInputProps & { placeholder?: string }) {

	const { field, fieldState } = useController({
		name: selectProps.name,
		rules: selectProps.rules,
		control: selectProps.control,
		disabled: selectProps.disabled,
		defaultValue: ''
	});

	return <div className='mb-6 w-full'>
		<div className="flex justify-between text-xs mb-1">
			<label htmlFor={selectProps?.id} className="text-xs">{selectProps?.label || ' '} {!selectProps.required && <span className="italic"> - optional</span>}</label>
			{selectProps.action?.name && <p onClick={selectProps.action?.onClick} className='text-xs text-blue-500 cursor-pointer hover:underline'>{selectProps.action.name}</p>}
		</div>
		<select id={selectProps?.id} className={classnames('w-full placeholder-inherit px-4 py-3 border border-slate-300 rounded-lg bg-white appearance-none focus:outline-none focus:border-blue-400 disabled:bg-slate-200', {
			"!placeholder-red-600 text-red-600 bg-red-50/25 !border-red-600 animate__animated animate__headShake": fieldState.isTouched && fieldState.invalid
		})} {...field} {...selectProps}>
			<option value="">{selectProps.placeholder || 'Select...'}</option>
			{selectProps.options.map(option => <option value={option.value} key={option.value}>{option.label}</option>)}
		</select>
		{(fieldState.isTouched && fieldState.invalid) && <div className="text-center mt-1">
			{fieldState.error?.type === 'required' && <p className='text-red-600 italic text-xs'>{fieldState.error?.message || 'Input is required!'}</p>}
		</div>}
	</div>
}
