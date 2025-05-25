export const BASE_URL = "http://localhost:5000/api/v1";

export const API_PATHS = {
	AUTH: {
		SIGNUP: "/auth/register", //Register a new user(Author, Reader, Admin)
		LOGIN: "/auth/login", //authenticate user and return a jwt token
		GET_ME: "/auth/me", //get user details
	},

	IMAGE: {
		UPLOAD: "/user/image-upload", //upload image to cloudinary (temporary local storage)
	},
};
