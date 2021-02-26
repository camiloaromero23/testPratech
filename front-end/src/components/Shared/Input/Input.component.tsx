import React from 'react';
import {
	IonInput,
	IonItem,
	IonLabel,
	IonRadio,
	IonRadioGroup,
} from '@ionic/react';

interface InputProps {
	label: string;
	value: string | boolean;
	name: string;
	inputType: any;

	handleChange(event: any): void;
}

const Input: React.FC<InputProps> = (props) => {
	const { label, value, handleChange, inputType, name } = props;

	let inputToRender: JSX.Element;

	if (inputType === 'radio' || inputType === 'checkbox') {
		inputToRender = (
			<div
			// onChange={handleChange}
			// allowEmptySelection={inputType === 'checkbox'}
			// onIonChange={handleChange}
			// value={value}
			>
				<IonItem>
					{/*<IonRadio slot="start" name={name} value={name}  />*/}
					<IonLabel>{label}</IonLabel>
					<input
						type={inputType}
						value={value + ''}
						// checked={!value}
						// name={name}
						onChange={handleChange}
						checked={!!value}
					/>
				</IonItem>
			</div>
		);
	} else {
		inputToRender = (
			<IonItem>
				<IonLabel position="floating">{label}</IonLabel>

				<IonInput
					name={name}
					value={value + ''}
					onIonChange={handleChange}
					type={inputType}
				/>
			</IonItem>
		);
	}

	return inputToRender;
};

export default Input;
