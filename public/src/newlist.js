const lists = document.querySelectorAll('.list');
lists.forEach((list, index) => {
  const addCardButton = list.querySelector('.add-card-button');
  const subCardsContainer = list.querySelector('.sub-cards');

  list.style.maxHeight = list.scrollHeight + 'px';
  // list 내의 "카드 추가" 버튼에 대한 클릭 이벤트 리스너 추가
  addCardButton.addEventListener('click', function (event) {
    // 새로운 하위 카드 생성
    const subCard = document.createElement('div');
    subCard.classList.add('sub-card');
    subCard.textContent = '하위 카드';
    subCard.draggable = true;
    // 해당 카드의 "sub-cards" 컨테이너에 추가
    subCardsContainer.appendChild(subCard);

    // 상위 카드 컨테이너의 높이를 하위 카드 컨테이너 높이에 맞게 조정
    list.style.maxHeight = list.scrollHeight + 10 + 'px';
    console.log(list.scrollHeight);
  });
});

const createBoardButton = document.querySelector('#createBoardButton');
const createBoardModal = new bootstrap.Modal(
  document.getElementById('createBoardModal'),
);
const submitBoardButton = document.querySelector('#submitBoard');
const boardTitleInput = document.querySelector('#boardTitle');
const boardContentInput = document.querySelector('#boardContent');

// 모달 창 열기
createBoardButton.addEventListener('click', function () {
  createBoardModal.show();
});

// 보드 생성 버튼 클릭 이벤트
submitBoardButton.addEventListener('click', function () {
  const newBoardData = {
    title: boardTitleInput.value,
    content: boardContentInput.value,
  };

  // 데이터를 백엔드로 보내는 코드 (Axios 사용)
  axios
    .post('/board', newBoardData) // 실제 백엔드 URL로 수정해야 합니다
    .then((response) => {
      // 성공 메시지 표시
      const successMessage = document.createElement('div');
      successMessage.classList.add('alert', 'alert-success', 'mt-3');
      successMessage.textContent = '보드가 성공적으로 생성되었습니다.';

      const modalFooter = document.querySelector(
        '#createBoardModal .modal-footer',
      );
      modalFooter.insertAdjacentElement('beforebegin', successMessage);
      // 보드 생성에 성공한 경우, 생성된 보드를 화면에 추가
    })
    .catch((error) => {
      alert(error.request.response);
    });
});
