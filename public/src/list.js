// // 각 list에 대한 클릭 이벤트 리스너 추가
// const lists = document.querySelectorAll('.list');
// lists.forEach((list, index) => {
//   const addCardButton = list.querySelector('.add-card-button');
//   const subCardsContainer = list.querySelector('.sub-cards');

//   list.style.maxHeight = list.scrollHeight + 'px';
//   // list 내의 "카드 추가" 버튼에 대한 클릭 이벤트 리스너 추가
//   addCardButton.addEventListener('click', function (event) {
//     // 새로운 하위 카드 생성
//     const subCard = document.createElement('div');
//     subCard.classList.add('sub-card');
//     subCard.textContent = '하위 카드';
//     subCard.draggable = true;
//     // 해당 카드의 "sub-cards" 컨테이너에 추가
//     subCardsContainer.appendChild(subCard);

//     // 상위 카드 컨테이너의 높이를 하위 카드 컨테이너 높이에 맞게 조정
//     list.style.maxHeight = list.scrollHeight + 10 + 'px';
//     console.log(list.scrollHeight);
//   });
// });

const subCards = document.querySelectorAll('.sub-card');

// 드래그 앤 드롭 이벤트 리스너 추가
subCards.forEach((subCard) => {
  subCard.addEventListener('dragstart', dragStart);
  subCard.addEventListener('dragover', dragOver);
  subCard.addEventListener('drop', drop);
});

let dragStartIndex;

function dragStart(event) {
  dragStartIndex = Array.from(subCards).indexOf(this);
  event.dataTransfer.effectAllowed = 'move';
  event.dataTransfer.setData('text/html', this.innerHTML);
}

function dragOver(event) {
  event.preventDefault();
}

function drop(event) {
  const dropIndex = Array.from(subCards).indexOf(this);
  if (dragStartIndex === dropIndex) return;

  const draggedCard = subCards[dragStartIndex].outerHTML;
  const droppedCard = subCards[dropIndex].outerHTML;

  // 카드 위치 변경
  subCards[dropIndex].outerHTML = draggedCard;
  subCards[dragStartIndex].outerHTML = droppedCard;

  // 드롭한 위치에서 발생하는 모든 드래그 앤 드롭 이벤트 중지
  event.stopPropagation();
  event.preventDefault();
}

const openModalButton = document.getElementById('openModalButton');
const cardModal = document.getElementById('cardModal');
const createCardButton = document.getElementById('createCardButton');
const closeModalButton = document.getElementById('closeModalButton');
const cardContainer = document.querySelector('.card-container');

// 모달 창 열기
openModalButton.addEventListener('click', () => {
  cardModal.classList.add('visible');
});

// 카드 생성
createCardButton.addEventListener('click', () => {
  // 데이터 가져오기
  const nameInput = document.getElementById('name');
  const descriptionInput = document.getElementById('description');
  const colorSelect = document.getElementById('color');
  const dateTimeInput = document.getElementById('dateTime');

  const name = nameInput.value;
  const description = descriptionInput.value;
  const color = colorSelect.value;
  const dateTime = dateTimeInput.value;

  // 카드 생성
  const card = document.createElement('div');
  card.classList.add('board');
  card.style.backgroundColor = color;
  card.textContent = `${name}: ${description}, 날짜와 시간: ${dateTime}`;

  // 카드 컨테이너에 추가
  cardContainer.appendChild(card);

  // 모달 닫기
  cardModal.classList.remove('visible');
});

// 모달 창 닫기
closeModalButton.addEventListener('click', () => {
  cardModal.classList.remove('visible');
});
