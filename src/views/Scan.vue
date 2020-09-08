<template>
	<div class="scan">
		<header class="scan-header">
			<div class="scan-content">
				<h1>Scan file</h1>

				<p>Select the file(s) you would like to do a scan on and hit the upload button. The scan might take some time so please be patient!</p>
			</div>
		</header>

		<div v-if="message" class="scan-message">{{ message }}</div>

		<div class="scan-button-group">
			<div class="scan-choose">
				<span class="scan-choose-icon" v-html="chooseIcon" />

				<span class="scan-choose-label">{{ uploadLabel }}</span>

				<input class="scan-choose-input" type="file" ref="file" @change="selectFiles" multiple />
			</div>

			<button class="scan-submit" :disabled="!selectedFiles" @click="upload">
				<span class="scan-submit-icon"><svg version="1.2" baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M17 9l-.351.015c-.825-2.377-3.062-4.015-5.649-4.015-3.309 0-6 2.691-6 6l.001.126c-1.724.445-3.001 2.013-3.001 3.874 0 2.206 1.794 4 4 4h5v-4.586l-1.293 1.293c-.195.195-.451.293-.707.293s-.512-.098-.707-.293c-.391-.391-.391-1.023 0-1.414l2.999-2.999c.093-.093.203-.166.326-.217.244-.101.52-.101.764 0 .123.051.233.124.326.217l2.999 2.999c.391.391.391 1.023 0 1.414-.195.195-.451.293-.707.293s-.512-.098-.707-.293l-1.293-1.293v4.586h4c2.757 0 5-2.243 5-5s-2.243-5-5-5z"/></svg></span>

				<span class="scan-submit-label">Upload & scan</span>
			</button>
		</div>

		<div class="scan-main" v-if="selectedFiles">
			<div class="scan-content">
				<h2>Files</h2>
			</div>
		</div>

		<ul class="scan-list" v-if="selectedFiles">
			<li class="scan-item" v-for="(file, index) in files" :key="index">
				<div class="scan-info-items">
					<div class="scan-info-item">
						<span class="scan-info-icon">
							<svg version="1.2" baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19.707 7.293l-4-4c-.187-.188-.441-.293-.707-.293h-8c-1.654 0-3 1.346-3 3v12c0 1.654 1.346 3 3 3h10c1.654 0 3-1.346 3-3v-10c0-.266-.105-.52-.293-.707zm-2.121.707h-1.086c-.827 0-1.5-.673-1.5-1.5v-1.086l2.586 2.586zm-.586 11h-10c-.552 0-1-.448-1-1v-12c0-.552.448-1 1-1h7v1.5c0 1.379 1.121 2.5 2.5 2.5h1.5v9c0 .552-.448 1-1 1z"/></svg>
						</span>

						<span class="scan-info-name"><strong>{{ file.filename }}</strong></span>
					</div>

					<div class="scan-info-item">
						<span class="scan-info-spinner" v-show="file.status == 'processing'">
							<svg version="1.2" baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19.5 12.473c0-1.948-.618-3.397-2.066-4.844-.391-.39-1.023-.39-1.414 0-.391.391-.391 1.024 0 1.415 1.079 1.078 1.48 2.007 1.48 3.429 0 1.469-.572 2.85-1.611 3.888-1.004 1.003-2.078 1.502-3.428 1.593l1.246-1.247c.391-.391.391-1.023 0-1.414s-1.023-.391-1.414 0l-3.707 3.707 3.707 3.707c.195.195.451.293.707.293s.512-.098.707-.293c.391-.391.391-1.023 0-1.414l-1.337-1.336c1.923-.082 3.542-.792 4.933-2.181 1.417-1.416 2.197-3.299 2.197-5.303zM6.5 12.5c0-1.469.572-2.85 1.611-3.889 1.009-1.009 2.092-1.508 3.457-1.594l-1.275 1.275c-.391.391-.391 1.023 0 1.414.195.196.451.294.707.294s.512-.098.707-.293l3.707-3.707-3.707-3.707c-.391-.391-1.023-.391-1.414 0s-.391 1.023 0 1.414l1.311 1.311c-1.914.086-3.525.796-4.907 2.179-1.417 1.416-2.197 3.299-2.197 5.303 0 1.948.618 3.397 2.066 4.844.195.195.451.292.707.292s.512-.098.707-.293c.391-.391.391-1.024 0-1.415-1.079-1.077-1.48-2.006-1.48-3.428z"/></svg>
						</span>
					</div>
				</div>

				<div class="scan-progress">
					<div class="scan-progress-bar">
						<div class="scan-progress-inner is-upload" v-bind:style="{ width: (file.uploadProgress && file.uploadProgress != -1 ? file.uploadProgress : '0') + '%' }">
							<div class="scan-progress-label">
								<span class="scan-progress-status">{{ file.uploadProgress != 100 ? 'Uploading' : 'Done' }}</span>
								<span class="scan-progress-percent" :ref="'uploadPercent' + index">{{ file.uploadProgress || '0' }}%</span>
							</div>
						</div>
					</div>

					<div class="scan-progress-bar">
						<div class="scan-progress-inner is-scan" v-bind:style="{ width: (file.data.progress || '0') + '%' }">
							<div class="scan-progress-label">
								<span class="scan-progress-status">{{ file.data.progress != 100 ? (file.data.progress == -1 ? 'Queued' : 'Processing') : 'Finished' }}</span>
								<span class="scan-progress-percent" :ref="'scanPercent' + index">{{ file.data.progress != -1 ? file.data.progress : '0' }}%</span>
							</div>
						</div>
					</div>
				</div>

				<div class="scan-meta-items" v-if="file.status != 'unprocessed'">
					<div class="scan-meta-item">
						<span class="scan-meta-icon">
							<svg version="1.2" baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 5.511c.561 0 1.119.354 1.544 1.062l5.912 9.854c.851 1.415.194 2.573-1.456 2.573h-12c-1.65 0-2.307-1.159-1.456-2.573l5.912-9.854c.425-.708.983-1.062 1.544-1.062m0-2c-1.296 0-2.482.74-3.259 2.031l-5.912 9.856c-.786 1.309-.872 2.705-.235 3.83s1.879 1.772 3.406 1.772h12c1.527 0 2.77-.646 3.406-1.771s.551-2.521-.235-3.83l-5.912-9.854c-.777-1.294-1.963-2.034-3.259-2.034z"/><circle cx="12" cy="16" r="1.3"/><path d="M13.5 10c0-.83-.671-1.5-1.5-1.5s-1.5.67-1.5 1.5c0 .199.041.389.111.562.554 1.376 1.389 3.438 1.389 3.438l1.391-3.438c.068-.173.109-.363.109-.562z"/></svg>
						</span>

						<span class="scan-meta-label">Vulnerabilities found: <strong>{{ file.data.vulnerabilitiesFound || '0' }}</strong> (<strong>{{ file.data.unaffectedVulnerabilitiesFound || '0' }}</strong> unaffected)</span>
					</div>

					<div class="scan-meta-item">
						<a class="scan-meta-link" v-if="file.data.detailsUrl" v-bind:href="file.data.detailsUrl" target="_blank">More information</a>
					</div>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
import UploadService from '../services/UploadService'

export default {
	name: 'Scan',

	data() {
		return {
			selectedFiles: undefined,
			currentFile: undefined,
			queueIndex: 0,
			queueCount: null,
			message: '',
			files: [],
			polling: null
		}
	},

	computed: {
		/**
		 * Check if user is logged in
		 */
		loggedIn() {
			return this.$store.state.auth.status.loggedIn
		},

		/**
		 * Conditional choose button icon based on selected files
		 */
		chooseIcon() {
			return this.selectedFiles
				? '<svg version="1.2" baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19.707 7.293l-4-4c-.187-.188-.441-.293-.707-.293h-8c-1.654 0-3 1.346-3 3v12c0 1.654 1.346 3 3 3h10c1.654 0 3-1.346 3-3v-10c0-.266-.105-.52-.293-.707zm-2.121.707h-1.086c-.827 0-1.5-.673-1.5-1.5v-1.086l2.586 2.586zm-.586 11h-10c-.552 0-1-.448-1-1v-12c0-.552.448-1 1-1h7v1.5c0 1.379 1.121 2.5 2.5 2.5h1.5v9c0 .552-.448 1-1 1z"/></svg>'
				: '<svg version="1.2" baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M22.3 8h-2.4c-.4-1.2-1.5-2-2.8-2h-6c0-1.1-.9-2-2-2h-4.1c-1.7 0-3 1.3-3 3v10c0 1.7 1.3 3 3 3h12c1.7 0 3.4-1.3 3.8-3l2.2-8c.1-.6-.2-1-.7-1zm-18.3 1v-2c0-.6.4-1 1-1h4c0 1.1.9 2 2 2h6c.6 0 1 .4 1 1h-11.1c-.6 0-1.1.4-1.3 1l-1.6 6.3v-7.3zm14.9 7.5c-.2.8-1.1 1.5-1.9 1.5h-12s-.4-.2-.2-.8l1.9-7c0-.1.2-.2.3-.2h13.7l-1.8 6.5z"/></svg>'
		},

		/**
		 * Conditional choose button label based on selected files (and amount)
		 */
		uploadLabel() {
			let chooseIcon = ''

			return this.selectedFiles
				? this.selectedFiles.length + ' file' + (this.selectedFiles.length > 1 ? 's' : '') + ' selected'
				: chooseIcon + 'Choose one or more file(s)...'
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

	methods: {
		selectFiles() {
			this.selectedFiles = this.$refs.file.files

			// Remove any unprocessed files from the list before we add the new ones
			for (let i = this.files.length - 1; i >= 0; i--) {
				if (this.files[i].status == 'unprocessed') {
					this.$delete(this.files, i)
				}
			}

			// Add selected files to the list and mark them as unprocessed
			for (let i = this.selectedFiles.length - 1; i >= 0; i--) {
				// Push file to files array and retrieve index
				this.files.push({
					filename: this.selectedFiles.item(i).name,
					status: 'unprocessed',
					uploadProgress: 0,
					data: {}
				}) - 1
			}
		},

		upload() {
			// Select first file input item
			this.currentFile = this.selectedFiles.item(this.queueIndex)

			let index = this.queueIndex

			// Initialize upload
			UploadService.upload(this.currentFile, event => {
				// Get upload progress from event
				this.files[index].uploadProgress = Math.round((100 * event.loaded) / event.total)
			}).then(response => {
				const id = response.data.ciUploadId

				if (id) {
					// Merge file data object
					let fileData = Object.assign({}, this.files[index], { data: {...response.data} })

					// Use set instance method to trigger state change
					this.$set(this.files, index, fileData)

					// Conclude upload call
					UploadService.conclude(id).then(() => {
						// Set interval to start polling for scan status updates on current file
						this.files[index].polling = setInterval(() => {
							// Once progress hits 100% stop polling by clearing interval
							UploadService.getStatus(id, () => clearInterval(this.files[index].polling)).then(
								data => {
									// Deep merge the file data object with polling response
									let mergedData = Object.assign({}, this.files[index].data, data)

									// Merge file data object again
									let fileData = Object.assign({}, this.files[index], { data: mergedData })

									// Consider the file upload processed
									fileData.status = data.progress == 100 ? 'finished' : 'processing'

									// Trigger state change again
									this.$set(this.files, index, fileData)

									// TODO: Add file data to localStorage?
								}
							)
						}, 1000)
					})
				}
			}).then(() => {
				// Wait a couple of seconds before processing the next file upload
				setTimeout(() => {
					this.queueIndex++

					// If we've reached the end of the queue, bail and reset
					if (this.queueIndex == this.selectedFiles.length) {
						this.$refs.file.value = ''
						this.queueIndex = 0

						return false
					}

					// Start next upload
					this.upload()
				}, 2000)
			})
			.catch(() => {
				this.uploadProgress = 0
				this.message = 'Could not upload the file!'
				this.currentFile = undefined
			})
		}
	},

	watch: {
		files: {
			handler: () => {
			},
			deep: true
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../styles/helpers';

.scan {
	&-header,
	&-button-group,
	&-main {
		&:not(:last-child) {
			margin-bottom: 40px;
		}
	}

	&-content {
		@extend %wysiwyg;
	}

	&-message {
		@extend %message;
		margin-bottom: 40px;
		background-color: $color-context-negative;
		color: $color-white;
		@include antialias;
	}

	&-button-group {
		max-width: 480px;
		margin-left: auto;
		margin-right: auto;
	}

	&-choose {
		position: relative;
		@include button($color-light-gray, $color-black, true, true);

		&-input {
			@include overlay($force-size: true);
			opacity: 0;
		}
	}

	&-submit {
		@include button($group: true, $big: true);
	}

	&-item {
		padding: 10px;

		&:first-child {
			border-top-left-radius: 10px;
			border-top-right-radius: 10px;
		}

		&:last-child {
			border-bottom-left-radius: 10px;
			border-bottom-right-radius: 10px;
		}

		&:nth-child(odd) {
			background-color: darken($color-light-gray, 2%);

			.scan-progress-bar {
				background-color: darken($color-light-gray, 8%);
			}
		}

		&:nth-child(even) {
			background-color: lighten($color-light-gray, 2%);

			.scan-progress-bar {
				background-color: darken($color-light-gray, 4%);
			}
		}
	}

	&-info {
		&-items {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 20px;
		}

		&-item {
			display: flex;
			align-items: center;
		}

		&-icon {
			margin-right: 5px;
		}

		&-spinner {
			display: block;
			@extend %rotating;
		}
	}

	&-progress {
		position: relative;
		border-radius: 5px;
		overflow: hidden;

		&-inner {
			position: relative;
			@include transition(width, 1s, ease-in-out);

			&.is-upload {
				background-color: $color-brand-secondary;
				height: 20px;
			}

			&.is-scan {
				background-color: $color-brand-primary;
				height: 40px;
				color: $color-white;
				@include antialias;
				text-shadow: 0px 0px 2px $color-black, 1px 1px 2px $color-black;
			}
		}

		&-label {
			@include center(vertical);
			left: 0;
			width: 100%;
			padding: 0 10px;
			white-space: nowrap;
			text-align: right;
			font-size: 12px;
			font-weight: 700;
		}

		&-percent {
			margin-left: 5px;
		}
	}

	&-meta {
		&-items {
			margin-top: 20px;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
		}

		&-item {
			display: flex;
			align-items: center;
			line-height: 1.6;

			&:not(:last-child) {
				margin-right: 20px;
			}
		}

		&-icon {
			margin-right: 5px;
		}

		&-link {
			@extend %text-link;
			color: $color-brand-primary;
		}
	}
}
</style>
