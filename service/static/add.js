
let socket = new WebSocket('ws://localhost:8000/ws/graph/');
let bus1 = 0;
let bus2 = 0;

socket.onmessage = function(e) {
    var pageUrl = window.location.href;
    var last = pageUrl.substring(pageUrl.length-4);

    console.log("socket111111", pageUrl, last);


    let djangoData = JSON.parse(e.data);
    console.log(djangoData);

    console.log(bus1);
    // if (bus1 != djangoData.dir1.substring(djangoData.dir1.length-4)) {
    //   document.querySelector('#b1').style.color = "red";
    //   bus1 = djangoData.dir1.substring(pageUrl.length-4)
    // }

    if (last == "bus2") {
      document.querySelector('#add2').innerHTML = djangoData.add2;
      
    } else {
      document.querySelector('#add1').innerHTML = djangoData.add1;    
      
    }
}
