'use strict'

function init(){
    renderGallery()

}

function renderGallery(){
    var imgStr=gImgs.map(function(img){
        return `<img onclick=renderCancas() src="${img.url}">`
    })

    var elMain=document.querySelector('.gallery')
    elMain.innerHTML=imgStr.join('')
}

