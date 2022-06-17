export function BMPGL(ak) {
  return new Promise(function (resolve, reject) {
    window.init = function () {
      // eslint-disable-next-line
     resolve(BMapGL)
    };
    const script = document.createElement("script");
    const script1 = document.createElement("script");
    script.type = "text/javascript";
    script1.type = "text/javascript";
    script.src = `http://api.map.baidu.com/api?v=1.0&type=webgl&ak=${ak}&callback=init`;
    script1.src = `http://mapopen.bj.bcebos.com/github/BMapGLLib/TrackAnimation/src/TrackAnimation.min.js`;
    script.onerror = reject;
    script1.onerror = reject;
    document.head.appendChild(script);
    document.head.appendChild(script1);
  });
}
