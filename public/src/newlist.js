const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const boardId = urlParams.get('boardId');

document.addEventListener('DOMContentLoaded', function () {
  var listContainer = document.querySelector('.list-container');
  listContainer.innerHTML = '';
  axios({
    url: `http://localhost:3000/list/${boardId}`,
    method: 'get',
  })
    .then(function (response) {
      var listDatas = response.data;
      listDatas.forEach(function (listData) {
        var listElement = document.createElement('div');
        listElement.classList.add('list');

        var listName = document.createElement('p');
        listName.classList.add('list-name');
        listName.textContent = listData.name;
        listElement.appendChild(listName);
        listContainer.appendChild(listElement);
      });
    })
    .catch((error) => {
      console.log(error);
      alert(error.request.response);
    });
});

const createListButton = document.querySelector('#createListButton');
const createListModal = new bootstrap.Modal(
  document.getElementById('createListModal'),
);
const submitListButton = document.querySelector('#submitList');
const listTitleInput = document.querySelector('#listTitle');
const listContentInput = document.querySelector('#listContent');

// 모달 창 열기
createListButton.addEventListener('click', function () {
  createListModal.show();
});

// 리스트 생성 버튼 클릭 이벤트
submitListButton.addEventListener('click', function () {
  const newListData = {
    name: ListTitle.value,
  };
  axios({
    url: `http://localhost:3000/list/${boardId}`,
    method: 'post',
    data: {
      name: newListData.name,
    },
  })
    .then(async (res) => {
      console.log(res.successMessage);
      location.reload();
    })
    .catch((error) => {
      console.log(error);
      alert(error.request.response);
    });
});
