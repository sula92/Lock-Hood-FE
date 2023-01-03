
$(document).ready(function () {
    loadexams(0)
})

function loadexams() {

    const urlParams = new URLSearchParams(window.location.search);
    const param = urlParams.get('id');
    //alert(param);
   
    var tot=0;
    var pass=0;
    var fail=0;
    var ab=0;
    var pen=0;

    var ajaxConfig = {
        method:'GET',
        url: 'http://localhost:8080/api/exams/report/'+param,
        async: true
    };

    var ajaxConfig2 = {
        method:'GET',
        url: 'http://localhost:8080/api/results/exam/'+param,
        async: true
    };

    $.ajax(ajaxConfig).done(function (ExamReportById, status, jqXHR) {
        
        for (var i = 0; i < ExamReportById.length; i++) {

            tot=tot+1;

            if(ExamReportById[i].examResult=="PASS"){
                pass=pass+1;
                
            }

            if(ExamReportById[i].examResult=="FAIL"){
                fail=fail+1;
            }

            if(ExamReportById[i].examResult=="ABSENT"){
                ab=ab+1;
            }

            if(ExamReportById[i].examResult=="PENDING"){
                pen=pen+1;
            }
                        var html = '<tr>' +
                            '<td>' + ExamReportById[i].studentId +'</td>' +
                            '<td>' + ExamReportById[i].name +'</td>' +
                            '<td>' + ExamReportById[i].licenceType +'</td>' +
                            '<td>' + ExamReportById[i].age +'</td>' +
                            '<td>' + ExamReportById[i].examResult +'</td>' +
                            //'<td>PASS</td>'+
                            '<td><i class="fas fa-file-alt" style="font-size:24px;color:blue"></i></td>'+
                            '</tr>';
                        $("#tblexams2 tbody").append(html);
        }

        document.getElementById("totpass").innerHTML=pass;
        document.getElementById("totpart").innerHTML=tot;
        document.getElementById("fail").innerHTML=fail;
        document.getElementById("totab").innerHTML=ab;
        document.getElementById("totpend").innerHTML=pen;
       

    }).fail(function (jqXHR, status, error) {
        console.log(error)
    });

    // $.ajax(ajaxConfig2).done(function (ExamReportById, status, jqXHR) {
    //     alert("xxxxxxxxxxxxxxxxxxxxxxxx");
    //     //$("#totPart").html().append("xxxxxxx");
    //     alert(ExamReportById[i].studentId)
    //     $("#totPass").val(ExamReportById[i].studentId);
    //     $("#totFail").append(ExamReportById[i].totalParticipants);
    //     $("#totAb").append(ExamReportById[i].totalParticipants);
    //     for (var i = 0; i < ExamReportById.length; i++) {
    //                     var html = '<tr>' +
    //                         '<td>' + ExamReportById[i].studentId +'</td>' +
    //                         '<td>' + ExamReportById[i].name +'</td>' +
    //                         '<td>' + ExamReportById[i].licenceType +'</td>' +
    //                         '<td>' + ExamReportById[i].age +'</td>' +
    //                         '<td>' + ExamReportById[i].examResult +'</td>' +
    //                         //'<td>PASS</td>'+
    //                         '<td><i class="fas fa-file-alt" style="font-size:24px;color:blue"></i></td>'+
    //                         '</tr>';
    //                     $("#tblexams2 tbody").append(html);
    //                 }
    // }).fail(function (jqXHR, status, error) {
    //     console.log(error)
    // })
};


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
