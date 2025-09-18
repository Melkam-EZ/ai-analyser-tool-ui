import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import TextareaInput from '../src/components/TextareaInput';

function TestComponent({ rules = {}, disabled = false, required = false }) {
	const { control } = useForm();
	return (
		<TextareaInput
			control={control}
			options={{
				name: 'testTextarea',
				label: 'Test Textarea',
				disabled,
				required,
				placeholder: 'Enter text here...',
			}}
			rules={rules}
		/>
	);
}

describe('TextareaInput', () => {
	it('renders correctly with label', () => {
		render(<TestComponent />);
		expect(screen.getByText('Test Textarea')).toBeInTheDocument();
		expect(screen.getByPlaceholderText('Enter text here...')).toBeInTheDocument();
	});

	it('shows optional text when not required', () => {
		render(<TestComponent required={false} />);
		expect(screen.getByText(/optional/i)).toBeInTheDocument();
	});

	it('does not show optional text when required', () => {
		render(<TestComponent required={true} />);
		expect(screen.queryByText(/optional/i)).not.toBeInTheDocument();
	});

	it('handles disabled state correctly', () => {
		render(<TestComponent disabled={true} />);
		expect(screen.getByPlaceholderText('Enter text here...')).toBeDisabled();
	});

	it('shows error message when required field is empty', async () => {
		render(
			<TestComponent
				required={true}
				rules={{
					required: 'This field is required',
				}}
			/>
		);

		const textarea = screen.getByPlaceholderText('Enter text here...');
		fireEvent.focus(textarea);
		fireEvent.blur(textarea);

		expect(await screen.findByText('This field is required')).toBeInTheDocument();
	});

	it('handles text input correctly', () => {
		render(<TestComponent />);
		const textarea = screen.getByPlaceholderText('Enter text here...');

		fireEvent.change(textarea, { target: { value: 'test content' } });
		expect(textarea).toHaveValue('test content');
	});

	it('handles action button click with icon', () => {
		const handleClick = vi.fn();
		const { control } = useForm();

		render(
			<TextareaInput
				control={control}
				options={{
					name: 'testTextarea',
					label: 'Test Textarea',
				}}
				action={{
					name: 'Clear',
					icon: <span data-testid="clear-icon">❌</span>,
					onClick: handleClick,
				}}
			/>
		);

		const actionButton = screen.getByText('Clear');
		expect(screen.getByTestId('clear-icon')).toBeInTheDocument();

		fireEvent.click(actionButton);
		expect(handleClick).toHaveBeenCalled();
	});

	it('handles render prop correctly', () => {
		const { control } = useForm();

		render(
			<TextareaInput
				render={false}
				control={control}
				options={{
					name: 'testTextarea',
					label: 'Test Textarea',
				}}
			/>
		);

		expect(screen.queryByText('Test Textarea')).not.toBeInTheDocument();
	});
});
