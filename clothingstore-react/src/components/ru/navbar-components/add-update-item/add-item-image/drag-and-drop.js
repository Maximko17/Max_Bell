const handleFiles = (files, divId) => {
  files = [...files];
  files.forEach(file => previewFile(file, divId));
};
export { handleFiles };

function previewFile(file, divId) {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = function() {
    let img = document.createElement("img");
    img.src = reader.result;
    document.getElementById(divId).appendChild(img);
  };
}

function cleanUpDiv(divId) {
  let div = document.getElementById(divId);
  while (div.firstChild) {
    div.removeChild(div.firstChild);
  }
}
export { cleanUpDiv };
