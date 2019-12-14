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



function getImageByID(id){
    var curImage=gImgs.find(function(img){
        return img.id===id
    })
    
    return curImage.url
}