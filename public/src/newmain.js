document.addEventListener('DOMContentLoaded', function () {
  const loginButton = document.querySelector('.login-button');
  const logoutButton = document.querySelector('.logout-button');
  const waitingButton = document.querySelector('.waiting-button');

  // 쿠키값 확인하여 버튼 상태 설정
  function checkLoginStatus() {
    let cookies = document.cookie;
    if (cookies.includes('Authorization=Bearer%20')) {
      window.location.href = `mypage.html`;
    } else {
      loginButton.classList.remove('d-none'); // 로그인 버튼 표시
      logoutButton.classList.add('d-none'); // 로그아웃 버튼 숨김
      waitingButton.classList.add('d-none'); // 멤버버튼 숨김
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

    // 데이터 객체 생성
    const userData = {
      email: email,
      password: password,
      confirm: confirm,
      name: name,
    };

    fetch('/user/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then(async (res) => {
        const successMessage = document.createElement('div');
        successMessage.classList.add('alert', 'alert-success', 'mt-3');
        successMessage.textContent = '회원 가입이 성공적으로 완료되었습니다.';

        const modalBody = document.querySelector('#signupModal .modal-body');
        modalBody.appendChild(successMessage);

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

        window.location.href = `mypage.html`;
      })
      .catch((error) => {
        alert(error.request.response);
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
});
