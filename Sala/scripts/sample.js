var oneWay = false;
var roundTrip = false;
var selectedNode = null;
var adultCount = 0;
var childCount = 0;
var initSelectedAdult = 0;
var initSelectedChild = 0;
var minPrice = 200;
var maxPrice = 3200;
var minTime = null;
var maxTime = null;
var nHoverNode = null;
var oHoverNode = null;
var data = [];

let layout =[
    [1, 1, 1, 1, 1, 0, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 0, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 0, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 0, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 0, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 0, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 0, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 0, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 0, 1, 1, 1, 1],

]

$(window).on("load", function () {
    data = GetData();
    var cities = [];
    var citiesList = GetCitiesList();
    for (var cnt = 0; cnt < GetCitiesList().length; cnt++) {
        cities.push(citiesList[cnt].cityName);
    }
    //$(".datepick").ejDatePicker({
    //    value: new Date()
    //});
    //$("#priceRangeSlider").ejSlider({
    //    sliderType: ej.SliderType.Range,
    //    values: [0, 100],
    //    slide: "onPriceRangeSlide",
    //    start: "onPriceRangeStart",
    //    create: "onPriceRangecreate",
    //    change: "onPriceRangechange",
    //    height: 8

    //});
    //$("#printticket").ejButton({
    //    size: "normal", width: "113px", click: "onPrintTicket"
    //});

    $("#diagramView").ejDialog(
      {
          enableModal: true,
          resizable: false,
          width: 1000,
          height: 530,
          close: "onDialogClose",
          showOnInit: false,
      });


    $("#adultIncrement").bind("click", function (event) {
        var adultTextElement = document.getElementById("adultCount");
        var lastValue = Number(adultTextElement.value);
        adultTextElement.value = lastValue + 1;

    });
    $("#adultDecrement").bind("click", function (event) {

        var adultTextElement = document.getElementById("adultCount");
        var lastValue = Number(adultTextElement.value);
        if (lastValue != 0)
            adultTextElement.value = lastValue - 1;

    });
    $("#childIncrement").bind("click", function (event) {
        var childTextElement = document.getElementById("childCount");
        var lastValue = Number(childTextElement.value);
        childTextElement.value = lastValue + 1;

    });
    $("#childDecrement").bind("click", function (event) {
        var childTextElement = document.getElementById("childCount");
        var lastValue = Number(childTextElement.value);
        if (lastValue != 0)
            childTextElement.value = lastValue - 1;

    });
    //$("#timeRangeSlider").ejSlider({
    //    sliderType: ej.SliderType.Range,
    //    values: [0, 100],
    //    slide: "onTimeRangeSlide",
    //    start: "onTimeRangeStart",
    //    create: "onTimeRangecreate",
    //    change: "onTimeRangechange",
    //    height: 8
    //});

    //$('.cityList').ejAutocomplete({
    //    dataSource: cities,
    //    width: 205,
    //    autoFill: true
    //});
    //$("#btnSearchFlight").ejButton({
    //    roundedCorner: true,
    //    click: "btnSearchClick"

    //});
    //var oldSelectedRow;
    //$("#FlightTicketBooking").ejGrid({
    //    dataSource: data,
    //    allowPaging: true,
    //    allowSorting: true,
    //    recordClick: function () {
    //        $("#btnOpenPopup").css("display", "block");
    //    },
    //    columns: [
    //        { field: "Airline", headerText: "Airline", width: 30 },
    //        { field: "From", headerText: "From", width: 30 },
    //        { field: "To", headerText: "To", width: 30 },
    //        { field: "Depart", headerText: "Depart", width: 30 },
    //        { field: "Arrive", headerText: "Arrive", width: 30 },
    //        { field: "Price", headerText: "Price", width: 30, format: "{0:C}" },
    //        { field: "Rating", headerText: "Rating", width: 40 }
    //    ],
    //    actionComplete: function (args) {
    //        if (oldSelectedRow > 0)
    //            args.model.selectedRow = oldSelectedRow;
    //    },
    //    actionBegin: function (args) {
    //        oldSelectedRow = args.model.selectedRow;
    //    },
    //    load: function (args) {
    //        var x = args.model.dataSource[Math.floor(Math.random() * args.model.dataSource.length - 1)];
    //        if (document.getElementById("fromCityName")) {
    //            document.getElementById("fromCityName").value = String(x.From);
    //            document.getElementById("toCityName").value = String(x.To);
    //        }
    //        args.model.selectedRowIndex = 0;
    //    }
    //});

    //$("#btnOneWay").ejToggleButton({
    //    size: "normal",
    //    contentType: "imageonly",
    //    change: "btnOneWayChange",
    //    defaultPrefixIcon : "e-icon"
    //});
    //$("#btnRoundTrip").ejToggleButton({
    //    size: "normal",
    //    contentType: "imageonly",
    //    change: "btnRoundTripChange",
    //    defaultPrefixIcon : "e-icon"
    //});

    var nodes = addDiagramContents();
    $("#diagramContent").ejDiagram({
        nodes: nodes,
        width: "625px",
        height: "457px",
        constraints: ej.datavisualization.Diagram.DiagramConstraints.Default & ~ej.datavisualization.Diagram.DiagramConstraints.Zoomable,
        click: onNodeClick,
        drop: onItemDrop,
        drag: nodedragging,
        mouseLeave: nodemouseleave,
        mouseEnter: nodemouseenter,
        pageSettings: { showPageBreaks: false, multiplePage: false, pageOrientation: "landscape", pageWidth: 625, pageHeight: 357, pageBackgroundColor: "transparent", pageBorderWidth: 0, scrollLimit: "diagram" },
        snapSettings: { snapConstraints: null },
        backgroundImage: { source: "../Sala/themes/images/sala.png", scale: "none" }
    });


    $("#btnOpenPopup").bind("click", function () {
        nodes = addDiagramContents();
        $("#diagramContent").ejDiagram({
            nodes: nodes,
            width: "625px",
            height: "457px",
            constraints: ej.datavisualization.Diagram.DiagramConstraints.Default & ~ej.datavisualization.Diagram.DiagramConstraints.Zoomable,
            click: onNodeClick,
            drop: onItemDrop,
            drag: nodedragging,
            mouseLeave: nodemouseleave,
            mouseEnter: nodemouseenter,
            pageSettings: { showPageBreaks: false, multiplePage: false, pageOrientation: "landscape", pageWidth: 625, pageHeight: 357, pageBackgroundColor: "transparent", pageBorderWidth: 0, scrollLimit: "diagram" },
            snapSettings: { snapConstraints: null },
            backgroundImage: { source: "../Sala/themes/images/sala.png", scale: "none" }
        });

        openPopup();


    });
    $("#btnBookNow").bind("click", function () {
        bookNow();
    });
});

