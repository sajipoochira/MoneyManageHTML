var chartData = [{"visitor": 39, "visit": 1}, {"visitor": 18, "visit": 2}, {"visitor": 9, "visit": 3}, {"visitor": 5, "visit": 4}, {"visitor": 6, "visit": 5}, {"visitor": 5, "visit": 6}]

var visitorData = [],
    visitData = [];

for (var i = 0; i < chartData.length; i++) {
    visitorData.push(chartData[i]['visitor'])
    visitData.push(chartData[i]['visit'])
}

var myChart = new Chart(document.getElementById('mychart'), {
    type: 'doughnut',
    animation:{
        animateScale:true
    },
    data: {
        labels: visitData,
        datasets: [{
            label: 'Visitor',
            data: visitorData,
            backgroundColor: [
                "#a2d6c4",
                "#36A2EB",
                "#3e8787",
                "#579aac",
                "#7dcfe8",
                "#b3dfe7",
            ]
        }]
    },
    options: {
        responsive: true,
        legend: false,
        legendCallback: function(chart) {
            var legendHtml = [];
            legendHtml.push('<ul>');
            var item = chart.data.datasets[0];
            for (var i=0; i < item.data.length; i++) {
                legendHtml.push('<li>');
                legendHtml.push('<span class="chart-legend" style="background-color:' + item.backgroundColor[i] +'"></span>');
                legendHtml.push('<span class="chart-legend-label-text">' + item.data[i] + ' person - '+chart.data.labels[i]+' times</span>');
                legendHtml.push('</li>');
            }

            legendHtml.push('</ul>');
            return legendHtml.join("");
        },
        tooltips: {
             enabled: true,
             mode: 'label',
             callbacks: {
                label: function(tooltipItem, data) {
                    var indice = tooltipItem.index;
                    return data.datasets[0].data[indice] + " person visited " + data.labels[indice] + ' times';
                }
             }
         },
    }
});
$('#my-legend-con').html(myChart.generateLegend());