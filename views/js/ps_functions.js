var gPerfumeCount = 0;

function highlightSale(idTable, bShowSale) {
    var i = 0;
    var oTable = document.getElementById(idTable);
    var oTBODY = oTable.getElementsByTagName('tbody')[0];
    var aTRs = oTBODY.getElementsByTagName('tr');

    for (i=0; i < aTRs.length; i++) {
        if (aTRs[i].getAttribute('sale') == "true") {
            if (bShowSale) {
                aTRs[i].style.backgroundColor = "lightBlue";
            } else {
                aTRs[i].style.backgroundColor = "";
            };
        };
    };
};


function calculateBill(idPerfumeTable) {
    var fBillTotal = 0.0;
    var i = 0;
    var aCBTags = document.querySelectorAll('input');    
    for (i = 0; i < aCBTags.length; i++) {
        if (aCBTags[i].checked) {
            var oTR = getParentTag(aCBTags[i], 'TR');

            var oTDPrice = oTR.getElementsByTagName('TD')[2];

            fBillTotal += parseFloat(oTDPrice.firstChild.data);
        };
    };
    return Math.round(fBillTotal * 100.0) / 100.0;
};


function getParentTag(oNode, sParentType) {
    var oParent = oNode.parentNode;
    while (oParent) {
        if (oParent.nodeName == sParentType)
            return oParent;
        oParent = oParent.parentNode;
    };
    return oParent;
};