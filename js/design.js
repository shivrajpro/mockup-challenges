$(document).ready(function () {
    $(".my-dropdown").mouseover(function (e) {
        if($(e.target).parents('.my-dropdown').length > 0) {
            $("#wantBtn").addClass("active");
            $("#menu").addClass("open");
        }
        
    })
    
    $(".my-dropdown").mouseout(function (e) {
        // myLog(e.target);
        // myLog("parents",$(e.target).parents('.my-dropdown'));
        if($(e.target).parents('.my-dropdown').length > 0) {
            $("#wantBtn").removeClass("active");
            $("#menu").removeClass("open");
        }
    })

    function myLog(p1, p2=""){
        console.log(">>", p1, p2);
    }
});