import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import SelectInput from '../src/components/SelectInput';

const mockOptions = [
	{ label: 'Option 1', value: 'option1' },
	{ label: 'Option 2', value: 'option2' },
	{ label: 'Option 3', value: 'option3' },
];

function TestComponent({ rules = {}, disabled = false, required = false }) {
	const { control } = useForm();
	return (
		<SelectInput
			name="testSelect"
			control={control}
			options={mockOptions}
			label="Test Select"
			disabled={disabled}
			required={required}
			rules={rules}
			placeholder="Select an option"
		/>
	);
}

describe('SelectInput', () => {
	it('renders correctly with label and placeholder', () => {
		render(<TestComponent />);
		expect(screen.getByText('Test Select')).toBeInTheDocument();
		expect(screen.getByText('Select an option')).toBeInTheDocument();
	});

	it('renders all options correctly', () => {
		render(<TestComponent />);
		const select = screen.getByRole('combobox');
		fireEvent.click(select);

		mockOptions.forEach(option => {
			expect(screen.getByText(option.label)).toBeInTheDocument();
		});
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
		expect(screen.getByRole('combobox')).toBeDisabled();
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

		const select = screen.getByRole('combobox');
		fireEvent.focus(select);
		fireEvent.blur(select);

		expect(await screen.findByText('Input is required!')).toBeInTheDocument();
	});

	it('handles value selection correctly', () => {
		render(<TestComponent />);
		const select = screen.getByRole('combobox');

		fireEvent.change(select, { target: { value: 'option2' } });
		expect(select).toHaveValue('option2');
	});

	it('handles action button click', () => {
		const handleClick = vi.fn();

		const { control } = useForm();
		render(
			<SelectInput
				name="testSelect"
				control={control}
				options={mockOptions}
				label="Test Select"
				action={{
					name: 'Add Option',
					onClick: handleClick,
				}}
			/>
		);

		fireEvent.click(screen.getByText('Add Option'));
		expect(handleClick).toHaveBeenCalled();
	});
});
