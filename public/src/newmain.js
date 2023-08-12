document.addEventListener('DOMContentLoaded', function () {
  const loginButton = document.querySelector('.login-button');
  const logoutButton = document.querySelector('.logout-button');
  const waitingButton = document.querySelector('.waiting-button');
  const createBoardButton = document.querySelector('.create-board-button');

  // 쿠키값 확인하여 버튼 상태 설정
  function checkLoginStatus() {
    let cookies = document.cookie;
    console.log(cookies);
    if (cookies.includes('Authentication=Bearer%20')) {
      loginButton.classList.add('d-none'); // 로그인 버튼 숨김
      logoutButton.classList.remove('d-none'); // 로그아웃 버튼 표시
      waitingButton.classList.remove('d-none'); // 멤버버튼 표시
      createBoardButton.classList.remove('d-none'); // 보드 생성 버튼 표시

      var cardContainer = document.querySelector('.card-container');
      // 기존 카드 컨테이너 데이터 지우기
      cardContainer.innerHTML = '';
      // 서버에서 JSON 데이터 가져오기 (예시)
      axios
        .get('http://localhost:3000/board')
        .then(function (response) {
          var jsonData = response.data;
          // JSON 데이터를 기반으로 보드 카드 동적 생성
          jsonData.forEach(function (boardData) {
            var cardLink = document.createElement('a');
            cardLink.href = 'newlist.html?boardId=' + boardData.board_id;
            cardLink.className = 'card-link';
            var cardDiv = document.createElement('div');
            cardDiv.className = 'board';
            cardDiv.textContent = boardData.name;

            cardLink.appendChild(cardDiv);
            cardContainer.appendChild(cardLink);
          });
        })
        .catch(function (error) {
          console.error('Error fetching board data:', error);
        });
    }
  }

  // 페이지 로드 시 쿠키값 확인
  checkLoginStatus();

  logoutButton.addEventListener('click', function () {
    if (confirm('로그아웃 하시겠습니까?')) {
      // Axios를 사용하여 POST 요청 보내기
      axios
        .get('/user/logout') // 실제 백엔드 URL로 수정해야 합니다
        .then(() => {
          location.reload();
        })
        .catch((error) => {
          alert(error.request.response);
        });
    }
  });

  // 회원가입
  const signupButton = document.querySelector(
    '#signupModal button.btn-primary',
  );

  signupButton.addEventListener('click', function () {
    // 폼 데이터 수집
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const confirm = document.querySelector('#confirm').value;
    const name = document.querySelector('#name').value;

    axios({
      url: 'http://localhost:3000/user/sign',
      method: 'post',
      data: {
        email: email,
        password: password,
        name: name,
        passwordConfirm: confirm,
      },
    })
      .then(async (res) => {
        console.log(res.successMessage);

        alert('회원가입이 완료되었습니다.');

        location.reload();
      })
      .catch((error) => {
        alert(error.request.response);
      });
  });

  //로그인
  const modalLoginButton = document.querySelector(
    '#loginModal button.btn-primary',
  );

  modalLoginButton.addEventListener('click', function () {
    // 폼 데이터 수집
    const email = document.querySelector('#email-login').value;
    const password = document.querySelector('#password-login').value;

    // 데이터 객체 생성
    const userData = {
      email: email,
      password: password,
    };

    // Axios를 사용하여 POST 요청 보내기
    axios
      .post('/user/login', userData) // 실제 백엔드 URL로 수정해야 합니다
      .then((response) => {
        // 성공 메시지 표시
        const successMessage = document.createElement('div');
        successMessage.classList.add('alert', 'alert-success', 'mt-3');
        successMessage.textContent = '로그인이 성공적으로 완료되었습니다.';

        const modalBody = document.querySelector('#loginModal .modal-body');
        modalBody.appendChild(successMessage);

        location.reload();
      })
      .catch((error) => {
        console.error('에러 발견: ', error);
        console.log('Error response: ', error.response);
      });
  });

  const createBoardModal = new bootstrap.Modal(
    document.getElementById('createBoardModal'),
  );
  const submitBoardButton = document.querySelector('#submitBoard');
  const boardTitleInput = document.querySelector('#boardTitle');
  const boardDescriptionInput = document.querySelector('#boardContent');
  const boardColorInput = document.querySelector('#color');

  // 모달 창 열기
  createBoardButton.addEventListener('click', function () {
    createBoardModal.show();
  });

  // 보드 생성 버튼 클릭 이벤트
  submitBoardButton.addEventListener('click', function () {
    const newBoardData = {
      name: boardTitleInput.value,
      description: boardDescriptionInput.value,
      color: boardColorInput.value,
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
        alert(error.request.response.data);
      });
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const dataModal = document.getElementById('dataModal');
  const waitingList = document.getElementById('waitingList');

  // 모달이 열릴 때의 이벤트 리스너
  dataModal.addEventListener('shown.bs.modal', function () {
    // 서버로부터 데이터를 가져와서 리스트 아이템을 추가하는 로직을 구현
    axios
      .get('/board/waiting')
      .then((response) => {
        const responseData = response.data; // 가져온 멤버 데이터

        waitingList.innerHTML = ''; // 기존 리스트 초기화

        if (Array.isArray(responseData)) {
          if (responseData.length === 0) {
            const emptyItem = document.createElement('li');
            emptyItem.textContent = '멤버 추가 요청이 없습니다';
            waitingList.appendChild(emptyItem);
          } else {
            responseData.forEach((member) => {
              const listItem = document.createElement('li');
              listItem.textContent = member.name; // 사용자 이름으로 변경

              const acceptButton = document.createElement('button');
              acceptButton.textContent = '수락';
              acceptButton.classList.add(
                'btn',
                'btn-success',
                'btn-sm',
                'accept-button',
              );
              acceptButton.addEventListener('click', function () {
                // 해당 멤버를 수락하는 요청을 보내는 로직
                axios
                  .post(`/board/member/${member.board_id}`)
                  .then((response) => {
                    // 수락 성공 처리 로직
                    console.log('멤버 수락 완료:', response.data);
                  });
              });

              const cancelButton = document.createElement('button');
              cancelButton.textContent = '취소';
              cancelButton.classList.add(
                'btn',
                'btn-danger',
                'btn-sm',
                'cancel-button',
              );
              cancelButton.addEventListener('click', function () {
                // 취소 처리 로직
                axios
                  .delete(`/board/waiting/${member.board_id}`)
                  .then((response) => {
                    // 취소 성공 처리 로직
                    console.log('요청 취소 완료:', response.data);
                  });
              });

              listItem.appendChild(acceptButton);
              listItem.appendChild(cancelButton);

              waitingList.appendChild(listItem);
            });
          }
        } else {
          const emptyItem = document.createElement('li');
          emptyItem.textContent = '멤버 요청이 없습니다';
          waitingList.appendChild(emptyItem);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  });

  // 모달이 닫힐 때의 이벤트 리스너
  dataModal.addEventListener('hidden.bs.modal', function () {
    // 리스트 초기화
    waitingList.innerHTML = '';
  });
});
