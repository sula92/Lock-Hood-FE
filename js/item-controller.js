
$(document).ready(function () {
    loadItems(0)
})

function loadItems() {
    // var http = new XMLHttpRequest();
    // http.onreadystatechange = function(){
    //     if (http.readyState == 4 && http.status == 200){
    //         var customers = JSON.parse(http.responseText);
    //         for (var i = 0; i < customers.length; i++) {
    //             var html = '<tr>' +
    //                 '<td>' + customers[i].id +'</td>' +
    //                 '<td>' + customers[i].name +'</td>' +
    //                 '<td>' + customers[i].address +'</td>' +
    //                 '<td><i class="fas fa-trash-alt"></i></td>'+
    //                 '</tr>';
    //             $("#tblCustomers2 tbody").append(html);
    //         }
    //         // initializePagination(+http.getResponseHeader("X-Count"));
    //     }
    // };
    // http.open('GET','http://localhost:8080/pos/api/v1/customers',true);
    // http.send();

    var ajaxConfig = {
        method:'GET',
        url: 'http://localhost:8080/pos/api/v1/items',
        async: true
    };

    $.ajax(ajaxConfig).done(function (items, status, jqXHR) {
        $("#tblCustomers2 tbody tr").remove();
        for (var i = 0; i < items.length; i++) {
            var html = '<tr>' +
                '<td>' + items[i].code +'</td>' +
                '<td>' + items[i].description +'</td>' +
                '<td>' + items[i].unit_price +'</td>' +
                '<td>' + items[i].qty_on_hand +'</td>' +
                '<td><i class="fas fa-trash-alt"></i></td>'+
                '</tr>';
            $("#tblItem tbody").append(html);
        }
    }).fail(function (jqXHR, status, error) {
        console.log(error)
    })
};
$("#btnSave").click(function () {

    if(($("#btnSave").text().localeCompare("Update"))==0){
        updateItem();
        return;
    }

    var item = {
        id:$("#itemId").val(),
        description:$("#itemDes").val(),
        unit_price:$("#itemUnitPrice").val(),
        qty_on_hand:$("#itemQty").val()

    };
    //
    // var http = new XMLHttpRequest();
    // http.onreadystatechange = function () {
    //     if(http.readyState == 4){
    //
    //         if(http.status == 201){
    //             var html = '<tr>' +
    //                 '<td>' + customer.id +'</td>' +
    //                 '<td>' + customer.name +'</td>' +
    //                 '<td>' + customer.address +'</td>' +
    //                 '<td><i class="fas fa-trash-alt"></i></td>'+
    //                 '</tr>';
    //             $("#tblCustomers2 tbody").append(html);
    //             $("#customerId, #customerName, #customerAddress").val("");
    //             $("#customerId").focus();
    //         }else {
    //             console.log("fail")
    //         }
    //
    //     }
    // }
    // http.open('POST','http://localhost:8080/pos/api/v1/customers',true);
    // http.setRequestHeader("Content-Type", "application/json");
    //
    // http.send(JSON.stringify(customer));

    var ajaxConfig = {
        method:'POST',
        url: 'http://localhost:8080/pos/api/v1/items',
        async: true,
        contentType: 'application/json',
        data:JSON.stringify(item)
    };

    $.ajax(ajaxConfig).done(function (response, status, jqXHR) {
        var html = '<tr>' +
            '<td>' + item.id +'</td>' +
            '<td>' + item.name +'</td>' +
            '<td>' + item.unit_price +'</td>' +
            '<td>' + item.qty_on_hand +'</td>' +
            '<td><i class="fas fa-trash-alt"></i></td>'+
            '</tr>';
        $("#tblItem tbody").append(html);
        $("#itemId, #itemDes, #itemUnitPrice, #itemQty").val("");
        $("#itemId").focus();
    }).fail(function (jqXHR, status, error) {
        console.log(error)
    })

});


$("#tblItem").delegate("tr","click", function () {
    var code = $(this).children("td").first().text();
    var des = $(this).children("td:nth-child(2)").first().text();
    var unitprice = $(this).children("td:nth-child(3)").first().text();
    var qty = $(this).children("td:nth-child(4)").first().text();

    $("#itemId").val(code).focus();
    $("#itemDes").val(des);
    $("#itemUnitPrice").val(unitprice);
    $("#itemQty").val(qty);
    $("#btnSave").text("Update")
});

function updateItem() {
    var code = $("#itemId").val();
    var des = $("#itemDes").val();
    var unitPrice = $("#itemUnitPrice").val();
    var qty = $("#itemQty").val();

    var item={
        code : code,
        description: des,
        unit_price: unitPrice,
        qty_on_hand: qty
    }
    var ajaxConfig = {
        method:'PUT',
        url: 'http://localhost:8080/pos/api/v1/items',
        async: true,
        contentType: 'application/json',
        data:JSON.stringify(item)
    };

    $.ajax(ajaxConfig).done(function (response, status, jqXHR) {
        $("#itemId").val("").focus();
        $("#itemDes").val("");
        $("#itemUnitPrice").val("");
        $("#itemQty").val("");
        $("#btnSave").text("Save");
        loadItems()
    }).fail(function (jqXHR, status, error) {
        console.log(error)
    })
}

// $(document)
//     .ready(
//         function() {
//             $(document).on("click","#btnSubmit",function(){
//                     $("#tblCustomers2").append(
//                         "<tr><td>"+$("#customerId").val()+
//                         "</td><td>"+$("#customerName").val()+
//                         "</td><td>"+$("#customerAddress").val()+"</td></tr>");
//                 }
//             )
//         });

// $("#tblCustomers2").on('click','tr',function() {
//     var id = $(this).find("td:first-child").text();
//     console.log(id);
//     $(this).toggleClass("select");
//     $.ajax({
//         url: 'http://localhost:8080/pos/api/v1/customers',
//         method: 'POST',
//         data: { id : id },
//         success: function(result) {
//             var jsondata = $.parseJSON(result);
//             $("#customerId").val(jsondata.name);
//             $("#customerName").val(jsondata.id)
//             $("#customerAddress").val(jsondata.date)
//         }
//     });
//
//
//
// });

$("#tblItem").on("click", "tbody tr td:last-child i",function () {
    if(confirm("Are you want to delete this Item ?")){
        var row = $(this).parents("tr");
        var ajaxConfig = {
            method:'DELETE',
            url: 'http://localhost:8080/pos/api/v1/items?code='+row.find("td:first-child").text(),
            async: true
        };

        $.ajax(ajaxConfig).done(function (response, status, jqXHR) {
            row.fadeOut(1000, function () {
                row.remove();
            });
            loadItems();
        }).fail(function (jqXHR, status, error) {
            alert("Fail")
        })
    }
});

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
        loadItems(0);
    });

    $(".card-footer .pagination .page-item:last-child").click(function () {
        loadItems(totalPages - 1);
    });

    $(".card-footer .pagination .page-item").click(function () {
        var number = parseInt($(this).find("a").text());
        if(number){
            loadItems( number -1);
        }
    })

}
//
