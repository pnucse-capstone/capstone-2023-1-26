
// let socket = new WebSocket('ws://localhost:8000/ws/graph/');

// socket.onmessage = function(e) {
//     var pageUrl = window.location.href;
//     var last = pageUrl.substring(pageUrl.length-4);
    
//     console.log("socket", pageUrl, last);


//     let djangoData = JSON.parse(e.data);
//     console.log(djangoData);

//     djangoData.value2

//     if (last == "bus2") {
//       document.querySelector('#add2').innerHTML = djangoData.add2;
//     } else {
//       document.querySelector('#add1').innerHTML = djangoData.add1;
//     }
// }


function clickEvent() {
  alert("신고가 접수되었습니다.");
}

function mainPageClick() {
  alert("버스를 선택 후 신고 해 주세요.");
}
