<template>
	<div class="home">
		<div class="home-content">
			<h1>Simple Dependency Scanner</h1>

			<p>Welcome to the Simple Dependency Scanner, an app prototype built to communicate with the Debricked vulnerability scan api.</p>

			<p v-if="!loggedIn">To get started, please <router-link to="/login" class="navigation-link">log in</router-link>!</p>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Home',

	computed: {
		/**
		 * Check if user is logged in
		 */
		loggedIn() {
			return this.$store.state.auth.status.loggedIn
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../styles/helpers';

.home {
	&-content {
		@extend %wysiwyg;
	}
}

</style>