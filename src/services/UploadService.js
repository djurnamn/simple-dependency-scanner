import AuthService from './AuthService'
import ajax from '../helpers/ajax'

const uploadUrl = 'http://localhost:8081/api/1.0/open/uploads/dependencies/files'
const concludeUrl = 'http://localhost:8081/api/1.0/open/finishes/dependencies/files/uploads'
const statusUrl = 'http://localhost:8081/api/1.0/open/ci/upload/status'

class FileUploadService {
	/**
	 * Upload file
	 */
	upload(file, onUploadProgress) {
		return ajax.post(uploadUrl, {
			'repositoryName': 'unknown',
			'commitName': 'unknown',
			'fileData': file,
		}, {
			headers: {
				...AuthService.getHeader(),
				'Content-Type': 'multipart/form-data'
			},
			onUploadProgress
		})
	}

	/**
	 * Conclude file upload
	 */
	conclude(id) {
		return ajax.post(concludeUrl, {
			'ciUploadId': id
		}, {
			headers: AuthService.getHeader()
		})
	}

	/**
	 * Poll file upload status by ciUploadId
	 */
	async getStatus(id, callback) {
		const response = await fetch(statusUrl + '?ciUploadId=' + id, {
			headers: new Headers(
				AuthService.getHeader()
			)
		})

		const data = await response.json()

		// Execute callback when progress status progress returns 100
		if (data.progress && data.progress == 100) {
			callback()
		}

		return data
	}
}

export default new FileUploadService()