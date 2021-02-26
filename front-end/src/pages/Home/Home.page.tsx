import {
	IonButton,
	IonCol,
	IonContent,
	IonGrid,
	IonHeader,
	IonPage,
	IonRow,
	IonTitle,
	IonToolbar,
	IonLoading,
} from '@ionic/react';
import './Home.page.css';
import React, { FormEvent, useEffect, useState } from 'react';
import withAuth from '../../HOC/withAuth.hoc';
import { fields } from '../../formConfig.json';
import HomeForm from '../../components/Home/HomeForm/HomeForm.component';
import Message, {
	MessageProps,
} from '../../components/Shared/Message/Message.component';
import RegistersComponent from '../../components/Home/Registers/Registers.component';

export interface FormField {
	label: string;
	type: string;
}

export interface FormState {
	[key: string]: any;
}

const HomePage: React.FC = () => {
	const formConfigFields: FormField[] = fields;
	let formObjState: FormState;

	const [formFields, setFormFields] = useState<FormState>({});
	const [createRegister, setCreateRegister] = useState<boolean>(true);
	const [message, setMessage] = useState<MessageProps>({
		message: '',
		errorMessage: false,
	});
	const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(() => {
		formConfigFields.forEach((field) => {
			formObjState = {
				...formObjState,
				[field.label]:
					field.type === 'checkbox' || field.type === 'radio'
						? false
						: '',
			};
		});
		setFormFields(formObjState);
	}, []);

	const handleChange = (event: any) => {
		let value =
			event.target.type === 'checkbox' || event.target.type === 'radio'
				? event.target.checked
				: event.target.value;
		const key = event.target.name;
		setFormFields({ ...formFields, [key]: value });
	};

	const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		setIsLoading(true);
		const request = await fetch('http://localhost:5000/registers/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `[Bearer] ${localStorage.getItem('token')}`,
			},

			body: JSON.stringify(formFields),
		});
		const response = await request.json();
		setMessage({ message: response.message, errorMessage: response.error });
		setIsLoading(false);
		setTimeout(() => {
			setMessage({ message: '', errorMessage: false });
		}, 4000);
	};

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle className="ion-text-center">
						Pratech Test App
					</IonTitle>
				</IonToolbar>
			</IonHeader>

			<IonContent>
				<IonLoading isOpen={isLoading} message={'Please wait...'} />
				{message.message ? (
					<Message
						message={message.message}
						errorMessage={message.errorMessage}
					/>
				) : (
					''
				)}
				<IonGrid>
					<IonRow>
						<IonCol offsetLg="3" sizeLg="6" offsetMd="2" sizeMd="8">
							<form
								onSubmit={submitHandler}
								className="ion-text-center"
							>
								<HomeForm
									fields={fields}
									handleChange={handleChange}
									formFields={formFields}
								/>
								<IonButton type="submit">
									{createRegister
										? 'Create Register'
										: 'Update Register'}
								</IonButton>
							</form>
						</IonCol>
					</IonRow>
				</IonGrid>
				<RegistersComponent />
			</IonContent>
		</IonPage>
	);
};

export default withAuth(HomePage);
