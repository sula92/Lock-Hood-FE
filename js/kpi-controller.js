
$(document).ready(function () {
    loadfactories(0);
    loadCounts()
})

function loadfactories() {
   

    var ajaxConfig = {
        method:'GET',
        url: 'http://localhost:8080/api/kpis',
        async: true
    };

    $.ajax(ajaxConfig).done(function (kpis, status, jqXHR) {
        $("#tblfactories2 tbody tr").remove();
        for (var i = 0; i < kpis.length; i++) {
        
                        var html = '<tr>' +
                            '<td>' + kpis[i].id +'</td>' +
                            '<td>' + kpis[i].efficiencyLevel +'</td>' +
                            '<td>' + kpis[i].availabilityLevel +'</td>' +
                            '<td>' + kpis[i].reliabilityLevel +'</td>' +
                            '<td>' + kpis[i].employee.id +'</td>' +
                            
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
   
    //alert("rrrrrrrrrrrrrrr");

    var ajaxConfig3 = {
        method:'GET',
        url: 'http://localhost:8080/api/kpis/counts',
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
    var eff = $("#eff").val();
    var ava = $("#ava").val();
    var rel = $("#rel").val();
    var emp = $("#emp").val();
    var fac = $("#fac").val();
   

    if(($("#btnSave").text().localeCompare("Update"))==0){
        update();
        //window.location.reload();
        return;
    }

   
    var kpi={
        "id": 1,
        "efficiencyLevel": 8,
        "availabilityLevel": 7,
        "reliabilityLevel": 7,
        "employee":emp,
        "fac":fac
        
    }
   

    var ajaxConfig = {
        method:'POST',
        url: 'http://localhost:8080/api/kpis',
        async: true,
        contentType: 'application/json',
        data:JSON.stringify(kpi)
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
    var eff = $(this).children("td:nth-child(2)").first().text();
    var ava = $(this).children("td:nth-child(4)").first().text();
    var rel = $(this).children("td:nth-child(5)").first().text();
    var emp = $(this).children("td:nth-child(6)").first().text();
    

    $("#id").val(id);
    $("#eff").val(eff).focus();
    $("#ava").val(ava);
    $("#rel").val(rel);
    $("#emp").val(emp)

    loadCounts();
    
});

async function update() {

    var id = $("#id").val();
    var eff = $("#eff").val();
    var ava = $("#ava").val();
    var rel = $("#rel").val();
    var emp = $("#emp").val();
    var fac = $("#fac").val();
   
    var kpi={
        "id": 1,
        "efficiencyLevel": 8,
        "availabilityLevel": 7,
        "reliabilityLevel": 7,
        "employee":emp,
        "fac":fac
        
    }
    var ajaxConfig = {
        method:'PUT',
        url: 'http://localhost:8080/api/kpis/'+id,
        async: true,
        contentType: 'application/json',
        data:JSON.stringify(kpi)
    };

    
    $.ajax(ajaxConfig).done(function (response, status, jqXHR) {
    
        $("#id").val("");
        $("#eff").val("").focus();
        $("#ava").val("");
        $("#rel").val("");
        $("#emp").val("");
        $("#fac").val("");
     
        $("#btnSave").text("Save");
        
        if(response){
            myReload();
        }
     
        
    }).fail(function (jqXHR, status, error) {
        console.log(error)
    })
    
}


$("#tblfactories2").on("click", "tbody tr td:last-child i",function () {
    if(confirm("Are sure you want to delete this KPI ?")){
        var row = $(this).parents("tr");

        //alert('http://localhost:8080/api/factories?id='+row.find("td:first-child").text());

        var ajaxConfig = {
            method:'DELETE',
            url: 'http://localhost:8080/api/kpis/'+row.find("td:first-child").text(),
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
