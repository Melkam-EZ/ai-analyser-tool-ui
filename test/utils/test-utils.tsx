import { render as rtlRender } from '@testing-library/react';
import { UseFormReturn, useForm } from 'react-hook-form';
import { ReactElement } from 'react';

// Wrapper that provides form context for testing form components
export function FormProvider({ children }: { children: ReactElement }) {
	const methods = useForm();
	return children;
}

// Custom render function that includes form context
export function render(ui: ReactElement) {
	return rtlRender(ui, { wrapper: FormProvider });
}

// Create a mock form control for testing
export function createMockFormControl(): UseFormReturn {
	return {
		...useForm(),
		control: {
			register: jest.fn(),
			unregister: jest.fn(),
			getFieldState: jest.fn(),
			_names: {
				array: new Set(),
				mount: new Set(),
				unMount: new Set(),
				watch: new Set(),
				focus: '',
				watchAll: false,
			},
			_subjects: {
				watch: jest.fn(),
				array: jest.fn(),
				state: jest.fn(),
			},
			_getWatch: jest.fn(),
			_formValues: {},
			_defaultValues: {},
		},
	} as UseFormReturn;
}

// Export everything
export * from '@testing-library/react';