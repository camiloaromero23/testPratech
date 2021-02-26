import { Redirect } from 'react-router-dom';
import React from 'react';

const withAuth = (Component: React.FC) => {
	return () => {
		const isAuth = !!localStorage.getItem('token');
		if (isAuth) {
			return <Component />;
		} else {
			return <Redirect to="/auth" />;
		}
	};
};

export default withAuth;