function nodemouseenter(args) {
    if (args.element.fillColor != "red") {
        if (nHoverNode && args.element.name != nHoverNode.name) {
            diagram = $("#diagramContent").ejDiagram("instance");
            var obj = new Object();
            obj.fillColor = "white";
            diagram.updateNode(nHoverNode.name, obj);
        }
        nHoverNode = args.element;
        var diagram = $("#diagramContent").ejDiagram("instance");
        var obj = new Object();
        obj.fillColor = "#8CC63F";
        diagram.updateNode(args.element.name, obj);
    }
}

function nodemouseleave(args) {
    if (args.element.fillColor != "red") {
        var diagram = $("#diagramContent").ejDiagram("instance");
        var obj = new Object();
        obj.fillColor = "white";
        diagram.updateNode(args.element.name, obj);
    }
}

function testChildParent(args) {
    if (args.childNodes[0].className == "selectchildObject")
        return ("child");
    else
        return ("adult");
}

function onItemDrop(args) {
    $(".dragClone").remove();
    var diagram = $("#diagramContent").ejDiagram("instance");
    diagram._clearSelection();
    var element = diagram._findNode($("#" + args.e.target.id)[0].parentNode.id);

    if (element && element.shape && element.shape == "rectangle") {
        var selectedNode = element;
        if (selectedNode && (selectedNode.addInfo == undefined || selectedNode.addInfo == "")) {
            var imageSrc = "";
            var adultAdded = false;
            var childAdded = false;
            var result = testChildParent(args.draggable[0]);
            if (result == "adult") {
                adultAdded = true;
                imageSrc = "../Sala/themes/images/icon_Adult.png";
            }
            else {
                childAdded = true;
                imageSrc = "../Sala/themes/images/Backicon1.png";
                
            }
            if (adultCount > 0 || childCount > 0) {
                var diagram = $("#diagramContent").ejDiagram("instance");
                if (!selectedNode.line && selectedNode.type != "group") {
                    selectedNode.border = "gray";
                    diagram.updateNode(selectedNode.name, { type: "image", source: imageSrc });
                    if (adultAdded) {
                        selectedNode.addInfo = "AdultSeat";
                        removeLastAdultIcon();
                        adultCount = adultCount - 1;
                    }
                    if (childAdded) {
                        selectedNode.addInfo = "ChildSeat";
                        removeLastChildIcon();
                        childCount = childCount - 1;
                    }
                }
            }
        } else if (selectedNode.addInfo != "" && selectedNode.addInfo != "booked") {
            var diagram = $("#diagramContent").ejDiagram("instance");
            //if (selectedNode instanceof ej.datavisualization.Diagram.Node) {
            if (!selectedNode.line && selectedNode.type != "group") {
                diagram.updateNode(selectedNode.name, { type: "basic", shape: "rectangle" });
                if (selectedNode.addInfo == "AdultSeat") {
                    addAdultIcon();
                    adultCount = adultCount + 1;
                }
                if (selectedNode.addInfo == "ChildSeat") {
                    addChildIcon();
                    childCount = childCount + 1;
                }
                selectedNode.addInfo = "";
            }
        } else if (selectedNode.addInfo == "booked") {
            //alert("Selected " + selectedNode.name + " is already booked");
        }
        updateAdultText();
        updateChildText();
    }

}
function nodedragging(args) {
    var diagram = $("#diagramContent").ejDiagram("instance");
    diagram._clearSelection();
    args.cancel = true;
}
function backButtonClick() {
    $("#diagramView").ejDialog("close");
}


