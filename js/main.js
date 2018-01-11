/*
>>================================================================================>
Mobile Menu
>>================================================================================>
*/

$('#burger').on('click', function(){
    if($('body').hasClass('mobile-menu-active')){
        $('body').removeClass('mobile-menu-active');
    }else{
        $('body').addClass('mobile-menu-active');
    }
});

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
            success: function(response) {
                if (response.result == "success") {
                    fbq('track', 'CompleteRegistration', {
                        content_name: 'Email Submission'
                    });
                    $('#thanks').val("Thank you. We will be in contact shortly.");
                } else {
                    $('#thanks').val(response.msg);
                }
                setTimeout(function(){
                    $('#form').addClass('success');
                    setTimeout(function(){
                        $('#form').removeClass('sending success');
                        $('form input[type="text"]').val('')
                        $('form button[type="submit"]').prop('disabled', false);
                    }, 2000);
                }, 500);
            }            
        });
    }
});