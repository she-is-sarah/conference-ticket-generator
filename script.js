// Global variable to store the uploaded image data
let uploadedImageData = null;

document.getElementById('avatar-file').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        handleImageUpload(file);
    }
});

function handleImageUpload(file) {
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
        alert('Please select a JPG or PNG file.');
        return;
    }

    // Validate file size (500KB = 500 * 1024 bytes)
    if (file.size > 500 * 1024) {
        alert('File size must be less than 500KB.');
        return;
    }

    // Read the file and create preview
    const reader = new FileReader();
    reader.onload = function(e) {
        // Store image data globally for later use
        uploadedImageData = {
            file: file,
            dataUrl: e.target.result,
            name: file.name,
            size: file.size
        };

        // Show preview
        showImagePreview(e.target.result);
    };
    reader.readAsDataURL(file);
}

function showImagePreview(imageSrc) {
    // Hide upload area and info
    document.getElementById('upload-area').style.display = 'none';
    document.getElementById('upload-info').style.display = 'none';
    
    // Show preview area
    document.getElementById('preview-image').src = imageSrc;
    document.getElementById('image-preview-area').style.display = 'flex';
}

function removeImage() {
    // Clear the file input
    document.getElementById('avatar-file').value = '';
    
    // Clear stored data
    uploadedImageData = null;
    
    // Hide preview area
    document.getElementById('image-preview-area').style.display = 'none';
    
    // Show upload area and info again
    document.getElementById('upload-area').style.display = 'flex';
    document.getElementById('upload-info').style.display = 'flex';
}

function changeImage() {
    // Trigger file input click
    document.getElementById('avatar-file').click();
}

// Function to get uploaded image data for next page
function getUploadedImageData() {
    return uploadedImageData;
}

// Function to check if image is uploaded
function hasUploadedImage() {
    return uploadedImageData !== null;
}