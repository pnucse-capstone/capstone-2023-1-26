// // 1. Chart.js 초기 설정 및 인스턴스 생성
// const ctx = document.getElementById("chart").getContext("2d");
// const myChart = new Chart(ctx, {
//   type: "line",
//   data: {
//     labels: [], // 여기에 시간이나 다른 레이블을 넣을 수 있습니다.
//     datasets: [
//       {
//         data: [],
//         label: "Real-time Data",
//         borderColor: "#FF5733",
//         fill: false,
//       },
//     ],
//   },
// });

// // 2. updateChart 함수 구현
// function updateChart(data) {
//   if (myChart.data.labels.length > 10) {
//     // 최대 10개의 데이터 포인트만 표시
//     myChart.data.labels.shift();
//     myChart.data.datasets[0].data.shift();
//   }

//   // 현재 시간 레이블 추가
//   myChart.data.labels.push(new Date().toLocaleTimeString());
//   // 받은 데이터 추가
//   myChart.data.datasets[0].data.push(data);
//   myChart.update();
// }

// // 3. Server-Sent Events 연결 및 이벤트 핸들링
// const eventSource = new EventSource("/events");
// eventSource.onmessage = (event) => {
//   const data = parseFloat(event.data);
//   updateChart(data);
// };
