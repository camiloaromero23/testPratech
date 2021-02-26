import React from 'react';
import styles from './Message.component.module.css';

export interface MessageProps {
	message: string;
	errorMessage: boolean;
}

const Message: React.FC<MessageProps> = (props) => {
	const { errorMessage, message = '' } = props;
	return (
		<h5
			className={`ion-padding ${
				errorMessage ? styles.errorMessage : styles.message
			}`}
		>
			{message}
		</h5>
	);
};

export default Message;