//$(window).on("load", function () {
//    if (!(ej.browserInfo().name === "msie" && Number(ej.browserInfo().version) < 9)) {
//        $("#diagramContent_canvas_svg")[0].setAttribute("height", "600px");
//        $("#diagramContent_canvas_svg")[0].setAttribute("width", "900px");
//    }
//    else {
//        alert("Diagram will not be supported in IE Version < 9");
//    }
//    $("#priceRangeSlider").ejSlider('option', 'values', [25, 75]);
//    $("#timeRangeSlider").ejSlider('option', 'values', [25, 75]);
//    //$("#Property_space").css("width", 340);
//    $("#gid_space").css("width", document.body.clientWidth - 340);

//    var gridObj = $("#FlightTicketBooking").data("ejGrid");
//    if (gridObj.model.selectedRow >= 0)
//        var gridObj = $("#FlightTicketBooking").data("ejGrid");
//    $("#btnOpenPopup").css("display", "block");
//});
//$(window).resize(function () {
//    //$("#Property_space").css("width", 340);
//    $("#gid_space").css("width", document.body.clientWidth - 340);
//})

function addDiagramContents() {
    var nodes = [];
    var fila = document.getElementById("filas").value;
    var columnas = document.getElementById("columnas").value;
    //createNode("seatA1", 120, 120, 26, 23, nodes);
    //createNode("seatA2", 140, 120, 26, 23, nodes);
    //createNode("seatA2", 230, 120, 26, 23, nodes);
    //createNode("seatA4", 305, 120, 26, 23, nodes, "booked");

    
    var ejeX = 10;
    var ejeY = 30;

    for (let y = 0; y < fila; y++) {
        ejeY = ejeY + 30;
        ejeX = 30;
        for (let x = 0; x < columnas; x++) {
            if(layout[y][x]==1){
                createNode("seatA" + y + "" + x, ejeX, ejeY, 26, 23, nodes, "booked");
                console.log("Entro al rojo");
            }
            else if(layout[y][x]==2){
                createNode("seatA" + y + "" + x, ejeX, ejeY, 26, 23, nodes);
                console.log("Entro al blanco");
            }
            ejeX = ejeX + (600 / fila);
        }

        
    }

    
    /*
    createNode("seatD9_2", 570, 96, 20, 18, nodes);


    createNode("seatD8_3", 400, 50, 20, 18, nodes);
    createNode("seatD8_4", 502, 55, 20, 18, nodes);
    createNode("seatD9_5", 570, 60, 20, 18, nodes);
    createNode("seatD9_6", 570, 60, 20, 18, nodes);

    createNode("seatC1", 165, 139, 26, 23, nodes, "booked");
    createNode("seatC2", 210, 139, 26, 23, nodes);
    createNode("seatC3", 255, 139, 26, 23, nodes);
    createNode("seatC4_1", 375, 131, 20, 18, nodes);
    createNode("seatC4_2", 375, 148, 20, 18, nodes);
    createNode("seatC5_1", 415, 131, 20, 18, nodes);
    createNode("seatC5-2", 415, 148, 20, 18, nodes);
    createNode("seatC6_1", 494, 131, 20, 18, nodes);
    createNode("seatC6_2", 494, 148, 20, 18, nodes);
    createNode("seatC7_1", 532, 131, 20, 18, nodes);
    createNode("seatC7_2", 532, 148, 20, 18, nodes);
    createNode("seatC8_1", 570, 131, 20, 18, nodes);
    createNode("seatC8_2", 570, 148, 20, 18, nodes);

    createNode("seatB1", 165, 168, 26, 23, nodes);
    createNode("seatB2", 210, 168, 26, 23, nodes);
    createNode("seatB3", 255, 168, 26, 23, nodes, "booked");
    createNode("seatB4_1", 375, 165, 20, 18, nodes);
    createNode("seatB4_2", 375, 183, 20, 18, nodes);
    createNode("seatB5_1", 415, 165, 20, 18, nodes);
    createNode("seatB5_2", 415, 183, 20, 18, nodes);
    createNode("seatB6_1", 494, 165, 20, 18, nodes);
    createNode("seatB6_2", 494, 183, 20, 18, nodes);
    createNode("seatB7_1", 532, 165, 20, 18, nodes);
    createNode("seatB7_2", 532, 183, 20, 18, nodes);
    createNode("seatB8_1", 570, 165, 20, 18, nodes);
    createNode("seatB8_2", 570, 183, 20, 18, nodes);



    createNode("seatA5_1", 375, 217, 20, 18, nodes);
    createNode("seatA5_2", 375, 235, 20, 18, nodes);
    createNode("seatA6_1", 415, 217, 20, 18, nodes);
    createNode("seatA6_2", 415, 235, 20, 18, nodes);
    createNode("seatA7_1", 494, 217, 20, 18, nodes);
    createNode("seatA7_2", 494, 235, 20, 18, nodes);
    createNode("seatA8_1", 532, 217, 20, 18, nodes);
    createNode("seatA8_2", 532, 235, 20, 18, nodes);
    createNode("seatA9_1", 570, 217, 20, 18, nodes);
    createNode("seatA9_2", 570, 235, 20, 18, nodes);

*/
    return nodes;
}
function openPopup() {

    var adultCount = getAdultCount();
    var childCount = getChildCount();
    if ((adultCount > 0 || childCount > 0)) {
        initSelectedAdult = adultCount;
        initSelectedChild = childCount;


        $("#diagramView").ejDialog("open");
        $("#popupContent").css("display", "block");
        $("#diagramView").css("height", "100%");
        $("#diagramView").css("width", "100%");

        //$(".sampleOuterTable").css("display", "none");
        //$("#diagramView").css("display", "block");


    }
    else if (document.getElementById("travelType") && document.getElementById("travelType").innerText == "") {
        alert("Please select the travel type");
    }
    else if (adultCount == 0 && childCount == 0)
        alert("Please select at least one passenger for booking");
    intializeDiagram();
    hideFrontLayer();
    showPopupContent();
    updateAdultCountIcon();
    updateChildCountIcon();
}

