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
