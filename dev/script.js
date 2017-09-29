/**
 * Frame-by-frame video animation with ScrollMagic and GSAP
 * 
 * Note that your web server must support byte ranges (most do).
 * Otherwise currentTime will always be 0 in Chrome.
 * See here: http://stackoverflow.com/a/5421205/950704
 * and here: https://bugs.chromium.org/p/chromium/issues/detail?id=121765
 */

function init() {

  var myvideo = document.getElementById('video');
  var long = document.getElementById('long');
  var scrollpos = 0;
  var lastpos;
  var controller = new ScrollMagic.Controller();
  var scene = new ScrollMagic.Scene({
    triggerElement: long,
    triggerHook: "onEnter"
  });
  var startScrollAnimation = () => {
    scene
      .addTo(controller)
      .duration(long.clientHeight)
      .on("progress", (e) => {
        scrollpos = e.progress;
      });

    setInterval(() => {
      if (lastpos === scrollpos) return;
      requestAnimationFrame(() => {
        video.currentTime = video.duration * scrollpos;
        video.pause();
        lastpos = scrollpos;
         console.log(video.currentTime, scrollpos);
      });
    }, 50);
  };

  var preloadVideo = (v, callback) => {
    var ready = () => {
      v.removeEventListener('canplaythrough', ready);

      video.pause();
      var i = setInterval(function() {
        if (v.readyState > 3) {
          clearInterval(i);
          video.currentTime = 0;
          callback();
        }
      }, 50);
    };
    v.addEventListener('canplaythrough', ready, false);
    v.play();
  };

  preloadVideo(video, startScrollAnimation);


  
}
// startScrollAnimation();