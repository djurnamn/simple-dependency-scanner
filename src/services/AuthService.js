import axios from 'axios'

const apiUrl = 'http://localhost:8081/api/login_check'

class AuthService {
	/**
	 * Login
	 */
	login(user) {
		return axios
			.post(apiUrl, {
				_username: user.username,
				_password: user.password
			})
			.then(response => {
				if (response.data.token) {
					localStorage.setItem('user', JSON.stringify(response.data))
				}

				return response.data
			})
	}

	/**
	 * Get auth token from localStorage and return it formatted as a request header
	 */
	getHeader() {
		let user = JSON.parse(localStorage.getItem('user'))

		if (user && user.token) {
			return { Authorization: 'Bearer ' + user.token }
		} else {
			return {}
		}
	}

	/**
	 * Logout
	 */
	logout() {
		localStorage.removeItem('user')
	}
}

export default new AuthService()