//creea item por grupo 
function intializeDiagram() {
    adultCount = 0;
    childCount = 0;
    var diagram = $("#diagramContent").ejDiagram("instance");
    var nodes = diagram.model.nodes;
    for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        //if (node instanceof ej.datavisualization.Diagram.Node) {
        if (!node.line && node.type != "group") {
            if (node.addInfo != "" && (node.addInfo == "AdultSeat" || node.addInfo == "ChildSeat")) {
                node.addInfo = "";
                if (node.type = "image")
                    diagram.updateNode(node.name, { type: "basic", shape: "rectangle" });
            }
        }
    }
    diagram.updateViewPort();
}
//function isNumber(evt) {
//    evt = (evt) ? evt : window.event;
//    var charCode = (evt.which) ? evt.which : evt.keyCode;
//    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
//        return false;
//    }
//    return true;
//}
function getAdultCount() {
    var adultTextBoxElement = document.getElementById("adultCount");
    if (adultTextBoxElement) {
        adultCount = Number(adultTextBoxElement.value);
        return adultCount
    }
    return 0;
}
function getChildCount() {
    var childTextBoxElement = document.getElementById("childCount");
    if (childTextBoxElement) {
        childCount = Number(childTextBoxElement.value);
        return childCount;
    }
    return 0;
}
function updateAdultCountIcon() {
    var adultIconElement = document.getElementById("adultIconDisplay");
    removeAllChilds(adultIconElement);
    var adultCount = getAdultCount();
    updateAdultText();
    for (var i = 1; i <= adultCount; i++) {
        addAdultIcon();
    }
}
function addAdultIcon() {
    var adultIconElement = document.getElementById("adultIconDisplay");
    var span = document.createElement("span");
    var img = document.createElement("img");
    img.setAttribute("class", "selectAdultObject");
    img.setAttribute("style", "margin-top:10px;margin-left:10px;border:2px solid lightblue");
    img.setAttribute("src", "../Sala/themes/images/icon_Adult.png");
    img.setAttribute("draggable", "true");
    $(span).ejDraggable({
        clone: true,
        helper: function (event) {
            var helperContainer = $(event.element[0]).clone();

            $(helperContainer).addClass("dragClone");
            if (document.body) {
                //  document.getElementById("popupContent").appendChild(helperContainer[0]);
                $(helperContainer).css("z-index", "99999999999999");
                document.body.appendChild(helperContainer[0]);
                helperContainer.css("opacity", ".7");
            }
            return $(helperContainer);
        },
        drag: function (args) {
            var proxy = this;

            var element = $(".dragClone")[0];
        },
    });
    span.appendChild(img);
    adultIconElement.appendChild(span);
}
function removeLastAdultIcon() {
    var adultIconElement = document.getElementById("adultIconDisplay");
    if (adultIconElement.childNodes && adultIconElement.childNodes.length > 0) {
        adultIconElement.removeChild(adultIconElement.childNodes[adultIconElement.childNodes.length - 1]);
    }
}
function addChildIcon() {
    var childIconElement = document.getElementById("childIconDisplay");
    var span = document.createElement("span");
    var img = document.createElement("img");
    img.setAttribute("class", "selectchildObject");
    img.setAttribute("style", "margin-top:10px;margin-left:10px;border:2px solid lightblue");
    img.setAttribute("src", "../Sala/themes/images/Backicon1.png");
    img.setAttribute("draggable", "true");

    $(span).ejDraggable({
        clone: true,
        helper: function (event) {
            var helperContainer = $(event.element[0]).clone();
            $(helperContainer).addClass("dragClone");
            if (document.body) {
                $(helperContainer).css("z-index", "99999999999999");
                document.body.appendChild(helperContainer[0]);
                helperContainer.css("opacity", ".7");
            }
            helperContainer.css("opacity", ".7");
            return $(helperContainer);
        },
        drag: function () {
            var proxy = this;
            var element = $(".dragClone")[0];
        }
    });

    span.appendChild(img);
    childIconElement.appendChild(span);
}
function removeLastChildIcon() {
    var childIconElement = document.getElementById("childIconDisplay");
    if (childIconElement.childNodes && childIconElement.childNodes.length > 0) {
        childIconElement.removeChild(childIconElement.childNodes[childIconElement.childNodes.length - 1]);
    }
}
function updateChildCountIcon() {
    var childIconElement = document.getElementById("childIconDisplay");
    removeAllChilds(childIconElement);
    var childCount = getChildCount();
    updateChildText();
    for (var i = 1; i <= childCount; i++) {
        addChildIcon();
    }
}
function updateChildText() {
    var childCountElement = document.getElementById("childCountDisplay");
    childCountElement.textContent = "Child " + childCount;
}
function updateAdultText() {
    var adultCountElement = document.getElementById("adultCountDisplay");
    adultCountElement.textContent = "Adult " + adultCount;
}
function removeAllChilds(element) {
    var childNodes = element.childNodes;
    if (childNodes.length > 0) {
        var childNodeLength = childNodes.length;
        for (var i = childNodes.length; i > 0; i--) {
            element.removeChild(childNodes[childNodes.length - 1]);
        }
    }
}

function createNode(nodeName, x, y, width, height, nodeCollection, addInfo) {
    var node = ej.datavisualization.Diagram.Node({
        name: nodeName,
        offsetX: x + 20,
        offsetY: y + 20,
        width: width,
        height: height,
    });
    if (addInfo && addInfo == "booked") {
        node.fillColor = "red";
        node.addInfo = addInfo;
    } else {
        node.addInfo = null;
    }
    nodeCollection.push(node);
}

//function btnOneWayChange(event) {
//    oneWay = !oneWay;
//    roundTrip = !roundTrip;
//    updateWayText();
//}
//function btnRoundTripChange(event) {
//    roundTrip = !roundTrip;
//    oneWay = !oneWay;
//    updateWayText();
//}
//function updateWayText() {
//    var labelElement = document.getElementById("travelType");
//    if (oneWay)
//        labelElement.textContent = "Round Trip";
//    else
//        labelElement.textContent = "One Way";
//}
//function convertRange(value, oldMin, oldMax, newMin, newMax) {
//    var newValue = Math.round((value - oldMin) / (oldMax - oldMin) * (newMax - newMin) + newMin);
//    if (newValue)
//        return newValue;
//    return value;

//}

//function onPriceRangeSlide(sender) {
//    var minValue = sender.value[0];
//    var maxValue = sender.value[1];
//    var minPrice = convertRange(minValue, 0, 100, 400, 5000);
//    var maxPrice = convertRange(maxValue, 0, 100, 400, 5000);
//    updatePrice(minPrice, maxPrice);
//}
//function updatePrice(minPrice, maxPrice) {
//    var minPriceElement = document.getElementById("minPrice");
//    minPriceElement.innerText = "$" + minPrice;
//    var maxPriceElement = document.getElementById("maxPrice");
//    maxPriceElement.innerText = "$" + maxPrice;
//}
//function onTimeRangeSlide(sender) {
//    var minValue = sender.value[0];
//    var maxValue = sender.value[1];
//    var minTime = convertRange(minValue, 0, 100, 0, 24);
//    var maxTime = convertRange(maxValue, 0, 100, 0, 24);
//    minTime = setTimeFormat(minTime);
//    maxTime = setTimeFormat(maxTime);
//    updateTime(minTime, maxTime);

