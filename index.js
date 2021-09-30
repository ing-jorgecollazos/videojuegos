var count = 1; //Pages
var data;
var content;
var numTestCount;
var path;

$(document).ready(function() {
    //var session = sessionStorage.getItem('user');
    /*if (session == null)
        window.location.href = "index.html";*/
    initialData();
});

function loadIFrame() {
    var iframe = document.getElementById("iframe");

    // Adjusting the iframe height onload event
    iframe.onload = function() {
        iframe.style.height = iframe.contentWindow.document.body.scrollHeight + 'px';
    }
}

$("#btn-next").on("click", function() {
    $("#iframe").hide();
    var value = $("#select-unit").text();
    $("#btn-next img").attr('src', path + 'content/theme/botones/next_but_press.png');
    count = count + 1;
    if (count <= $("#limit-page").text())
        loadPage(value, count);
});

$("#btn-before").on("click", function() {
    $("#iframe").hide();
    var value = $("#select-unit").text();
    $("#btn-before img").attr('src', path + 'content/theme/botones/before_but_press.png');
    count = count - 1;

    if (count == parseInt($("#limit-page").text()) - 1)
        $("#btn-next").show();

    if (count >= 1)
        loadPage(value, count);
});

$("#btn-statics").on("click", function() {
    $("#btn-statics img").attr('src', path + 'content/theme/botones/score_but_press.png');
    getMessage();
});

$("#btn-screen").on("click", function() {
    $("#btn-screen img").attr('src', path + 'content/theme/botones/screen_but_press.png');
});

$("#btn-home").on("click", function() {
    $("#btn-home img").attr('src', path + 'content/theme/botones/home_but_press.png');
});

$("#btn-next img").hover(function() {
    $("#btn-next img").attr('src', path + 'content/theme/botones/next_but_sobre.png');
    $("#btn-next").tooltip({ animated: 'fade', placement: 'bottom', html: true });
}, function() {
    $("#btn-next img").attr('src', path + 'content/theme/botones/next_but.png');
});

$("#btn-before img").hover(function() {
    $("#btn-before img").attr('src', path + 'content/theme/botones/before_but_sobre.png');
    $("#btn-before").tooltip({ animated: 'fade', placement: 'bottom', html: true });
}, function() {
    $("#btn-before img").attr('src', path + 'content/theme/botones/before_but.png');
});

$("#btn-statics img").hover(function() {
    $("#btn-statics img").attr('src', path + 'content/theme/botones/score_but_sobre.png');
    $("#btn-statics").tooltip({ animated: 'fade', placement: 'bottom', html: true });
}, function() {
    $("#btn-statics img").attr('src', path + 'content/theme/botones/score_but.png');
});

$("#btn-screen img").hover(function() {
    $("#btn-screen img").attr('src', path + 'content/theme/botones/screen_but_sobre.png');
    $("#btn-screen").tooltip({ animated: 'fade', placement: 'bottom', html: true });
}, function() {
    $("#btn-screen img").attr('src', path + 'content/theme/botones/screen_but.png');
});

$("#btn-home img").hover(function() {
    $("#btn-home img").attr('src', path + 'content/theme/botones/home_but_sobre.png');
    $("#btn-home").tooltip({ animated: 'fade', placement: 'bottom', html: true });
}, function() {
    $("#btn-home img").attr('src', path + 'content/theme/botones/home_but.png');
});

$("#units").change(function() {
    $("#iframe").hide();
    $("#btn-next").show();
    count = 1;
    var unit = $(this).val();
    $("#select-unit").text(unit);
    localStorage.setItem('unit', unit);
    localStorage.setItem('numTestCount', numTestCount[unit - 1]);
    loadPage(unit, 1);
});

function initialData() {
    data = getConfigurations();
    path = window.location.href.replace('index.html', '');
    numTestCount = data[0].numTest;
    //var unit = $("#units").val();
    console.log('menu: ', localStorage.getItem('unit'));
    $("#units").val(localStorage.getItem('unit'));
    var unit = localStorage.getItem('unit');
    $("#select-unit").text(unit);
    localStorage.setItem('numTestCount', numTestCount[unit - 1]);
    localStorage.setItem('data', JSON.stringify(data));
    loadPage($("#units").val(), count);
}

