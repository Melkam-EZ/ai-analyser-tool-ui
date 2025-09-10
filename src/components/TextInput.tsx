import { InputHTMLAttributes, JSX, ReactNode } from "react";

import { Control, RegisterOptions, useController, UseFormReturn, } from "react-hook-form";
import classnames from "classnames";

interface ITextInputProps {
	stylingClass?: string;
	formControl?: UseFormReturn;
	control?: Control<any>;
	icon?: ReactNode;
	action?: {
		name?: string;
		icon?: JSX.Element;
		onClick?: () => void;
		announcement?: string;
		toggleIcon?: JSX.Element;
		onToggleClick?: (isOn: boolean) => void;
	};
	options: {
		name: string;
		label?: string;
		disabled?: boolean;
		autoComplete?: "on" | "off";
	} & Omit<
		InputHTMLAttributes<HTMLInputElement>,
		"value" | "disabled" | "className" | "onChange" | "autoComplete"
	>;
	rules?: Omit<
		RegisterOptions,
		"valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
	>;
}

// https://www.becomebetterprogrammer.com/typescript-pass-function-as-a-parameter/

export default function TextInput(inputProps: ITextInputProps) {

	const { field, fieldState } = useController({
		name: inputProps?.options?.name,
		rules: inputProps?.rules,
		control: inputProps?.control,
		disabled: inputProps?.options?.disabled,
		defaultValue: "",
	});

	return (
		<div className={classnames("mb-6 w-full", inputProps.stylingClass)}>
			<div className="flex justify-between text-xs mb-1">
				{inputProps?.options?.label && (
					<label htmlFor={inputProps?.options?.id} className="text-xs">
						{inputProps.options.label}{" "}
						{!inputProps?.options?.required && (
							<span className="italic"> - optional</span>
						)}
					</label>
				)}
				{inputProps.action?.name && (
					<p
						onClick={inputProps.action?.onClick && inputProps.action?.onClick}
						className="text-xs text-blue-500 cursor-pointer hover:underline flex"
					>
						{" "}
						{inputProps.action?.icon && (
							<span className="mr-1">{inputProps.action?.icon}</span>
						)}{" "}
						{inputProps.action?.name}
					</p>
				)}
			</div>
			<div className="flex items-center mb-1 relative">
				<input id={inputProps?.options?.id} className={classnames(
					"placeholder-inherit bg-white focus:outline-none focus:border-blue-400 disabled:bg-slate-200 grow w-full px-4 py-3 border border-slate-300 rounded-lg",
					{
						"!placeholder-red-500 text-red-500 bg-red-50/25 !border-red-500 animate__animated animate__headShake":
							fieldState.isTouched &&
							fieldState.isDirty &&
							fieldState.invalid,
					}
				)} {...field}	{...inputProps.options} />
				{inputProps.icon && <div onClick={() => inputProps.action?.onClick && inputProps.action?.onClick()} className="absolute cursor-pointer right-2">{inputProps.icon}</div>}
			</div>
			{inputProps?.action?.announcement && (
				<p className="text-xs text-emerald-500">
					{inputProps.action?.announcement}
				</p>
			)}
			{fieldState.isTouched && fieldState.isDirty && fieldState.invalid && (
				<div>
					{fieldState.error?.type === "required" && (
						<p className="text-red-500 italic text-xxs">
							{fieldState.error?.message || 'Input is required!'}
						</p>
					)}
					{fieldState.error?.type === "pattern" && (
						<p className="text-red-500 italic text-xxs">
							{fieldState.error?.message ||
								`Wrong ${inputProps?.options?.type} input pattern!`}
						</p>
					)}
					{fieldState.error?.type === "min" && (
						<p className="text-red-500 italic text-xxs">
							{fieldState.error?.message ||
								`Input value must be greater or equals to ${inputProps?.options?.min}!`}
						</p>
					)}
					{fieldState.error?.type === "max" && (
						<p className="text-red-500 italic text-xxs">
							{fieldState.error?.message ||
								`Input value must be less or equals to ${inputProps?.options?.max}!`}
						</p>
					)}
					{fieldState.error?.type === "minLength" && (
						<p className="text-red-500 italic text-xxs">
							{fieldState.error?.message ||
								`Minimum input length must be ${inputProps?.options?.minLength} characters!`}
						</p>
					)}
					{fieldState.error?.type === "maxLength" && (
						<p className="text-red-500 italic text-xxs">
							{fieldState.error?.message ||
								`Maximum input length must be ${inputProps?.options?.maxLength} characters!`}
						</p>
					)}
				</div>
			)}
		</div>
	);
}
