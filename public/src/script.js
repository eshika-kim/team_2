var _a, _b, _c, _d, _e;
// 로그인 버튼 클릭 시 로그인 팝업 열기
(_a = document.getElementById('loginButton')) === null || _a === void 0
  ? void 0
  : _a.addEventListener('click', function () {
      document.getElementById('loginPopup').style.display = 'block';
    });
// 회원가입 버튼 클릭 시 회원가입 팝업 열기
(_b = document.getElementById('registerButton')) === null || _b === void 0
  ? void 0
  : _b.addEventListener('click', function () {
      document.getElementById('registerPopup').style.display = 'block';
    });
// 로그인 폼 제출 처리
(_c = document.getElementById('loginForm')) === null || _c === void 0
  ? void 0
  : _c.addEventListener('submit', async function (event) {
      event.preventDefault(); // 폼 제출 기본 동작 막기
      var emailId = document.getElementById('emailId').value;
      var loginPassword = document.getElementById('loginPassword').value;
      const loginResult = await axios({
        url: 'http://localhost:3000/user/login',
        method: 'post',
        data: {
          email: emailId,
          password: loginPassword,
        },
      })
        .then((response) => console.log(response.data))
        .catch((error) => {
          console.error('에러 발견: ', error);
          console.log('Error response: ', error.response);
        });
    });
// 회원가입 폼 제출 처리
(_d = document.getElementById('registerForm')) === null || _d === void 0
  ? void 0
  : _d.addEventListener('submit', async function (event) {
      event.preventDefault(); // 폼 제출 기본 동작 막기
      var registerEmail = document.getElementById('registerEmail').value;
      var registerPassword = document.getElementById('registerPassword').value;
      var registerPasswordConfirm = document.getElementById(
        'registerPasswordConfirm',
      ).value;
      var registerName = document.getElementById('registerName').value;
      const signupResult = await axios({
        url: 'http://localhost:3000/user/sign',
        method: 'post',
        data: {
          email: registerEmail,
          password: registerPassword,
          name: registerName,
          passwordConfirm: registerPasswordConfirm,
        },
      })
        .then((response) => console.log(response.data))
        .catch((error) => {
          console.error('에러 발견: ', error);
          console.log('Error response: ', error.response);
        });
    });
// 로그아웃 버튼 클릭 시 로그아웃 상태로 변경
(_e = document.getElementById('logoutButton')) === null || _e === void 0
  ? void 0
  : _e.addEventListener('click', function () {
      // 로그아웃 상태로 변경
      setLoggedIn(false);
    });
// 로그인 상태에 따라 버튼 텍스트 변경
function setLoggedIn(loggedIn) {
  var loginButton = document.getElementById('loginButton');
  var logoutButton = document.getElementById('logoutButton');
  if (loggedIn) {
    loginButton.style.display = 'none';
    logoutButton.style.display = 'block';
  } else {
    loginButton.style.display = 'block';
    logoutButton.style.display = 'none';
  }
  // 팝업 닫기
  document.getElementById('loginPopup').style.display = 'none';
  document.getElementById('registerPopup').style.display = 'none';
}
document
  .getElementById('closeLoginPopup')
  .addEventListener('click', function () {
    document.getElementById('loginPopup').style.display = 'none';
  });
// 닫힘 버튼 클릭 시 회원가입 팝업 닫기
document
  .getElementById('closeRegisterPopup')
  .addEventListener('click', function () {
    document.getElementById('registerPopup').style.display = 'none';
  });

// 각 카드에 대한 클릭 이벤트 리스너 추가
const cardLinks = document.querySelectorAll('.card-link');
cardLinks.forEach((cardLink, index) => {
  cardLink.addEventListener('click', function (event) {
    // 기본 동작을 막고 새로운 페이지로 이동
    event.preventDefault();
    const cardValue = index + 1; // 카드 번호는 1부터 시작
    const destinationURL = `list.html?card=${cardValue}`;
    window.location.href = destinationURL;
  });
});

// 보드 카드 동적 생성 함수
document.addEventListener('DOMContentLoaded', function () {
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
        cardLink.href = 'list.html?boardId=' + boardData.id;
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
});