function loadPage(unit, numPage) {
    var c = 0;
    var limitPages = data[0].limitPages;
    var pageColumns = data[0].pageColumns;
    var pages = pageColumns[unit - 1]['pag' + numPage];
    var index = pages.split("|");
    var indexZoom = parseInt(index[0]) + 1;
    var indexColor = parseInt(index[0]) + 2;
    var indexImageHeader = parseInt(index[0]) + 3;
    var indexTest = parseInt(index[0]) + 4;
    var indexQuestion = parseInt(index[0]) + 5;
    var indexCorrectNumAnswers = parseInt(index[0]) + 6;
    var indexFormType = parseInt(index[0]) + 7;
    console.log('indexQuestion: ', indexQuestion, ' ', index[indexQuestion]);
    $("#units").css("background-color", '#' + index[indexColor]);
    $("#header-main").css("background-color", '#' + index[indexColor]);
    $("#header-top").css("color", '#' + index[indexColor]);
    $("#img-header").attr('src', path + 'content/units/unit' + unit + '/header_top/' + index[indexImageHeader]);

    $("#current-page").text(numPage);
    $("#limit-page").text(limitPages[unit - 1]);
    if (numPage == 1 && limitPages == 1 ) {
        $("#btn-before").hide();
        $("#btn-statics").hide();
        $("#btn-screen").hide();
        $("#btn-next").hide();
      

    } else if (numPage == $("#limit-page").text()) {
        $("#btn-next").hide();
        $("#btn-before").hide();
    }  else if(numPage==1){
        $("#btn-before").hide();
    } else if(numPage==2){
        $("#btn-before").hide();
    }
    
 
    if (index[indexZoom] == 'Zoom') {
        $("#lbl-text").show();
        $("#btn-zoomin").show();
        $("#btn-zoomout").show();
    } else {
        $("#lbl-text").hide();
        $("#btn-zoomin").hide();
        $("#btn-zoomout").hide();
    }
    getContent(unit, numPage, index[indexTest], index[indexQuestion],
        index[indexCorrectNumAnswers], index[indexFormType]);

    //$('#question1').val("question");
    //initializeForms();
}

//function getContent(unit, page, idContent, i, limit, test, numQuestions, correctNumAnswers, formType) {
function getContent(unit, page, test, numQuestions, correctNumAnswers, formType) {
    $('#iframe').attr('src', path + 'views/units/unit' + unit + '/page' + page + '.html');
    //loadData(unit, test, numQuestions, correctNumAnswers, formType);
    console.log('questions: ', numQuestions);
    eventSave(unit, page, test, numQuestions, correctNumAnswers, formType);
}

$("#iframe").on('load', function() {
    $(this).show();
});

//Definimos el botón para escuchar su click, y también el contenedor del canvas
$("#btn-screen").on("click", function() {
    $objetivo = document.querySelector(".swal2-content");
    html2canvas($objetivo, {
            letterRendering: 1,
            allowTaint: true,
            useCORS: true,
            onrendered: function(canvas) {
                console.log(canvas);
                // Cuando se resuelva la promesa traerá el canvas
                // Crear un elemento <a>

            }
        }) // Llamar a html2canvas y pasarle el elemento
        .then(canvas => {
            let enlace = document.createElement('a');
            enlace.download = "Captura_catering_and_cooking.png";
            // Convertir la imagen a Base64
            enlace.href = canvas.toDataURL();
            // Hacer click en él
            enlace.click();
        });
});

/*
 * Mostrar modal con alertas
 */
function getMessage() {
    Swal.fire({
        title: '<strong>Score</strong>',
        //icon: '<img src="../content/theme/icons/cup.png">',
        imageUrl: 'content/theme/icons/cup.png',
        imageWidth: 60,
        imageHeight: 60,
        imageAlt: 'Score',
        //html: "<img src='../content/theme/botones/before_but.png'>",
        html: getScore(),
        width: 800,
        showCloseButton: false,
        showCancelButton: false,
        focusConfirm: false,
        confirmButtonText: '<i class="fa fa-thumbs-up"></i> Close',
    });
    /*Swal.fire({
        title: '\n\n\n\n\n\n\n\n',
        width: 600,
        ///height: auto,
       // padding: '3em',
        background: 'url(' + url + ')',
        showConfirmButton: false,
        showCloseButton: true,
        timer: 3500
    });*/
    fillTablesScore();
}

