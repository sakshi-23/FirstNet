type = ['', 'info', 'success', 'warning', 'danger'];


demo = {
    initPickColor: function() {
        $('.pick-class-label').click(function() {
            var new_class = $(this).attr('new-class');
            var old_class = $('#display-buttons').attr('data-class');
            var display_div = $('#display-buttons');
            if (display_div.length) {
                var display_buttons = display_div.find('.btn');
                display_buttons.removeClass(old_class);
                display_buttons.addClass(new_class);
                display_div.attr('data-class', new_class);
            }
        });
    },

    initDocumentationCharts: function() {
        /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */

        dataDailySalesChart = {
            labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
            series: [
                [12, 17, 7, 17, 23, 18, 38], [1, 10, 7, 17, 23, 18, 38]
            ]
        };

        optionsDailySalesChart = {
            lineSmooth: Chartist.Interpolation.cardinal({
                tension: 0
            }),
            low: 0,
            high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
            chartPadding: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            },
        }

        var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

        md.startAnimationForLineChart(dailySalesChart);
    },

    initDashboardPageCharts: function() {

        /* ----------==========     Daily Sales Chart initialization    ==========---------- */

        dataDailySalesChart = {
            labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
            series: [
                [602,  652,792, 740, 630, 719, 655]
            ]
        };

        optionsDailySalesChart = {
            lineSmooth: Chartist.Interpolation.cardinal({
                tension: 0
            }),
            low: 400,
            high: 900, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
            chartPadding: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            },
        }

        var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

        md.startAnimationForLineChart(dailySalesChart);



        /* ----------==========     Completed Tasks Chart initialization    ==========---------- */

        dataCompletedTasksChart = {
            labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
            series: [
                [30, 10, 40, 30, 20,10,  5],
            ]
        };

        optionsCompletedTasksChart = {
            lineSmooth: Chartist.Interpolation.cardinal({
                tension: 0
            }),
            low: 0,
            high: 100, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
            chartPadding: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            }
        }

        var completedTasksChart = new Chartist.Line('#completedTasksChart', dataCompletedTasksChart, optionsCompletedTasksChart);

        // start animation for the Completed Tasks Chart - Line Chart
        md.startAnimationForLineChart(completedTasksChart);


        /* ----------==========     Emails Subscription Chart initialization    ==========---------- */

        var dataEmailsSubscriptionChart = {
            labels:['BWN', 'CPH', 'DAC', 'DUS', 'FRA', 'HKG', 'MEL', 'MUC', 'PER', 'SYD', 'WSSS'],
            series: [
                [542, 443, 320, 300, 553, 653, 326, 434, 568, 610,900]

            ]
        };
        var optionsEmailsSubscriptionChart = {
            axisX: {
                showGrid: false
            },
            low: 0,
            high: 1000,
            chartPadding: {
                top: 0,
                right: 5,
                bottom: 0,
                left: 0
            }
        };
        var responsiveOptions = [
            ['screen and (max-width: 640px)', {
                seriesBarDistance: 5,
                axisX: {
                    labelInterpolationFnc: function(value) {
                        return value[0];
                    }
                }
            }]
        ];
        var emailsSubscriptionChart = Chartist.Bar('#emailsSubscriptionChart', dataEmailsSubscriptionChart, optionsEmailsSubscriptionChart, responsiveOptions);

        //start animation for the Emails Subscription Chart
        md.startAnimationForBarChart(emailsSubscriptionChart);

    },

    updateDocumentationCharts: function() {

        /* ----------==========     Daily Sales Chart initialization    ==========---------- */

        dataDailySalesChart = {
            labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
            series: [
                [602,  652,792, 740, 630, 719, 655], [500,  692,732, 750, 670, 619, 755]
            ]
        };

        optionsDailySalesChart = {
            lineSmooth: Chartist.Interpolation.cardinal({
                tension: 0
            }),
            low: 400,
            high: 900, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
            chartPadding: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            },
        }

        var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

        md.startAnimationForLineChart(dailySalesChart);



        /* ----------==========     Completed Tasks Chart initialization    ==========---------- */

        dataCompletedTasksChart = {
            labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
            series: [
                [30, 10, 40, 30, 20,10,  5], [10, 20, 30, 30, 25,8,  14],
            ]
        };

        optionsCompletedTasksChart = {
            lineSmooth: Chartist.Interpolation.cardinal({
                tension: 0
            }),
            low: 0,
            high: 100, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
            chartPadding: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            }
        }

        var completedTasksChart = new Chartist.Line('#completedTasksChart', dataCompletedTasksChart, optionsCompletedTasksChart);

        // start animation for the Completed Tasks Chart - Line Chart
        md.startAnimationForLineChart(completedTasksChart);


        /* ----------==========     Emails Subscription Chart initialization    ==========---------- */

        var dataEmailsSubscriptionChart = {
            labels:['BWN', 'CPH', 'DAC', 'DUS', 'FRA', 'HKG', 'MEL', 'MUC', 'PER', 'SYD', 'WSSS'],
            series: [
                [542, 443, 320, 300, 553, 653, 326, 434, 568, 610,900],  [542, 413, 280, 390, 543, 693, 316, 494, 528, 510,980]

            ]
        };
        var optionsEmailsSubscriptionChart = {
            axisX: {
                showGrid: false
            },
            low: 0,
            high: 1000,
            chartPadding: {
                top: 0,
                right: 5,
                bottom: 0,
                left: 0
            }
        };
        var responsiveOptions = [
            ['screen and (max-width: 640px)', {
                seriesBarDistance: 5,
                axisX: {
                    labelInterpolationFnc: function(value) {
                        return value[0];
                    }
                }
            }]
        ];
        var emailsSubscriptionChart = Chartist.Bar('#emailsSubscriptionChart', dataEmailsSubscriptionChart, optionsEmailsSubscriptionChart, responsiveOptions);

        //start animation for the Emails Subscription Chart
        md.startAnimationForBarChart(emailsSubscriptionChart);

    },



    showNotification: function(message,from,align ) {
        color = Math.floor((Math.random() * 4) + 1);

        $.notify({
            icon: "notifications",
            message: message

        }, {
            type: type[color],
            timer: 2000,
            placement: {
                from: from,
                align: align
            }
        });
    }



}


