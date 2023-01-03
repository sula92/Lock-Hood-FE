
$(document).ready(function () {
    loadexams(0);
    loadCounts(0);
})

function loadexams() {
   

    var ajaxConfig = {
        method:'GET',
        url: 'http://localhost:8080/api/exams',
        async: true
    };

    $.ajax(ajaxConfig).done(function (exams, status, jqXHR) {
        $("#tblexams2 tbody tr").remove();
        for (var i = 0; i < exams.length; i++) {
            let eid=exams[i].id;

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
                            '<td>' + exams[i].id +'</td>' +
                            '<td>' + exams[i].date +'</td>' +
                            '<td>' + exams[i].time +'</td>' +
                            '<td>' + exams[i].venue +'</td>' +
                            '<td><a href=\"manage-trial-report.html?id='+eid+'\"><i class="fas fa-file-alt" style="font-size:24px;color:blue"></a></i></td>'+
                            '<td><i class="fas fa-trash-alt" style="font-size:24px;color:red"></i></td>'+
                            '</tr>';
                        $("#tblexams2 tbody").append(html);

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

function loadCounts() {
   
    //alert("rrrrrrrrrrrrrrr");

    var ajaxConfig3 = {
        method:'GET',
        url: 'http://localhost:8080/api/exams/report/'+param,
        async: true
    };

    $.ajax(ajaxConfig3).done(function (exams, status, jqXHR) {
      // alert("xxxxxxxxxxxxxxxxx");
        
    }).fail(function (jqXHR, status, error) {
        console.log(error)
    })
};
$("#btnSave").click(function () {

    var id = $("#id").val();
    var date = $("#date").val();
    var time = $("#time").val()+':00';
    var venue = $("#venue").val();

    alert(time);

    if(($("#btnSave").text().localeCompare("Update"))==0){
        updateexam();
        return;
    }

   

    var exam = {
        "id": id,
        "date": date,
        "time": time,
        "venue": venue
    };
   

    var ajaxConfig = {
        method:'POST',
        url: 'http://localhost:8080/api/exams',
        async: true,
        contentType: 'application/json',
        data:JSON.stringify(exam)
    };

    $.ajax(ajaxConfig).done(function (response, status, jqXHR) {
        var html = '<tr>' +
                        '<td>' + exam.id +'</td>' +
                        '<td>' + exam.date +'</td>' +
                        '<td>' + exam.time +'</td>' +
                        '<td><i class="fas fa-trash-alt"></i></td>'+
                        '</tr>';
                    $("#tblexams2 tbody").append(html);
                    $("#examId, #examName, #examAddress").val("");
                    $("#examId").focus();
    }).fail(function (jqXHR, status, error) {
        console.log(error)
    })

});


$("#tblexams2").delegate("tr","click", function () {
    var id = $(this).children("td").first().text();
    var date = $(this).children("td:nth-child(2)").first().text();
    var time = $(this).children("td:nth-child(3)").first().text();
    var venue = $(this).children("td:nth-child(4)").first().text();

    $("#id").val(id).focus();
    $("#date").val(date);
    $("#time").val(time);
    $("#venue").val(venue);
    $("#btnSave").text("Update")
});

function updateexam() {
    var id = $("#id").val();
    var date = $("#date").val();
    var time = $("#time").val();
    var venue = $("#venue").val();

    var exam={
        id : id,
        name: date,
        address: time,
        venue: venue
    }
    var ajaxConfig = {
        method:'PUT',
        url: 'http://localhost:8080/api/exams',
        async: true,
        contentType: 'application/json',
        data:JSON.stringify(exam)
    };

    $.ajax(ajaxConfig).done(function (response, status, jqXHR) {
        $("#id").val("").focus();
        $("#date").val("");
        $("#time").val("");
        $("#venue").val("");
        $("#btnSave").text("Save");
        loadexams()
    }).fail(function (jqXHR, status, error) {
        console.log(error)
    })
}


$("#tblexams2").on("click", "tbody tr td:last-child i",function () {
    if(confirm("Are sure you want to delete this exam ?")){
        var row = $(this).parents("tr");

        //alert('http://localhost:8080/api/exams?id='+row.find("td:first-child").text());

        var ajaxConfig = {
            method:'DELETE',
            url: 'http://localhost:8080/api/exams?id='+row.find("td:first-child").text(),
            async: true
        };

        $.ajax(ajaxConfig).done(function (response, status, jqXHR) {
           row.fadeOut(1000, function () {
               row.remove();
           });
           loadexams();
        }).fail(function (jqXHR, status, error) {
            alert("Fail")
        })

        // $.ajax({
        //     url: 'http://localhost:8080/api/exams?id='+row.find("td:first-child").text(),
        //     type: 'DELETE',
        //     success: function (result) {
        //         alert('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
        //     }
        // });
    }   
});

// $("#tblexams2").on("click", "tbody tr td:eq(4)",function () {

    
   
//         var row = $(this).parents("tr");
//         alert('manage-exams-report.html?id='+row.find("td:first-child").text());
//         window.location.href = 'manage-exams-report.html?id='+row.find("td:first-child").text();

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
        loadexams(0);
    });

    $(".card-footer .pagination .page-item:last-child").click(function () {
        loadexams(totalPages - 1);
    });

    $(".card-footer .pagination .page-item").click(function () {
        var number = parseInt($(this).find("a").text());
        if(number){
            loadexams( number -1);
        }
    })

}
//