function getScore() {
    return `
    <div id="accordion">
        <div class="card">
            <div class="card-header" id="headingOne">
            <h5 class="mb-0">
                <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    Unit 1 - Human resource managers skills
                </button>
            </h5>
            </div>

            <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordion">
                <div class="card-body">
                    <table class="table table-sm" id="unit1"></table>   
                </div>
            </div>
        </div>
        <div class="card">
            <div class="card-header" id="headingTwo">
            <h5 class="mb-0">
                <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                Unit 2 - Identifying the position needed
                </button>
            </h5>
            </div>
            <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
            <div class="card-body">
            <table class="table table-sm" id="unit2"></table>   
            </div>
            </div>
        </div>
        <div class="card">
            <div class="card-header" id="headingThree">
            <h5 class="mb-0">
                <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                Unit 3 - Finding candidates
                </button>
            </h5>
            </div>
            <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordion">
            <div class="card-body">
            <table class="table table-sm" id="unit3"></table>
            </div>
            </div>
        </div>
        <div class="card">
            <div class="card-header" id="headingFour">
            <h5 class="mb-0">
                <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                Unit 4 - The interview
                </button>
            </h5>
            </div>
            <div id="collapseFour" class="collapse" aria-labelledby="headingFour" data-parent="#accordion">
            <div class="card-body">
            <table class="table table-sm" id="unit4"></table>
            </div>
            </div>
        </div>
        <div class="card">
            <div class="card-header" id="headingFive">
            <h5 class="mb-0">
                <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                Unit 5 - Hiring and training
                </button>
            </h5>
            </div>
            <div id="collapseFive" class="collapse" aria-labelledby="headingFive" data-parent="#accordion">
            <div class="card-body">
            <table class="table table-sm" id="unit5"></table>
            </div>
            </div>
        </div>
        <div class="card">
            <div class="card-header" id="headingSix">
            <h5 class="mb-0">
                <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
                Unit 6 - Personnel or labor welfare
                </button>
            </h5>
            </div>
            <div id="collapseSix" class="collapse" aria-labelledby="headingSix" data-parent="#accordion">
            <div class="card-body">
            <table class="table table-sm" id="unit6"></table>
            </div>
            </div>
        </div>
    </div>
    `;
}

function fillTablesScore() {
    //console.log("numTestCount: ", numTestCount);
    var user = sessionStorage.getItem('user');
    var answers = localStorage.getItem('answers');
    var jsonData = JSON.parse(answers)[user];
    //console.log(jsonData);
    for (var i = 1; i <= 6; i++) {
        $("#unit" + i).append("<thead id='th" + i + "'></thead>");
        $("#unit" + i).append("<tbody id='tb" + i + "'></tbody>");
        $("#th" + i).append("<tr id='tr" + i + "'></tr>");
        $("#tr" + i).append('<th scope="col">#</th>');
        $("#tr" + i).append('<th scope="col">Approved</th>');
        $("#tr" + i).append('<th scope="col">Reprobate</th>');
        $("#tr" + i).append('<th scope="col">Tries</th>');
        //$("table #unit" + i + " thead tr").append("<th scope='col'>#</th>");
        var unit = jsonData[i - 1]['unit' + i];
        //console.log(unit)
        for (var j = 1; j <= numTestCount[i - 1]; j++) {
            $("#tb" + i).append("<tr id='tr" + i + j + "'></tr>");
            $("#tr" + i + j).append('<td>Test ' + j + '</td>');
            $("#tr" + i + j).append('<td><img class="img-fluid" id="check' + i + j + '" src = "" /></td>');
            $("#tr" + i + j).append('<td><img class="img-fluid" id="error' + i + j + '" src = "" /></td>');
            $("#tr" + i + j).append('<td><span id="tries' + i + j + '">0</span></td>');
            if (unit.length > 0) {
                console.log(typeof unit[j - 1]);
                if (unit[j - 1]['id'] === 'test' + j) {
                    console.log('test' + j);
                    $("#tries" + i + j).text(unit[j - 1]['tries']);
                    if (unit[j - 1]['state'] === "Approved")
                        $("#check" + i + j).attr("src", path + 'content/theme/icons/check.png');
                    else
                        $("#error" + i + j).attr("src", path + 'content/theme/icons/error.png');
                }
                /*if (typeof unit[j - 1] !== "undefined") {
                    console.log('Unit: ', unit[j - 1]['id'], ' = ', 'test' + j);
                    if (unit[j - 1]['id'] === 'test' + j)
                        console.log('test' + j);
                }*/
            }
        }
    }
}

