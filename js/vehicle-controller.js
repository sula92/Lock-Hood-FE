
$(document).ready(function () {
    loadData(0);
    loadCounts(0);
})

function loadData() {
   

    var ajaxConfig = {
        method:'GET',
        url: 'http://localhost:8080/api/vehicles',
        async: true
    };

    $.ajax(ajaxConfig).done(function (vehicles, status, jqXHR) {
    
        $("#tblvehicles2 tbody tr").remove();
        for (var i = 0; i < vehicles.length; i++) {

                        var html = '<tr>' +
                            '<td>' + vehicles[i].id +'</td>' +
                            '<td>' + vehicles[i].number +'</td>' +
                            '<td>' + vehicles[i].typeAndModel +'</td>' +
                            '<td>' + vehicles[i].branch.name +'</td>' +
                            '<td>' + vehicles[i].supplier.name +'</td>' +
                            //'<td><a href=\"manage-vehicles-report.html?id='+eid+'\"><i class="fas fa-file-alt" style="font-size:24px;color:blue"></a></i></td>'+
                            '<td><i class="fas fa-trash-alt" style="font-size:24px;color:red"></i></td>'+
                            '</tr>';
                        $("#tblvehicles2 tbody").append(html);
                    }
    }).fail(function (jqXHR, status, error) {
        console.log(error)
    })
};

function loadCounts() {
   
   
    var ajaxConfig3 = {
        method:'GET',
        url: 'http://localhost:8080/api/vehicles/counts',
        async: true
    };

    $.ajax(ajaxConfig3).done(function (vehicles, status, jqXHR) {

        var gam=vehicles.gampaha;
        var yak=vehicles.yakkala;
        var hiri=vehicles.hiripitiya;

        $("#gam").html(gam);
        $("#yak").html(yak);
        $("#hiri").html(hiri);

        $("#tot").html(Number(hiri)+Number(gam)+Number(yak));

        var gamPer=Number(gam)/(Number(hiri)+Number(gam)+Number(yak)*100+'%');
        var yakmPer=Number(yak)/(Number(hiri)+Number(gam)+Number(yak)*100+'%');
        var hiriPer=Number(hiri)/(Number(hiri)+Number(gam)+Number(yak)*100+'%');

        $("#gamPer").html(gamPer);
        $("#yakPer").html(yakmPer);
        $("#hiriPer").html(hiriPer);
      
        
    }).fail(function (jqXHR, status, error) {
        console.log(error)
    })
};
$("#btnSave").click(function () {

    var id = $("#id").val();
    var number = $("#number").val();
    var typemodel = $("#t&m").val();
    var branch = $("#branch").val();
    var supplier = $("#supplier").val();

    if(($("#btnSave").text().localeCompare("Update"))==0){
        update();
        //window.location.reload();
        return;
    }

   
    var vehicle={
        id : id,
        number: number,
        typeAndModel: typemodel,
        branchId: branch,
        supplierId: supplier,
        
    }
   

    var ajaxConfig = {
        method:'POST',
        url: 'http://localhost:8080/api/vehicles',
        async: true,
        contentType: 'application/json',
        data:JSON.stringify(vehicle)
    };

    $.ajax(ajaxConfig).done(function (response, status, jqXHR) {
        var html = '<tr>' +
                        '<td>' + vehicle.id +'</td>' +
                        '<td>' + vehicle.number +'</td>' +
                        '<td>' + vehicle.typeAndModel +'</td>' +
                        '<td>' + vehicle.branchId +'</td>' +
                        '<td>' + vehicle.supplierId +'</td>' +
                        '<td><i class="fas fa-trash-alt"></i></td>'+
                        '</tr>';
                    $("#tblvehicles2 tbody").append(html);
                    $("#number, #tm, #branch, #supplier, #contact, #id").val("");
                    if(response){
                        myReload();
                    }
                    $("#name").focus();
    }).fail(function (jqXHR, status, error) {
        console.log(error)
    })

});


$("#tblvehicles2").delegate("tr","click", function () {

    $("#btnSave").text("Update");

    var x = $(this).children("td").first().text();
    var y = $(this).children("td:nth-child(2)").first().text();
    var z = $(this).children("td:nth-child(3)").first().text();
    var p = $(this).children("td:nth-child(4)").first().text();
    var q = $(this).children("td:nth-child(5)").first().text();
   

    $("#id").val(x);
    $("#number").val(y).focus();
    $("#tm").val(z);
    $("#branch").val(p);
    $("#supplier").val(q);
});

async function update() {

    var id = $("#id").val();
    var number = $("#number").val();
    var tm = $("#tm").val();
    var bra = $("#branch").val();
    var sup = $("#supplier").val();
    

    var branch={
        id : id,
        number: number,
        typeAndModel: tm,
        branchId: bra,
        supplierId: sup
        
    }

    var ajaxConfig = {
        method:'PUT',
        url: 'http://localhost:8080/api/vehicles/'+id,
        async: true,
        contentType: 'application/json',
        data:JSON.stringify(branch)
    };

    
    $.ajax(ajaxConfig).done(function (response, status, jqXHR) {
    
        $("#id").val("");
        $("#name").val("").focus();
        $("#doe").val("");
        $("#email").val("");
        $("#contact").val("");
        $("#add").val("");
        $("#btnSave").text("Save");
        
        if(response){
            myReload();
        }
     
        
    }).fail(function (jqXHR, status, error) {
        console.log(error)
    })
    
}


$("#table1").on("click", "tbody tr td:last-child i",function () {
    if(confirm("Are sure you want to delete this Branch ?")){
        var row = $(this).parents("tr");

        //alert('http://localhost:8080/api/vehicles?id='+row.find("td:first-child").text());

        var ajaxConfig = {
            method:'DELETE',
            url: 'http://localhost:8080/api/vehicles/'+row.find("td:first-child").text(),
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
        //     url: 'http://localhost:8080/api/vehicles?id='+row.find("td:first-child").text(),
        //     type: 'DELETE',
        //     success: function (result) {
        //         alert('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
        //     }
        // });
    }   
});

// $("#tblvehicles2").on("click", "tbody tr td:eq(4)",function () {

    
   
//         var row = $(this).parents("tr");
//         alert('manage-vehicles-report.html?id='+row.find("td:first-child").text());
//         window.location.href = 'manage-vehicles-report.html?id='+row.find("td:first-child").text();

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
        loadveData(0);
    });

    $(".card-footer .pagination .page-item:last-child").click(function () {
        loadveData(totalPages - 1);
    });

    $(".card-footer .pagination .page-item").click(function () {
        var number = parseInt($(this).find("a").text());
        if(number){
            loadveData( number -1);
        }
    }) 

}
//

function myReload() {
    window.location.reload();
  }
