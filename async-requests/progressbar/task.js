const updateProgress = (progressElement, value) => {
    progressElement.value = value;
};

const resetFormProgress = (progressElement) => {
    progressElement.value = 0;
};

const uploadFile = (url, formData, onProgress, onSuccess, onError) => {
    const xhr = new XMLHttpRequest();
    
    xhr.upload.addEventListener('progress', onProgress);
    xhr.addEventListener('load', onSuccess);
    xhr.addEventListener('error', onError);
    
    xhr.open('POST', url);
    xhr.send(formData);
    
    return xhr;
};

const handleProgress = (event, progressElement) => {
    if (event.lengthComputable) {
        const progress = event.loaded / event.total;
        updateProgress(progressElement, progress);
    }
};

const handleUploadSuccess = (xhr, progressElement) => {
    if (xhr.status >= 200 && xhr.status < 300) {
        updateProgress(progressElement, 1);
        setTimeout(() => {
            resetFormProgress(progressElement);
        }, 1000);
    } else {
        resetFormProgress(progressElement);
    }
};

const handleUploadError = (progressElement) => {
    resetFormProgress(progressElement);
};

const handleFormSubmit = (form, progressElement) => {
    const formData = new FormData(form);
    
    uploadFile(
        form.action,
        formData,
        (event) => handleProgress(event, progressElement),
        (event) => handleUploadSuccess(event.target, progressElement),
        () => handleUploadError(progressElement)
    );
};

const initFormUpload = () => {
    const form = document.getElementById('form');
    const progress = document.getElementById('progress');
    
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        handleFormSubmit(form, progress);
    });
};

document.addEventListener('DOMContentLoaded', initFormUpload);