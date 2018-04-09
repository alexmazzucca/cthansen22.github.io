/*
* >>========================================>
* Sticky Navigation
* >>========================================>
*/

var lastScrollTop = 0,
    stickyNavEnabled = false;

$(window).on('scroll resize', stickyNav).trigger('scroll');

function stickyNav(){
    var st = $(window).scrollTop();

    if(st > $(window).height() / 2){

        if(st < lastScrollTop) {
            if(!stickyNavEnabled) {
                openStickyNav();
            }
            
        }else{
            closeStickyNav();
        }
    }else{
        closeStickyNav();
    }

    lastScrollTop = st;
}

function openStickyNav(){

    stickyNavEnabled = true;

    $('<div class="sticky-toolbar" />').appendTo('body');

    $('.primary-nav, .site-logo, .burger').clone().appendTo('.sticky-toolbar');

    $(window).off('scroll resize', stickyNav)
    
    TweenMax.fromTo($('.sticky-toolbar'), .3, {y: -$('.sticky-toolbar').outerHeight()}, {y:0, ease:Power1.easeInOut, onComplete:function(){
        $(window).on('scroll resize', stickyNav)
    }})
}

function closeStickyNav(){
    
    stickyNavEnabled = false;

    $(window).off('scroll resize', stickyNav);

    TweenMax.fromTo($('.sticky-toolbar'), .3, {y:0}, {y: -$('.sticky-toolbar').outerHeight(), ease:Power1.easeInOut, onComplete:function(){
        $('.sticky-toolbar').remove();
        $(window).on('scroll resize', stickyNav)
    }})
}

/*
>>================================================================================>
Mobile Menu
>>================================================================================>
*/

$('body').on('click', '.burger', function(){
    if($('body').hasClass('mobile-menu-active')){
        $('body').removeClass('mobile-menu-active');
    }else{
        $('body').addClass('mobile-menu-active');
    }
});

/*
>>================================================================================>
Team
>>================================================================================>
*/

$('#team .member').each(function(){
    var $member = $(this);
    $(this).find('.photo').add($(this).find('button.close')).on('click', function(){
        $member.toggleClass('active');
        $('body').toggleClass('disabled')
    })
})

/*
>>================================================================================>
Facebook Tracking
>>================================================================================>
*/

$('a.white-paper').click(function(){
    fbq('track', 'Lead', {
        content_name: 'White Paper'
    });
});

/*
>>================================================================================>
Loading
>>================================================================================>
*/

$(window).on('load', function(){
    if(document.referrer.search("hypernetwork.io") != -1){
        $('#loading').remove();
    }
    if($('#loading').length){
        $('body').addClass('page-loaded');
        setTimeout(function(){
            $('#animated-logo .logo .vertical:nth-child(1)').addClass('animate');
            setTimeout(function(){
                $('#animated-logo .logo .vertical:nth-child(2)').addClass('animate');
                setTimeout(function(){
                    $('#animated-logo .logo .horizontal').addClass('animate');
                    setTimeout(function(){
                        $('#animated-logo .logo .circle').addClass('animate');
                        setTimeout(function(){
                            $('#animated-logo .flare').addClass('animate');
                        }, 500);
                        setTimeout(function(){
                            $('#space-curtains').addClass('animate');
                            $('#animated-logo').addClass('animate');
                            setTimeout(function(){
                                $('#loading').remove();
                            }, 2000);
                        }, 3000);
                    }, 750);
                }, 250);
            }, 250);
        }, 0);
    }
});

//$('#loading').remove();

/*
>>================================================================================>
Form Validation
>>================================================================================>
*/

$('.checkbox').on('click', function(){
    $(this).toggleClass('active');
    if($(this).hasClass('active')){
        $('.agree').val('I agree to receive communication from Hypernet.');
    }else{
        $('.agree').val('')
    }
});

$('#form').validate({
    onkeyup: false,
    ignore: [],
    errorPlacement: function(error,element) {
        return true;
    },
    highlight: function(element) {
        if($(element).attr('id') == 'email-field'){
            $('#form').addClass('error');
        }
        if($(element).attr('class') == 'agree'){
            $('.checkbox').addClass('error');
        }
    },
    unhighlight: function(element) {
        if($(element).attr('id') == 'email-field'){
            $('#form').removeClass('error');
        }
        if($(element).attr('class') == 'agree'){
            $('.checkbox').removeClass('error');
        }
    },
    rules: {
        email: {
            email: true,
            required: true
        },
        agree: {
            required: true
        }
    },
    submitHandler: function(form) {
        if ($('#form').hasClass('slackThanksForm') || $('#form').hasClass('telegramThanksForm')) {
            return true;
        }
        $('#form').addClass('sending');
        $('#form button[type="submit"]').prop('disabled', true);
        $('.checkbox.error').removeClass('error');

        $.ajax({
            url: form.action,
            type: form.method,
            data: $(form).serialize(),
            cache: false,
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            error: function(response) {
                setTimeout(function(){
                    $('#output').html("Could not connect to the registration server. Please try again later.");
                    $('#form').addClass('success');
                    setTimeout(function(){
                        $('#form').removeClass('sending success');
                        $('form input[type="text"]').val('')
                        $('form button[type="submit"]').prop('disabled', false);
                    }, 2000);
                }, 500);
            },
            success: function(response) {
                if (response.result == "success") {
                    fbq('track', 'CompleteRegistration', {
                        content_name: 'Email Submission'
                    });
                    if ($('#form').hasClass('slackForm')) {
                        window.location.href = "slack_thanks.html";
                    } else if ($('#form').hasClass('telegramForm')) {
                        window.location.href = "telegram_thanks.html";
                    }
                    $('#output').html("You're in! Welcome to Hypernet. We will be in contact shortly.");
                } else {
                    $('#output').html(response.msg);
                }
                setTimeout(function(){
                    $('#form').addClass('success');
                    setTimeout(function(){
                        $('#form').removeClass('sending success');
                        $('form input[type="text"]').val('')
                        $('form button[type="submit"]').prop('disabled', false);
                    }, 3000);
                }, 500);
            }            
        });
    }
});

/*
>>================================================================================>
Social Nav Lock-In
>>================================================================================>
*/

var viewportWidth;

$(window).on('load resize', function(){
    viewportWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
}).trigger('resize');

$(window).on('scroll resize', function(){
    if(viewportWidth > 767){

        if($(window).scrollTop() >= $('#footer').offset().top - $(window).height()){
            $('#menu nav.social').css({
                position: 'absolute',
                top: $('#footer').offset().top - ($(window).height()/2)
            })
        }else{
            $('#menu nav.social').attr('style', '');
        }
    }else{
        $('#menu nav.social').attr('style', '');
    }
})