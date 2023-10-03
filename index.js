

// document.addEventListener("DOMContentLoaded", function () {
//     const recordButton = document.getElementById("recordButton");
//     const voiceRecording = document.getElementById("voiceRecording");
//     const submitBtn = document.getElementById("submitBtn");
//     const notificationSection = document.getElementById("notification");
//     const bookingIdSpan = document.getElementById("bookingId");

//     let mediaRecorder;
//     let audioChunks = [];

//     recordButton.addEventListener("mousedown", startRecording);
//     recordButton.addEventListener("mouseup", stopRecording);
//     recordButton.addEventListener("touchstart", startRecording);
//     recordButton.addEventListener("touchend", stopRecording);

//     submitBtn.addEventListener("click", function () {
//         // Simulate submitting the voice message and receiving a booking ID
//         const bookingId = generateBookingId();

//         // Show the booking ID in the notification section
//         bookingIdSpan.textContent = bookingId;
//         notificationSection.style.display = "block";

//         // Clear the voice recording
//         voiceRecording.src = "";
//         audioChunks = [];

//         // Disable the submit button
//         submitBtn.disabled = true;
//     });

//     function startRecording() {
//         const constraints = { audio: true };
//         navigator.mediaDevices.getUserMedia(constraints)
//             .then(function (stream) {
//                 mediaRecorder = new MediaRecorder(stream);
//                 mediaRecorder.ondataavailable = function (event) {
//                     if (event.data.size > 0) {
//                         audioChunks.push(event.data);
//                     }
//                 };
//                 mediaRecorder.onstop = function () {
//                     const blob = new Blob(audioChunks, { type: "audio/wav" });
//                     voiceRecording.src = URL.createObjectURL(blob);
//                     submitBtn.disabled = false;
//                 };
//                 mediaRecorder.start();
//             })
//             .catch(function (error) {
//                 console.error("Error accessing microphone:", error);
//             });
//     }

//     function stopRecording() {
//         if (mediaRecorder && mediaRecorder.state === "recording") {
//             mediaRecorder.stop();
//         }
//     }

//     function generateBookingId() {
//         // Generate a random booking ID for demonstration purposes
//         return Math.floor(Math.random() * 10000) + 1000;
//     }
// });

document.addEventListener("DOMContentLoaded", function () {
    const recordButton = document.getElementById("recordButton");
    const voiceRecording = document.getElementById("voiceRecording");
    const submitBtn = document.getElementById("submitBtn");
    const notificationSection = document.getElementById("notification");
    const bookingIdSpan = document.getElementById("bookingId");

    let mediaRecorder;
    let audioChunks = [];

    // Check if the browser supports MediaRecorder and getUserMedia
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        recordButton.addEventListener("mousedown", startRecording);
        recordButton.addEventListener("touchstart", startRecording);

        recordButton.addEventListener("mouseup", stopRecording);
        recordButton.addEventListener("touchend", stopRecording);
    } else {
        console.error("MediaRecorder and getUserMedia are not supported in this browser.");
    }

    submitBtn.addEventListener("click", function () {
        // Simulate submitting the voice message and receiving a booking ID
        const bookingId = generateBookingId();

        // Show the booking ID in the notification section
        bookingIdSpan.textContent = bookingId;
        notificationSection.style.display = "block";

        // Clear the voice recording
        voiceRecording.src = "";
        audioChunks = [];

        // Disable the submit button
        submitBtn.disabled = true;
    });

    function startRecording() {
        const constraints = { audio: true };
        navigator.mediaDevices.getUserMedia(constraints)
            .then(function (stream) {
                mediaRecorder = new MediaRecorder(stream);

                mediaRecorder.ondataavailable = function (event) {
                    if (event.data.size > 0) {
                        audioChunks.push(event.data);
                    }
                };

                mediaRecorder.onstop = function () {
                    const blob = new Blob(audioChunks, { type: "audio/wav" });
                    voiceRecording.src = URL.createObjectURL(blob);
                    submitBtn.disabled = false;
                };

                mediaRecorder.start();
            })
            .catch(function (error) {
                console.error("Error accessing microphone:", error);
            });
    }

    function stopRecording() {
        if (mediaRecorder && mediaRecorder.state === "recording") {
            mediaRecorder.stop();
        }
    }

    function generateBookingId() {
        // Generate a random booking ID for demonstration purposes
        return Math.floor(Math.random() * 10000) + 1000;
    }
});
