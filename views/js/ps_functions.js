var gPerfumeCount = 0;

function highlightSale(idTable, bShowSale) {
    var i = 0;
    var pTable = document.getElementById(idTable);
    var pTBODY = pTable.getElementsByTagName('TBODY')[0];
    var aTRs = pTBODY.getElementsByTagName('TR');

    for (i=0; i < aTRs.length; i++) {
        if (aTRs[i].getAttribute('sale') && aTRs[i].getAttribute('sale') == "true") {
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
    var pTable = document.getElementById(idPerfumeTable);
    var aCBTags = pTable.getElementsByTagName('INPUT');
    
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

window.addEventListener("load", function() {
    document.forms[0].txtBillAmt.value = calculateBill('perfumeTable');
    document.querySelector("#calcBill").addEventListener("click", function() {
        document.forms[0].txtBillAmt.value = calculateBill('perfumeTable');
    });
    document.querySelector("#showSale").addEventListener("click", function() {
        highlightSale('perfumeTable', this.checked);
    });
});