var ctx;
var iron_man,iron_man_pulse;
var thanos,thanos_pulse;
var explosion;
var middle=540, pulse_length1=230, pulse_length2=230;
var instructions=[];

function instruction_generator(){
    $('#start-btn').css('display','none');
    var up,down,left,right;
    up=new Image();
    up.src='canvas/up.png';//0
    down=new Image();
    down.src='canvas/down.png';//1
    left=new Image();
    left.src='canvas/left.png';//2
    right=new Image();
    right.src='canvas/right.png';//3

    right.onload=()=>{
        var ins_num=Math.floor(Math.random()*4)+3;//3~6
        for(var i=0; i<ins_num; ++i){
            instructions.push(Math.floor(Math.random()*4));//0~4
        }

        const dir=d=>{
            switch(d){
                case 0:
                    return up;
                case 1:
                    return down;
                case 2:
                    return left;
                case 3:
                    return right;
            }
        }

        for(var n in instructions){
            ctx.drawImage(dir(instructions[n]),0,0,100,100,(940-(ins_num*70+(ins_num-1)*20))/2+n*90,80,70,70);
        }
        instructions=instructions.reverse();
    }
}

$(document).keydown(function(e){
    //e.preventDefault();

    const length=instructions.length;
    console.log(instructions);
    if(length>0){
        switch(e.which){
            case 38:
                if(instructions[length-1]==0){
                    instructions.pop();
                }
                break;
            case 40:
                if(instructions[length-1]==1){
                    instructions.pop();
                }
                break;
            case 37:
                if(instructions[length-1]==2){
                    instructions.pop();
                }
                break;
            case 39:
                if(instructions[length-1]==3){
                    instructions.pop();
                }
                break;
            default:
                break;
        }
        if(instructions.length==0){
            success();
            ctx.clearRect(0,0,490,200);
        }
    }
})

function success(){
    if(middle==510 || middle==540){
        middle+=30;
        pulse_length1+=30;
        pulse_length2-=30;
    }
    else{
        middle+=50;
        pulse_length1+=50;
        pulse_length2-=50;
    }

    ctx.clearRect(0,0,940,495);

    if(pulse_length2==0){
        thanos.src='canvas/thanos2.png';
        thanos.onload=()=>{
            ctx.drawImage(iron_man,0,0,501,386,20,225,324,250);
            ctx.drawImage(thanos,0,0,198,243,700,230,202,250);
            ctx.drawImage(iron_man_pulse,0,0,325,79,middle-pulse_length1,245,pulse_length1+20,40);
            ctx.drawImage(explosion,0,0,79,73,middle-40+20,225,79,73);
        }
    }
    else{
        ctx.drawImage(iron_man,0,0,501,386,20,225,324,250);
        ctx.drawImage(thanos,0,0,212,288,738,230,182,250);
        ctx.drawImage(iron_man_pulse,0,0,325,79,middle-pulse_length1,245,pulse_length1,40);
        ctx.drawImage(thanos_pulse,0,0,451,74,middle-10,245,pulse_length2,40);
        ctx.drawImage(explosion,0,0,79,73,middle-40,225,79,73);
        instruction_generator();
    }
}

function fail(){
    if(middle==540 || middle==570){
        middle-=30;
        pulse_length1-=30;
        pulse_length2+=30;
    }
    else{
        middle-=50;
        pulse_length1-=50;
        pulse_length2+=50;
    }
  

    if(pulse_length1==0){
        ctx.clearRect(0,0,940,495);
        iron_man.src='canvas/iron_man2.png';
        iron_man.onload=()=>{
            ctx.drawImage(iron_man,0,0,283,446,100,225,157,250);
            ctx.drawImage(thanos,0,0,212,288,738,230,182,250);
            ctx.drawImage(thanos_pulse,0,0,451,74,middle-10-120,245,pulse_length2+120,40);
            ctx.drawImage(explosion,0,0,79,73,middle-40-120,225,79,73);
        }
        var thanos_snap=new Image();
        thanos_snap.src='canvas/thanos3.png';
        thanos_snap.onload=()=>{
            ctx.drawImage(thanos_snap,0,0,940,495,0,0,940,495);
        }
        setTimeout(snap,1000);
    }
    else{
        ctx.clearRect(0,200,940,295);
        ctx.drawImage(iron_man,0,0,501,386,20,225,324,250);
        ctx.drawImage(thanos,0,0,212,288,738,230,182,250);
        ctx.drawImage(iron_man_pulse,0,0,325,79,middle-pulse_length1,245,pulse_length1,40);
        ctx.drawImage(thanos_pulse,0,0,451,74,middle-10,245,pulse_length2,40);
        ctx.drawImage(explosion,0,0,79,73,middle-40,225,79,73);
    }
}

