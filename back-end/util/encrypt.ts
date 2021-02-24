import bcrypt from 'bcrypt';

export const encrypt = async (password: string, saltIn?: string) => {
	const salt = saltIn ? saltIn : await bcrypt.genSalt();
	const hash = await bcrypt.hash(password, salt);
	return {
		salt,
		hash,
	};
};
