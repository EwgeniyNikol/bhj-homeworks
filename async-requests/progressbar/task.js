document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form');
    const progress = document.getElementById('progress');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const formData = new FormData(form);
        const xhr = new XMLHttpRequest();

        xhr.upload.addEventListener('progress', (event) => {
            if (event.lengthComputable) {
                progress.value = event.loaded / event.total;
            }
        });

        xhr.addEventListener('load', () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                progress.value = 1;
                setTimeout(() => {
                    progress.value = 0;
                }, 1000);
            } else {
                progress.value = 0;
            }
        });

        xhr.addEventListener('error', () => {
            progress.value = 0;
        });

        xhr.open('POST', form.action);
        xhr.send(formData);
    });
});