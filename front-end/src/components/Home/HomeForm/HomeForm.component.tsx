import React from 'react';
import Input from '../../Shared/Input/Input.component';
import { FormField, FormState } from '../../../pages/Home/Home.page';
import { fields } from '../../../formConfig.json';

interface HomeFormProps {
	fields: FormField[];
	handleChange: (event: any) => void;
	formFields: FormState;
}
const HomeForm: React.FC<HomeFormProps> = (props) => {
	const { fields, handleChange, formFields } = props;

	const form = fields.map((field, index) => {
		return (
			<Input
				key={index}
				handleChange={handleChange}
				value={formFields[field.label]}
				name={field.label}
				inputType={field.type}
				label={field.label}
			/>
		);
	});

	return <>{form}</>;
};

export default HomeForm;
