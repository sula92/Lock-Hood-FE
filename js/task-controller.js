
$(document).ready(function () {
    load(0);
    loadCounts(0);
})

function load() {
   

    var ajaxConfig = {
        method:'GET',
        url: 'http://localhost:8080/api/tasks',
        async: true
    };

    $.ajax(ajaxConfig).done(function (resp, status, jqXHR) {
        $("#tblfactories2 tbody tr").remove();
        for (var i = 0; i < resp.length; i++) {
           

                        var html = '<tr>' +
                            '<td>' + resp[i].id +'</td>' +
                            '<td>' + resp[i].description +'</td>' +
                            '<td>' + resp[i].completion +'</td>' +
                            '<td>' + resp[i].startingDate +'</td>' +
                            '<td>' + resp[i].finalDate +'</td>' +
                            '<td>' + resp[i].priority +'</td>' +
                            '<td>' + resp[i].employees.id+"-"+resp[i].employees.id +'</td>' +
                            
                            //'<td><a href=\"manage-factories-report.html?id='+eid+'\"><i class="fas fa-file-alt" style="font-size:24px;color:blue"></a></i></td>'+
                            '<td><i class="fas fa-trash-alt" style="font-size:24px;color:red"></i></td>'+
                            '</tr>';
                        $("#tblfactories2 tbody").append(html);

                    }
    }).fail(function (jqXHR, status, error) {
        console.log(error)
    })
};

function loadCounts() {
   
    var ajaxConfig3 = {
        method:'GET',
        url: 'http://localhost:8080/api/tasks/counts',
        async: true
    };

    $.ajax(ajaxConfig3).done(function (factories, status, jqXHR) {

        var gam=factories.high;
        var hiri=factories.medium;
        var yak=factories.low;
        var tot=factories.completed;
        var pen=factories.pending;

        $("#gam").html(gam);
        $("#yak").html(yak);
        $("#hiri").html(hiri);
        $("#tot").html(tot);
        $("#pen").html(pen);

        drawChart();
        drawPieChart(gam, hiri, yak);

    }).fail(function (jqXHR, status, error) {
        console.log(error)
    })
};
$("#btnSave").click(function () {

    alert("SSSSSSSS");
   
    var id = $("#id").val();
    var des = $("#des").val();
    var com = $("#com").val();
    var sta = $("#sta").val();
    var fin = $("#fin").val();
    var pri = $("#pri").val();
    var emp = $("#emp").val();
   

    if(($("#btnSave").text().localeCompare("Update"))==0){
        update();
        //window.location.reload();
        return;
    }

    var task={
        "id": id,
        "description": des,
        "completion": com,
        "startingDate": sta,
        "finalDate": fin,
        "priority": pri,
        "employeeId": emp
        
        
    }
   

    var ajaxConfig = {
        method:'POST',
        url: 'http://localhost:8080/api/tasks',
        async: true,
        contentType: 'application/json',
        data:JSON.stringify(task)
    };

    $.ajax(ajaxConfig).done(function (response, status, jqXHR) {
        alert("XXXXXXXXXXXx");
        var html = '<tr>' +
                        '<td>' + task.id +'</td>' +
                        '<td>' + task.description +'</td>' +
                        '<td>' + task.completion +'</td>' +
                        '<td>' + task.startingDate +'</td>' +
                        '<td>' + task.finalDate +'</td>' +
                        '<td>' + task.priority +'</td>' +
                        '<td>' + task.employees +'</td>' +
                        
                        '<td><i class="fas fa-trash-alt"></i></td>'+
                        '</tr>';
                    $("#tblfactories2 tbody").append(html);
                    $("#id, #des, #com, #fin, #sta, #pri, #emp").val("");
                    if(response){
                        alert("XXXXXXXXXXx");
                        myReload();
                    }
                    $("#des").focus();
    }).fail(function (jqXHR, status, error) {
        console.log(error);
        myReload();
    })

});


