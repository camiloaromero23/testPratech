import React from 'react';

interface RegisterProps {
	_id?: string;
	[propName: string]: any;
}

const Register: React.FC<RegisterProps> = (props) => {
	const register = (({ _id, ...aux }) => aux)(props);
	const keys = Object.getOwnPropertyNames(register);

	const toReturn = keys.map((key, index) => (
		<div key={index}>
			<h1 style={{ display: 'inline' }}>{key}:</h1> {register[key] + ''}
		</div>
	));

	console.log('---------------------', props);

	return <>{toReturn}</>;
};

export default Register;
