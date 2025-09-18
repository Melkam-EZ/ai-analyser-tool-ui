import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import TextInput from '../src/components/TextInput';

function TestComponent({ rules = {}, disabled = false, label = 'Test Input' }) {
	const { control } = useForm();
	return (
		<TextInput
			control={control}
			options={{
				name: 'testInput',
				label,
				disabled,
				placeholder: 'Enter text...',
			}}
			rules={rules}
		/>
	);
}

describe('TextInput', () => {
	beforeEach(() => {
		// Clear any previous renders
	});

	it('renders correctly with label', () => {
		render(<TestComponent />);
		expect(screen.getByText('Test Input')).toBeInTheDocument();
		expect(screen.getByPlaceholderText('Enter text...')).toBeInTheDocument();
	});

	it('shows optional text when not required', () => {
		render(<TestComponent />);
		expect(screen.getByText(/optional/i)).toBeInTheDocument();
	});

	it('handles disabled state correctly', () => {
		render(<TestComponent disabled={true} />);
		expect(screen.getByPlaceholderText('Enter text...')).toBeDisabled();
	});

	it('shows error message when required field is empty', async () => {
		render(
			<TestComponent
				rules={{
					required: 'This field is required',
				}}
			/>
		);

		const input = screen.getByPlaceholderText('Enter text...');
		fireEvent.focus(input);
		fireEvent.blur(input);

		expect(await screen.findByText('This field is required')).toBeInTheDocument();
	});

	it('handles input changes correctly', () => {
		render(<TestComponent />);
		const input = screen.getByPlaceholderText('Enter text...');

		fireEvent.change(input, { target: { value: 'test input' } });
		expect(input).toHaveValue('test input');
	});

	it('renders with custom styling class', () => {
		const { container } = render(
			<TextInput
				stylingClass="custom-class"
				control={useForm().control}
				options={{
					name: 'testInput',
					label: 'Test Input',
				}}
			/>
		);

		expect(container.firstChild).toHaveClass('custom-class');
	});

	it('renders with icon', () => {
		const TestIcon = () => <span data-testid="test-icon">🔍</span>;

		render(
			<TextInput
				icon={<TestIcon />}
				control={useForm().control}
				options={{
					name: 'testInput',
					label: 'Test Input',
				}}
			/>
		);

		expect(screen.getByTestId('test-icon')).toBeInTheDocument();
	});

	it('handles action button click', () => {
		const handleClick = vi.fn();

		render(
			<TextInput
				control={useForm().control}
				options={{
					name: 'testInput',
					label: 'Test Input',
				}}
				action={{
					name: 'Click me',
					onClick: handleClick,
				}}
			/>
		);

		fireEvent.click(screen.getByText('Click me'));
		expect(handleClick).toHaveBeenCalled();
	});
});
