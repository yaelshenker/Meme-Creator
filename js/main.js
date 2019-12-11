'use strict'
var gCanvas;
var gCtx;
var gImg;
var isImgClicked = false
var gTextStartX = 20
var gTextStartY = 80
var gLineInterval;
var gIsMove = false;

function init() {
    renderGallery()
    document.addEventListener('mouseup',function(){
        clearInterval(gLineInterval)
    })


}

function renderGallery() {
    var imgStr = gImgs.map(function (img) {
        return `<img data-id=${img.id} class="image${img.id}" onclick=onImageClick(this,${img.id}) src="${img.url}">`
    })

    var elMain = document.querySelector('.gallery')
    elMain.innerHTML = imgStr.join('')
}

function renderCanvas(el, id) {
    gCanvas = document.querySelector('#meme-canvas');
    gCtx = gCanvas.getContext('2d')
    gCanvas.width = 500
    gCanvas.height = 500
    // window.addEventListener('resize',
    //     function () {
    //         gCanvas.width = window.innerWidth/2
    //         gCanvas.height = window.innerHeight/2

    //     })

}

function onMoveLine(diff) {
    gIsMove = true
    if(gIsMove){
        
        gLineInterval = setInterval(function () {
            console.log('interval')
            gTextStartY += diff
            drawImg()
            drawText(gTextStartX, gTextStartY)
        }, 500)
        
    }

}
// function stopMove(){
//     console.log('stop')
//     gIsMove=false
//     clearInterval(gLineInterval)
//     gLineInterval=null
// }

function onFontChane(diff) {
    changeFontSize(diff)
    drawImg()
    drawText(gTextStartX, gTextStartY)
}

function onImageClick(el, id) {
    console.log(id)
    saveSelectedImgId(id)
    var elCanvasCont = document.querySelector('.canvas-container')
    var elGallery = document.querySelector('.gallery')
    console.log(elGallery)
    elGallery.style.display = 'none'
    elCanvasCont.style.display = 'flex'
    renderCanvas(el, id)
    drawImg()

}

function drawText(x, y) {
    var txt = getText()
    console.log(txt)
    var size = txt.size
    console.log(size)

    gCtx.font = size + 'px Impact'
    gCtx.save()
    gCtx.strokeStyle = txt.color
    // gCtx.fillText(txt.line, x, y);
    gCtx.strokeText(txt.line, x, y);
    gCtx.restore()
}

function onTyping() {
    var elInput = document.querySelector('.input')
    var text = elInput.value
    saveText(text)
    drawImg()
    drawText(gTextStartX, gTextStartY)
}

function drawImg() {
    gImg = new Image()
    var curImageId = getImageId()
    gImg.src = `img/${curImageId}.jpg`
    gCtx.drawImage(gImg, 0, 0, gCanvas.width, gCanvas.height)

}