function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}



$(document).ready( function(){

    $(".sortable th").on("click",function(){

        addPending(pending,$(this).attr("id"));

    })

    function addPending(data,sorter){
        $("th").removeClass("active");
        $("#"+sorter).addClass("active");
       data.sort(dynamicSort(sorter));
        var table=""
        for (var i in data){
            val = data[i];
            val["bor"]="0x..."+val["borrower"].substring(10,15)
            val["color"]=val["color"] || (Math.random()<0.25? "background:#cdedce85;":Math.random()<0.25?"background:#ffdad7;":"-")


            table+="<tr id='"+val["bor"]+"' style='"+val["color"]+"'><td>"+val["bor"]+"</td>"+"<td>"+val["eth"]+"</td>"
            +"<td>"+val["period"]+"</td>"+"<td>"+val["interest"]+"</td>"+"<td>"+val["currency"]+"</td>"
            +"<td>"+val["symbol"]+"</td></tr>"



        }
        $(".pending").html(table)

    }

    function addRequest(data){

        var table=""
        for (var i in data){
            val = data[i];

            val["bor"]=val["status"]?val["bor"]:(Math.random()>0)?val["borrower"]:"-"
            val["bor"]=val["bor"].length>5?"0x..."+val["bor"].substring(10,15):val["bor"]
            val["status"]=val["bor"]=="-"?"Waiting":"Funded"
            table+="<tr id='"+val["bor"]+"'><td>"+val["bor"]+"</td>"+"<td>"+val["eth"]+"</td>"
            +"<td>"+val["period"]+"</td>"+"<td>"+val["interest"]+"</td>"+"<td>"+val["currency"]+"</td>"



            +"<td>"+val["symbol"]+"</td>"
                +"<td class='"+val["status"]+"'>"+val["status"]+"</td></tr>"



        }
        $(".requests").html(table)


    }

    function addFunded(data){
        var table=""
        for (var i in data){
            val = data[i];
            if (!val["status"])
                val["status"]= Math.random()>0.5?"In-Process":"Completed"
            val["bor"]="0x..."+val["borrower"].substring(10,15)
            table+="<tr id='"+val["bor"]+"'><td>"+val["bor"]+"</td>"+"<td>"+val["eth"]+"</td>"
            +"<td>"+val["period"]+"</td>"+"<td>"+val["interest"]+"</td>"+"<td>"+val["currency"]+"</td>"

            +"<td>"+val["symbol"]+"</td>"
                +"<td class='"+val["status"]+"'>"+val["status"]+"</td></tr>"
        }
        $(".funded").html(table)
    }

    $.get("/create?n=20", function(data, status){
        data=JSON.parse(data)["data"];
        addPending(data,"symbol")
        pending = data;

    });

    $.get("/create?n=1", function(data, status){
        data=JSON.parse(data)["data"];
        addRequest(data);
        requests=data;

    });

    $.get("/create?n=4", function(data, status){
        data=JSON.parse(data)["data"];
        addFunded(data)
        funded=data;

    });

    $("#qty_token").on("change",function(){

        $.get("/get_min_tokens?eth="+$("#qty_eth").val()+"&currency="+$("#qty_token").val(), function(data, status){
            data=JSON.parse(data);
            $("#qty_qty").attr("placeholder","Recommended:"+ data["factor"]*data["tokens"]+" Current:"+data["tokens"]);
///            $("#qty_qty").attr("placeholder",data["tokens"]);
             $("#qty_interest").attr("placeholder",1.05);

    });


    })

    $(".submitRequest").on("click",function(){
        requests.unshift({"bor": "-", "symbol": $("#qty_qty").val(),
        "period": $("#qty_period").val(), "currency": $("#qty_token").val(),
         "status":"waiting",
         "interest": $("#qty_interest").val(), "eth": $("#qty_eth").val()})
        addRequest(requests);

    })

    $(".pending").on("click","tr",function(){
            $('#showSmartAddress').modal('show');
            id =$(this).attr("id");
            for (var i in pending){
                index=i;
                if(pending[i]["bor"]==id){
                    for (var key in pending[i]){
                        $("#"+"req_"+key).val(pending[i][key]);
                    }
                    break;
                }

            }

    });

    $(".submitFund").on("click",function(){

        var val =pending[index];
        pending.splice(index, 1);
        addPending(pending,"symbol")
        val["status"]="In-Process"
        funded.unshift(val);
        addFunded(funded);

    })




});

var pending;
var requests;
var funded;

