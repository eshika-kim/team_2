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
  : _c.addEventListener('submit', function (event) {
      event.preventDefault(); // 폼 제출 기본 동작 막기
      // 실제로는 서버로 전송하거나 데이터베이스에서 확인해야 합니다.
      var loginId = document.getElementById('loginId').value;
      var loginPassword = document.getElementById('loginPassword').value;
      // 예제 데이터와 비교
      if (loginId === 'othwan410' && loginPassword === 'qwerty123') {
        alert('로그인 성공!');
        // 로그인 상태로 변경
        setLoggedIn(true);
      } else {
        alert('로그인 실패. 아이디 또는 비밀번호를 확인하세요.');
      }
    });
// 회원가입 폼 제출 처리
(_d = document.getElementById('registerForm')) === null || _d === void 0
  ? void 0
  : _d.addEventListener('submit', function (event) {
      event.preventDefault(); // 폼 제출 기본 동작 막기
      // 실제로는 서버에 회원 정보를 전송해야 합니다.
      var registerId = document.getElementById('registerId').value;
      var registerPassword = document.getElementById('registerPassword').value;
      var registerName = document.getElementById('registerName').value;
      // 예제 데이터와 동일한 정보인지 확인
      if (
        registerId === 'zz' &&
        registerPassword === 'qwerty123' &&
        registerName !== '아아'
      ) {
        alert('회원가입 성공!');
        // 로그인 상태로 변경
        setLoggedIn(true);
      } else {
        alert('회원가입 실패. 입력 정보를 확인하세요.');
      }
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
