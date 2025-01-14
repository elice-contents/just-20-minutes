const dataList = document.getElementById("data-list");
const paginationButtons = document.getElementById("pagination-buttons");

const dummyData = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  title: `Post Title ${i + 1}`,
  body: `This is the content of post ${i + 1}.`,
}));

const maxVisiblePages = 5;

const parseQueryString = () => {
  const params = new URLSearchParams(window.location.search);
  return {
    page: parseInt(params.get("page")) || 1,
    size: parseInt(params.get("size")) || 5,
  };
};

const renderDataList = (data, page, size) => {
  const start = (page - 1) * size;
  const end = start + size;

  dataList.innerHTML = data
    .slice(start, end)
    .map(
      (item) =>
        `<li>
          <h3>${item.title}</h3>
          <p>${item.body}</p>
        </li>`
    )
    .join("");
};

const renderPagination = (totalItems, page, size) => {
  const totalPages = Math.ceil(totalItems / size);
  const currentRange = Math.ceil(page / maxVisiblePages);
  const startPage = (currentRange - 1) * maxVisiblePages + 1;
  const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

  paginationButtons.innerHTML = "";

  if (currentRange > 1) {
    paginationButtons.innerHTML += `<button class="pagination-buttons__button" data-page="1"><<</button>`;
    paginationButtons.innerHTML += `<button class="pagination-buttons__button" data-page="${
      startPage - 1
    }"><</button>`;
  }

  for (let i = startPage; i <= endPage; i++) {
    paginationButtons.innerHTML += `<button class="pagination-buttons__button ${
      i === page ? "pagination-buttons__button--active" : ""
    }" data-page="${i}">${i}</button>`;
  }

  if (currentRange < Math.ceil(totalPages / maxVisiblePages)) {
    paginationButtons.innerHTML += `<button class="pagination-buttons__button" data-page="${
      endPage + 1
    }">></button>`;
    paginationButtons.innerHTML += `<button class="pagination-buttons__button" data-page="${totalPages}">>></button>`;
  }

  paginationButtons.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      const newPage = parseInt(button.dataset.page, 10);
      const newUrl = `${window.location.pathname}?page=${newPage}&size=${size}`;
      window.history.pushState({}, "", newUrl);
      updatePagination();
    });
  });
};

const updatePagination = () => {
  const { page, size } = parseQueryString();
  renderDataList(dummyData, page, size);
  renderPagination(dummyData.length, page, size);
};

updatePagination();

window.addEventListener("popstate", updatePagination);
