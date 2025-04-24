const dropZone = document.getElementById("dropZone")
const uploadButton = document.getElementById("uploadButton")
const fileInput = document.getElementById("fileInput")
const startButton = document.getElementById("startUpload")
const cancelButton = document.getElementById("cancelUpload")
const uploadStatusDiv = document.getElementById("uploadStatus")

const fileDetailsDiv = document.getElementById("details")

let xhr = null;

['dragenter', 'dragover', 'dragleave', 'drop'].forEach(event => {
    dropZone.addEventListener(event, e => e.preventDefault())
})

dropZone.addEventListener('drop', e => {
	fileInput.files = e.dataTransfer.files
	const file = fileInput.files[0]
	uploadStatusDiv.innerText = `Seleccionado ${file.name} ${Math.round(file.size / (1024 ** 2))} MB`
})

uploadButton.addEventListener('click', () => {
	fileInput.click()
})

fileInput.addEventListener('change', () => {
	const file = fileInput.files[0]
	uploadStatusDiv.innerText = `Seleccionado ${file.name} ${Math.round(file.size / (1024 ** 2))} MB`
})

startButton.addEventListener('click', (event) => {
	const file = fileInput.files[0]

	if (!file) {
		uploadStatusDiv.innerText = 'Selecciona al menos un archivo'
		return
	}

	const formData = new FormData()
	formData.append('file', file)
	
	uploadStatusDiv.innerText = `Subiendo ${file.name} ${Math.round(file.size / (1024 ** 2))} MB`

	xhr = new XMLHttpRequest()
	xhr.open('POST', '/api/upload')

	xhr.upload.addEventListener('progress', (event) => {
		const percent = (event.loaded / file.size) * 100
		uploadStatusDiv.innerText = `Subiendo ${file.name} ${Math.round(file.size / (1024 ** 2))} MB ${Math.min(percent, 100)}%`
	})

	xhr.onload = () => {
		if (xhr.status === 0) return
		const data = JSON.parse(xhr.responseText)

		const showInfo = (file) => {
			fileDetailsDiv.innerHTML = ''
			for (const [key, value] of Object.entries(file)) {
				fileDetailsDiv.innerHTML += `<p>${key}: ${value}</p>`
			}
		}

		switch (xhr.status) {
			case 200:
				uploadStatusDiv.innerText = `${file.name} ${Math.round(file.size / (1024 ** 2))} MB procesado`
				showInfo(data.data)
				break			
			case 400:
				uploadStatusDiv.innerText = `Error: ${data.error}`
				break
			case 500:
				uploadStatusDiv.innerText = `Error del servidor: ${data.error}`
				break
			default:
				uploadStatusDiv.innerText = `Error desconocido: ${xhr.status}`
				break
		}
	}

	xhr.onerror = () => {
		if (xhr.status === 0) {
			console.log('Subida cancelada por el usuario')
		} else {
			uploadStatusDiv.innerText = 'Error de red desconocido'
		}
	}

	xhr.send(formData)
})

cancelButton.addEventListener('click', () => {
	if (xhr) {
		xhr.abort()
		uploadStatusDiv.innerText = 'Subida cancelada por el usuario'
		xhr = null
	}
})