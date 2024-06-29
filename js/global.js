// Toast

let toastMessage = document.getElementById("toastMessage")

function showToast(message) {
    toastMessage.innerHTML = message;
    toast.style.display = 'block';

    setTimeout(function () {
        toast.style.display = 'none';
    }, 3000);
}

function clearForm(formId) {
    document.getElementById(formId).reset();
}