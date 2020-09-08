<template>
	<div class="login">
		<div class="login-content">
			<h1>Login</h1>

			<p>You can log in to the app using your Debricked credentials but be aware that since this is just a proof of concept, no real measurements have been taken to keep your data secure. Please use at your own discretion, preferrably with a test account.</p>
		</div>

		<form class="login-form" name="form" @submit.prevent="handleLogin">
			<div v-if="message" class="login-message" role="alert">{{message.message}}</div>

			<div class="login-field" v-bind:class="{'has-error': errors.has('username')}">
				<input
					v-model="user.username"
					v-validate="'required'"
					type="text"
					class="login-field-input"
					name="username"
					placeholder="Username"
				/>
				
				<div class="login-field-error" role="alert">Username is required!</div>
			</div>

			<div class="login-field" v-bind:class="{'has-error': errors.has('password')}">
				<input
					v-model="user.password"
					v-validate="'required'"
					type="password"
					class="login-field-input"
					name="password"
					placeholder="Password"
				/>
				
				<div class="login-field-error" role="alert">Password is required!</div>
			</div>

			<button class="login-button" :disabled="loading">
				<span class="login-button-icon is-spinner" v-show="loading">
					<svg version="1.2" baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19.5 12.473c0-1.948-.618-3.397-2.066-4.844-.391-.39-1.023-.39-1.414 0-.391.391-.391 1.024 0 1.415 1.079 1.078 1.48 2.007 1.48 3.429 0 1.469-.572 2.85-1.611 3.888-1.004 1.003-2.078 1.502-3.428 1.593l1.246-1.247c.391-.391.391-1.023 0-1.414s-1.023-.391-1.414 0l-3.707 3.707 3.707 3.707c.195.195.451.293.707.293s.512-.098.707-.293c.391-.391.391-1.023 0-1.414l-1.337-1.336c1.923-.082 3.542-.792 4.933-2.181 1.417-1.416 2.197-3.299 2.197-5.303zM6.5 12.5c0-1.469.572-2.85 1.611-3.889 1.009-1.009 2.092-1.508 3.457-1.594l-1.275 1.275c-.391.391-.391 1.023 0 1.414.195.196.451.294.707.294s.512-.098.707-.293l3.707-3.707-3.707-3.707c-.391-.391-1.023-.391-1.414 0s-.391 1.023 0 1.414l1.311 1.311c-1.914.086-3.525.796-4.907 2.179-1.417 1.416-2.197 3.299-2.197 5.303 0 1.948.618 3.397 2.066 4.844.195.195.451.292.707.292s.512-.098.707-.293c.391-.391.391-1.024 0-1.415-1.079-1.077-1.48-2.006-1.48-3.428z"/></svg>
				</span>

				<span class="login-button-label">Login</span>
			</button>
		</form>
	</div>
</template>

<script>
import User from '../models/User'

export default {
	name: 'Login',

	data() {
		return {
			user: new User('', ''),
			loading: false,
			message: ''
		}
	},

	computed: {
		/**
		 * Check if user is logged in
		 */
		loggedIn() {
			return this.$store.state.auth.status.loggedIn
		}
	},

	created() {
		/**
		 * If user is already logged in send them to the profile view
		 */
		if (this.loggedIn) {
			this.$router.push('/profile')
		}
	},

	methods: {
		handleLogin() {
			this.loading = true

			this.$validator.validateAll().then(isValid => {
				if (!isValid) {
					this.loading = false

					return
				}

				if (this.user.username && this.user.password) {
					// Authenticate user to retrieve token
					this.$store.dispatch('auth/login', this.user).then(
						() => {
							// Get user details from API
							this.$store.dispatch('auth/getDetails').then(
								() => {
									// Redirect to user profile
									this.$router.push('/profile')
								}
							)
						},

						error => {
							this.loading = false

							this.message =
								(error.response && error.response.data) ||
								error.message ||
								error.toString()
						}
					);
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
@import '../styles/helpers';

.login {
	&-message {
		padding: 10px;
		border-radius: 10px 10px 0 0;
		background-color: $color-context-negative;
		color: $color-white;
		@include antialias;
		font-weight: 600;
		text-align: center;
	}

	&-content {
		@extend %wysiwyg;
		margin-bottom: 40px;
	}

	&-form {
		max-width: 480px;
		margin-left: auto;
		margin-right: auto;
	}

	&-field {
		@include field;
	}

	&-button {
		@include button($group: true, $big: true);

		&-icon {
			@extend %rotating;
		}
	}
}
</style>