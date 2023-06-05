// Get video and canvas elements
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

// Initialize video stream
navigator.mediaDevices.getUserMedia({ video: true })
  .then((stream) => {
    video.srcObject = stream;
    video.play();
  })
  .catch((err) => {
    console.error('Error accessing webcam:',);
  });

// Initialize mouth detection
const mouthDetection = new MouthDetection();

// Define dot elements
const leftDot = document.createElement('div');
leftDot.classList.add('dot');
document.body.appendChild(leftDot);

const rightDot = document.createElement('div');
rightDot.classList.add('dot');
document.body.appendChild(rightDot);

// Update mouth dots positions in real-time
function updateMouthDots() {
  // Draw video frame on canvas
  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  // Detect mouth position
  const mouthPosition = mouthDetection.detectMouth(context);

  if (mouthPosition) {
    const [leftX, leftY, rightX, rightY] = mouthPosition;

    // Update left dot position
    leftDot.style.left = `${leftX}px`;
    leftDot.style.top = `${leftY}px`;

    // Update right dot position
    rightDot.style.left = `${rightX}px`;
    rightDot.style.top = `${rightY}px`;

    // Calculate mouth width
    const mouthWidth = rightX - leftX;

    // Apply filter effect if mouth width is wider than 3 cm
    if (mouthWidth > 30) {
      video.style.filter = 'grayscale(100%)';
    } else {
      video.style.filter = 'none';
    }
  }

  // Call the next frame
  requestAnimationFrame(updateMouthDots);
}

// Call the initial frame
requestAnimationFrame(updateMouthDots);

// Mouth detection class
function MouthDetection() {
  this.detectMouth = function(context) {
    // Replace this placeholder implementation with actual mouth detection algorithm
    // Return an array with four values: [leftX, leftY, rightX, rightY]
    // representing the coordinates of the left and right dots on the edges of the mouth
    // or return null if no mouth is detected
    return [100, 200, 300, 200];
  };
}