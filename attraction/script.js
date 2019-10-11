//HTML要素
var $vehicle = $('.vehicle');
var $button = $('.button');
var $lock = $('.lock');
var $gate = $('.gate-lock');
var $gest = $('.gest');
var $lap = $('.lap');

//チェック
var dis = false;
var gate = false;
var lap = false;

//ステータスチェック
var gatestate = false;
var lapstate = false;
var lockstate = false;

//ゲートチェック
var gestck = false;

//出発音
function bell() {
   document.getElementById("sound").play(); 
}

//ステータス画面
function state() {
    if(gatestate === true) {
        if(lapstate === true) {
            if(lockstate === true) {
                $('.state').text('YES');
                $('.state').css('background-color', 'chartreuse');
            } else {
                $('.state').text('NO');
                $('.state').css('background-color', 'red');
            };
        } else {
            $('.state').text('NO');
            $('.state').css('background-color', 'red');
        };
    } else {
        $('.state').text('NO');
        $('.state').css('background-color', 'red');
    };
}

//ディスパッチ
function disdis() {
    if(dis === false) {
        $('.dis-dis').text('LOCK');
        $('.dis-dis').css('background-color', 'red');
        
    } else {
        $('.dis-dis').text('UNLOCK');
        $('.dis-dis').css('background-color', 'chartreuse');
    }
}

//ラップ
function lapdis() {
    if(lap === false) {
        $('.lap-dis').text('UNLOCK');
        $('.lap-dis').css('background-color', 'chartreuse');
    } else {
        $('.lap-dis').text('LOCK');
        $('.lap-dis').css('background-color', 'red');
    }
}

//ゲート
function gatedis() {
    if(gate === false) {
        $('.gate-dis').text('CLOSE');
        $('.gate-dis').css('background-color', 'red');
    } else {
        $('.gate-dis').text('OPEN');
        $('.gate-dis').css('background-color', 'chartreuse');
    }
}

$gate.on('click', function(){
    if(gate === false) {
        $(".gate-text").text("OPEN");
        $('.gate').css('background-color','chartreuse');
        gate = true;
        if(gestck === false) {
            $gest.toggleClass('gest-go');
        }
        gatedis();
        gatestate = false;
        state();
        gestck = true;
    } else {
        $(".gate-text").text("CLOSE");
        $('.gate').css('background-color','red');
        gate = false;
        gatedis();
        gatestate = true;
        state();
    }
});

$lock.on('click', function(){
    dis = true;
    $('.button').css('background-color','chartreuse');
    $('.lock').css('background-color', 'cadetblue');
    console.log("unlock");
    disdis();
    lockstate = true;
    state();
});

$lap.on('click', function() {
    if(lap === false) {
        $('.lap').css('background-color', 'cadetblue');
        lap = true;
        lapdis();
        state();
        lapstate = true;
        state();
    } else {
        $('.lap').css('background-color', 'chartreuse');
        lap = false;
        lapdis();
        lapstate = false;
        state();
    }
});


if(gestck === true) {
    $('.gest2').toggleClass('gest2-go');
    $gest.toggleClass('gest-go2'); 
}

$button.on('click', function(){
  if(dis === true) {
      if(gate === false) {
          if(lap === false) {
              alert("OPERATION MISS!!");
          } else {
              bell();
              console.log(gestck);
              setTimeout(function(){
                  $vehicle.toggleClass('active');
                  if(gestck === true) {
                        $('.gest2').toggleClass('gest2-go');
                        $gest.toggleClass('gest-go2'); 
                    }
              },2000);
              setTimeout(function(){
                  $('.vehicle').toggleClass('active');
                  $('.button').css('background-color','red');
                  dis = false;
                  $gest.toggleClass('gest-go');
                  $gest.toggleClass('gest-go2');
                  $('.gest2').toggleClass('gest2-go');
                  $('.lap').css('background-color', 'chartreuse');
                  $('.lock').css('background-color', 'chartreuse');
                  lap = false;
                  gestck = false;
                  gatestate = false;
                  lapstate = false;
                  lockstate = false;
                  lapdis();
                  gatedis();
                  disdis();
                  state();
              },6000);
          };
      } else {
          alert("OPERATION MISS!!");
      };
      
  } else {
      alert("OPERATION MISS!!");
  }
});