//}
//function updateTime(minTime, maxTime) {
//    var minTimeElement = document.getElementById("minTime");
//    minTimeElement.innerText = minTime.hh + ":" + (minTime.mm ? minTime.mm : "00");
//    var maxPriceElement = document.getElementById("maxTime");
//    maxPriceElement.innerText = maxTime.hh + ":" + (maxTime.mm ? minTime.mm : "00");
//}
//function setTimeFormat(time) {
//    var minutesList = time.toString().split(".")[1];
//    time = Math.floor(time);
//    var minutes = minutesList ? minutesList : null;
//    if (minutes || minutes == "0") {
//        minutes = minutesList[0] ? minutesList[0] : minutes;
//        if (minutesList[1] != null) {
//            minutes = minutes + "" + minutesList[1];
//        }
//        var hours = Math.floor(Number(minutes) / 60) ? Math.floor(Number(minutes) / 60) : 0;
//        minutes = Number(minutes) % 60;

//        if (minutes != 0) {
//            if (minutes >= 0 && minutes <= 9)
//                minutes = "0" + minutes;
//            time = (Math.floor(time) + Number(hours));
//        }
//    }
//    minutes = minutes ? minutes : 0;
//    return { hh: time, mm: minutes };
//}
//function onPriceRangechange(sender) {
//    filterByPrice(sender);
//}
//function onTimeRangechange(sender) {
//    filterByTime(sender);
//}
//function filterByPrice(sender) {
//    var minValue = sender.value[0];
//    var maxValue = sender.value[1];
//    minPrice = convertRange(minValue, 0, 100, 400, 5000);
//    maxPrice = convertRange(maxValue, 0, 100, 400, 5000);
//    updatePrice(minPrice, maxPrice);
//    if (!minTime && !maxTime) {
//        var tempMinTime = convertRange(minValue, 0, 100, 0, 24);
//        var tempMaxTime = convertRange(maxValue, 0, 100, 0, 24);
//        minTimeObj = setTimeFormat(tempMinTime);
//        maxTimeObj = setTimeFormat(tempMaxTime);
//        updateTime(minTimeObj, maxTimeObj);
//        minTime = String(minTimeObj.hh) + "." + String(minTimeObj.mm);
//        maxTime = String(maxTimeObj.hh) + "." + String(maxTimeObj.mm);
//    }
//    var query = ej.Query()
//    .search(minPrice, ["Price"], ej.FilterOperators.greaterThan)
//    .search(maxPrice, ["Price"], ej.FilterOperators.lessThan)
//    .search(minTime, ["Depart"], ej.FilterOperators.greaterThan)
//    .search(maxTime, ["Depart"], ej.FilterOperators.lessThan)
//    var dataManager = ej.DataManager(data);

//    result = dataManager.executeLocal(query);

