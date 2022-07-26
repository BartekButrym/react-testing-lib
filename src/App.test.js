import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('inputs should be initially empty', () => {
	render(<App />);

	const emailInputElement = screen.getByRole('textbox');
	const passwordInputElement = screen.getByLabelText('Password');
	const confirmPasswordInputElement = screen.getByLabelText(/confirm password/i);

	expect(emailInputElement.value).toBe('');
	expect(passwordInputElement.value).toBe('');
	expect(confirmPasswordInputElement.value).toBe('');
});

test('should be able to type an email', () => {
	render(<App />);

	const emailInputElement = screen.getByRole('textbox', {
		name: /email/i,
	});

	userEvent.type(emailInputElement, 'selena@gmail.com');

	expect(emailInputElement.value).toBe('selena@gmail.com');
});

test('should be able to type a password', () => {
	render(<App />);

	const passwordInputElement = screen.getByLabelText('Password');

	userEvent.type(passwordInputElement, 'test1234');

	expect(passwordInputElement.value).toBe('test1234');
});

test('should be able to type a confirm password', () => {
	render(<App />);

	const confirmPasswordInputElement = screen.getByLabelText(/confirm password/i);

	userEvent.type(confirmPasswordInputElement, 'test1234');

	expect(confirmPasswordInputElement.value).toBe('test1234');
});

test('should show email error message on invaild email', () => {
	render(<App />);

	const emailErrorElement = screen.queryByText(/the email you input is invalid/i);
	const emailInputElement = screen.getByRole('textbox', {
		name: /email/i,
	});
	const submitButtonElement = screen.getByRole('button', { name: /submit/i });

	expect(emailErrorElement).not.toBeInTheDocument();

	userEvent.type(emailInputElement, 'selenagmail.com');
	userEvent.click(submitButtonElement);

	const emailErrorElementAgain = screen.queryByText(/the email you input is invalid/i);

	expect(emailErrorElementAgain).toBeInTheDocument();
});

test('should the password error if password is less than 5 characters', () => {
	render(<App />);

	const emailInputElement = screen.getByRole('textbox', {
		name: /email/i,
	});
	const passwordErrorElement = screen.queryByText(/the password you entered should contain 5 or more characters/i);
	const passwordInputElement = screen.getByLabelText('Password');
	const submitButtonElement = screen.getByRole('button', { name: /submit/i });

	userEvent.type(emailInputElement, 'selena@gmail.com');

	expect(passwordErrorElement).not.toBeInTheDocument();

	userEvent.type(passwordInputElement, '123');

	userEvent.click(submitButtonElement);

	const passwordErrorElementAgain = screen.queryByText(
		/the password you entered should contain 5 or more characters/i
	);

	expect(passwordErrorElementAgain).toBeInTheDocument();
});

test("should show confirm password error if passwords don't match", () => {
	render(<App />);

	const emailInputElement = screen.getByRole('textbox', {
		name: /email/i,
	});
	const passwordInputElement = screen.getByLabelText('Password');
	const confirmPasswordInputElement = screen.getByLabelText(/confirm password/i);

	const confirmPasswordErrorElement = screen.queryByText(/the passwords don't match. try again/i);
	const submitButtonElement = screen.getByRole('button', { name: /submit/i });

	userEvent.type(emailInputElement, 'selena@gmail.com');
	userEvent.type(passwordInputElement, '12345');

	expect(confirmPasswordErrorElement).not.toBeInTheDocument();

	userEvent.type(confirmPasswordInputElement, '123456');

	userEvent.click(submitButtonElement);

	const confirmPasswordErrorElementAgain = screen.queryByText(/the passwords don't match. try again/i);

	expect(confirmPasswordErrorElementAgain).toBeInTheDocument();
});

test('should show no error if every input is valid', () => {
	render(<App />);

	const emailInputElement = screen.getByRole('textbox', {
		name: /email/i,
	});
	const passwordInputElement = screen.getByLabelText('Password');
	const confirmPasswordInputElement = screen.getByLabelText(/confirm password/i);
	const submitButtonElement = screen.getByRole('button', { name: /submit/i });

	userEvent.type(emailInputElement, 'selena@gmail.com');
	userEvent.type(passwordInputElement, '12345');
	userEvent.type(confirmPasswordInputElement, '12345');
	userEvent.click(submitButtonElement);

	const emailErrorElement = screen.queryByText(/the email you input is invalid/i);
	const passwordErrorElement = screen.queryByText(/the password you entered should contain 5 or more characters/i);
	const confirmPasswordErrorElement = screen.queryByText(/the passwords don't match. try again/i);

	expect(emailErrorElement).not.toBeInTheDocument();
	expect(passwordErrorElement).not.toBeInTheDocument();
	expect(confirmPasswordErrorElement).not.toBeInTheDocument();
});
