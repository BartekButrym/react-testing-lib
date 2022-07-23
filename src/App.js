import { useState } from 'react';
import validator from 'validator';
import './App.css';

function App() {
	const [signupInput, setSignupInput] = useState({
		email: '',
		password: '',
		confirmPassword: '',
	});

	const [error, setError] = useState('');

	const handleChange = (e) => {
		setSignupInput({ ...signupInput, [e.target.name]: e.target.value });
	};

	const handleClick = (e) => {
		e.preventDefault();

		if (!validator.isEmail(signupInput.email)) {
			setError('The email you input is invalid.');
		} else if (signupInput.password.length < 5) {
			setError('The password you entered should contain 5 or more characters.');
		} else if (signupInput.password !== signupInput.confirmPassword) {
			setError("The passwords don't match. Try again.");
		}
	};

	return (
		<div className='container my-5'>
			<form>
				<div className='mb-3'>
					<label htmlFor='email' className='form-label'>
						Email address
					</label>
					<input
						type='email'
						name='email'
						id='email'
						className='form-control'
						value={signupInput.email}
						onChange={handleChange}
					/>
				</div>
				<div className='mb-3'>
					<label htmlFor='password' className='form-label'>
						Password
					</label>
					<input
						type='password'
						name='password'
						id='password'
						className='form-control'
						value={signupInput.password}
						onChange={handleChange}
					/>
				</div>
				<div className='mb-3'>
					<label htmlFor='confirm-password' className='form-label'>
						Confirm Password
					</label>
					<input
						type='password'
						name='confirmPassword'
						id='confirm-password'
						className='form-control'
						value={signupInput.confirmPassword}
						onChange={handleChange}
					/>
				</div>
				{error && <p className='text-danger'>{error}</p>}
				<button type='submit' className='btn btn-primary' onClick={handleClick}>
					Submit
				</button>
			</form>
		</div>
	);
}

export default App;