//    var gridObj = $("#FlightTicketBooking").data("ejGrid");
//    gridObj.option("dataSource", result);
//    if ($("#FlightTicketBooking").ejGrid("option", "selectedRow") < 0)
//        $("#FlightTicketBooking").ejGrid("option", { selectedRow: 0 });
//    gridObj.selectRows(0)
//}
//function filterByTime(sender) {
//    var minValue = sender.value[0];
//    var maxValue = sender.value[1];
//    var tempMinTime = convertRange(minValue, 0, 100, 0, 24);
//    var tempMaxTime = convertRange(maxValue, 0, 100, 0, 24);
//    minTimeObj = setTimeFormat(tempMinTime);
//    maxTimeObj = setTimeFormat(tempMaxTime);
//    updateTime(minTimeObj, maxTimeObj);
//    minTime = String(minTimeObj.hh) + "." + String(minTimeObj.mm);
//    maxTime = String(maxTimeObj.hh) + "." + String(maxTimeObj.mm);
//    var query = ej.Query()
//    .search(minTime, ["Depart"], ej.FilterOperators.greaterThan)
//    .search(maxTime, ["Depart"], ej.FilterOperators.lessThan)
//    .search(minPrice, ["Price"], ej.FilterOperators.greaterThan)
//    .search(maxPrice, ["Price"], ej.FilterOperators.lessThan)
//    var dataManager = ej.DataManager(data);
//    $(window).on("load", function () {
//        result = dataManager.executeLocal(query);
//    });
//    var gridObj = $("#FlightTicketBooking").data("ejGrid");
//    gridObj.option("dataSource", result);
//    if ($("#FlightTicketBooking").ejGrid("option", "selectedRow") < 0)
//        $("#FlightTicketBooking").ejGrid("option", { selectedRow: 0 });
//    gridObj.selectRows(0)
//}
function btnSearchClick(sender) {
    var fromCity = document.getElementById("fromCityName").value;
    var toCity = document.getElementById("toCityName").value;

    var query = ej.Query()
     .search(fromCity, ["From"])
     .search(toCity, ["To"])
    var result;
    var dataManager = ej.DataManager(data);

    result = dataManager.executeLocal(query);


    if (result && !result[0]) {
        query = ej.Query()
   .search(fromCity, ["From"])
        result = dataManager.executeLocal(query);

    }

    if (result && !result[0]) {
        query = ej.Query()
   .search(fromCity, ["To"])
        result = dataManager.executeLocal(query);

    }

    var gridObj = $("#FlightTicketBooking").data("ejGrid");
    gridObj.option("dataSource", result);

    var gridObj = $("#FlightTicketBooking").data("ejGrid");
    if (gridObj.model.selectedRow >= 0)
        $("#btnOpenPopup").css("display", "block");
    else
        $("#btnOpenPopup").css("display", "none");

}
function bookNow() {


    if (checkBookingSeats()) {
        hidePopupContent();
        showFrontLayer();
        $("#popupContent").css("display", "none");
        $("#diagramView").css("height", "100%");
        $("#diagramView").css("width", "100%");
    }
    else alert("Choose all your seats for booking");
}
function checkBookingSeats() {
    var diagram = $("#diagramContent").ejDiagram("instance");
    var nodes = diagram.model.nodes;
    var adultSeat = 0, childSeat = 0;
    for (var i = 0; i < nodes.length; i++) {
        if (nodes[i].addInfo == "AdultSeat")
            adultSeat++;
        else if (nodes[i].addInfo == "ChildSeat")
            childSeat++;
    }
    if (initSelectedAdult > adultSeat || initSelectedChild > childSeat)
        return false;
    return true;
}
function showFrontLayer() {
    document.getElementById('bg_mask').style.visibility = 'visible';
    document.getElementById('frontlayer').style.visibility = 'visible';
}
function hideFrontLayer() {
    document.getElementById('bg_mask').style.visibility = 'hidden';
    document.getElementById('frontlayer').style.visibility = 'hidden';
}
function showPopupContent() {
    document.getElementById('popupContent').style.visibility = 'visible';
}
function hidePopupContent() {
    document.getElementById('popupContent').style.visibility = 'hidden';
}

function onNodeClick(sender) {
    if (sender.element && sender.element.type == "image") {
        var diagram = $("#diagramContent").ejDiagram("instance");
        selectedNode = sender.element;
        if (selectedNode && (selectedNode.addInfo == undefined || selectedNode.addInfo == "")) {
            var imageSrc = "";
            var adultAdded = false;
            var childAdded = false;
            if (adultCount > 0) {
                adultAdded = true;
                imageSrc = "themes/images/icon_Adult.png";
            } else if (childCount > 0) {
                childAdded = true;
                imageSrc = "themes/images/icon_Child.png";
            }
            if (adultCount > 0 || childCount > 0) {
                var diagram = $("#diagramContent").ejDiagram("instance");
                //if (selectedNode instanceof ej.datavisualization.Diagram.Node) {
                if (!selectedNode.line && selectedNode.type != "group") {
                    selectedNode.border = "gray";
                    diagram.updateNode(selectedNode.name, { type: "image", source: imageSrc });
                    if (adultAdded) {
                        selectedNode.addInfo = "AdultSeat";
                        removeLastAdultIcon();
                        adultCount = adultCount - 1;
                    }
                    if (childAdded) {
                        selectedNode.addInfo = "ChildSeat";
                        removeLastChildIcon();
                        childCount = childCount - 1;
                    }
                }
            }
        } else if (selectedNode.addInfo != "" && selectedNode.addInfo != "booked") {
            var diagram = $("#diagramContent").ejDiagram("instance");
            //if (selectedNode instanceof ej.datavisualization.Diagram.Node) {
            if (!selectedNode.line && selectedNode.type != "group") {
                diagram.updateNode(selectedNode.name, { type: "basic", shape: "rectangle" });
                if (selectedNode.addInfo == "AdultSeat") {
                    addAdultIcon();
                    adultCount = adultCount + 1;
                }
                if (selectedNode.addInfo == "ChildSeat") {
                    addChildIcon();
                    childCount = childCount + 1;
                }
                selectedNode.addInfo = "";
            }
        } else if (selectedNode.addInfo == "booked") {
            alert("Selected " + selectedNode.name + " is already booked");
        }
        updateAdultText();
        updateChildText();
    }
    var diagram = $("#diagramContent").ejDiagram("instance");
    diagram._clearSelection();

}
//function onPrintTicket(args) {
//    var ele = $(".ticketinformation");
//    $(".ticketinformation").css("visibility", "visible");
//    var gridobj = $("#FlightTicketBooking").ejGrid("instance");
//    var obj = gridobj.getCurrentViewData();
//    //$(".name").html() == "" && $(".name").append(obj[0].Airline);
//   // $(".departure").html() == "" && $(".departure").append(obj[0].From);
//  //  $(".destination").html() == "" && $(".destination").append(obj[0].To);
//   // $(".depart").html() == "" && $(".depart").append(obj[0].Depart);
//  //  $(".arrive").html() == "" && $(".arrive").append(obj[0].Arrive);
//   // $(".price").html() == "" && $(".price").append(obj[0].Price);
//   // $(".rating").html() == "" && $(".rating").append(obj[0].Rating);
//    if (!ele.hasClass("e-print")) {
//        $(".ticketinformation").ejPrint({ printInNewWindow: true });
//    } else {
//        var printobj = $(".ticketinformation").ejPrint("instance")
//        printobj.option("printInNewWindow", true);
//        printobj.print();
//    }
//    $(".ticketinformation").css("visibility", "hidden");

