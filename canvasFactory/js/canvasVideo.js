var haha = document.getElementById('haha');
context = haha.getContext('2d');
var video = document.getElementById('video');

function animate() {
    // if(!video.ended){
    console.log('sss')        
    context.drawImage(video, 0, 0, haha.width, haha.height);
    window.webkitRequestAnimationFrame(animate);
    // }
}

// video.onload = function (e) {
//     console.log('load');
    video.play();
    window.webkitRequestAnimationFrame(animate);
// }

// console.log(window.webkitRequestAnimationFrame);