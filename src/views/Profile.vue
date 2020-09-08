<template>
	<div class="profile">
		<div class="profile-content">
			<h1>Profile</h1>

			<p>Feel free to edit you details.</p>
		</div>

		<div class="profile-form">
			<div class="profile-layout">
				<div class="profile-avatar">
					<span class="profile-avatar-icon" v-if="editing">
						<svg version="1.2" baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><circle cx="8.5" cy="8.501" r="2.5"/><path d="M16 10c-2 0-3 3-4.5 3s-1.499-1-3.5-1c-2 0-3.001 4-3.001 4h14.001s-1-6-3-6zM20 3h-16c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2v-12c0-1.103-.897-2-2-2zm0 14h-16v-12h16v12z"/></svg>
					</span>

					<div class="profile-avatar-preview" v-bind:style="{ backgroundImage: 'url(' + user.avatar + ')' }" />

					<input type="file" class="profile-avatar-input" v-if="editing" @change="onFileChange" />
				</div>

				<div class="profile-details">
					<div class="profile-field">
						<input class="profile-field-input" v-bind:readonly="!editing" v-model="user.name" placeholder="Your name" ref="nameInput" />
					</div>

					<div class="profile-field">
						<input class="profile-field-input" v-bind:readonly="!editing" v-model="user.email" placeholder="Your e-mail" />
					</div>

					<div class="profile-field">
						<input class="profile-field-input" v-bind:readonly="!editing" v-model="user.phone" placeholder="Your phone" />
					</div>

					<div class="profile-field">
						<input class="profile-field-input" v-bind:readonly="!editing" v-model="user.website" placeholder="Your website" />
					</div>

					<div class="profile-actions">
						<button v-if="editing" class="profile-cancel" @click="cancel">
							<span class="profile-cancel-icon">
								<svg version="1.2" baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4c-4.411 0-8 3.589-8 8s3.589 8 8 8 8-3.589 8-8-3.589-8-8-8zm-5 8c0-.832.224-1.604.584-2.295l6.711 6.711c-.691.36-1.463.584-2.295.584-2.757 0-5-2.243-5-5zm9.416 2.295l-6.711-6.711c.691-.36 1.463-.584 2.295-.584 2.757 0 5 2.243 5 5 0 .832-.224 1.604-.584 2.295z"/></svg>
							</span>

							<span class="profile-cancel-label">Cancel</span>
						</button>

						<button v-if="editing" class="profile-save" @click="save">
							<span class="profile-save-icon">
								<svg version="1.2" baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M16.972 6.251c-.967-.538-2.185-.188-2.72.777l-3.713 6.682-2.125-2.125c-.781-.781-2.047-.781-2.828 0-.781.781-.781 2.047 0 2.828l4 4c.378.379.888.587 1.414.587l.277-.02c.621-.087 1.166-.46 1.471-1.009l5-9c.537-.966.189-2.183-.776-2.72z"/></svg>
							</span>

							<span class="profile-save-label">Save</span>
						</button>
					</div>

					<button v-if="!editing" class="profile-edit" @click="edit" v-bind:disabled="editing">
						<span  class="profile-edit-icon">
							<svg version="1.2" baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M21.561 5.318l-2.879-2.879c-.293-.293-.677-.439-1.061-.439-.385 0-.768.146-1.061.439l-3.56 3.561h-9c-.552 0-1 .447-1 1v13c0 .553.448 1 1 1h13c.552 0 1-.447 1-1v-9l3.561-3.561c.293-.293.439-.677.439-1.061s-.146-.767-.439-1.06zm-10.061 9.354l-2.172-2.172 6.293-6.293 2.172 2.172-6.293 6.293zm-2.561-1.339l1.756 1.728-1.695-.061-.061-1.667zm7.061 5.667h-11v-11h6l-3.18 3.18c-.293.293-.478.812-.629 1.289-.16.5-.191 1.056-.191 1.47v3.061h3.061c.414 0 1.108-.1 1.571-.29.464-.19.896-.347 1.188-.64l3.18-3.07v6zm2.5-11.328l-2.172-2.172 1.293-1.293 2.171 2.172-1.292 1.293z"/></svg>
						</span>

						<span class="profile-edit-label">Edit details</span>
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import UserService from '../services/UserService'

export default {
	name: 'Profile',

	data() {
		return {
			editing: false,
			user: {
				darkMode: null,
				avatar: null,
				name: null,
				email: null,
				phone: null,
				website: null,
				token: null
			}
		}
	},

	created() {
		/**
		 * If user is not logged in send them to the login view
		 */
		if (!this.loggedIn) {
			this.$router.push('/login')
		}
	},

	mounted() {
		this.getCurrent()
	},

	methods: {
		getCurrent() {
			this.user = UserService.get()
		},

		edit() {
			this.editing = true
			this.$refs.nameInput.focus()
		},

		cancel() {
			this.getCurrent()

			this.editing = false
		},

		save() {
			UserService.update(this.user)
			this.editing = false
		},

		onFileChange(e) {
			const file = e.target.files[0]
			const url = URL.createObjectURL(file)

			this.$set(this.user, 'avatar', url)
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../styles/helpers';

.profile {
	&-content {
		@extend %wysiwyg;
		margin-bottom: 20px;
	}

	&-form {
		border-radius: 10px;
	}

	&-field {
		@include field;

		&:first-child &-input {
			border-top-left-radius: 0;

			@media (width-to(medium)) {
				border-top-right-radius: 10px;
			}
		}
	}

	&-layout {
		@media (width-from(medium)) {
			display: flex;
		}
	}

	&-avatar {
		position: relative;
		background-color: darken($color-light-gray, 2%);

		@media (width-to(medium)) {
			@include aspect-ratio(1, 1);
			border-radius: 10px 10px 0 0;
		}

		@media (width-from(medium)) {
			width: 320px;
			border-radius: 10px 0 0 10px;
		}

		&-icon {
			@include center;

			> svg {
				width: 48px;
				height: 48px;
			}
		}

		&-input {
			@include overlay($force-size: true);
			opacity: 0;
		}

		&-preview {
			@include overlay;
			@include background;
			cursor: not-allowed;
		}
	}

	&-details {
		@media (width-from(medium)) {
			flex-grow: 1;
		}
	}

	&-edit {
		@include button($color-brand-secondary, $color-white, true);

		&:last-child {
			border-top-right-radius: 0;

			@media (width-to(medium)) {
				border-bottom-left-radius: 10px;
			}
		}
	}

	&-actions {
		display: flex;
		width: 100%;
	}

	&-cancel {
		@include button($color-light-gray, $color-black, true);

		&:first-child {
			border-top-left-radius: 0;

			@media (width-from(medium)) {
				border-bottom-left-radius: 0;
			}
		}
	}

	&-save {
		@include button($color-brand-secondary, $color-white, true);

		&:last-child {
			border-top-right-radius: 0;
		}
	}
}
</style>