const dropZone = document.getElementById('dropZone')
const uploadButton = document.getElementById('uploadButton')
const fileInput = document.getElementById('fileInput')
const startButton = document.getElementById('startUpload')
const cancelButton = document.getElementById('cancelUpload')
const uploadStatusDiv = document.getElementById('uploadStatus')

const fileDetailsDiv = document.getElementById('details')

let xhr = null
let language = null

const DECIMALS_NUM = 2

async function getLang(url) {
	const navLang = (navigator.language || 'en').split('-')[0]

	try {
		const response = await fetch(url)
		if (!response.ok) throw new Error("JSON error")
		const langResponse = await response.json()
		return langResponse[navLang]
	} catch (error) {
		console.error("Error:", error)
		return {}
	}
}

function formatString(template, variables) {
	return template.replace(/{(\w+)}/g, (_, key) => variables[key] || "")
}

function roundString(string, decimalsNum) {
	const [integer, decimals] = string.split(".")
	return integer + "." + decimals.substring(0, decimalsNum)
}

getLang("/static/jslang.json").then(lang => {
	language = lang
})

const dropEvents = ['dragenter', 'dragover', 'dragleave', 'drop']

dropEvents.forEach(event => {
    dropZone.addEventListener(event, e => e.preventDefault())
})

dropZone.addEventListener('drop', e => {
	fileInput.files = e.dataTransfer.files
	const file = fileInput.files[0]
	uploadStatusDiv.innerText = formatString(language.selected, {
		fileName : file.name,
		fileSize : roundString((file.size / (1024 ** 2)).toString(), DECIMALS_NUM)
	})
})

uploadButton.addEventListener('click', () => {
	fileInput.click()
})

fileInput.addEventListener('change', () => {
	const file = fileInput.files[0]
	uploadStatusDiv.innerText = formatString(language.selected, {
		fileName : file.name,
		fileSize : roundString((file.size / (1024 ** 2)).toString(), DECIMALS_NUM)
	})
})

startButton.addEventListener('click', (event) => {
	const file = fileInput.files[0]

	if (!file) {
		uploadStatusDiv.innerText = languages.selectAFile
		return
	}

	const formData = new FormData()
	formData.append('file', file)

	uploadStatusDiv.innerText = formatString(language.selected, {
		fileName : file.name,
		fileSize : roundString((file.size / (1024 ** 2)).toString(), DECIMALS_NUM)
	})

	xhr = new XMLHttpRequest()
	xhr.open('POST', '/api/upload')

	xhr.upload.addEventListener('progress', (event) => {
		const percent = (event.loaded / file.size) * 100	
	})

	xhr.onload = () => {
		if (xhr.status === 0) return
		const data = JSON.parse(xhr.responseText)

		function getImageDataURL(file) {
			return new Promise((resolve, reject) => {
				const reader = new FileReader()
				reader.onload = (e) => resolve(e.target.result)
				reader.onerror = reject
				reader.readAsDataURL(file)
			})
		}

		const showInfo = async (file) => {
			fileDetailsDiv.innerHTML = ''

			let content = ''

			if (file.extension !== "txt" && file.extension !== "pdf") {
				const dataURL = await getImageDataURL(fileInput.files[0])
				content += `<img id="preview-photo" src=${dataURL} height=100>`
			} else {
				content += `<pre>${file.content}</pre>`
			}

			content += formatString(language.metadata.file_name, {
				filename : file.filename
			})

			content += formatString(language.metadata.extension, {
				extension : file.extension
			})

			content += formatString(language.metadata.size_bytes, {
				size_bytes : file.size_bytes
			})

			content += formatString(language.metadata.size_mb, {
				size_mb : file.size_mb
			})

			fileDetailsDiv.innerHTML = content
		}

		switch (xhr.status) {
			case 200:
				uploadStatusDiv.innerText = formatString(language.processed, {
					fileName : file.name,
					fileSize : roundString((file.size / (1024 ** 2)).toString(), DECIMALS_NUM)
				})

				showInfo(data.data)
				break			
			case 400:
				uploadStatusDiv.innerText = formatString(language.error, {
					error : data.error
				})

				break
			case 500:
				uploadStatusDiv.innerText = formatString(language.server_error, {
					error : data.error
				})
				
				break
			default:
				uploadStatusDiv.innerText = formatString(language.unknown_error, {
					statusCode : xhr.status.toString()
				})
				
				break
		}
	}

	xhr.onerror = () => {
		if (xhr.status === 0) {
			console.log(language.upload_cancelled)
		} else {
			uploadStatusDiv.innerText = language.network_error
		}
	}

	xhr.send(formData)
})

cancelButton.addEventListener('click', () => {
	if (xhr) {
		xhr.abort()
		uploadStatusDiv.innerText = language.upload_cancelled
		xhr = null
	}
})