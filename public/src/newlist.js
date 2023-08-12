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
      const listContainer = document.querySelector('.list-container');
      const divElement = document.createElement('div');
      divElement.className = 'list';

      listDatas.forEach(function (listData) {
        axios({
          url: `http://localhost:3000/card/${listData.list_id}`,
          method: 'get',
        }).then(function (response) {
          const buttonElement = document.createElement('button');
          buttonElement.id = 'openModalButton'; // 버튼의 id 설정
          buttonElement.textContent = listData.name;
          divElement.appendChild(buttonElement);

          const cardsElement = document.createElement('div');
          cardsElement.className = 'sub-cards';

          const cards = response.data;
          cards.forEach(function (cardData) {
            const subCardElement = document.createElement('div');
            subCardElement.className = 'sub-card'; // 클래스명 설정
            subCardElement.draggable = true;
            subCardElement.textContent = cardData.name;
            subCardElement.style.backgroundColor = cardData.card_color;

            cardsElement.appendChild(subCardElement);
          });

          divElement.appendChild(cardsElement);
        });
        listContainer.appendChild(divElement);
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

const openModalButton = document.getElementById('openModalButton');
const createCardModal = new bootstrap.Modal(
  document.getElementById('createCardModal'),
);

const submitCardButton = document.querySelector('#submitCard');
const nameInput = document.querySelector('#name');
const descriptionInput = document.querySelector('#description');
const color = document.querySelector('#color');
const todoStatus = document.querySelector('#status');
const dateTimeInput = document.querySelector('#dateTime');

// 모달 창 열기
openModalButton.addEventListener('click', () => {
  createCardModal.show();
});

submitCardButton.addEventListener('click', function () {
  const newCardData = {
    name: nameInput.value,
    description: descriptionInput.value,
    card_color: color.value,
    status: todoStatus.value,
    dueDate: dateTimeInput,
  };

  // 데이터를 백엔드로 보내는 코드 (Axios 사용)
  axios
    .post(`/card/${list_id}`, newCardData) // 실제 백엔드 URL로 수정해야 합니다
    .then(() => {
      alert('보드가 성공적으로 생성되었습니다.');
      location.reload();
    })
    .catch((error) => {
      console.log(error.request.response);
    });
});