//}

function hacerArreglo(){
    //Convierte un string como '2 3' a una tupla (2,3)
function seat_to_point(seat)
{
    let tuple = seat.split(' ')
    return tuple
}

function euclidean_distance(point1, point2)
{
    return Math.sqrt(Math.pow(Math.abs(point1[0]-point2[0]), 2) + Math.pow(Math.abs(point1[1]-point2[1]), 2))
}

function min_from_array(arr)
{
    let min_value = 9999
    arr.forEach(val => {
        if (val < min_value)
            min_value = val
    })

    return min_value
}



let total=0
var filasv = document.getElementById("filas").value;
var columnasv = document.getElementById("columnas").value;
/*for(var i = 0; i<columnasv;i++){
    for(var j = 0; j<filasv;j++){
        layout[i][j] = "1";
    }
}

for(var i = 0; i<layout.length;i++){
    for(var j = 0; j<layout[0].length;j++){
        if(i>filas || j>columnas)
        layout[i][j].remove();
    }
}*/
//let total=document.getElementById("capacidad").value
 //layout.forEach((num)=> {
 //    total+=num
 //});
layout.forEach(row => row.forEach(val => total += val))

//Porcentaje admitido
let percentage = document.getElementById("porcentaje").value/100;
//Distancia en metros
let seat_side_length = .75
let safe_distance = document.getElementById("distancia").value
let safe_units = Math.ceil(safe_distance / seat_side_length)

console.log('total: ' + total)
console.log('percentage: ' + percentage)
console.log('seat_side_length: ' + seat_side_length)
console.log('safe_distance: ' + safe_distance)
console.log('safe_units: ' + safe_units)

let k = Math.floor(total * percentage)

let corners = [
    '0 0',
    (layout[0].length - 1) + ' 0',
    '0 ' + String(layout.length - 1),
    String((layout[0].length - 1)) + ' ' + String(layout.length - 1)
]

let is_possible = true;
while (corners.length < k){
    new_corner = ''
    min_mean = 9999

    for (y = 0; y < layout.length; ++y) 
    {
        for (x = 0; x < layout[0].length; ++x) 
        {
            if (!((String(x) + ' ' + String(y)) in corners) && layout[y][x] >=1)
            {
                let distances = []
                corners.forEach((c)=>
                {
                    distances.push(euclidean_distance([x,y], seat_to_point(c)))
                })

                let mean = 0;
                //distances = distances.slice();
                let dlength = distances.length;
                let a = 0;
                distances.forEach((n)=>
                {
                    a+=n;
                })
                mean = a/dlength;
                if((mean < min_mean) && (min_from_array(distances) > safe_units))
                {
                    min_mean = mean;
                    new_corner = String(x) + ' ' + String(y);
                }
            }
        }
    }
    if (new_corner=='')
    {
        alert('Not possible!')
        is_possible = false;
    }

    if (!is_possible)
        break;

    corners.push(new_corner)
}

if (is_possible) {
    corners.forEach(corner => {
        [x, y] = seat_to_point(corner)
        layout[y][x] = 2
    })
    
    // console.log(layout)
    for (let y = 0; y < layout.length; y++) {
        let row = ''
        for (let x = 0; x < layout[0].length; x++) {
            if(layout[y][x]==1){
                
            }
            row += `${layout[y][x]} `
        }

        console.log(row);
    }

    // layout.forEach(row => row.forEach())
    }
}




