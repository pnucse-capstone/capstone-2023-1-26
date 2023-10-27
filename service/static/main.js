const ctx = document.getElementById('myChart');
ctx.style = "margin: 0 auto; width: 100vx; height: 80vh;";

let graphData = {
    type: 'line',
    data: {
        labels: ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55', '60'],
        datasets: [{
            label: '# of User',
            data: [0],
            backgroundColor: 'rgba(247,50,63,0.1)',
            borderColor: 'rgba(247,50,63,1)',
            borderWidth: 1
        }]
    },
    options: {
        responsive: false,
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Minutes",
                    font: {
                        size: 15,
                    },
                },
            },
            y: {
                title: {
                    display: true,
                    text: "# of People",
                    font: {
                        size: 15,
                    },
                },
                ticks: {
                    beginZero: true,
                    suggestedMin: 0,   //y축 최솟값
                    suggestedMax: 60, //y축 최댓값
                    fontSize: 14,
                    stepSize: 1
                }
            }
        }
    }
};

let myChart = new Chart(ctx, graphData);

let socket = new WebSocket('ws://localhost:8000/ws/graph/');

socket.onmessage = function(e) {
    var pageUrl = window.location.href;
    var last = pageUrl.substring(pageUrl.length-4);
    // console.log("socket", pageUrl, last);
    let djangoData = JSON.parse(e.data);
    console.log(djangoData);

    let newGraphData = graphData.data.datasets[0].data;
    if (newGraphData.length == 13) {
        // myChart.destroy();
        if (last == "bus2") {
            graphData.data.datasets[0].data = [djangoData.value2];
        } else {
            graphData.data.datasets[0].data = [djangoData.value1];
        }
        myChart = new Chart(ctx, graphData);
    }

    if (last == "bus2") {
        newGraphData.push(djangoData.value2);
    } else {
        newGraphData.push(djangoData.value1);
    }
    graphData.data.datasets[0].data = newGraphData;
    myChart.update();

    document.querySelector('#hour').innerHTML = djangoData.hour;

    if (last == "bus2") {
        document.querySelector('#total2').innerHTML = djangoData.value2;
        document.querySelector('#value2').innerHTML = djangoData.cong2;
    } else {
        document.querySelector('#total1').innerHTML = djangoData.value1;
        document.querySelector('#value1').innerHTML = djangoData.cong1;
    }
}