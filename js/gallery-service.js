'use strict'

var gId=1

var gImgs =[
{id: gId, url: `img/${gId++}.jpg`, keywords: ['happy']},
{id: gId, url: `img/${gId++}.jpg`, keywords: ['happy']},
{id: gId, url: `img/${gId++}.jpg`, keywords: ['happy']},
{id: gId, url: `img/${gId++}.jpg`, keywords: ['happy']},
{id: gId, url: `img/${gId++}.jpg`, keywords: ['happy']},
{id: gId, url: `img/${gId++}.jpg`, keywords: ['happy']},
{id: gId, url: `img/${gId++}.jpg`, keywords: ['happy']},
{id: gId, url: `img/${gId++}.jpg`, keywords: ['happy']},
{id: gId, url: `img/${gId++}.jpg`, keywords: ['happy']},
{id: gId, url: `img/${gId++}.jpg`, keywords: ['happy']},
{id: gId, url: `img/${gId++}.jpg`, keywords: ['happy']},
{id: gId, url: `img/${gId++}.jpg`, keywords: ['happy']},
{id: gId, url: `img/${gId++}.jpg`, keywords: ['happy']},
{id: gId, url: `img/${gId++}.jpg`, keywords: ['happy']},
{id: gId, url: `img/${gId++}.jpg`, keywords: ['happy']},
{id: gId, url: `img/${gId++}.jpg`, keywords: ['happy']},
{id: gId, url: `img/${gId++}.jpg`, keywords: ['happy']},
{id: gId, url: `img/${gId++}.jpg`, keywords: ['happy']},

];

console.log(gImgs)

function getImageByID(id){
    var curImage=gImgs.find(function(img){
        return img.id===id
    })
    console.log(curImage.url)
    return curImage.url
}