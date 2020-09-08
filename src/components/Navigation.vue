<template>
	<nav class="navigation">
		<ul class="navigation-list">
			<li class="navigation-item">
				<router-link to="/home" class="navigation-link">
					<span class="navigation-icon">
						<svg version="1.2" baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3s-6.186 5.34-9.643 8.232c-.203.184-.357.452-.357.768 0 .553.447 1 1 1h2v7c0 .553.447 1 1 1h3c.553 0 1-.448 1-1v-4h4v4c0 .552.447 1 1 1h3c.553 0 1-.447 1-1v-7h2c.553 0 1-.447 1-1 0-.316-.154-.584-.383-.768-3.433-2.892-9.617-8.232-9.617-8.232z"/></svg>
					</span>
					
					<span class="navigation-label">Home</span>
				</router-link>
			</li>

			<li v-if="currentUser" class="navigation-item">
				<router-link to="/profile" class="navigation-link">
					<span class="navigation-icon">
						<svg version="1.2" baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M17 9c0-1.381-.56-2.631-1.464-3.535-.905-.905-2.155-1.465-3.536-1.465s-2.631.56-3.536 1.465c-.904.904-1.464 2.154-1.464 3.535s.56 2.631 1.464 3.535c.905.905 2.155 1.465 3.536 1.465s2.631-.56 3.536-1.465c.904-.904 1.464-2.154 1.464-3.535zM6 19c0 1 2.25 2 6 2 3.518 0 6-1 6-2 0-2-2.354-4-6-4-3.75 0-6 2-6 4z"/></svg>
					</span>

					<span class="navigation-label">Profile</span>
				</router-link>
			</li>

			<li v-if="currentUser" class="navigation-item">
				<router-link to="/scan" class="navigation-link">
					<span class="navigation-icon">
						<svg version="1.2" baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M13 4c-3.859 0-7 3.141-7 7 0 .763.127 1.495.354 2.183l-.749.75-.511.512-1.008 1.045c-.562.557-.891 1.345-.891 2.185 0 1.727 1.404 3.131 3.13 3.131.757 0 1.504-.278 2.104-.784l.064-.055.061-.061 1.512-1.51.75-.749c.688.226 1.421.353 2.184.353 3.859 0 7-3.141 7-7s-3.141-7-7-7zm0 12c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5zM13 7c-2.205 0-4 1.794-4 4s1.795 4 4 4 4-1.794 4-4-1.795-4-4-4zm0 7c-1.656 0-3-1.344-3-3s1.344-3 3-3 3 1.344 3 3-1.344 3-3 3z"/></svg>
					</span>

					<span class="navigation-label">Scan</span>
				</router-link>
			</li>

			<li v-if="currentUser" class="navigation-item">
				<a class="navigation-link" href @click.prevent="logOut">
					<span class="navigation-icon">
						<svg version="1.2" baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M13 17.5c-2.481 0-4.5-2.019-4.5-4.5 0-.553-.447-1-1-1s-1 .447-1 1c0 3.584 2.916 6.5 6.5 6.5s6.5-2.916 6.5-6.5-2.916-6.5-6.5-6.5c-.553 0-1 .447-1 1s.447 1 1 1c2.481 0 4.5 2.019 4.5 4.5s-2.019 4.5-4.5 4.5zM10.656 4c.552 0 1 .448 1 1s-.448 1-1 1h-3.243l1.708 1.707 4.093 4.092c.391.391.391 1.025.001 1.415-.189.188-.44.292-.708.292s-.519-.104-.707-.291l-4.093-4.094-1.707-1.708v3.243c0 .552-.448 1-1 1s-1-.448-1-1v-6.656h6.656"/></svg>
					</span>

					<span class="navigation-label">Logout</span>
				</a>
			</li>

			<li v-if="!currentUser" class="navigation-item">
				<router-link to="/login" class="navigation-link">
					<span class="navigation-icon">
						<svg version="1.2" baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M8.5 11c0 .732.166 1.424.449 2.051l-3.949 3.949v1.5s.896 1.5 2 1.5h2v-2h2v-2h2.5c2.762 0 5-2.238 5-5s-2.238-5-5-5-5 2.238-5 5zm5 2c-1.104 0-2-.896-2-2 0-1.105.896-2.002 2-2.002 1.105 0 2 .896 2 2.002 0 1.104-.895 2-2 2z"/></svg>
					</span>

					<span class="navigation-label">Login</span>
				</router-link>
			</li>
		</ul>
	</nav>
</template>

<script>
export default {
	name: 'Navigation',

	computed: {
		currentUser() {
			return this.$store.state.auth.user
		}
	},

	methods: {
		logOut() {
			this.$store.dispatch('auth/logout')
			this.$router.push('/login')
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../styles/helpers';

.navigation {
	&-list {
		display: flex;
		margin: 0 -10px;
	}

	&-item {
		&:not(:first-child) {
			margin-left: 10px;
		}
	}

	&-link {
		display: flex;
		align-items: center;
		padding: 10px;
		color: $color-brand-primary;
		@extend %text-link;
	}

	&-icon {
		@media (width-from(medium)) {
			margin-right: 5px;
		}
	}

	&-label {
		@media (width-to(medium)) {
			display: none;
		}
	}
}
</style>