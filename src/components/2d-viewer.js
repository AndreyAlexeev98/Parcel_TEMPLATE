import React from "react";

export class Viewer2D extends React.Component {
 
  componentDidMount() {
    const rootComponent = document.querySelector('.viewer-2d');
    const img2D = rootComponent.querySelector('.viewer-2d__img');
    
    // Яркость / контрастнорсть
    ;(function setFilters() {
  
      const btnIncrementContrast = document.querySelector('#incrimentContrast');
      const btnDecrementContrast = document.querySelector('#decrementContrast');
      const btnIncrementBrightness = document.querySelector('#incrimentBrightness');
      const btnDecrementBrightness = document.querySelector('#decrementBrightness');
    
      let countContrast = 1;
      let countBrightness = 1;
    
      btnIncrementContrast.addEventListener('click', () => {
        countContrast = countContrast + .5;
        img2D.style.filter = `contrast(${countContrast}) brightness(${countBrightness})`;
        return countContrast;
      });
      
      btnDecrementContrast.addEventListener('click', () => {
        countContrast = countContrast - 0.5;
        img2D.style.filter = `contrast(${countContrast}) brightness(${countBrightness})`;
        return countContrast;
      });
    
      btnIncrementBrightness.addEventListener('click', () => {
        countBrightness = countBrightness + .5;
        img2D.style.filter = `contrast(${countContrast}) brightness(${countBrightness})`;
        return countBrightness;
      });
      
      btnDecrementBrightness.addEventListener('click', () => {
        countBrightness = countBrightness - 0.5;
        img2D.style.filter = `contrast(${countContrast}) brightness(${countBrightness})`;
        return countBrightness;
      });
    })();
   
    // Canvas
    ;(function setCanvas(){
    
      const btnLine = rootComponent.querySelector('#getLineBtn');
      const btnDraw = rootComponent.querySelector('#getDrawBtn');
      const toggleElems = rootComponent.querySelectorAll('.canvas-btn');
      const theCanvas = document.getElementById('canvas2d');
      const ctx = theCanvas.getContext('2d');
      
      if (theCanvas.getContext) {
        getCanvasState();
      } else {
        alert('Ваш браузер не поддерживает некоторые функции редактора 2D исследований'); 
      }
    
      // Определяем нужное состояние canvas (линейка, рисование, неактивный холст)
      function getCanvasState() {
    
        toggleElems.forEach(item => {
          item.addEventListener('click', (e) => {
            for (let i of toggleElems) {
              if (i !== item) {
                i.classList.remove('active');
              }
            }
            if(item.classList.contains('active')) {
              item.classList.remove('active');
              setCanvasState(false);
            } else {
              item.classList.add('active');
              setCanvasState(item);
            }
          });
        });
      };
    
      // Задаем состояние canvas (линейка, рисование, неактивный холст)
      function setCanvasState(item) {
        
        if(item && item.getAttribute('id') === 'getLineBtn') {
          ctx.reset();
          getLine(); 
          rootComponent.querySelector('.canvas-disactive').style.display = 'none';
        }
        if(item && item.getAttribute('id') === 'getDrawBtn') {
          ctx.reset();
          getDraw();
          rootComponent.querySelector('.canvas-disactive').style.display = 'none';
        }
        if(!item) {
          rootComponent.querySelector('.canvas-disactive').style.display = 'block';
        }
      };
      
      // Линейка
      function getLine() {
        let letsdraw;
        
        theCanvas.width = theCanvas.clientWidth;
        theCanvas.height = theCanvas.clientHeight;
      
        const canvasOffset = theCanvas.getBoundingClientRect();
        
        theCanvas.addEventListener('mousemove', function(e) {
        // Кнопка мыши двигается и нажата
          if (letsdraw && btnLine.classList.contains('active')) {
    
            ctx.clearRect(0,0,theCanvas.width,theCanvas.height);
            
            ctx.moveTo(letsdraw.x, letsdraw.y);
      
            const pi = Math.PI;
            ctx.fillStyle = '#ccc';
            ctx.arc(letsdraw.x, letsdraw.y, 4, 0, 2*pi, false); // центр круга arc(cx,cy,r,degStart,degEnd, направление - false по часовой)
            ctx.stroke();
            ctx.fill();
      
            ctx.beginPath();
            ctx.strokeStyle = 'blue';
            ctx.lineWidth = 2;
            ctx.moveTo(letsdraw.x, letsdraw.y);
            ctx.lineTo(e.pageX - canvasOffset.left, e.pageY - canvasOffset.top);
            ctx.stroke();
            ctx.fill();
      
            ctx.beginPath();
            ctx.arc(e.pageX - canvasOffset.left, e.pageY - canvasOffset.top, 4, 0, 2*pi, false);
            ctx.stroke();
            ctx.fill();
            
            ctx.font = "bold 14px Arial";
            ctx.textBaseline = "center";
            ctx.textAlign = "center";
            ctx.fillStyle = 'blue';
      
            function getTextMargin(value) {
                if (letsdraw.x < e.pageX - canvasOffset.left) {
                    return letsdraw.x - value;
                } else {
                    return letsdraw.x + value;
                }
            }
            ctx.fillText(Math.round(Math.sqrt( (e.pageX - canvasOffset.left - letsdraw.x)**2 + (e.pageY - canvasOffset.top - letsdraw.y)**2 )) + 'px', getTextMargin(30), letsdraw.y);
          }
        });
        
        theCanvas.addEventListener('mousedown', function(e) {
          if (btnLine.classList.contains('active')) {
            letsdraw = {
              x:e.pageX - canvasOffset.left,
              y:e.pageY - canvasOffset.top
            }
            console.log('Обработчик mouse down');
          }
        });
      
        window.addEventListener('mouseup', function() {
          letsdraw = null;
        });
      }
    
      // Рисовать
      function getDraw() {
        theCanvas.width = img2D.clientWidth;
        theCanvas.height = img2D.clientHeight;
    
        var myColor = 'black';
        var rSize = 1;
    
        document.getElementById('size').oninput = function() {
          rSize = this.value;
        }
    
        document.getElementById("color").oninput = function() {
          myColor = this.value; 
        }
    
        theCanvas.onmousedown = function(event) {
          var x = event.offsetX;
          var y = event.offsetY;
          ctx.beginPath();
          ctx.moveTo (x,y);
          ctx.drawing = true;
        }
    
        theCanvas.onmousemove = function (event) {
          if (ctx.drawing) {
            var x = event.offsetX;
            var y = event.offsetY;
            ctx.lineWidth = rSize
            ctx.strokeStyle = myColor
            ctx.lineCap = "round"
            ctx.lineTo (x,y)
            ctx.stroke()
          }
        }
    
        document.onmouseup = function() {
          ctx.drawing = false;
        }
    
        document.getElementById('pClear').onclick = function() {
          ctx.beginPath();
          ctx.clearRect(0, 0, theCanvas.clientWidth, theCanvas.clientHeight);
        }
      };
    
    })();
  }

  render() {
    return ( 
      <div>
        <div className="viewer-2d">
          <div className="viewer-2d-wrapper">
            <img className="viewer-2d__img" role="presentation" src={this.props.data}/>
            <canvas className="viewer-2d__canvas" id="canvas2d">Ваш браузер не поддерживает все возможности редактора</canvas>
            <div className="canvas-disactive"></div>
          </div>
          
          <div className="viewer-2d__controlls">
            <span>Яркость:</span>
            <button id="incrimentBrightness">+</button>
            <button id="decrementBrightness">-</button>
            <span>Контрастность:</span>
            <button id="incrimentContrast">+</button>
            <button id="decrementContrast">-</button>
            <button className="canvas-btn" id="getLineBtn">линейка</button>
            <button className="canvas-btn" id="getDrawBtn">Рисовать</button>
            <br/>
            <br/>
            
            <div className="panel">
                <input type="color" id="color"/>
                <input type="button" id="pClear" value="clear"/> 
                <select id="size">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </select>
            </div>

          </div>
        </div>
      </div>
    ) 
  }

}
