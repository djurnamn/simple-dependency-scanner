<template>
	<div class="app" id="app">
		<div class="app-header">
			<div class="app-header-inner">
				<div class="app-brand">
					<router-link to="/" class="app-link">
						<img class="app-logo" src="./assets/logo.png" title="Simple Dependency Scanner" />
					</router-link>
				</div>

				<div class="app-navigation">
					<navigation />
				</div>
			</div>
		</div>

		<main class="app-main">
			<div class="app-main-inner">
				<router-view />
			</div>
		</main>

		<div class="app-footer">
			<div class="app-footer-inner">
				<p class="app-copyright">Copyright &copy; Simple Dependency Scanner</p>
			</div>
		</div>
	</div>
</template>

<script>
import Navigation from './components/Navigation'

export default {
	name: 'App',

	components: {
		Navigation
	}
}
</script>

<style lang="scss">
@import './styles/helpers';
@import url(https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,700;1,700&family=Mulish:ital,wght@0,300;0,600;1,300;1,600&display=swap);

@include reset;

html, body, .app {
	height: 100%;
}

html {
	color: $color-black;
	font-weight: 300;
	font-family: 'Mulish', sans-serif;

	b, strong {
		font-weight: 600;
	}

	i, em {
		font-style: italic;
	}
}

button,
input[type="file"] {
	cursor: pointer;
}

.app {
	display: flex;
	flex-direction: column;

	&-header {
		background-color: $color-light-gray;
		@include contain;

		&-inner {
			display: flex;
			align-items: center;
		}
	}

	&-brand {
		margin: -10px;
	}

	&-link {
		display: block;
		padding: 10px;
	}

	&-logo {
		display: block;
		width: 54px;

		@include transition(transform, 0.2s, ease-out);

		&:hover {
			transform: scale(1.05);
		}
	}

	&-navigation {
		margin-left: auto;
	}

	&-main {
		@include contain;
	}

	&-footer {
		margin-top: auto;
		@include contain;
	}

	&-copyright {
		text-align: center;
	}
}
</style>