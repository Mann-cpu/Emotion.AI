const video = document.getElementById('video');
const startBtn = document.getElementById('start-btn');
const videoContainer = document.getElementById('video-container');

// ✅ Load models from ONLINE (no download needed)
async function loadModels() {
    const MODEL_URL = 'https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js/weights';

    console.log("Loading models...");

    await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
    await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);

    console.log("Models Loaded ✅");
}

// ▶️ Button click
startBtn.addEventListener('click', async () => {
    startBtn.innerText = "Loading AI...";
    startBtn.disabled = true;

    try {
        await loadModels();
        videoContainer.style.display = 'block';
        startBtn.style.display = 'none';
        startVideo();
    } catch (err) {
        console.error("MODEL ERROR:", err);
        alert("Model loading failed. Check internet.");
    }
});

// 🎥 Start webcam
function startVideo() {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            video.srcObject = stream;
        })
        .catch(err => {
            console.error("Camera error:", err);
            alert("Allow camera permission!");
        });
}

// 🧠 Detection
video.addEventListener('play', () => {
    const canvas = faceapi.createCanvasFromMedia(video);
    videoContainer.append(canvas);

    const displaySize = {
        width: video.width,
        height: video.height
    };

    faceapi.matchDimensions(canvas, displaySize);

    setInterval(async () => {
        const detections = await faceapi
            .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
            .withFaceExpressions();

        const resized = faceapi.resizeResults(detections, displaySize);

        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);

        faceapi.draw.drawDetections(canvas, resized);
        faceapi.draw.drawFaceExpressions(canvas, resized);

    }, 100);
});