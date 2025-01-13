const dropArea = document.getElementById("drop-area");
const fileInput = document.getElementById("file-input");
const imagePreview = document.getElementById("image-preview");

const isImageFile = (items) => {
  return Array.from(items).every(
    (item) => item.kind === "file" && item.type.startsWith("image/")
  );
};

const handleFiles = (files) => {
  for (const file of files) {
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        const imgContainer = document.createElement("div");
        imgContainer.classList.add("file-upload__image");
        imgContainer.innerHTML = `<img src="${reader.result}" alt="${file.name}">`;
        imagePreview.appendChild(imgContainer);
      };
      reader.readAsDataURL(file);
    }
  }
};

dropArea.addEventListener("dragover", (event) => {
  event.preventDefault();
  const items = event.dataTransfer.items;

  if (isImageFile(items)) {
    dropArea.classList.add("dragover");
    dropArea.classList.remove("error");
  } else {
    dropArea.classList.add("error");
    dropArea.classList.remove("dragover");
  }
});

dropArea.addEventListener("dragenter", (event) => {
  event.preventDefault();
  const items = event.dataTransfer.items;

  if (!isImageFile(items)) {
    dropArea.classList.add("error");
  }
});

dropArea.addEventListener("dragleave", () => {
  dropArea.classList.remove("dragover", "error");
});

dropArea.addEventListener("drop", (event) => {
  event.preventDefault();
  dropArea.classList.remove("dragover", "error");
  const files = event.dataTransfer.files;

  if (isImageFile(event.dataTransfer.items)) {
    handleFiles(files);
  } else {
    alert("사진 파일만 업로드할 수 있습니다!");
  }
});

fileInput.addEventListener("change", (event) => {
  const files = event.target.files;
  handleFiles(files);
});
