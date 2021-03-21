$(document).ready(function () {
    addStackedBarCHart();

    addGaugeChart("gaugeChart1", 78);
    addGaugeChart("gaugeChart2", 95);
    addGaugeChart("gaugeChart3", 59);
});

function addStackedBarCHart() {
    var chart = {
        type: 'column'
    };
    var title = {
        text: 'Historic World Population by Region'
    };
    var subtitle = {
        text: 'Source: Wikipedia.org'
    };
    var xAxis = {
        categories: ['Africa', 'America', 'Asia', 'Europe', 'Oceania'],
        title: {
            text: null
        }
    };
    var yAxis = {
        min: 0,
        title: {
            text: 'Population (millions)',
            align: 'high'
        },
        labels: {
            overflow: 'justify'
        }
    };
    var tooltip = {
        valueSuffix: ' millions'
    };
    var plotOptions = {
        bar: {
            dataLabels: {
                enabled: true
            }
        },
        series: {
            stacking: 'normal'
        }
    };
    var legend = {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        x: -40,
        y: 100,
        floating: true,
        borderWidth: 1,

        backgroundColor: (
            (Highcharts.theme && Highcharts.theme.legendBackgroundColor)
            || '#FFFFFF'),
        shadow: true
    };
    var credits = {
        enabled: false
    };
    var series = [
        {
            name: 'Year 1800',
            data: [107, 31, 635, 203, 2]
        },
        {
            name: 'Year 1900',
            data: [133, 156, 947, 408, 6]
        },
        {
            name: 'Year 2008',
            data: [973, 914, 4054, 732, 34]
        }
    ];

    var json = {};
    json.chart = chart;
    json.title = title;
    json.subtitle = subtitle;
    json.tooltip = tooltip;
    json.xAxis = xAxis;
    json.yAxis = yAxis;
    json.series = series;
    json.plotOptions = plotOptions;
    json.legend = legend;
    json.credits = credits;
    $('#stackedBarChart').highcharts(json);    
}

function addGaugeChart(containerId, gaugeValue) {
    var gaugeOptions = {

        chart: {
            type: 'solidgauge',
            height: 150,
            width:120,
            events: {
                load: alignLabel,
                redraw: alignLabel                
            }
        },

        credits:{
            enabled: false
        },

        exporting:{
            enabled:false
        },

        title: {
            text: '',
            style: {
                fontSize: '12px'
            }
        },

        tooltip: {
            borderWidth: 0,
            backgroundColor: 'none',
            shadow: false,
            style: {
                fontSize: '8px'
            },
            valueSuffix: '%',
            pointFormat: '{series.name}<br><span style="font-size:2em; color: {point.color}; font-weight: bold">{point.y}</span>',
            positioner: function (labelWidth) {
                return {
                    x: (this.chart.chartWidth - labelWidth) / 2,
                    y: (this.chart.plotHeight / 2) - 10
                };
            }
        },

        pane: {
            startAngle: 0,
            endAngle: 360,
            background: [{ // Track for Average
                outerRadius: '112%',
                innerRadius: '88%',
                backgroundColor: Highcharts.color("#26D2A8")
                    .setOpacity(0.3)
                    .get(),
                borderWidth: 0
            }]
        },

        yAxis: {
            min: 0,
            max: 100,
            lineWidth: 0,
            tickPositions: []
        },

        plotOptions: {
            solidgauge: {
                dataLabels: {
                    enabled: false
                },
                linecap: 'round',
                stickyTracking: false,
                rounded: true
            }
        },

        series: [{
            name: 'Average',
            data: [{
                color: "#26D2A8",
                radius: '122%',
                innerRadius: '88%',
                y: 80
            }]
        }]
    }

    $("#"+containerId).highcharts(gaugeOptions);

    var grossLabel;

    function alignLabel() {
      var chart = this;
    
      if (grossLabel) {
        grossLabel.destroy();
      }
    
      grossLabel = chart.renderer.text(gaugeValue+'%', (chart.plotWidth / 3) + 12, (chart.plotHeight / 2) + 15)
        .css({
          color: '#000',
          fontFamily:"'Montserrat', sans-serif",
          fontSize: '12pt',
          fontWeight:"bold"
        }).add();
    }  
}