$(document).ready(function(){
    ctx=$('#myCanvas')[0].getContext('2d');

    iron_man=new Image();
    iron_man.src='canvas/iron_man1.png';
    thanos=new Image();
    thanos.src='canvas/thanos1.png';
    iron_man_pulse=new Image();
    iron_man_pulse.src='canvas/pulse1.png';
    thanos_pulse=new Image();
    thanos_pulse.src='canvas/pulse2.png';
    explosion=new Image();
    explosion.src='canvas/explosion.png';

    $('#start-btn').click(()=>{
		//after last image done loading
		explosion.onload=()=>{
			ctx.drawImage(iron_man,0,0,501,386,20,225,324,250);
			ctx.drawImage(thanos,0,0,212,288,738,230,182,250);
			ctx.drawImage(iron_man_pulse,0,0,325,79,310,245,230,40);
			ctx.drawImage(thanos_pulse,0,0,451,74,530,245,230,40);
			ctx.drawImage(explosion,0,0,79,73,500,225,79,73);
		}
        instruction_generator();
        setInterval(()=>{
            if(pulse_length1!=0 && pulse_length2!=0){
                fail();
            }
        },3000);
    });
});



const layerCount=64;
const $effect=$('#effect');
const $target=$('#myCanvas');
const target=$target[0];

function snap(){
    const bRect = target.getBoundingClientRect();
    $effect.css({
      left: bRect.left,
      top: bRect.top,
      width: bRect.width,
      height: bRect.height
    });

    html2canvas(target, {
        backgroundColor: null,
    }).then(canvas=>{
        const context = canvas.getContext('2d');
        const { width, height } = canvas;

        // get element imageData
        const imgData = context.getImageData(0, 0, width, height);

        // init empty imageData
        const effectImgDatas = [];
        for (let i = 0; i < layerCount; i++) {
            effectImgDatas.push(context.createImageData(width, height));
        }
        sampler(effectImgDatas, imgData, width, height, layerCount);

        // create cloned canvases
        for (let i = 0; i < layerCount; i++) {
            const canvasClone = canvas.cloneNode();
            canvasClone.getContext('2d').putImageData(effectImgDatas[i], 0, 0);

            const $canvas = $(canvasClone);
            const transitionDelay = 3 * (i / layerCount);
            $canvas.css('transition-delay', `${transitionDelay}s`);
            $effect.append($canvas);

            delay(0).then(() => {
                const rotate1 = 15 * (Math.random() - .5);
                const rotate2 = 15 * (Math.random() - .5);
                const fac = 2 * Math.PI * (Math.random() - .5);
                const translateX = 60 * Math.cos(fac);
                const translateY = 30 * Math.sin(fac);

                $canvas.css({
                    transform: `rotate(${rotate1}deg) translate(${translateX}px, ${translateY}px) rotate(${rotate2}deg)`,
                    opacity: 0
                });

                const removeDelay = 1e3 * (1.5 + 1 + Math.random());
                delay(removeDelay).then(() => {
                    $canvas.remove();
                });
            });

            hideTarget();
        }
    });
}

function sampler(imgDatas, sourceImgData, width, height, layerCount) {
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        for (let l = 0; l < 2; l++) {
          // random piece index which tend to grow with x
          const pieceIndex = Math.floor(layerCount * (Math.random() + 2 * x / width) / 3);
        const pixelPos = 4 * (y * width + x);
        for (let rgbaIndex = 0; rgbaIndex < 4; rgbaIndex++) {
            const dataPos = pixelPos + rgbaIndex;
            imgDatas[pieceIndex].data[dataPos] = sourceImgData.data[dataPos];
        }
      }
    }
  }
}

function delay(ms) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve()
    }, ms);
  })
}

const hideTarget = () => {
    $target.css({
      'transition': `opacity 1.5 ease`,
    opacity: 0
  });
  delay(1e3 * 1.5).then(() => {
      $target.css('visibility', 'hidden');
  });
};