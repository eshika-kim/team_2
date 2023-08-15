const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const boardId = urlParams.get('boardId');

document.addEventListener('DOMContentLoaded', function () {
  // 쿠키값 확인하여 버튼 상태 설정
  function checkLoginStatus() {
    let cookies = document.cookie;
    const userNameElement = document.querySelector('.user-name');
    const cardContainer = document.querySelector('.list-container');
    if (cookies.includes('Authentication=Bearer%20')) {
      // 사용자 이름 가져오기
      axios
        .get('http://localhost:3000/user')
        .then(function (response) {
          const userName = response.data;
          userNameElement.textContent = userName + '님 환영합니다';
        })
        .catch(function (error) {
          console.error('Error fetching user data:', error);
        });

      // 보드 카드 컨테이너 가져오기

      // axios
      //   .get('http://localhost:3000/board')
      //   .then(function (response) {
      //     var jsonData = response.data;
      //     // JSON 데이터를 기반으로 보드 카드 동적 생성
      //     jsonData.forEach(function (boardData) {
      //       var cardLink = document.createElement('a');
      //       cardLink.href = 'newlist.html?boardId=' + boardData.board_id;
      //       cardLink.className = 'card-link';
      //       var cardDiv = document.createElement('div');
      //       cardDiv.className = 'board';
      //       var cardH2 = document.createElement('h5');
      //       cardH2.textContent = boardData.name;
      //       cardDiv.style.backgroundColor = boardData.color;
      //       var cardP = document.createElement('p');
      //       cardP.textContent = '설명: ' + boardData.description;

      //       cardDiv.appendChild(cardH2);
      //       cardDiv.appendChild(cardP);
      //       cardLink.appendChild(cardDiv);
      //       cardContainer.appendChild(cardLink); // 여기서 cardContainer를 사용
      //     });
      //   })
      //   .catch(function (error) {
      //     console.error('Error fetching board data:', error);
      //   });
    }
  }

  // 페이지 로드 시 쿠키값 확인
  checkLoginStatus();
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

  listContainers.forEach(function (listContainer) {
    listContainer.addEventListener('click', function (event) {
      const clickedElement = event.target;
      if (clickedElement.classList.contains('sub-card')) {
        const cardId = clickedElement.id.split('?')[0];
        openCardModal(cardId);
      }
    });
  });
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

// 초대하기 버튼
const inviteButton = document.querySelector('#inviteMember');
const inviteModal = new bootstrap.Modal(document.getElementById('inviteModal'));
const submitinviteButton = document.querySelector('#submitInvite');

// 초대하기 제출 이벤트
const submitInviteButton = document.querySelector('#submitInvite');
const emailInput = document.querySelector('#email');
const inviteError = document.querySelector('#inviteError');

inviteButton.addEventListener('click', function () {
  inviteError.style.display = 'none'; // 에러 메시지 초기화
  inviteModal.show();
});

submitInviteButton.addEventListener('click', async function () {
  const newInviteData = {
    email: emailInput.value,
  };

  try {
    const serverResponse = await axios({
      url: `http://localhost:3000/board/waiting/${boardId}`,
      method: 'post',
      data: newInviteData,
    });

    if (serverResponse.status === 201) {
      alert('초대가 성공적으로 완료되었습니다.');
      location.reload();
    }
  } catch (error) {
    console.log(error);

    if (error.response && error.response.data) {
      inviteError.textContent =
        '초대에 실패했습니다. ' + error.response.data.message;
      inviteError.style.display = 'block'; // 에러 메시지 표시
    }
  }
});
// 리스트 생성 버튼
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

const commentsContainer = document.querySelector('#comments');
const cardModal = new bootstrap.Modal(document.getElementById('cardModal'));
const cardTitle = document.querySelector('#cardTitle');
const cardDescription = document.querySelector('#cardDescription');
const cardStatus = document.querySelector('#cardStatus');
const cardDueDate = document.querySelector('#cardDueDate');
const commentForm = document.querySelector('#commentForm');
const commentInput = document.querySelector('#commentInput');
let card_id = '';

function openCardModal(cardId) {
  card_id = cardId;
  commentsContainer.innerHTML = '';
  commentInput.value = '';
  axios({
    url: `http://localhost:3000/card/detail/${cardId}`,
    method: 'get',
  })
    .then(function (response) {
      const cardData = response.data;
      showCardModal(cardData);
    })
    .catch((error) => {
      console.log(error);
      alert(error.request.response);
    });
}

commentForm.addEventListener('submit', function (event) {
  event.preventDefault();

  if (commentInput.value === '') return alert('댓글을 입력해주세요');
  const data = {
    comment: commentInput.value,
    // 추가로 필요한 댓글 관련 데이터가 있다면 여기에 추가하세요.
  };

  axios({
    url: `http://localhost:3000/comment/${card_id}`, // 적절한 엔드포인트로 수정
    method: 'post',
    data: data,
  })
    .then(function (response) {
      // 댓글 추가에 성공한 경우 여기에 처리 코드를 추가
      console.log(response.data);
      // 예: 댓글 추가 후 댓글 목록을 갱신하거나 모달을 다시 로드
      openCardModal(card_id); // 댓글 목록 갱신
    })
    .catch(function (error) {
      console.error('댓글 추가 에러:', error);
      // 댓글 추가 실패 시 처리할 코드를 여기에 추가
    });
});

// 카드 모달 보여주기 함수
function showCardModal(cardData) {
  cardTitle.textContent = cardData[0].name;
  cardDescription.textContent = cardData[0].description;
  cardStatus.textContent = cardData[0].state;
  cardDueDate.textContent = formatDueDate(cardData[0].dueDate);

  const commentsData = cardData[1];

  // 댓글 정보를 반복하여 표시
  commentsData.forEach(function (comment) {
    // 댓글 카드 컴포넌트 생성
    const commentCard = document.createElement('div');
    commentCard.className = 'card mb-2'; // 카드 스타일 적용

    // 카드 내용 구성
    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    // 작성자 정보 표시
    const authorDiv = document.createElement('div');
    authorDiv.className = 'card-title';
    authorDiv.textContent = '작성자: ' + comment.name;
    cardBody.appendChild(authorDiv);

    // 댓글 내용 표시
    const contentDiv = document.createElement('div');
    contentDiv.className = 'card-text';
    contentDiv.textContent = comment.comment;
    cardBody.appendChild(contentDiv);

    // 작성일 정보 표시
    const dateDiv = document.createElement('div');
    dateDiv.className = 'card-subtitle text-muted';
    dateDiv.textContent = '작성일: ' + formatDueDate(comment.createdAt);
    cardBody.appendChild(dateDiv);

    // 카드 바디를 댓글 카드에 추가
    commentCard.appendChild(cardBody);

    // 댓글 카드를 댓글 영역에 추가
    commentsContainer.appendChild(commentCard);
  });

  cardModal.show();
}

const deleteCardButton = document.querySelector('#deleteCardButton');

deleteCardButton.addEventListener('click', function () {
  axios
    .delete(`/card/${card_id}`) // 적절한 엔드포인트로 수정해야 합니다
    .then(() => {
      alert('카드가 성공적으로 삭제되었습니다.');

      location.reload();
    })
    .catch((error) => {
      console.log(error.request.response);
    });
});

const editCardTitleInput = document.querySelector('#editCardName');
const editCardDescriptionInput = document.querySelector('#editCardDescription');
const editCardColor = document.querySelector('#editCardColor');
const editCardStatus = document.querySelector('#editCardStatus');
const editCardDueDateInput = document.querySelector('#editCardDueDate');

// 수정 버튼 클릭 시 수정 모달 띄우기
const editCardButton = document.querySelector('#editCardButton');
const editCardModal = new bootstrap.Modal(
  document.getElementById('editCardModal'),
);

editCardButton.addEventListener('click', function () {
  editCardTitleInput.value = cardTitle.textContent;
  editCardDescriptionInput.value = cardDescription.textContent;
  editCardColor.value = 'red';
  editCardStatus.value = cardStatus.textContent;
  editCardDueDateInput.value = formatDueDate(cardDueDate.textContent);
  editCard(card_id);
});

// 수정 버튼 클릭 시 카드 정보를 수정하는 함수
function editCard(cardId) {
  // 카드 정보를 가져와 수정 모달에 표시
  // 수정 모달 열기
  cardModal.hide();
  editCardModal.show();

  // 수정 버튼 클릭 시 카드 정보 업데이트
  const submitEditCardButton = document.querySelector('#submitEditCard');
  submitEditCardButton.addEventListener('click', function () {
    const updatedCardData = {
      name: editCardTitleInput.value,
      description: editCardDescriptionInput.value,
      card_color: editCardColor.value,
      status: editCardStatus.value,
      dueDate: editCardDueDateInput.value,
    };

    // 카드 정보를 업데이트
    axios
      .put(`/card/${cardId}`, updatedCardData) // 적절한 엔드포인트로 수정해야 합니다
      .then(() => {
        alert('카드가 성공적으로 수정되었습니다.');

        location.reload();
      })
      .catch((error) => {
        console.log(error.request.response);
      });
  });
}

// YYYY-MM-DD 오전/오후 시:분 형식으로 변환하는 함수
function formatDueDate(inputDateStr) {
  const inputDate = new Date(inputDateStr);

  const year = inputDate.getFullYear();
  const month = String(inputDate.getMonth() + 1).padStart(2, '0');
  const day = String(inputDate.getDate()).padStart(2, '0');
  let hours = inputDate.getHours();
  const ampm = hours >= 12 ? '오후' : '오전';
  hours %= 12;
  hours = hours || 12; // 0시일 경우 12시로 표시
  const minutes = String(inputDate.getMinutes()).padStart(2, '0');

  const outputDateStr =
    year + '-' + month + '-' + day + ' ' + ampm + ' ' + hours + ':' + minutes;

  return outputDateStr;
}
