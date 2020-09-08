import axios from 'axios'

const ajax = function (...args) {
	return this.get(...args)
}

ajax.get = function (url, data = {}, config = null) {
	let queryString = []

	data = {...data}

	Object.keys(data).forEach(key => {
		queryString.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
	})

	if (queryString.length) {
		url += '?' + queryString.join('&')
	}

	return axios.get(url, config)
}

ajax.post = function (url, data = {}, config = null) {
	let formData = new FormData

	data = {...data}

	Object.keys(data).forEach(key => {
		formData.append(key, data[key])
	})

	if (!config) {
		config = {}
	}

	config = {
		method: 'post',
		url,
		data: formData,
		headers: {
			'Content-Type': 'multipart/form-data'
		},
		...config
	}

	return axios(config)
}

export default ajax