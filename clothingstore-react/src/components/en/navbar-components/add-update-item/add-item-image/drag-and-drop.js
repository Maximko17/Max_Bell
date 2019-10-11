const handleFiles = files => {
  files = [...files];
  files.forEach(previewFile);
};
export { handleFiles };

function previewFile(file) {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = function() {
    let img = document.createElement("img");
    img.src = reader.result;
    document.getElementById("gallery").appendChild(img);
  };
}

let filesDone = 0;

function initializeProgress() {
  let progressBar = document.getElementById("progress-bar");
  progressBar.value = 0;
}
export { initializeProgress };

function progressDone(filesToDo) {
  let progressBar = document.getElementById("progress-bar");
  console.log(filesToDo);
  console.log(filesDone);
  filesDone++;
  console.log(filesToDo);
  console.log(filesDone);
  progressBar.value = (filesDone / filesToDo) * 100;
  console.log(progressBar.value);
}
export { progressDone };
