import AuthService from '../services/AuthService'
import UserService from '../services/UserService'

const user = JSON.parse(localStorage.getItem('user'))
const initialState = user
	? { status: { loggedIn: true }, user }
	: { status: { loggedIn: false }, user: null }

export const auth = {
	namespaced: true,
	state: initialState,

	actions: {
		login({ commit }, user) {
			return AuthService.login(user).then(
				user => {
					commit('loginSuccess', user)
					return Promise.resolve(user)
				},
				error => {
					commit('loginFailure')
					return Promise.reject(error)
				}
			)
		},

		getDetails({ commit }) {
			return UserService.getDetails().then(
				details => {
					commit('getDetails', details)
					return Promise.resolve(details)
				})
		},

		logout({ commit }) {
			AuthService.logout()
			commit('logout')
		}
	},

	mutations: {
		loginSuccess(state, user) {
			state.status.loggedIn = true
			state.user = user
		},

		getDetails(state, details) {
			state.user.name = details.name
			state.user.email = details.email
		},

		loginFailure(state) {
			state.status.loggedIn = false
			state.user = null
		},

		logout(state) {
			state.status.loggedIn = false
			state.user = null
		}
	}
}