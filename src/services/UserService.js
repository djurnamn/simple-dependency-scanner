import axios from 'axios'
import AuthService from './AuthService'

const detailsUrl = 'http://localhost:8081/api/1.0/open/zapier/user'

class UserService {
	/**
	 * Append data to localStorage by key
	 */
	appendToStorage(key, data) {
		let current = localStorage.getItem(key)

		try {
			current = JSON.parse(current)
		} catch(e) {
			current = {}
		}

		localStorage.setItem(key, JSON.stringify(Object.assign(current, data)))
	}

	/**
	 * Get user details from API
	 */
	getDetails() {
		return axios.get(detailsUrl, {
			headers: AuthService.getHeader()
		}).then(response => {
			this.update(response.data)

			return response.data
		}).catch(error => {
			return error
		})
	}

	/**
	 * Get user details
	 */
	get() {
		return JSON.parse(localStorage.getItem('user'))
	}

	/**
	 * Update user details
	 */
	update(data) {
		this.appendToStorage('user', data)
	}
}

export default new UserService()