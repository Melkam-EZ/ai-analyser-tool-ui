import classnames from "classnames";
import { JSX, TextareaHTMLAttributes } from "react";

import { Control, RegisterOptions, useController } from "react-hook-form";

//TextareaHTMLAttributes<HTMLTextAreaElement>
interface ITextareaInputProps {
	render?: boolean;
	control?: Control<any>;
	action?: {
		name: string;
		icon?: JSX.Element;
		onClick: () => void;
	};
	options: {
		name: string;
		label?: string;
		disabled?: boolean;
	} & Omit<
		TextareaHTMLAttributes<HTMLTextAreaElement>,
		"value" | "disabled" | "className" | "type" | "onChange"
	>;
	rules?: Omit<
		RegisterOptions,
		"valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
	>;
}

export default function TextareaInput(inputProps: ITextareaInputProps) {
	const { field, fieldState } = useController({
		name: inputProps?.options?.name,
		rules: inputProps?.rules,
		control: inputProps?.control,
		disabled: inputProps?.options?.disabled,
		defaultValue: "",
	});

	return <div className="mb-6 w-full" >
		<div className="flex justify-between text-xs">
			{inputProps.options?.label && <label htmlFor={inputProps?.options?.id} className="text-xs">
				{inputProps.options?.label || " "}{" "}
				{!inputProps.options?.required && (
					<span className="italic"> - optional</span>
				)}
			</label>}
			{inputProps.action?.name && (
				<p onClick={inputProps.action?.onClick} className="text-xs text-blue-500 cursor-pointer hover:underline flex">
					{inputProps.action.icon && <span className="mr-1">{inputProps.action.icon}</span>}
					{inputProps.action.name}
				</p>
			)}
		</div>
		<textarea id={inputProps?.options?.id} className={classnames(
			"w-full p-3 mt-1 placeholder-inherit border border-slate-300 rounded-lg bg-white focus:outline-none focus:border-blue-400 disabled:bg-gray-200 disabled:shadow-none",
			{
				"!placeholder-red-500 text-red-500 !bg-red-50/25 !border-red-600 animate__animated animate__headShake":
					fieldState.isTouched && fieldState.isDirty && fieldState.invalid,
			}
		)} rows={5} {...field} {...inputProps.options} />
		{
			fieldState.isTouched && fieldState.isDirty && fieldState.invalid && <div>
				{fieldState.error?.type === "required" && <p className="text-red-500 italic text-xxs">{fieldState.error?.message || 'Input is required'}</p>}
				{fieldState.error?.type === "minLength" && (
					<p className="text-red-500 italic text-xxs">
						{fieldState.error?.message ||
							`Minimum input length must be ${inputProps?.rules?.minLength} characters!`}
					</p>
				)}
				{fieldState.error?.type === "maxLength" && (
					<p className="text-red-500 italic text-xxs">
						{fieldState.error?.message ||
							`Maximum input length must be ${inputProps?.rules?.maxLength} characters!`}
					</p>
				)}
			</div>
		}
	</div>
}
