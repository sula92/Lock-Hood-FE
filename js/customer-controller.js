
$(document).ready(function () {
    loadCustomers(0)
})

function loadCustomers() {
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
        url: 'http://localhost:8080/pos/api/v1/customers',
        async: true
    };

    $.ajax(ajaxConfig).done(function (customers, status, jqXHR) {
        $("#tblCustomers2 tbody tr").remove();
        for (var i = 0; i < customers.length; i++) {
                        var html = '<tr>' +
                            '<td>' + customers[i].id +'</td>' +
                            '<td>' + customers[i].name +'</td>' +
                            '<td>' + customers[i].address +'</td>' +
                            '<td><i class="fas fa-trash-alt"></i></td>'+
                            '</tr>';
                        $("#tblCustomers2 tbody").append(html);
                    }
    }).fail(function (jqXHR, status, error) {
        console.log(error)
    })
};
$("#btnSave").click(function () {

    if(($("#btnSave").text().localeCompare("Update"))==0){
        updateCustomer();
        return;
    }

    var customer = {
        id:$("#customerId").val(),
        name:$("#customerName").val(),
        address:$("#customerAddress").val()
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
        url: 'http://localhost:8080/pos/api/v1/customers',
        async: true,
        contentType: 'application/json',
        data:JSON.stringify(customer)
    };

    $.ajax(ajaxConfig).done(function (response, status, jqXHR) {
        var html = '<tr>' +
                        '<td>' + customer.id +'</td>' +
                        '<td>' + customer.name +'</td>' +
                        '<td>' + customer.address +'</td>' +
                        '<td><i class="fas fa-trash-alt"></i></td>'+
                        '</tr>';
                    $("#tblCustomers2 tbody").append(html);
                    $("#customerId, #customerName, #customerAddress").val("");
                    $("#customerId").focus();
    }).fail(function (jqXHR, status, error) {
        console.log(error)
    })

});


$("#tblCustomers2").delegate("tr","click", function () {
    var id = $(this).children("td").first().text();
    var name = $(this).children("td:nth-child(2)").first().text();
    var address = $(this).children("td:nth-child(3)").first().text();

    $("#customerId").val(id).focus();
    $("#customerName").val(name);
    $("#customerAddress").val(address);
    $("#btnSave").text("Update")
});

function updateCustomer() {
    var id = $("#customerId").val();
    var name = $("#customerName").val();
    var address = $("#customerAddress").val();

    var customer={
        id : id,
        name: name,
        address: address
    }
    var ajaxConfig = {
        method:'PUT',
        url: 'http://localhost:8080/pos/api/v1/customers',
        async: true,
        contentType: 'application/json',
        data:JSON.stringify(customer)
    };

    $.ajax(ajaxConfig).done(function (response, status, jqXHR) {
        $("#customerId").val("").focus();
        $("#customerName").val("");
        $("#customerAddress").val("");
        $("#btnSave").text("Save");
        loadCustomers()
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

$("#tblCustomers2").on("click", "tbody tr td:last-child i",function () {
    if(confirm("Are you want to delete this Customer ?")){
        var row = $(this).parents("tr");
        var ajaxConfig = {
            method:'DELETE',
            url: 'http://localhost:8080/pos/api/v1/customers?id='+row.find("td:first-child").text(),
            async: true
        };

        $.ajax(ajaxConfig).done(function (response, status, jqXHR) {
           row.fadeOut(1000, function () {
               row.remove();
           });
           loadCustomers();
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
        loadCustomers(0);
    });

    $(".card-footer .pagination .page-item:last-child").click(function () {
        loadCustomers(totalPages - 1);
    });

    $(".card-footer .pagination .page-item").click(function () {
        var number = parseInt($(this).find("a").text());
        if(number){
            loadCustomers( number -1);
        }
    })

}
//
