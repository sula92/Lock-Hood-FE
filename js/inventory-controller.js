
$(document).ready(function () {
    loadinventories(0);
    //loadCounts(0);
})

function loadinventories() {
   

    var ajaxConfig = {
        method:'GET',
        url: 'http://localhost:8080/api/inventories',
        async: true
    };

    $.ajax(ajaxConfig).done(function (inventories, status, jqXHR) {
        $("#tbl tbody tr").remove();
        for (var i = 0; i < inventories.length; i++) {
            
                        var html = '<tr>' +
                            '<td>' + inventories[i].stockId +'</td>' +
                            '<td>' + inventories[i].rowMaterialId +'</td>' +
                            
                            '<td>' + inventories[i].name +'</td>' +
                            '<td>' + inventories[i].avilableQuantity +'</td>' +
                            '<td>' + inventories[i].unitValue +'</td>' +
                            
                            //'<td><a href=\"manage-inventories-report.html?id='+eid+'\"><i class="fas fa-file-alt" style="font-size:24px;color:blue"></a></i></td>'+
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
   
    //alert("rrrrrrrrrrrrrrr");

    var ajaxConfig3 = {
        method:'GET',
        url: 'http://localhost:8080/api/inventories/counts/'+id,
        async: true
    };

    $.ajax(ajaxConfig3).done(function (inventories, status, jqXHR) {

        var gam=inventories.high;
        var hiri=inventories.medium;
        var yak=inventories.low;
        var tot=inventories.tot;

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

    var sid = $("#sid").val();
    var rid = $("#rid").val();
    var name = $("#nam").val();
    var ava = $("#ava").val();
    var uni = $("#uni").val();
   

    if(($("#btnSave").text().localeCompare("Update"))==0){
        update();
        return;
    }

   
    var inventory={
        stockId : sid,
        rowMaterialId : rid,
        name: name,
        avilableQuantity: ava,
        unitValue: uni
        
    }
   

    var ajaxConfig = {
        method:'POST',
        url: 'http://localhost:8080/api/inventories',
        async: true,
        contentType: 'application/json',
        data:JSON.stringify(inventory)
    };

    $.ajax(ajaxConfig).done(function (response, status, jqXHR) {
        var html = '<tr>' +
                        '<td>' + inventory.stockId +'</td>' +
                        '<td>' + inventory.rowMaterialId +'</td>' +
                        '<td>' + inventory.name +'</td>' +
                        '<td>' + inventory.avilableQuantity +'</td>' +
                        '<td>' + inventory.unitValue +'</td>' +
                        
                        '<td><i class="fas fa-trash-alt"></i></td>'+
                        '</tr>';
                    $("#tbl tbody").append(html);
                    $("#name, #doe, #id").val("");
                    if(response){
                        myReload();
                    }
                    $("#name").focus();
    }).fail(function (jqXHR, status, error) {
        console.log(error)
    })

});


$("#tbl").delegate("tr","click", function () {

    var sid = $(this).children("td").first().text();
    var rid = $(this).children("td:nth-child(2)").first().text();
    var name = $(this).children("td:nth-child(3)").first().text();
    var ava = $(this).children("td:nth-child(4)").first().text();
    var uni = $(this).children("td:nth-child(5)").first().text();
   

    $("#sid").val(sid);
    $("#rid").val(rid);
    $("#nam").val(name).focus();
    $("#ava").val(ava);
    $("#uni").val(uni);

    loadCounts(id);
    
});

async function update() {

    
    var id = $("#id").val();
    var name = $("#nam").val();
    var ava = $("#ava").val();
    var uni = $("#uni").val();

    var inventory={
        rowMaterialId : id,
        name: name,
        avilableQuantity: ava,
        unitValue: uni
        
    }

    var ajaxConfig = {
        method:'PUT',
        url: 'http://localhost:8080/api/inventories/'+id,
        async: true,
        contentType: 'application/json',
        data:JSON.stringify(inventory)
    };

    
    $.ajax(ajaxConfig).done(function (response, status, jqXHR) {
    
        $("#id").val("");
        $("#name").val("").focus();
        $("#ava").val("");
        $("#uni").val("");
     
        $("#btnSave").text("Save");
        
        if(response){
            myReload();
        }
     
        
    }).fail(function (jqXHR, status, error) {
        console.log(error)
    })
    
}


$("#tbl").on("click", "tbody tr td:last-child i",function () {
    if(confirm("Are sure you want to delete this inventory ?")){
        var row = $(this).parents("tr");

        //alert('http://localhost:8080/api/inventories?id='+row.find("td:first-child").text());

        var ajaxConfig = {
            method:'DELETE',
            url: 'http://localhost:8080/api/inventories/'+row.find("td:first-child").text(),
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
        //     url: 'http://localhost:8080/api/inventories?id='+row.find("td:first-child").text(),
        //     type: 'DELETE',
        //     success: function (result) {
        //         alert('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
        //     }
        // });
    }   
});

// $("#tbl").on("click", "tbody tr td:eq(4)",function () {

    
   
//         var row = $(this).parents("tr");
//         alert('manage-inventories-report.html?id='+row.find("td:first-child").text());
//         window.location.href = 'manage-inventories-report.html?id='+row.find("td:first-child").text();

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
        loadinventories(0);
    });

    $(".card-footer .pagination .page-item:last-child").click(function () {
        loadinventories(totalPages - 1);
    });

    $(".card-footer .pagination .page-item").click(function () {
        var number = parseInt($(this).find("a").text());
        if(number){
            loadinventories( number -1);
        }
    }) 

}
//

function myReload() {
    window.location.reload();
  }
