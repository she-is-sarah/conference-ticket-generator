// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM loaded, initializing upload functionality');

    // Global variable to store the uploaded image data
    let uploadedImageData = null;

    // Add event listener to file input
    const fileInput = document.getElementById('avatar-file');
    if (fileInput) {
        console.log('File input found, adding event listener');
        fileInput.addEventListener('change', function (e) {
            console.log('File input changed', e.target.files);
            const file = e.target.files[0];
            if (file) {
                console.log('File selected:', file.name, file.size, file.type);
                handleImageUpload(file);
            }
        });
    } else {
        console.error('File input not found!');
    }

    function handleImageUpload(file) {
        console.log('Handling image upload for:', file.name);

        // Validate file type
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
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
        reader.onload = function (e) {
            console.log('File read successfully');

            // Store image data globally for later use
            uploadedImageData = {
                file: file,
                dataUrl: e.target.result,
                name: file.name,
                size: file.size,
            };

            // Show preview
            showImagePreview(e.target.result);
        };

        reader.onerror = function () {
            console.error('Error reading file');
            alert('Error reading file. Please try again.');
        };

        reader.readAsDataURL(file);
    }

    function showImagePreview(imageSrc) {
        console.log('Showing image preview');

        const uploadArea = document.getElementById('upload-area');
        const uploadInfo = document.getElementById('upload-info');
        const previewArea = document.getElementById('image-preview-area');
        const previewImage = document.getElementById('preview-image');

        if (uploadArea && uploadInfo && previewArea && previewImage) {
            uploadArea.style.display = 'none';
            uploadInfo.style.display = 'none';

            previewImage.src = imageSrc;
            previewArea.style.display = 'flex';

            console.log('Preview shown successfully');
        } else {
            console.error('Required elements not found for preview');
        }
    }

    // Make functions global so onclick handlers can access them
    window.removeImage = function () {
        console.log('Removing image');

        const fileInput = document.getElementById('avatar-file');
        if (fileInput) fileInput.value = '';

        uploadedImageData = null;

        const previewArea = document.getElementById('image-preview-area');
        if (previewArea) previewArea.style.display = 'none';

        const uploadArea = document.getElementById('upload-area');
        const uploadInfo = document.getElementById('upload-info');
        if (uploadArea && uploadInfo) {
            uploadArea.style.display = 'flex';
            uploadInfo.style.display = 'flex';
        }

        console.log('Image removed successfully');
    };

    window.changeImage = function () {
        console.log('Changing image');
        if (fileInput) fileInput.click();
    };

    window.getUploadedImageData = function () {
        return uploadedImageData;
    };

    window.hasUploadedImage = function () {
        return uploadedImageData !== null;
    };

    // Handle form submission
    const form = document.getElementById('form');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const github = document.getElementById('github').value;

            document.getElementById('ticket-name-display').textContent = name;
            document.getElementById('ticket-email-display').textContent = email;
            document.getElementById('ticket-github-username').textContent =
                github.startsWith('@') ? github : '@' + github;

            // Handle avatar
            const ticketAvatar = document.getElementById('ticket-avatar');
            if (uploadedImageData && uploadedImageData.dataUrl) {
                ticketAvatar.src = uploadedImageData.dataUrl;
                ticketAvatar.style.display = 'block';
            } else {
                ticketAvatar.style.display = 'none';
            }

            // Hide form and show ticket
            document.getElementById('form-step').style.display = 'none';
            document.getElementById('ticket').style.display = 'block';
        });
    }
});
