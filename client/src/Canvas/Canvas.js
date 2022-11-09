import React, { useRef, useEffect } from 'react'

const Canvas = () => {
    const canvasRef = useRef(null);

    const draw = (context) => {
        var col = function(context, x, y, r, g, b) {
            context.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
            context.fillRect(x, y, 1,1);
          }
          var R = function(x, y, t) {
            return( Math.floor(192 + 64*Math.cos( (x*x-y*y)/300 + t )) );
          }
          
          var G = function(x, y, t) {
            return( Math.floor(192 + 64*Math.sin( (x*x*Math.cos(t/4)+y*y*Math.sin(t/3))/300 ) ) );
          }
          
          var B = function(x, y, t) {
            return( Math.floor(192 + 64*Math.sin( 5*Math.sin(t/9) + ((x-100)*(x-100)+(y-100)*(y-100))/1100) ));
          }
          
          var t = 0;
          
          var run = function(context) {
            for( var x=0;x<=35;x++) {
              for(var y=0;y<=35;y++) {
                col(context, x, y, R(x,y,t), G(x,y,t), B(x,y,t));
              }
            }
            t = t + 0.05;
            window.requestAnimationFrame(run);
          }
        run(context);
    }

    useEffect(() => {
        const c = canvasRef.current;
        const context = c.getContext('2d');

        draw(context)
    }, [draw])

    return <canvas ref={canvasRef} id="canv" width="32" height="32" />
}

export default Canvas;