function eventSave(unit, page, test, numQuestions, correctNumAnswers, formType) {
    console.log(unit, ' - ', page, ' - ', test, ' - ', numQuestions, ' - ', correctNumAnswers, ' - ', formType);
    localStorage.setItem('page', page);
    localStorage.setItem('unit', unit);
    localStorage.setItem('test', test);
    localStorage.setItem('numQuestions', numQuestions);
    localStorage.setItem('correctNumAnswers', correctNumAnswers);
    localStorage.setItem('formType', formType);
}

//Zoom text
$(".btn-zoom").on("click", function() {
    console.log()
    var size = $(".zoom-text").css("font-size");
    if ($(this).hasClass("plus")) {
        size = size + 1;
        if (size >= 22) {
            size = 22;
        }
    } else {
        size = size - 1;
        if (size <= 14) {
            size = 14;
        }
    }
    $(".zoom-text").css("font-size", size);
});



function getConfigurations() {
    return data = [{
            "pageColumns": [{
                    
                   
                   
                    "pag1": "1|12|NoZoom|6B9425|title.png|0|0|0|0"
                    
                },
                    
                {
                    "pag1": "2|6|6|NoZoom|6B9425|title.png|0|0|0|0",
                    "pag2": "2|6|6|NoZoom|6B9425|title.png|0|0|0|0",
                    "pag3": "2|6|6|NoZoom|6B9425|title.png|0|0|0|0",
                    "pag4": "2|6|6|NoZoom|6B9425|title.png|0|0|0|0",
                    "pag5": "2|6|6|NoZoom|6B9425|title.png|0|0|0|0",
                    "pag6": "2|6|6|NoZoom|6B9425|title.png|0|0|0|0"

                },



                {
                    "pag1": "2|6|6|NoZoom|1F82C0|title.png|0|0|0|0"
                    
                },
                {
                    "pag1": "2|6|6|NoZoom|B1C115|title.png|0|0|0|0"
                   
                },
                {
                    "pag1": "2|6|6|NoZoom|92D3EA|title.png|0|0|0|0"


                },
                {
                    "pag1": "2|6|6|NoZoom|D1D71F|title.png|0|0|0|0"
                },
                {
                    "pag1": "2|6|6|NoZoom|6B9425|title.png|0|0|0|0"
                },

                {
                    "pag1": "2|6|6|NoZoom|B34C19|title.png|0|0|0|0"
                },

                {
                    "pag1": "2|6|6|NoZoom|555557|title.png|0|0|0|0"
                }


            ],
            "limitPages": ["1", "6", "1", "1", "1", "1","1","1","1"],
            "numTest": ["5", "6", "3", "4", "2", "4","0","0"]
        },
        {
            "units": [{
                    "test1": ["I’m sorry, I didn’t catch that", "Could you say that again?", "I’m sorry, I still didn’t get that", "One more time?", "I can’t hear a word you’re saying"],
                    "test2": ["Labor & Employee relations", "Training & Learning", "Recruiting & Staffing", "Compensation & Benefits"],
                    "test3": ["d", "a", "f", "c", "e", "i", "b", "h", "g"],
                    "test4": ["duties", "Job", "Amazing", "Something", "deal with", "Stressful", "often"],
                    "test5": ["c", "b", "d", "a"]

                },
                {
                    "test1": ["", "", "", ""],
                    "test2": ["", "", "", "", "", "", "", ""],
                    "test3": ["", "", ""],
                    "test4": ["", "", ""],
                    "test5": ["", "", "", ""],
                    "test6": ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]

                },

                {
                    "test1": ["e", "d", "b", "c", "a", "f"],
                    "test2": ["web-based technology", "Attracting", "Onboarding", "build", "positions", "Advertisements", "Cultivate", "candidate pool", "connect", "potential candidates", "Share", "fill"],
                    "test3": ["b", "d", "a", "b"]



                },

                {
                    "test1": ["interested", "apply", "requirements", "candidates", "applicant", "HR", "achievements", "skills", "qualifications", "responsibilities", "experience", "fit", "full-time", "offer", "Negotiate"],
                    "test2": ["4", "2", "5", "1", "3"],
                    "test3": ["known", "performance", "probes", "techniques", "structured", "creative", "through", "knowledge", "involves", "highlight", "react", "pressure"],
                    "test4": ["", "", "", "", "", "", "", ""]


                },

                {
                    "test1": ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
                    "test2": ["", "", "", "", "", ""]

                },
                {
                    "test1": ["", "", "", "", ""],
                    "test2": ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
                    "test3": ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
                    "test4": ["", "", "", "", "", "", ""]

                }

            ]

        }
    ]






}