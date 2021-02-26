import React, { useEffect, useState } from 'react';
import Register from './Register/Register.component';
import Message from '../../Shared/Message/Message.component';

interface RegisterPayload {
	_id: string;

	[key: string]: any;
}

const RegistersComponent: React.FC = () => {
	const [registers, setRegisters] = useState<RegisterPayload[]>([]);

	useEffect(() => {
		fetch('http://localhost:5000/registers/', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `[Bearer] ${localStorage.getItem('token')}`,
			},
		})
			.then((response) => response.json())
			.then((registersPayload) => registersPayload.registers)
			.then((registers) => {
				setRegisters(registers);
			});
	}, []);

	const registersToRender = registers.map((register) => (
		<Register key={register._id} {...register} />
	));

	return registers.length > 0 ? (
		<>{registersToRender}</>
	) : (
		<>
			<Message message="No registers found" errorMessage={true} />
		</>
	);
};
export default RegistersComponent;
