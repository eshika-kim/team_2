document.addEventListener('DOMContentLoaded', function () {});

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
    name: listTitleInput.value,
    content: listContentInput.value,
  };

  // 데이터를 백엔드로 보내는 코드 (Axios 사용)
  axios
    .post('/list/:board_id', newListData) // 실제 백엔드 URL로 수정해야 합니다
    .then((response) => {
      // 성공 메시지 표시
      const successMessage = document.createElement('div');
      successMessage.classList.add('alert', 'alert-success', 'mt-3');
      successMessage.textContent = '리스트가 성공적으로 생성되었습니다.';

      location.reload();
    })
    .catch((error) => {
      alert(error.request.response);
    });
});

const openModalButton = document.getElementById('openModalButton');
const createCardModal = new bootstrap.Modal(
  document.getElementById('createCardModal'),
);
const submitBoardButton = document.getElementById('submitBoardButton');
const nameInput = document.querySelector('#name');
const descriptionInput = document.querySelector('#description');
const color = document.querySelector('#color');
const todoStatus = document.querySelector('#status');
const dateTimeInput = document.querySelector('#dateTime');

// 모달 창 열기
openModalButton.addEventListener('click', () => {
  createCardModal.show();
});

submitBoardButton.addEventListener('click', function () {
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
