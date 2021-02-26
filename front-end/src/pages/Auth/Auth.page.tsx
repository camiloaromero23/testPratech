import React, { useState } from 'react';
import './Auth.page.css';
import AuthForm from '../../components/Auth/AuthForm.component';
import {
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar,
	IonSegment,
	IonSegmentButton,
	IonLabel,
	IonGrid,
	IonRow,
	IonCol,
} from '@ionic/react';

const AuthPage: React.FC = () => {
	const [login, setLogin] = useState<boolean>(true);

	const handleFormType = (event: any) => {
		const type = event.detail.value;
		if (type === 'Log In') {
			setLogin(true);
		} else {
			setLogin(false);
		}
	};

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle className="ion-text-center">
						Pratech Test App - {login ? 'Log In' : 'Sign Up'}
					</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent className="ion-padding">
				<IonGrid>
					<IonRow>
						<IonCol offsetMd="2" sizeMd="8" offsetLg="3" sizeLg="6">
							<IonSegment
								// value="Log In"
								onIonChange={handleFormType}
							>
								<IonSegmentButton value="Log In">
									<IonLabel>Log In</IonLabel>
								</IonSegmentButton>
								<IonSegmentButton value="Sign Up">
									<IonLabel>Sign Up</IonLabel>
								</IonSegmentButton>
							</IonSegment>
							<AuthForm login={login} />
						</IonCol>
					</IonRow>
				</IonGrid>
			</IonContent>
		</IonPage>
	);
};

export default AuthPage;
