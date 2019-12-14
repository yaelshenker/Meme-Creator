gMemes=[]
gMeme = {
    selectedImgId: null, selectedTxtIdx: 0,
    txts: [{ line: '', size: 30, align: 'left', color: '#ffffff', startX: 20, startY: 100, isMarked: true },
    { line: '', size: 30, align: 'left', color: '#ffffff', startX: 20, startY: 400, isMarked: false }]
}

function clearMeme(){
    gMeme = {
        selectedImgId: null, selectedTxtIdx: 0,
        txts: [{ line: '', size: 30, align: 'left', color: '#ffffff', startX: 20, startY: 100, isMarked: true },
        { line: '', size: 30, align: 'left', color: '#ffffff', startX: 20, startY: 400, isMarked: false }]
    }

}

function saveMeme(){
    gMemes.push(gMeme)
}

function saveText(txt) {
    gMeme.txts[gMeme.selectedTxtIdx].line = txt

}

function changeLinePos(diff) {
    gMeme.txts[gMeme.selectedTxtIdx].startY += diff

}

function getText() {
    return gMeme.txts
    // [gMeme.selectedTxtIdx]
}

function saveSelectedImgId(id) {
    gMeme.selectedImgId = id
}

function getImageId() {
    return gMeme.selectedImgId
}

function changeFontSize(diff) {
    gMeme.txts[gMeme.selectedTxtIdx].size += diff

}

function changeTextIdx() {
    // gMeme.txts[gMeme.selectedTxtIdx].isMarked = false;
    // (gMeme.selectedTxtIdx === 0) ? gMeme.selectedTxtIdx = 1 : gMeme.selectedTxtIdx = 0;
    if(gMeme.selectedTxtIdx===gMeme.txts.length-1){
        gMeme.selectedTxtIdx=0
    }
    else gMeme.selectedTxtIdx++;
    console.log('idx',gMeme.selectedTxtIdx)
    // gMeme.txts[gMeme.selectedTxtIdx].isMarked = true
    return gMeme.selectedTxtIdx

}

function getMeme() {
    return gMeme
}

function changeColor(color) {
    gMeme.txts[gMeme.selectedTxtIdx].color = color
}

function setLineStartY(canvas) {
    switch (gMeme.selectedTxtIdx) {
        case 0:
            gMeme.txts[gMeme.selectedTxtIdx].startY = 0.2 * gCanvas.height;
            break;
        case ((gMeme.txts).length - 1):
            // if(((gMeme.txts).length-1)!==0)
            gMeme.txts[gMeme.selectedTxtIdx].startY = 0.8 * canvas.height
            console.log(gMeme.txts[gMeme.selectedTxtIdx].startY)
            break;
        case 1:
            gMeme.txts[gMeme.selectedTxtIdx].startY = 0.4 * gCanvas.height;
            break
        case 2:
            gMeme.txts[gMeme.selectedTxtIdx].startY = 0.6 * gCanvas.height;


    }
}

function addText(){
    if(gMeme.txts.length===4) return;
    var newText={ line: '', size: 30, align: 'left', color: '#ffffff', startX: 20, startY: 80, isMarked: true }
    gMeme.txts.splice(gMeme.txts.length-1,0,newText)
    gMeme.selectedTxtIdx=gMeme.txts.length-2
    
}

