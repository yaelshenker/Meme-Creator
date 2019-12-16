'use strict';
var gCanvas;
var gCtx;
var gImg;
// var gSavedImgs = []
// var isImgClicked = false;
var gLineInterval;
var gIsMove = false;
var gIsTyping = false;

function init() {
   renderGallery();
   document.addEventListener('mouseup', function () {
      clearInterval(gLineInterval);
   });
}

function onMemesClick() {
   renderMemesGallery()
   var elCanvasCont = document.querySelector('.canvas-container');
   var elGallery = document.querySelector('.gallery');
   var elMemesGallery = document.querySelector('.memes-gallery')
   elGallery.style.display = 'none';
   elCanvasCont.style.display = 'none';
   elMemesGallery.style.display = 'flex';

}

function onSave() {
   var img = gCanvas.toDataURL("image/jpeg");
   loadSavedMemes()
   saveMemeAsImg(img)
   renderMemesGallery()
   document.querySelector('.memes-gallery').style.display = 'flex'
   var elCanvasCont = document.querySelector('.canvas-container');
   elCanvasCont.style.display = 'none';

}

function renderMemesGallery() {
   var memes = loadSavedMemes()
   var memesStr = memes.map(function (meme) {
      return `<div class="gallery-item"><img class="memes-item" src="${meme}" alt="">
      
      </div>`
   })
   var elMemesGallery = document.querySelector('.memes-gallery')
   elMemesGallery.innerHTML = memesStr.join('')

}

function uploadImg(elForm, ev) {
   ev.preventDefault();
   document.getElementById('imgData').value = gCanvas.toDataURL("image/jpeg");

   // A function to be called if request succeeds
   function onSuccess(uploadedImgUrl) {
      uploadedImgUrl = encodeURIComponent(uploadedImgUrl)
      document.querySelector('.share-container').innerHTML = `
       <a class="btn" href="https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
       <i class="fab fa-facebook"></i>
       </a>`
   }

   doUploadImg(elForm, onSuccess);
}

function doUploadImg(elForm, onSuccess) {
   var formData = new FormData(elForm);
   fetch('http://ca-upload.com/here/upload.php', {
      method: 'POST',
      body: formData
   })
      .then(function (res) {
         return res.text()
      })
      .then(onSuccess)
      .catch(function (err) {
         console.error(err)
      })
}



function onGalleryClick() {
   clearMeme()
   changeInput()
   renderGallery()
   var elCanvasCont = document.querySelector('.canvas-container');
   var elGallery = document.querySelector('.gallery');
   var elMemesGallery = document.querySelector('.memes-gallery')
   elGallery.style.display = 'flex';
   elCanvasCont.style.display = 'none';
   elMemesGallery.style.display = 'none'


}

function renderGallery() {
   var imgStr = gImgs.map(function (img) {
      return `
        <div class="gallery-item" >
            <img data-id=${img.id} class="gallery-img image${img.id}" onclick=onImageClick(this,${img.id}) src="${img.url}">
        </div>`;
   });

   var elMain = document.querySelector('.gallery');
   elMain.innerHTML = imgStr.join('');
}

function renderCanvas(el, id) {
   gCanvas = document.querySelector('#meme-canvas');
   var elMainContainer = document.querySelector('#main-container');
   console.log(elMainContainer.getBoundingClientRect());
   var area = elMainContainer.getBoundingClientRect();
   console.log('area.height', area.width);
   gCtx = gCanvas.getContext('2d');
   if (window.innerWidth < 740) {
      gCanvas.width = area.width * 0.9
      gCanvas.height = area.width * 0.9
   }
   else {
      gCanvas.width = area.height * 0.9
      gCanvas.height = area.height * 0.9

   }

}

function onMoveLine(diff) {
   gLineInterval = setInterval(function () {
      changeLinePos(diff);
      drawImg();
      drawText();
   }, 50);
}

function onFontChane(diff) {
   changeFontSize(diff);
   drawImg();
   drawText();
}

function onImageClick(el, id) {
   saveSelectedImgId(id);
   var elCanvasCont = document.querySelector('.canvas-container');
   var elGallery = document.querySelector('.gallery');

   elGallery.style.display = 'none';
   elCanvasCont.style.display = 'flex';
   renderCanvas(el, id);
   drawImg();
}

function drawText() {
   var txts = getText();
   txts.forEach(function (txt) {
      gCtx.font = txt.size + 'px Impact';
      gCtx.save();
      gCtx.fillStyle = '#000000'
      gCtx.strokeStyle = txt.color;
      // gCtx.fillText(txt.line, x, y);
      gCtx.strokeText(txt.line, txt.startX, txt.startY);
      gCtx.fillText(txt.line, txt.startX, txt.startY);
      gCtx.restore();
   });
}

function onColorChange(el) {
   changeColor(el.value);
   drawImg();
   drawText();
}

function onTyping() {
   gIsTyping = true;
   var elInput = document.querySelector('.input');
   var text = elInput.value;
   saveText(text);
   changeInput();
   setLineStartY(gCanvas)
   setTimeout(function () {
      if (!gIsTyping) {
         drawImg();
         drawText();
      }
   }, 3000);
   drawImg();
   drawText();
   if (gIsTyping) {
      drawRect();
   }
   gIsTyping = false;
   // drawImg()
}

function drawImg() {
   gImg = new Image();
   var curImageId = getImageId();
   gImg.src = `img/${curImageId}.jpg`;
   gCtx.drawImage(gImg, 0, 0, gImg.width, gImg.height, 0, 0, gCanvas.width, gCanvas.height);
}

function onsSwitchRow() {
   changeTextIdx();
   setLineStartY(gCanvas);
   changeInput();
   setTimeout(function () {
      drawImg();
      drawText();
   }, 3000);

   drawImg();
   drawText();
   drawRect();
}

function changeInput() {
   var meme = getMeme();
   var elInput = document.querySelector('.input');
   var elColorInput = document.querySelector('.color');
   elInput.value = meme.txts[meme.selectedTxtIdx].line;
   elColorInput.value = meme.txts[meme.selectedTxtIdx].color;
}

function drawRect() {
   gCtx.save();
   var meme = getMeme();
   var x = meme.txts[meme.selectedTxtIdx].startX;
   var size = meme.txts[meme.selectedTxtIdx].size;
   var y = meme.txts[meme.selectedTxtIdx].startY - size;
   gCtx.beginPath();
   var textWidth = gCtx.measureText(meme.txts[meme.selectedTxtIdx].line).width;
   gCtx.rect(x, y, textWidth, size + 10);
   gCtx.stroke();
   // gCtx.closePath()
   gCtx.restore();
}

// function clearRect() {
//    gCtx.save();
//    var meme = getMeme();
//    var x = meme.txts[meme.selectedTxtIdx].startX;
//    var size = meme.txts[meme.selectedTxtIdx].size;
//    var y = meme.txts[meme.selectedTxtIdx].startY - size;
//    var textWidth = gCtx.measureText(meme.txts[meme.selectedTxtIdx].line).width;
//    // gCtx.beginPath()
//    gCtx.clearRect(x, y, textWidth, size + 10);
//    gCtx.restore();
// }

function downloadCanvas(elLink) {
   var data = gCanvas.toDataURL();
   elLink.href = data;
   elLink.download = 'my-meme.png';
}


function onAddLine() {
   addText();
   // changeTextIdx()
   setLineStartY(gCanvas);
   changeInput();
   drawImg();
   drawText();
   drawRect();
}