$("#tblfactories2").delegate("tr","click", function () {

    var id = $(this).children("td").first().text();
    var des = $(this).children("td:nth-child(2)").first().text();
    var com = $(this).children("td:nth-child(3)").first().text();
    var start = $(this).children("td:nth-child(4)").first().text();
    var final = $(this).children("td:nth-child(5)").first().text();
    var prio = $(this).children("td:nth-child(6)").first().text();
    var emp = $(this).children("td:nth-child(7)").first().text();
   

    $("#id").val(id);
    $("#des").val(des).focus();
    $("#com").val(com);
    $("#sta").val(start);
    $("#fin").val(final);
    $("#pri").val(prio);
    $("#emp").val(emp1);

    $("#btnSave").text("Update");

   // loadCounts(id);
    
});

async function update() {


    var id = $("#id").val();
    var des = $("#des").val();
    var com = $("#com").val();
    var sta = $("#sta").val();
    var fin = $("#fin").val();
    var pri = $("#pri").val();
    var emp = $("#emp").val();
   

    var task={
        "id": id,
        "description": des,
        "completion": com,
        "startingDate": sta,
        "finalDate": fin,
        "priority": pri,
        "employeeId": emp
        
        
    }

    var ajaxConfig = {
        method:'PUT',
        url: 'http://localhost:8080/api/tasks/'+id,
        async: true,
        contentType: 'application/json',
        data:JSON.stringify(task)
    };

    alert(ajaxConfig.url);
    
    $.ajax(ajaxConfig).done(function (response, status, jqXHR) {
    
        $("#id").val("");
    $("#des").val("");
    $("#com").val("");
    $("#sta").val("");
    $("#fin").val("");
    $("#pri").val("");
    $("#emp").val("");

     
        $("#btnSave").text("Save");
        
        if(response){
            myReload();
        }
     
        
    }).fail(function (jqXHR, status, error) {
        console.log(error)
    })
    
}


$("#tblfactories2").on("click", "tbody tr td:last-child i",function () {
    if(confirm("Are sure you want to delete this Factory ?")){
        var row = $(this).parents("tr");

        //alert('http://localhost:8080/api/factories?id='+row.find("td:first-child").text());

        var ajaxConfig = {
            method:'DELETE',
            url: 'http://localhost:8080/api/tasks/'+row.find("td:first-child").text(),
            async: true
        };

        $.ajax(ajaxConfig).done(function (response, status, jqXHR) {
           row.fadeOut(1000, function () {
               row.remove();
           });
           window.location.reload();
        }).fail(function (jqXHR, status, error) {
            alert("Fail")
        })

        // $.ajax({
        //     url: 'http://localhost:8080/api/factories?id='+row.find("td:first-child").text(),
        //     type: 'DELETE',
        //     success: function (result) {
        //         alert('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
        //     }
        // });
    }   
});

// $("#tblfactories2").on("click", "tbody tr td:eq(4)",function () {

    
   
//         var row = $(this).parents("tr");
//         alert('manage-factories-report.html?id='+row.find("td:first-child").text());
//         window.location.href = 'manage-factories-report.html?id='+row.find("td:first-child").text();

// });

function initializePagination(totalElement) {
    var totalPages = parseInt(totalElement/ 5 +(((totalElement% 5) !== 0)? 1: 0));

    $(".page-item").remove();

    var html = '<li class="page-item"><a class="page-link" href="javascript:void(0)">&laquo;</a></li>';

    for (var i=0; i<totalPages;i++){
        html+='<li class="page-item"><a class="page-link" href="#">'+ (i+1) +'</a></li>';
    }

    html +='<li class="page-item"><a class="page-link" href="javascript:void(0)">&laquo;</a></li>';

    $(".card-footer .pagination").html(html);

    $(".card-footer .pagination .page-item:first-child").click(function () {
        loadfactories(0);
    });

    $(".card-footer .pagination .page-item:last-child").click(function () {
        loadfactories(totalPages - 1);
    });

    $(".card-footer .pagination .page-item").click(function () {
        var number = parseInt($(this).find("a").text());
        if(number){
            loadfactories( number -1);
        }
    }) 

}
//

$("#btnNew").click(function () {

    $("#id").val("");
    $("#des").val("");
    $("#com").val("");
    $("#sta").val("");
    $("#fin").val("");
    $("#pri").val("");
    $("#emp").val("");

    $("#btnSave").text("Submit");
});

function myReload() {
    $("#id").val("");
    $("#des").val("");
    $("#com").val("");
    $("#sta").val("");
    $("#fin").val("");
    $("#pri").val("");
    $("#emp").val("");

    window.location.reload();
  }
