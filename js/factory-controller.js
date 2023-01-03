
$(document).ready(function () {
    loadfactories(0);
    //loadCounts(0);
})

function loadfactories() {
   

    var ajaxConfig = {
        method:'GET',
        url: 'http://localhost:8080/api/factories',
        async: true
    };

    $.ajax(ajaxConfig).done(function (factories, status, jqXHR) {
        $("#tblfactories2 tbody tr").remove();
        for (var i = 0; i < factories.length; i++) {
            let eid=factories[i].id;

            // tot=tot+1;

            // if(ExamReportById[i].examResult=="PASS"){
            //     pass=pass+1;
                
            // }

            // if(ExamReportById[i].examResult=="FAIL"){
            //     fail=fail+1;
            // }

            // if(ExamReportById[i].examResult=="ABSENT"){
            //     ab=ab+1;
            // }

            // if(ExamReportById[i].examResult=="PENDING"){
            //     pen=pen+1;
            // }

                        var html = '<tr>' +
                            '<td>' + factories[i].id +'</td>' +
                            '<td>' + factories[i].name +'</td>' +
                            '<td>' + factories[i].date +'</td>' +
                            
                            //'<td><a href=\"manage-factories-report.html?id='+eid+'\"><i class="fas fa-file-alt" style="font-size:24px;color:blue"></a></i></td>'+
                            '<td><i class="fas fa-trash-alt" style="font-size:24px;color:red"></i></td>'+
                            '</tr>';
                        $("#tblfactories2 tbody").append(html);

                        // document.getElementById("pass").innerHTML=pass;
                        // document.getElementById("part").innerHTML=tot;
                        // document.getElementById("fail").innerHTML=fail;
                        // document.getElementById("totab").innerHTML=ab;
                        //document.getElementById("totpend").innerHTML=pen;
                    }
    }).fail(function (jqXHR, status, error) {
        console.log(error)
    })
};

function loadCounts(id) {
   
    //alert("rrrrrrrrrrrrrrr");

    var ajaxConfig3 = {
        method:'GET',
        url: 'http://localhost:8080/api/factories/counts/'+id,
        async: true
    };

    $.ajax(ajaxConfig3).done(function (factories, status, jqXHR) {

        var gam=factories.high;
        var hiri=factories.medium;
        var yak=factories.low;
        var tot=factories.tot;

        $("#gam").html(gam);
        $("#yak").html(yak);
        $("#hiri").html(hiri);
        $("#tot").html(tot);

        drawChart();
        drawPieChart()

    }).fail(function (jqXHR, status, error) {
        console.log(error)
    })
};
$("#btnSave").click(function () {

    var id = $("#id").val();
    var name = $("#name").val();
    var date = $("#doe").val();
   

    if(($("#btnSave").text().localeCompare("Update"))==0){
        update();
        //window.location.reload();
        return;
    }

   
    var factory={
        id : id,
        name: name,
        date: date
        
    }
   

    var ajaxConfig = {
        method:'POST',
        url: 'http://localhost:8080/api/factories',
        async: true,
        contentType: 'application/json',
        data:JSON.stringify(factory)
    };

    $.ajax(ajaxConfig).done(function (response, status, jqXHR) {
        var html = '<tr>' +
                        '<td>' + factory.id +'</td>' +
                        '<td>' + factory.name +'</td>' +
                        '<td>' + factory.date +'</td>' +
                        
                        '<td><i class="fas fa-trash-alt"></i></td>'+
                        '</tr>';
                    $("#tblfactories2 tbody").append(html);
                    $("#name, #doe, #id").val("");
                    if(response){
                        myReload();
                    }
                    $("#name").focus();
    }).fail(function (jqXHR, status, error) {
        console.log(error)
    })

});


$("#tblfactories2").delegate("tr","click", function () {

    var id = $(this).children("td").first().text();
    var name = $(this).children("td:nth-child(2)").first().text();
    var doe = $(this).children("td:nth-child(3)").first().text();
   

    $("#id").val(id);
    $("#name").val(name).focus();
    $("#doe").val(doe);

    loadCounts(id);
    
});

async function update() {

    var id = $("#id").val();
    var name = $("#name").val();
    var date = $("#doe").val();
   

    var factory={
        id : id,
        name: name,
        date: date
        
        
    }

    var ajaxConfig = {
        method:'PUT',
        url: 'http://localhost:8080/api/factories/'+id,
        async: true,
        contentType: 'application/json',
        data:JSON.stringify(factory)
    };

    
    $.ajax(ajaxConfig).done(function (response, status, jqXHR) {
    
        $("#id").val("");
        $("#name").val("").focus();
        $("#doe").val("");
     
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
            url: 'http://localhost:8080/api/factories/'+row.find("td:first-child").text(),
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

function myReload() {
    window.location.reload();
  }
