
$(document).ready(function () {
    loadfactories(0);
    //loadCounts(0);
})

function loadfactories() {
   

    var ajaxConfig = {
        method:'GET',
        url: 'http://localhost:8080/api/incomes',
        async: true
    };

    $.ajax(ajaxConfig).done(function (factories, status, jqXHR) {
        $("#tbl tbody tr").remove();
        for (var i = 0; i < factories.length; i++) {

           
                        var html = '<tr>' +
                            '<td>' + factories[i].id +'</td>' +
                            '<td>' + factories[i].incomeType +'</td>' +
                            '<td>' + factories[i].description +'</td>' +
                            '<td>' + factories[i].amount +'</td>' +
                            '<td>' + factories[i].date +'</td>' +
                            
                            //'<td><a href=\"manage-factories-report.html?id='+eid+'\"><i class="fas fa-file-alt" style="font-size:24px;color:blue"></a></i></td>'+
                            '<td><i class="fas fa-trash-alt" style="font-size:24px;color:red"></i></td>'+
                            '</tr>';
                        $("#tbl tbody").append(html);

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
    var type = $("#typ").val();
    var dis= $("#dis").val();
    var amo = $("#amo").val();
    var dat= $("#dat").val();
   

    if(($("#btnSave").text().localeCompare("Update"))==0){
        update();
        return;
    }

   
    var income={
        id : id,
        incomeType: type,
        description: dis,
        amount: amo,
        date: dat
        
    }
   

    var ajaxConfig = {
        method:'POST',
        url: 'http://localhost:8080/api/incomes',
        async: true,
        contentType: 'application/json',
        data:JSON.stringify(income)
    };

    $.ajax(ajaxConfig).done(function (response, status, jqXHR) {
        var html = '<tr>' +
                        '<td>' + income.id +'</td>' +
                        '<td>' + income.incomeType +'</td>' +
                        '<td>' + income.description +'</td>' +
                        '<td>' + income.amount +'</td>' +
                        '<td>' + income.date +'</td>' +
                        
                        '<td><i class="fas fa-trash-alt"></i></td>'+
                        '</tr>';
                    $("#tblfactories2 tbody").append(html);
                    $("#amo, #dat, #id", "#dis", "#typ").val("");
                    if(response){
                        myReload();
                    }
                    $("#typ").focus();
    }).fail(function (jqXHR, status, error) {
        console.log(error)
    })

});


$("#tbl").delegate("tr","click", function () {

    $("#btnSave").text("Update");

    var id = $(this).children("td").first().text();
    var typ = $(this).children("td:nth-child(2)").first().text();
    var dis = $(this).children("td:nth-child(3)").first().text();
    var amo = $(this).children("td:nth-child(4)").first().text();
    var dat = $(this).children("td:nth-child(5)").first().text();
   

    $("#id").val(id);
    $("#typ").val(typ).focus();
    $("#dat").val(dat);
    $("#dis").val(dis);
    $("#amo").val(amo);

    loadCounts(id);
    
});

async function update() {

    var id = $("#id").val();
    var type = $("#typ").val();
    var dis= $("#dis").val();
    var amo = $("#amo").val();
    var dat= $("#dat").val();
   

    var income={
        id : id,
        incomeType: type,
        description: dis,
        amount: amo,
        date: dat
        
    }

    var ajaxConfig = {
        method:'PUT',
        url: 'http://localhost:8080/api/incomes/'+id,
        async: true,
        contentType: 'application/json',
        data:JSON.stringify(income)
    };

    
    $.ajax(ajaxConfig).done(function (response, status, jqXHR) {
    
        $("#id").val("");
        $("#typ").val("").focus();
        $("#dat").val("");
        $("#dis").val("");
        $("#amo").val("");
     
        $("#btnSave").text("Save");
        
        if(response){
            myReload();
        }
     
        
    }).fail(function (jqXHR, status, error) {
        console.log(error)
    })
    
}


$("#tbl").on("click", "tbody tr td:last-child i",function () {
    if(confirm("Are sure you want to delete this Record ?")){

        //$("#btnSave").text("Update");

        var row = $(this).parents("tr");
;

        var ajaxConfig = {
            method:'DELETE',
            url: 'http://localhost:8080/api/incomes/'+row.find("td:first-child").text(),
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

  $("#btnNew").click(function () {

    $("#id").val("");
    $("#amo").val("");
    $("#dis").val("");
    $("#typ").val("");
    $("#dat").val("");
   

    $("#btnSave").text("Submit");
});