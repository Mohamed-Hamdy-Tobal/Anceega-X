// Toast

let toastMessage = document.getElementById("toastMessage")

function showToast(message, bg) {
    toastMessage.innerHTML = message;

    if (bg) {
        toast.style.backgroundColor = bg;
    }

    toast.style.display = 'block';

    setTimeout(function () {
        toast.style.display = 'none';
    }, 3000);
}

function clearForm(formId) {
    document.getElementById(formId).reset();
}


// Toast
let toastMessageDynamic = document.getElementById("toastMessageDynamic");
let toastDynamic  = document.getElementById("dynamicToast"); // Assuming there's an element with id "toast" for the toast container

function showToastDynamic(message, bg) {
    toastMessageDynamic.innerHTML = message;

    if (bg) {
        toastDynamic.style.backgroundColor = bg;
    } else {
        toastDynamic.style.backgroundColor = ''; // Reset to default if no background color is provided
    }

    toastDynamic.style.display = 'block';

    setTimeout(function () {
        toastDynamic.style.display = 'none';
    }, 3000);
}