
// Function to handle adding elements to the editor
function addElement(elementType) {
    const headerBlock = document.getElementById('headerBlock');
    const imageBlock = document.getElementById('imageBlock');
    const descriptionBlock = document.getElementById('descriptionBlock');

    if (elementType === 'Header') {
        headerBlock.classList.remove('hidden');
        document.getElementById('headerInput').addEventListener('input', function() {
            updatePreview();
        });
        document.getElementById('cancelHeaderBtn').addEventListener('click', function() {
            headerBlock.classList.add('hidden');
            document.getElementById('headerInput').value = '';
            updatePreview();
        });
    }
    else if (elementType === 'Image') {
        imageBlock.classList.remove('hidden');
        document.getElementById('imageInput').addEventListener('change', function(e) {
            if (e.target.files && e.target.files[0]) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    const uploadedImageName = document.getElementById('uploadedImageName');
                    uploadedImageName.textContent = e.target.files[0].name;

                    // Show the image preview on the right side
                    const imagePreview = document.getElementById('preview');
                    if (imagePreview.firstChild) {
                        imagePreview.removeChild(imagePreview.firstChild);
                    }
                    const imagePreviewDiv = document.createElement('img');
                    imagePreviewDiv.src = event.target.result;
                    imagePreviewDiv.classList.add('w-full', 'h-auto', 'mt-4');

                    updatePreview();
                };
                reader.readAsDataURL(e.target.files[0]);
            }
        });
        document.getElementById('cancelImageBtn').addEventListener('click', function() {
            imageBlock.classList.add('hidden');
            document.getElementById('imageInput').value = '';
            const uploadedImageName = document.getElementById('uploadedImageName');
            uploadedImageName.textContent = '';
            updatePreview();
        });
    }
    else if (elementType === 'Description') {
        descriptionBlock.classList.remove('hidden');
        document.getElementById('descriptionInput').addEventListener('input', function() {
            updatePreview();
        });
        document.getElementById('cancelDescriptionBtn').addEventListener('click', function() {
            descriptionBlock.classList.add('hidden');
            document.getElementById('descriptionInput').value = '';
            updatePreview();
        });
    }
}

// Function to apply text color to the header in the right-side preview
function applyTextColor(color) {
    const headerInput = document.getElementById('headerInput');
    const previewHeader = document.getElementById('previewHeader');

    if (headerInput.value.trim() !== '') {
        previewHeader.innerText = headerInput.value;
    }
    previewHeader.style.color = headerTextColor = color;
}

// Function to apply text alignment to the header in the right-side preview
function applyTextAlignment(align) {
    const headerInput = document.getElementById('headerInput');
    const previewHeader = document.getElementById('previewHeader');

    if (headerInput.value.trim() !== '') {
        previewHeader.innerText = headerInput.value;
    }
    previewHeader.style.textAlign = align;
}

let headerTextColor = 'black'; // Default header text color
let imageObjectURL = null; // To store the created object URL for the image

// Function to update the preview with header, image, and description
function updatePreview() {
    const headerInput = document.getElementById('headerInput');
    const imageInput = document.getElementById('imageInput');
    const descriptionInput = document.getElementById('descriptionInput');

    // Update header in the preview
    const previewHeader = document.getElementById('previewHeader');
    previewHeader.innerText = headerInput.value;

    // Update image in the preview
    const previewImage = document.getElementById('previewImage');
    if (imageInput.files.length > 0) {
        const file = imageInput.files[0];

        // Release the previous object URL if it exists
        if (imageObjectURL) {
            URL.revokeObjectURL(imageObjectURL);
        }

        // Create a new object URL for the current image
        imageObjectURL = URL.createObjectURL(file);
        previewImage.innerHTML = `<img src="${imageObjectURL}" alt="Uploaded Image">`;
    } else {
        // Clear the preview if no image is selected
        previewImage.innerHTML = '';
    }

    // Update description in the preview
    const previewDescription = document.getElementById('previewDescription');
    previewDescription.innerText = descriptionInput.value;
}

// Event listener for "Add Header" button
document.getElementById('headerBtn').addEventListener('click', function() {
    const headerBlock = document.getElementById('headerBlock');
    headerBlock.classList.remove('hidden');
});

// Event listeners for text color buttons in the header section
document.getElementById('blueBtn').addEventListener('click', function() {
    applyTextColor('blue');
});

document.getElementById('greenBtn').addEventListener('click', function() {
    applyTextColor('green');
});

document.getElementById('redBtn').addEventListener('click', function() {
    applyTextColor('red');
});

// Event listeners for text alignment buttons in the header section
document.getElementById('leftAlignBtn').addEventListener('click', function() {
    applyTextAlignment('left');
});

document.getElementById('centerAlignBtn').addEventListener('click', function() {
    applyTextAlignment('center');
});

document.getElementById('rightAlignBtn').addEventListener('click', function() {
    applyTextAlignment('right');
});

// Event listener for header input to update the preview
document.getElementById('headerInput').addEventListener('input', updatePreview);

// Event listener for image input to update the preview
document.getElementById('imageInput').addEventListener('change', updatePreview);

// Event listener for description input to update the preview
document.getElementById('descriptionInput').addEventListener('input', updatePreview);


// Function to handle clearing the editor
function clearEditor() {
    const headerInput = document.getElementById('headerInput');
    const imageInput = document.getElementById('imageInput');
    const descriptionInput = document.getElementById('descriptionInput');
    const uploadedImageName = document.getElementById('uploadedImageName');
    const imagePreview = document.getElementById('imagePreview');

    headerInput.value = '';
    if (imageInput) {
        imageInput.value = '';
    }
    uploadedImageName.textContent = '';
    if (imagePreview.firstChild) {
        imagePreview.removeChild(imagePreview.firstChild);
    }
    descriptionInput.value = '';

    updatePreview();
}


// Function to handle downloading the poster
function downloadPoster() {

}



// Event listeners for adding elements, updating preview, and downloading
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('downloadBtn').addEventListener('click', downloadPoster);
    document.getElementById('clearBtn').addEventListener('click', clearEditor);
    document.getElementById('headerBtn').addEventListener('click', () => addElement('Header'));
    document.getElementById('imageBtn').addEventListener('click', () => addElement('Image'));
    document.getElementById('descriptionBtn').addEventListener('click', () => addElement('Description'));
});
