# Strawberry Moon

<table>
  <tr>
    <td>
      <img src="https://user-images.githubusercontent.com/75469212/215300986-211e7972-9804-4148-8253-ff89bc753c57.png" alt="달력"       width="50%" />
    </td>
    <td>  
      <img src="https://user-images.githubusercontent.com/75469212/215300990-e1e27db8-544d-444e-ad58-c556dd2eca69.png" alt="입력창" width="50%" />
    </td>
  </tr>
  <tr>
    <td>
      달력(메인 페이지)
    </td>
    <td>
      날짜 별 입력창
    </td>
  </tr>
</div>

## 개발 기간

2022.12 ~ 2022.12

## 개발 배경

딸기 농사를 하지는 부모님께서 일일이 단가와 수량 등을 수기로 계산해서 기록하시던 행동의 편의성을 개선하기 위한 서비스

## 기능 요약

달력의 날짜를 클릭하면 나오는 폼을 통해 수량과 단가 등을 입력하면, 총 합계 금액을 계산해주고, 그를 차트에 표시하여 월 별 추세를 쉽게 알 수 있게 한다. 

## 사용 기술

typescript, next.js, planet-scale, prisma, tailwind-css, react-query, react-spinners, react-toastify

## 역할

개인 프로젝트

- 현재 날짜 표시 기능과 날짜 선택 기능이 있는 달력 컴포넌트 구현
- Chart.js를 통한 월, 품목 별 통계량 표시 기능 구현
- useSwipe Hook 구현을 통한 월, 날짜 변경 기능
- Next.js 서버에서 Prisma와 Planetscale을 통한 데이터 관리
- 데이터 저장 성공, 실패에 따른 토스트 UI 표시 기능 구현
- 데이터가 불러오는 중인 상황 인지를 위한 스피너를 통한 로딩 표시 기능 구현
- vercel을 통한 자동 배포 설정

## 개발 후기

타겟 사용자를 내 주변의 잘 알고있는 사람으로 지정하고 개발하여, 기능이나 UI 등을 정하는 과정에서 사용자를 고려하기 쉬웠고, 즉각적인 피드백이 가능해서 좋았다.

## Git Commit Convention

- ✨Feature:
- 📦Build: 
- 🔨Refactor:
- 💎Style:
- 🧹Chore:
- 🐛Fix:
