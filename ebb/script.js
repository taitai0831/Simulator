var $hatch = $('.hatch');
var $estop = $('.estop');
var $dis = $('.dis');
var $lock = $('.lock');
var $gate = $('.gate');
var $border= $('.border');
var $guest1 = $('.guest-1');
var $guest2 = $('.guest-2');
var $guest3 = $('.guest-3');

var $guest12 = $('.guest-1-2');
var $guest22 = $('.guest-2-2');
var $guest32 = $('.guest-3-2');

var dis = false;
var gate = false;
var estop = false;
var guestride = false;


var gatestate = false;
var estopstate = false;
var lockstate = false;

var guestck = false;

var disblocker = false;
function bell() {
   document.getElementById("sound").play(); 
}

function state() {
    if(gatestate === true) {
        if(lapstate === true) {
            if(lockstate === true) {
                $('.dis-dis').text('Dispatch Enabled');
                $('.dis-dis').css('background-color', 'chartreuse');
            } else {
                $('.dis-dis').text('Dispatch Disabled');
                $('.dis-dis').css('background-color', 'red');
            };
        } else {
            $('.dis-dis').text('Dispatch Disabled');
            $('.dis-dis').css('background-color', 'red');
        };
    } else {
        $('.dis-dis').text('Dispatch Disabled');
        $('.dis-dis').css('background-color', 'red');
    };
}

function reset() {
    $('.vehicle-1').toggleClass('vehicle-go-1');
    $('.vehicle-2').toggleClass('vehicle-go-1');
    $('.vehicle-3').toggleClass('vehicle-go-1');
    $('.vehicle-1').toggleClass('vehicle-go-2');
    $('.vehicle-2').toggleClass('vehicle-go-2');
    $('.vehicle-3').toggleClass('vehicle-go-2');
    $('.vehicle-1').css('display', 'block');
    $('.vehicle-2').css('display', 'block');
    $('.vehicle-3').css('display', 'block');
    setTimeout(function(){
        disblocker = false;
        dis = false;
        gate = false;
        estop = false;
        gatestate = false;
        estopstate = false;
        lockstate = false;
        guestck = false;
        guestride = false;
        $guest1.toggleClass('guest-go');
        $guest2.toggleClass('guest-go');
        $guest3.toggleClass('guest-go');
        $lock.css('background-color', 'chartreuse');
        $dis.css('background-color', 'red');
        $('.guest-1').css('display', 'block');
        $('.guest-2').css('display', 'block');
        $('.guest-3').css('display', 'block');
        $('.guest-1-2').css('display', 'none');
        $('.guest-2-2').css('display', 'none');
        $('.guest-3-2').css('display', 'none');
    },5000);
}

$estop.on('click', function(){
    estop = true;
    $estop.css('width', '3.8vw');
    $estop.css('height', '3.8vw');
    window.alert(">>> E-STOP <<<");
    $('.dis-dis').text('>>> E-STOP <<<');
    $('.dis-dis').css('background-color', 'red');
    $('.gate-dis').text('>>> E-STOP <<<');
    $('.gate-dis').css('background-color', 'red');
    $('.lock-dis').text('>>> E-STOP <<<');
    $('.lock-dis').css('background-color', 'red');
});

$gate.on('click', function(){
    if(gate === false) {
        $(".gate-dis").text("Gate Open");
        $('.gate-dis').css('background-color', 'red');
        $('.gate').css('background-color','chartreuse');
        $('.border').css('background-color', '#ffffff');
        $gate.css('width', '3.8vw');
        $gate.css('height', '3.8vw');
        gate = true;
        if(guestck === false) {
            $guest1.toggleClass('guest-go');
            $guest2.toggleClass('guest-go');
            $guest3.toggleClass('guest-go');
            setTimeout(function(){
                $guest1.css('display', 'none');
                $guest12.css('display', 'block');
                $guest2.css('display', 'none');
                $guest22.css('display','block');
                $guest3.css('display', 'none');
                $guest32.css('display','block');
                guestride = true;
            },2000)
        }
        guestck = true;
    } else {
        $(".gate-dis").text("Gate Close");
        $('.gate-dis').css('background-color','chartreuse');
        $('.gate').css('background-color','coral');
        $('.border').css('background-color', '#000000');
        $gate.css('width', '4.5vw');
        $gate.css('height', '4.5vw');
        gate = false;
    }
});

$lock.on('click', function(){
    if(gate === false) {
        if(guestride === true) {
            $('.dis-dis').text('Dispatch Enabled');
            $('.dis-dis').css('background-color', 'chartreuse');
            $dis.css('background-color', 'chartreuse');
            $('.lock').css('background-color', 'cadetblue');
            $('.lock-dis').css('background-color', 'chartreuse');
            $('.lock-dis').text('Lock Enabled');
            dis = true;
            lockstate = true;
        }
    } else {
        window.alert('can not Lock');
    }
    lockstate = true;
});

$dis.on('click', function(){
    if(dis === true) {
        if(lockstate === true) {
            if(gate === false) {
                if (disblocker === false) {
                    disblocker = true;
                    bell();
                    setTimeout(function(){
                        if(estop === true) {
                            return false;
                        }
                        $('.vehicle-1').toggleClass('vehicle-go-1');
                        $('.vehicle-2').toggleClass('vehicle-go-1');
                        $('.vehicle-3').toggleClass('vehicle-go-1');
                    },1000);
                    setTimeout(function(){
                        if(estop === true) {
                            return false;
                        }
                        $('.vehicle-1').toggleClass('vehicle-go-2');
                        $('.vehicle-2').toggleClass('vehicle-go-2');
                        $('.vehicle-3').toggleClass('vehicle-go-2');
                    },6000);
                    setTimeout(function(){
                        $('.vehicle-1').css('display', 'none');
                        $('.vehicle-2').css('display', 'none');
                        $('.vehicle-3').css('display', 'none');
                        $guest12.css('display', 'none');
                        $guest22.css('display', 'none');
                        $guest32.css('display', 'none');
                        reset();
                    },9000);
                } else {
                    window.alert("Already Dispatch");
                }
            } else {
                window.alert("Gate is open");
                return false;
            }
        } else {
            window.alert("Not Locked");
            return false;
        }
    } else {
        window.alert("OPERATION MISS");
    }
});

function screenck(){
    var screen = window.orientation;

    if (screen === 0) {
        window.alert("横画面で操作してください")
  }
};

window.onload = screenck();
