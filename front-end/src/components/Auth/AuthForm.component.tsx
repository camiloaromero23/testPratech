import React, { useState } from 'react';

import { IonButton, IonContent, IonLoading } from '@ionic/react';
import { Redirect } from 'react-router-dom';
import Input from '../Shared/Input/Input.component';
import Message, { MessageProps } from '../Shared/Message/Message.component';

interface AuthProps {
	login: boolean;
}

interface AuthState {
	username: string;
	password: string;
}

const AuthForm: React.FC<AuthProps> = (props) => {
	const { login } = props;
	const [user, setUser] = useState<AuthState>({
		username: '',
		password: '',
	});
	const [message, setMessage] = useState<MessageProps>({
		message: '',
		errorMessage: false,
	});

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [redirect, setRedirect] = useState<boolean>(false);

	const handleChange = (event: any) => {
		const value = event.detail.value;
		const key = event.target.name;

		setUser({ ...user, [key]: value });
	};

	const loginHandler = async () => {
		setIsLoading(true);
		const request = await fetch('http://localhost:5000/users/login', {
			method: 'POST',

			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(user),
		});

		const jsonResponse = await request.json();
		if (!jsonResponse.error) {
			const token = jsonResponse.accessToken;
			localStorage.setItem('token', token);
			setIsLoading(false);
			setRedirect(true);
		}
		setIsLoading(false);
		setMessage({
			message: jsonResponse.message,
			errorMessage: jsonResponse.error,
		});
	};

	const signupHandler = async () => {
		setIsLoading(true);
		const request = await fetch('http://localhost:5000/users/signup', {
			method: 'POST',

			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(user),
		});
		const response = await request.json();
		setMessage({ message: response.message, errorMessage: response.error });
		setIsLoading(false);
		setTimeout(() => {
			setMessage({ message: '', errorMessage: false });
		}, 4000);
	};

	const submitHandler = async (event: any) => {
		event.preventDefault();
		if (login) {
			await loginHandler();
		} else {
			await signupHandler();
		}
	};

	if (redirect) {
		return <Redirect to="/home" />;
	}

	return (
		<div className="ion-text-center">
			<IonContent>
				<IonLoading isOpen={isLoading} message={'Please wait...'} />
			</IonContent>
			<h1>{login ? 'Log In' : 'Sign Up'}</h1>
			{message.message ? (
				<Message
					message={message.message}
					errorMessage={message.errorMessage}
				/>
			) : (
				''
			)}
			<form
				onSubmit={submitHandler}
				className="ion-padding-top ion-margin-bottom"
			>
				<Input
					label="Username"
					name="username"
					inputType="text"
					value={user.username}
					handleChange={handleChange}
				/>
				<Input
					label="Password"
					name="password"
					inputType="password"
					value={user.password}
					handleChange={handleChange}
				/>

				<IonButton
					type="submit"
					className="ion-margin-top ion-padding-top ion-padding-bottom"
					expand="block"
				>
					{login ? 'Log In' : 'Sign Up'}
				</IonButton>
			</form>
		</div>
	);
};

export default AuthForm;
