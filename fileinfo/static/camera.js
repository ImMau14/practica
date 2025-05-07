document.addEventListener('DOMContentLoaded', () => {

    const cameraSection = document.getElementById('camera-section');
    const toggleCameraBtn = document.getElementById('toggle-camera');
    const cameraView = document.getElementById('camera-view');
    const captureBtn = document.getElementById('capture-btn');
    const photoCanvas = document.getElementById('photo-canvas');
    const photoResult = document.getElementById('photo-result');
    const photoDetails = document.getElementById('photo-details');


    if (toggleCameraBtn) {
        toggleCameraBtn.addEventListener('click', () => {
            cameraSection.classList.toggle('hidden');
        });
    }


    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            cameraView.srcObject = stream;
        } catch (err) {
            console.error("Error al acceder a la cámara:", err);
            photoDetails.textContent = "Error: No se pudo acceder a la cámara.";
            photoDetails.classList.remove('hidden');
        }
    };


    if (captureBtn) {
        captureBtn.addEventListener('click', () => {
            photoCanvas.width = cameraView.videoWidth;
            photoCanvas.height = cameraView.videoHeight;
            const ctx = photoCanvas.getContext('2d');
            ctx.drawImage(cameraView, 0, 0);


            photoResult.src = photoCanvas.toDataURL('image/jpeg');
            photoResult.classList.remove('hidden');
			photoCanvas.classList.add('hidden');


            const date = new Date().toLocaleString();
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    photoDetails.textContent = `📅 ${date}\n📍 Lat: ${pos.coords.latitude}, Lng: ${pos.coords.longitude}`;
                    photoDetails.classList.remove('hidden');
                },
                () => {
                    photoDetails.textContent = `📅 ${date}\n📍 Ubicación no disponible`;
                    photoDetails.classList.remove('hidden');
                }
            );
        });
    }


    startCamera();
});
