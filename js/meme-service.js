gMeme = {
    selectedImgId:null, selectedTxtIdx:0,
    txts: [{ line:'', size:30, align: 'left', color: 'red' }]
}

function saveText(txt) {
    gMeme.txts[gMeme.selectedTxtIdx].line=txt   
    
}

function getText(){
    return gMeme.txts[gMeme.selectedTxtIdx]
}

function saveSelectedImgId(id){
    gMeme.selectedImgId=id
}

function getImageId(){
    return gMeme.selectedImgId
}

function changeFontSize(diff){
    gMeme.txts[gMeme.selectedTxtIdx].size+=diff

}