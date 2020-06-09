var $hatch = $('.hatch');
var $estop = $('.estop');
var $dis = $('.dis');
var $lock = $('.lock');
var $gate = $('.gate');
var $door = $('.door');
var $guest = $('.guest');

var dis = false;
var gate = false;
var estop = false;
var guestride = false;


var gatestate = false;
var estopstate = false;
var lockstate = false;

var guestck = false;

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
    dis = false;
    gate = false;
    estop = false;
    gatestate = false;
    estopstate = false;
    lockstate = false;
    guestck = false;
    guestride = false;
    $guest.toggleClass('guest-go');
    $('.dis-dis').text('Dispatch Disabled');
    $('.dis-dis').css('background-color', 'yellow');
    $('.gate-dis').text('Gate Close');
    $('.gate-dis').css('background-color', 'chartreuse');
    $('.lock-dis').text('Lock Disabled');
    $('.lock-dis').css('background-color', 'yellow');
    $('.guest').css('display', 'block');
    $('.guest-2').css('display', 'none');
    $('.lock').css('background-color', 'chartreuse');
    $('.dis').css('background-color', 'red');
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
        $('.door').css('background-color', '#ffffff');
        $gate.css('width', '3.8vw');
        $gate.css('height', '3.8vw');
        gate = true;
        if(guestck === false) {
            $guest.toggleClass('guest-go');
            setTimeout(function(){
                $guest.css('display', 'none');
                $('.guest-2').css('display', 'block');
                guestride = true;
            },2000)
        }
        guestck = true;
    } else {
        $(".gate-dis").text("Gate Close");
        $('.gate-dis').css('background-color','chartreuse');
        $('.gate').css('background-color','coral');
        $('.door').css('background-color', '#000000');
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
            bell();
            setTimeout(function(){
                if(estop === true) {
                    return false;
                }
                $hatch.animate({
                    marginTop: '-=40vh'
                }, 3000).animate({
                    marginTop: '+=40vh'
                }, 1000);    
            },1000);
            setTimeout(function(){
                if(estop === true) {
                    return false;
                }
                $hatch.animate({
                    marginTop: '-=40vh'
                }, 3000).animate({
                    marginTop: '+=40vh'
                }, 1000);    
            },6000);
            setTimeout(function(){
                if(estop === true) {
                    return false;
                }
                $hatch.animate({
                    marginTop: '-=40vh'
                }, 3000).animate({
                    marginTop: '+=40vh'
                }, 1000);  
            },11000);
            setTimeout(function(){
            if(estop === true) {
                return false;
            }
                reset();
            },16000);
        }
    } else {
        window.alert("OPERATION MISS");
    }
});


