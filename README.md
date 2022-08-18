<h1>PROJECT INFO</h1>

주어진 api를 활용해 TodoList를 구현한 프로젝트 입니다.

1. 회원가입 , 로그인
   root (/) 페이지에서 회원가입과 로그인을 할 수 있으며  
   이메일은 @을 꼭 포함하도록 정규식을 통해 유효성 검사를 하였고
   패스워드는 8글자 이상만 되도록 유효성 검사를 진행하였습니다.
   로그인을 성공하고 토큰을 받아오면 /todo 페이지로 이동을 합니다.

2. Todo Page
   todo 목록을 칠 수 있는 인풋창과 todo의 목록을 확인 할 수 있습니다.
   수정, 삭제, 추가 기능등을 구현을 하였습니다.

모든 api 호출은 useFetch라는 hook을 직접 만들어 컨트롤 하였습니다.
토큰이 없을경우 /todo 로 들어가면 /로 redirect를 하게 만들었고,
토큰이 있을경우 /로 들어가면 /todo 로 redirect를 하게 만들었습니다.

<h1>PROJECT URL</h1>

https://endearing-axolotl-27c554.netlify.app
