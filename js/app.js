$(document).ready(function () {
    addStackedBarCHart();

    addGaugeChart("gaugeChart1", 78);
    addGaugeChart("gaugeChart2", 95);
    addGaugeChart("gaugeChart3", 59);
});

function addStackedBarCHart() {
    let employerData = [], employeeData = [], totalInterestData = [];

    for (let i = 1; i <= 37; i+=3) {
        let obj = {};

        let color = 'blue';
        //#85B0FF #4A35FF #0800A3
        switch (i%3) {
            case 0:
                color = "#85B0FF";
                break;

            case 1:
                color = "#4A35FF";
                break;

            case 2:
                color = "#0800A3";
                break;
            
            default:
                break;
        }

        obj.y = i*10;
        obj.color = color;

        employerData.push(obj);
    }

    for (let i = 2; i <= 38; i+=3) {
        let obj = {};

        let color = 'blue';
        switch (i%3) {
            case 0:
                color = "#85B0FF";
                break;

            case 1:
                color = "#4A35FF";
                break;

            case 2:
                color = "#0800A3";
                break;
            
            default:
                break;
        }

        obj.y = i*10;
        obj.color = color;        
        employeeData.push(obj);
    }

    for (let i = 3; i <= 39; i+=3) {
        let obj = {};

        let color = 'blue';
        switch (i%3) {
            case 0:
                color = "#85B0FF";
                break;

            case 1:
                color = "#4A35FF";
                break;

            case 2:
                color = "#0800A3";
                break;
            
            default:
                break;
        }

        obj.y = i*10;
        obj.color = color;        
        totalInterestData.push(obj);
    }

    // console.log('>>',employerData);
    // console.log('>>',employeeData);
    // console.log('>>',totalInterestData);

    var stackedBarChartOpt = {
        chart: {
            type: 'column',
            height: 250
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: ['20', '', '25', '', '30', '', '35', '', '40', '', '60', '', '65'],
            title: {
                text: null
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: '',
                align: 'high'
            },
            labels: {
                overflow: 'justify',
                formatter: function () {
                    return '$' + this.value;
                }
            }
        },
        tooltip: {
            valueSuffix: ' '
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                }
            },
            series: {
                stacking: 'normal'
            }
        },
        legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'top',
            itemMarginTop: 0,
            itemMarginBottom: 0
        },
        credits: {
            enabled: false
        },
        exporting: {
            enabled: false
        },
        series: [
            {
                name: 'Employer',
                color:"#0800A3",
                data: employerData
            },
            {
                name: 'Employee',
                color:"#4A35FF",
                data: employeeData
            },
            {
                name: 'Total Interest',
                color:"#85B0FF",
                data: totalInterestData
            }
        ]
    }

    $('#stackedBarChart').highcharts(stackedBarChartOpt);
}

function addGaugeChart(containerId, gaugeValue) {
    var gaugeOptions = {

        chart: {
            type: 'solidgauge',
            height: 100,
            width: 100,
            margin: [0, 0, 0, 0],
            events: {
                load: alignLabel,
                redraw: alignLabel
            }
        },

        credits: {
            enabled: false
        },

        exporting: {
            enabled: false
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
                radius: '112%',
                innerRadius: '88%',
                y: 80
            }]
        }]
    }

    $("#" + containerId).highcharts(gaugeOptions);

    var grossLabel;

    function alignLabel() {
        var chart = this;

        if (grossLabel) {
            grossLabel.destroy();
        }

        grossLabel = chart.renderer.text(gaugeValue + '%', (chart.plotWidth / 3) + 5, (chart.plotHeight / 2) + 10)
            .css({
                color: '#000',
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '12pt',
                fontWeight: "bold"
            }).add();
    }
}