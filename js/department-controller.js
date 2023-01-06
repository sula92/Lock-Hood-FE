$(document).ready(function () {
    loadDepartments(0);
    LoadAllFactoriesTODropDown();
});

function LoadAllFactoriesTODropDown() {
  var ajaxConfig = {
    method: "GET",
    url: "http://localhost:8080/api/factories",
    async: true,
  };

  $.ajax(ajaxConfig)
    .done(function (factories, status, jqXHR) {

      // var option = document.createElement("option");
      // var factoriesDD = document.getElementById("factoryDropdown");
      $("#factoryDropdown").empty();

      for (var i = 0; i < factories.length; i++) {
        var option = document.createElement("option");
        var factoriesDD = document.getElementById("factoryDropdown");
        option.text = factories[i].name;
        option.value = factories[i].id;
        factoriesDD.appendChild(option);
      }
    })
    .fail(function (jqXHR, status, error) {
      console.log(error);
    });
}

function loadDepartments() {
  var ajaxConfig = {
    method: "GET",
    url: "http://localhost:8080/api/departments",
    async: true,
  };

  $.ajax(ajaxConfig)
    .done(function (factories, status, jqXHR) {
      $("#tblDeartments tbody tr").remove();
      for (var i = 0; i < factories.length; i++) {

        var html =
          "<tr>" +
          "<td>" +
          factories[i].id +
          "</td>" +
          "<td>" +
          factories[i].name +
          "</td>" +
          "<td>" +
          factories[i].factory.name +
          "</td>" +
          "<td>" +
          factories[i].factory.date +
          "</td>" +
          //'<td><a href=\"manage-factories-report.html?id='+eid+'\"><i class="fas fa-file-alt" style="font-size:24px;color:blue"></a></i></td>'+
          '<td><i class="fas fa-trash-alt" style="font-size:24px;color:red"></i></td>' +
          "</tr>";
        $("#tblDeartments tbody").append(html);

        // document.getElementById("pass").innerHTML=pass;
        // document.getElementById("part").innerHTML=tot;
        // document.getElementById("fail").innerHTML=fail;
        // document.getElementById("totab").innerHTML=ab;
        //document.getElementById("totpend").innerHTML=pen;
      }
    })
    .fail(function (jqXHR, status, error) {
      console.log(error);
    });
}

function loadCounts(id) {
  //alert("rrrrrrrrrrrrrrr");

  var ajaxConfig3 = {
    method: "GET",
    url: "http://localhost:8080/api/factories/counts/" + id,
    async: true,
  };

  $.ajax(ajaxConfig3)
    .done(function (factories, status, jqXHR) {
      var gam = factories.high;
      var hiri = factories.medium;
      var yak = factories.low;
      var tot = factories.tot;

      $("#gam").html(gam);
      $("#yak").html(yak);
      $("#hiri").html(hiri);
      $("#tot").html(tot);

      drawChart();
      drawPieChart();
    })
    .fail(function (jqXHR, status, error) {
      console.log(error);
    });
}

$("#btnSave").click(function () {
  var id = $("#id").val();
  var name = $("#name").val();
  var factoryName = $("#factoryDropdown").val(); //this will return the selected factory ID
  var date = $("#doe").val();

  alert(factoryName);

  if ($("#btnSave").text().localeCompare("Update") == 0) {
    update();
    return;
  }

  var department = {
    id: id,
    name: name,
    factoryId: factoryName
   
  };

  var ajaxConfig = {
    method: "POST",
    url: "http://localhost:8080/api/departments",
    async: true,
    contentType: "application/json",
    data: JSON.stringify(department),
  };

  $.ajax(ajaxConfig)
    .done(function (response, status, jqXHR) {
      $("#id").val("");
      $("#name").val("").focus();
      $("#doe").val("");

      $("#btnSave").text("Save");

      if (response) {
        loadDepartments();
      }
    })
    .fail(function (jqXHR, status, error) {
      console.log(error);
    });
  
});

$("#tblDeartments").delegate("tr", "click", function () {
  
  $("#btnSave").text("Update");
  var id = $(this).children("td").first().text();
  var name = $(this).children("td:nth-child(2)").first().text();
  var factoryName = $(this).children("td:nth-child(3)").first().text();
  var doe = $(this).children("td:nth-child(4)").first().text();

  //alert(factoryName);

  $("#id").val(id);
  $("#name").val(name).focus();
  $("#factoryDropdown").val(factoryName);
  $("#doe").val(doe);

  loadCounts(id);
});

async function update() {
  var id = $("#id").val();
  var name = $("#name").val();
  var factoryName = $("#factoryDropdown").val();
  var date = $("#doe").val();

  var department = {
    id: id,
    name: name,
    factoryId: factoryName
    
  };

  var ajaxConfig = {
    method: "PUT",
    url: "http://localhost:8080/api/departments/" + id,
    async: true,
    contentType: "application/json",
    data: JSON.stringify(department),
  };

  $.ajax(ajaxConfig)
    .done(function (response, status, jqXHR) {
      $("#id").val("");
      $("#name").val("").focus();
      $("#doe").val("");

      $("#btnSave").text("Save");

      if (response) {
        loadDepartments();
      }
    })
    .fail(function (jqXHR, status, error) {
      console.log(error);
    });
}

$("#tblDeartments").on("click", "tbody tr td:last-child i", function () {
  if (confirm("Are sure you want to delete this Dpeartment ?")) {
    var row = $(this).parents("tr");

    //alert('http://localhost:8080/api/factories?id='+row.find("td:first-child").text());

    var ajaxConfig = {
      method: "DELETE",
      url:
        "http://localhost:8080/api/departments/" +
        row.find("td:first-child").text(),
      async: true,
    };

    $.ajax(ajaxConfig)
      .done(function (response, status, jqXHR) {
        row.fadeOut(1000, function () {
          row.remove();
        });
        window.location.reload();
      })
      .fail(function (jqXHR, status, error) {
        alert("Fail");
      });

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
  var totalPages = parseInt(
    totalElement / 5 + (totalElement % 5 !== 0 ? 1 : 0)
  );

  $(".page-item").remove();

  var html =
    '<li class="page-item"><a class="page-link" href="javascript:void(0)">&laquo;</a></li>';

  for (var i = 0; i < totalPages; i++) {
    html +=
      '<li class="page-item"><a class="page-link" href="#">' +
      (i + 1) +
      "</a></li>";
  }

  html +=
    '<li class="page-item"><a class="page-link" href="javascript:void(0)">&laquo;</a></li>';

  $(".card-footer .pagination").html(html);

  $(".card-footer .pagination .page-item:first-child").click(function () {
    loadfactories(0);
  });

  $(".card-footer .pagination .page-item:last-child").click(function () {
    loadfactories(totalPages - 1);
  });

  $(".card-footer .pagination .page-item").click(function () {
    var number = parseInt($(this).find("a").text());
    if (number) {
      loadfactories(number - 1);
    }
  });
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