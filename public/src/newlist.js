const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const boardId = urlParams.get('boardId');

document.addEventListener('DOMContentLoaded', function () {
  const listContainer = document.querySelector('.list-container');
  axios({
    url: `http://localhost:3000/list/${boardId}`,
    method: 'get',
  })
    .then(function (response) {
      var listDatas = response.data;
      const listContainer = document.querySelector('.list-container');

      listDatas.forEach(function (listData) {
        const divElement = document.createElement('div');
        divElement.className = 'list';
        divElement.id = listData.list_id;
        divElement.draggable = true;
        axios({
          url: `http://localhost:3000/card/${listData.list_id}`,
          method: 'get',
        }).then(function (response) {
          const pElement = document.createElement('p');
          pElement.textContent = listData.name;
          divElement.appendChild(pElement);
          const buttonElement = document.createElement('button');
          buttonElement.id = 'openModalButton'; // 버튼의 id 설정
          buttonElement.textContent = '+';
          buttonElement.addEventListener('click', () => {
            modalList_id = listData.list_id;
            createCardModal.show();
          });
          divElement.appendChild(buttonElement);

          const cardsElement = document.createElement('div');
          cardsElement.className = 'sub-cards';
          cardsElement.id = listData.order;

          const cards = response.data;
          cards.forEach(function (cardData) {
            const subCardElement = document.createElement('div');
            subCardElement.className = 'sub-card'; // 클래스명 설정
            subCardElement.id = cardData.card_id + '?' + cardData.order;
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

  const listContainers = document.querySelectorAll('.list-container');

  // 드래그 시작
  listContainers.forEach(function (listContainer) {
    listContainer.addEventListener('dragstart', function (event) {
      event.dataTransfer.setData('text/plain', event.target.id);
    });
  });

  // 드롭 이벤트
  listContainers.forEach(function (listContainer) {
    listContainer.addEventListener('dragover', function (event) {
      event.preventDefault();
    });

    listContainer.addEventListener('drop', function (event) {
      event.preventDefault();
      const data = event.dataTransfer.getData('text/plain');
      const draggedElement = document.getElementById(data);

      // 드래그한 요소가 "sub-card" 클래스인지 확인
      if (draggedElement.className === 'sub-card') {
        if (
          event.target.className === 'sub-card' ||
          event.target.classList.contains('list')
        ) {
          const targetCard = event.target.id.split('?');
          const draggCard = draggedElement.id.split('?');

          let cardOrder = parseInt(targetCard[1]);
          let draggCardorder = parseInt(draggCard[1]);
          let cardId = parseInt(draggCard[0]);

          if (event.target.classList.contains('list')) cardOrder = 1;
          else if (draggCardorder < cardOrder) cardOrder++;

          // 드롭된 sub-card의 리스트 id와 드래그한 sub-card의 리스트 id 비교
          if (
            parseInt(draggedElement.parentNode.parentNode.id) !==
            parseInt(event.target.parentNode.parentNode.id)
          ) {
            let list_id = null;
            if (event.target.classList.contains('list'))
              list_id = event.target.id;
            else list_id = parseInt(event.target.parentNode.parentNode.id);
            axios({
              //여기
              url: `http://localhost:3000/card/cardWhere/${cardId}?list_id=${list_id}`,
              method: 'patch',
              data: {
                order: cardOrder,
              },
            })
              .then(async (res) => {
                location.reload();
              })
              .catch((error) => {
                alert(error.request.response);
                return;
              });
          } else {
            if (draggCardorder === cardOrder) return;
            const list_id = parseInt(draggedElement.parentNode.parentNode.id);
            axios({
              //여기
              url: `http://localhost:3000/card/order/${cardId}?list_id=${list_id}`,
              method: 'patch',
              data: {
                order: cardOrder,
              },
            })
              .then(async (res) => {
                location.reload();
              })
              .catch((error) => {
                alert(error.request.response);
                return;
              });
          }
        }
      } // 드래그한 요소가 "list" 클래스인지 확인
      else if (draggedElement.classList.contains('list')) {
        // 드롭한 "list" 요소의 ID 가져오기
        let listOrder = '';
        if (event.target.classList.contains('list')) {
          listOrder = parseInt(event.target.querySelector('.sub-cards').id);
        } else if (event.target.parentNode.classList.contains('list')) {
          listOrder = parseInt(
            event.target.parentNode.querySelector('.sub-cards').id,
          );
        } else if (
          event.target.parentNode.parentNode.classList.contains('list')
        )
          listOrder = parseInt(
            event.target.parentNode.parentNode.querySelector('.sub-cards').id,
          );

        if (parseInt(draggedElement.querySelector('.sub-cards').id) < listOrder)
          listOrder++;
        else if (
          parseInt(draggedElement.querySelector('.sub-cards').id) === listOrder
        )
          return;

        const draggedElementId = draggedElement.id;
        if (listOrder !== '') {
          axios({
            url: `http://localhost:3000/list/listOrder/${draggedElementId}?board_id=${boardId}`,
            method: 'patch',
            data: {
              order: listOrder,
            },
          })
            .then(async (res) => {
              location.reload();
            })
            .catch((error) => {
              alert(error.request.response);
            });
        }
      }
    });
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

const createCardModal = new bootstrap.Modal(
  document.getElementById('createCardModal'),
);
const submitCardButton = document.querySelector('#submitCard');
const nameInput = document.querySelector('#name');
const descriptionInput = document.querySelector('#description');
const color = document.querySelector('#color');
const todoStatus = document.querySelector('#todoStatus');
const dateTimeInput = document.querySelector('#dateTime');
let modalList_id = null;

submitCardButton.addEventListener('click', function () {
  const newCardData = {
    name: nameInput.value,
    description: descriptionInput.value,
    card_color: color.value,
    status: todoStatus.value,
    dueDate: dateTimeInput.value,
  };

  // 데이터를 백엔드로 보내는 코드 (Axios 사용)
  axios
    .post(`/card/${modalList_id}`, newCardData) // 실제 백엔드 URL로 수정해야 합니다
    .then(() => {
      alert('카드가 성공적으로 생성되었습니다.');
      location.reload();
    })
    .catch((error) => {
      console.log(error.request.response);
    });
});
