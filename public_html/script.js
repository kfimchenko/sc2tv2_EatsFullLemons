// plugin for filling streamer_lvl 
(function($){
    $.fn.rotator = function(options){
        var settings = $.extend({
            starting: 0,
            ending: 100,
            percentage: true,
            color: 'green',
            lineWidth: 7,
            timer: 10,
            radius: 40,
            fontStyle: 'Tahome',
            fontSize: '20pt',
            fontColor: 'darkblue',
            backgroundColor: 'lightgray',
            num: 0,
            callback: function () {
            }
        }, options);

        this.empty().append("<canvas height ="+57 + " width="+57+" id='my-canvas"+settings.num+"'/ ></canvas>");
        var canvas = document.getElementById('my-canvas'+settings.num);
        var x = canvas.width / 2;
        var y = canvas.height / 2;
        var radius = settings.radius;
        var context = canvas.getContext("2d");
        if(settings.backgroundColor){
            var ctx = canvas.getContext('2d');
            ctx.arc(x, y, radius, 0, 2*Math.PI, false);
            ctx.strokeStyle = settings.backgroundColor;
            ctx.lineWidth = settings.lineWidth;
            ctx.stroke();
        }
        var steps = settings.ending - settings.starting;
        var step = settings.starting;
        var z = setInterval(function(){
            var text;
            if(settings.percentage){text = step + "%";}else{text = step;}
            var start_angle = (1.5 + (step/50)-0.01)*Math.PI;
            var end_angle = (1.5 + (++step/50))*Math.PI;
            context.beginPath();
            context.arc(x, y, radius, start_angle, end_angle, false);
            context.lineWidth = settings.lineWidth;
            context.strokeStyle = settings.color;
            context.stroke();
            context.font = settings.fontSize + ' ' + settings.fontStyle;
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            context.fillStyle = settings.fontColor;
            context.clearRect(x - parseInt(settings.fontSize)*1.5, y - parseInt(settings.fontSize)/2, parseInt(settings.fontSize)*3, parseInt(settings.fontSize));
            context.fillText(text, x , y );
            if(step >= steps){
                window.clearInterval(z);
                if(settings.percentage){text = step + "%";}else{text = step;}
                context.clearRect(x - parseInt(settings.fontSize)*1.5, y - parseInt(settings.fontSize)/2, parseInt(settings.fontSize)*3, parseInt(settings.fontSize));
                context.fillText(text, x , y );
                if(typeof(settings.callback) == 'function'){
                    settings.callback.call(this);
                }
            }
        }, settings.timer);
    };
}(jQuery));
// plugin end

$(document).ready(function(){
    /*group of scripts, which are calculatin or set some width or any other styles. Call first of all, before any plugins*/

    //first of all, calculating width for x-scrolled blocks (in px instead of %)
    var horizontal_block_podpiski_width=$(".user_streams_list .favorite_stream").size()*265;//265 - outerWidth
    $(".user_streams_list_wrapper").css('width',horizontal_block_podpiski_width);
    var horizontal_block_ignorelist_width=$(".user_streams_ignore_list .favorite_stream").size()*265;//265 - outerWidth
    $(".user_streams_ignore_list_wrapper").css('width',horizontal_block_ignorelist_width);

    var horizontal_block_choose_category_width=$('.category_choose .category_choose-category').size()*141;
    $('.category_choose').css('width',horizontal_block_choose_category_width);

    //if it's streamer page, then change it's width:
    if ($('#streams_part .left_column').hasClass('streamers_page')) {
        $('#streams_part .left_column.streamers_page').css("width",850+"px"); //leva9 kolonka na stranichke strimera
        $('#streams_part .right_column.streamers_page').css("width",$('#streams_part').width()-850-27+"px"); //prava9 kolonka na stranichke strimera
    }
    if (! $('#streams_part .left_column').hasClass('streamers_page'))
        $('#streams_part .left_column').css("width",$('#streams_part').width()-$('#streams_part .right_column').outerWidth(true)-10+"px"); //shirina levoi kolonki vverhu strima
    $('.top_streams_menu .top_right_streams_menu').css("width",$('#streams_part .top_streams_menu').width()-$('#streams_part .top_left_streams_menu').outerWidth( true )-10+"px");// shirina top menu s lini9mi

    $('.all_streams_wrapper .normal_one').first().css('clear','left');

    $('.content_grey_block .left_column').css("width",$('.content_grey_block').width()-$('.content_grey_block .right_column').outerWidth(true)-($('.content_grey_block').width()*0.013)-11+"px"); //shirina levoi kolonki v grey bloke
    $('.content_grey_block .content_streams_menu .content_right_streams_menu').css("width",$('.content_grey_block .content_streams_menu').width()-$('.content_grey_block .content_left_streams_menu').outerWidth( true )-5+"px"); //resize big menu v grey bloke

    $('.content_main_block .left_column').css("width",$('.content_main_block').width()-$('.content_main_block .right_column').outerWidth(true)-29+"px"); //shirina levoi kolonki v contente
    $('.create_news_input').css("width",$('.content_main_block').width()-$('.content_main_block .right_column').outerWidth(true)-140-35-10+"px"); //shirina inputa pri sozdanii novosti
    $('.material_list div:last-child').css('border-bottom','0 none');

    /*dimanicheskie stili dl9 room chata*/
    $('.room_chat .romm_chat_row:last-child').css('border-bottom','0 none');
    $('.room_chat .answer .romm_chat_row:last-child').prev().css('border-bottom','1px solid #0099ff');
    $('.room_chat .answer .romm_chat_row:last-child').css('padding-top','0px');
    $('.room_chat .answer .romm_chat_row:last-child').css('width','81px');


    $('.for_redactor').css('width',$('.header_main').width()-44+"px"); //shirina textarea pri sozdanii novosti

    $('.top_stream_wrapper_middle_border').css("width",$('.left_column').width()-200+"px");//grabanii rast9gaushiis9 border chata

    $('.input_room').css('width',$('.input_room_block').outerWidth(true)-$('.room_smiles_block').outerWidth(true)-1);

    $('.room_message').css('width',$('.romm_chat_row').outerWidth(false)-$('.close-open_button').width()-30);
    $('.answer .room_message').css('width',$('.romm_chat_row').width());
    //calculating number of slides for raspisanie
    var slides=Math.floor(($('.the_hardest_part').width()-322)/$('.one_time_block').width()); //322 - magrins from right and left




    /*GROUP OF SLIDER'S INITIALIZATION*/

    //anounses
    $(".weekly_anounses_wrapper").carouFredSel({
        items               : 1,
        auto:{play:false},
        circular: false,
        infinite: false,
        direction           : "up",
        responsive	: true,
        prev : ".next_news",
        next : ".prev_news",
        scroll : {
            items           : 1,
            easing          : "linear",
            duration        : 1000,
            pauseOnHover    : true
        }
    });
    //top rating
    $(".rating_list_wrapper").carouFredSel({
        items               : 10,
        auto:{play:false},
        circular: false,
        infinite: false,
        direction           : "up",
        responsive	: true,
        prev        : ".next_rating_page",
        next        : ".prev_rating_page",
        scroll : {
            items           : 10,
            easing          : "linear",
            duration        : 1000,
            pauseOnHover    : true
        }
    });
    //room right block
    $(".room_list_wrapper").carouFredSel({
        items               : 14,
        auto:{play:false},
        circular: false,
        infinite: false,
        direction           : "up",
        responsive	: true,
        prev        : ".next_room_page",
        next        : ".prev_room_page",
        scroll : {
            items           : 14,
            easing          : "linear",
            duration        : 1000,
            pauseOnHover    : true
        }
    });
    //raspisanie
    $(".the_hardest_part_wrapper").carouFredSel({
        items               : {visible: slides,minimum:4},
        auto:{play:false},
        circular: false,
        infinite: false,
        duration:"left",
        responsive	: false,
        prev        : {button: ".prev_raspisanie",direction:"left",easing:"linear"},
        next        : {button: ".next_raspisanie",direction:"right",easing:"linear"},
        scroll : {
            items           : slides,
            easing          : "linear",
            duration        : 1000,
            pauseOnHover    : true
        }
    });


    /*RESIZE MONITOR WIDTH*/

    //use resize functions instead of calc() which is not supported in lots of browsers
    $(window).on("resize",function(){

        //if it's streamer page, then change it's width:
        if ($('#streams_part .left_column').hasClass('streamers_page')) {
            $('#streams_part .left_column.streamers_page').css("width",850+"px"); //leva9 kolonka na stranichke strimera
            $('#streams_part .right_column.streamers_page').css("width",$('#streams_part').width()-850-27+"px"); //prava9 kolonka na stranichke strimera
        }
        if (! $('#streams_part .left_column').hasClass('streamers_page'))
            $('#streams_part .left_column').css("width",$('#streams_part').width()-$('#streams_part .right_column').outerWidth(true)-10+"px"); //shirina levoi kolonki vverhu strima
        $('.top_streams_menu .top_right_streams_menu').css("width",$('#streams_part .top_streams_menu').width()-$('#streams_part .top_left_streams_menu').outerWidth( true )-10+"px");// shirina top menu s lini9mi


        $('.content_grey_block .left_column').css("width",$('.content_grey_block').width()-$('.content_grey_block .right_column').outerWidth(true)-($('.content_grey_block').width()*0.013)-11+"px"); //shirina levoi kolonki v grey bloke
        $('.content_grey_block .content_streams_menu .content_right_streams_menu').css("width",$('.content_grey_block .content_streams_menu').width()-$('.content_grey_block .content_left_streams_menu').outerWidth( true )-5+"px"); //resize big menu v grey bloke

        $('.content_main_block .left_column').css("width",$('.content_main_block').width()-$('.content_main_block .right_column').outerWidth(true)-29+"px"); //shirina levoi kolonki v contente
        $('.create_news_input').css("width",$('.content_main_block').width()-$('.content_main_block .right_column').outerWidth(true)-140-35-10+"px"); //shirina inputa pri sozdanii novosti
        $('.material_list div:last-child').css('border-bottom','0 none');

        $('.for_redactor').css('width',$('.header_main').width()-44+"px"); //shirina textarea pri sozdanii novosti

        $('.top_stream_wrapper_middle_border').css("width",$('.left_column ').width()-200+"px");//grabanii rast9gaushiis9 border chata

        $('.input_room').css('width',$('.input_room_block').outerWidth(true)-$('.room_smiles_block').outerWidth(true)-1);//dlina inputa vo vvode soobshenia v roome

        $('.room_message').css('width',$('.romm_chat_row').outerWidth(false)-$('.close-open_button').width()-30);
        $('.answer .room_message').css('width',$('.romm_chat_row').width()-2);

        //making 2 or 3 big blocks
        Resize_blocks();
        Resize_news();
        Resize_rooms();

        /*reinitialize anounsi and top rating sliders when we are resizing the page at the streamers page*/
        //anounses
        if ($('#streams_part .right_column').hasClass('streamers_page')) {
            $(".weekly_anounses_wrapper").carouFredSel({
                items               : 1,
                auto:{play:false},
                circular: false,
                infinite: false,
                direction           : "up",
                responsive	: true,
                prev        : ".prev_news",
                next        : ".next_news",
                scroll : {
                    items           : 1,
                    easing          : "linear",
                    duration        : 1000,
                    pauseOnHover    : true
                },
                destroy :function(){
                    origOrder:true;
                }
            });

        }
        var slides=Math.floor(($('.the_hardest_part').width()-322)/$('.one_time_block').width()); //322 - magrins from right and left
        $(".the_hardest_part_wrapper").carouFredSel({
            items               : {visible: slides,minimum:4},
            auto:{play:false},
            circular: false,
            infinite: false,
            direction:"left",
            responsive	: false,
            prev        : {button: ".prev_raspisanie",direction:"left",easing:"linear",duration:1000},
            next        : {button: ".next_raspisanie",direction:"right",easing:"linear",duration:1000},
            scroll : {
                items           : slides,
                easing          : "linear",
                duration        : 1000,
                pauseOnHover    : true
            },
            destroy :function(){
                origOrder:true;
            }
        });
    });

    /*HIDE AFTER INITIALIZATION POPUPS*/

    //hide users_in_chat_list when clicking somewhere in page
        $(document).click(function(event) {
            if ($(event.target).closest(".who_is_in_chat").length || $(event.target).closest(".people_in_this_chat span").length) return;
            else
            {
            $(".who_is_in_chat").hide();
            }
            if ($(event.target).closest(".click_user_popup.option_popup").length || $(event.target).closest(".options.chat_pic").length) return;
        else
        {
        $('.option_popup').hide();
        $('.options.chat_pic').removeClass('active');
        }
        if ($(event.target).closest(".player").length || $(event.target).closest(".player_popup.chat_pic").length) return;
    else
    {
    $('.player').hide();
    $('.player_popup.chat_pic').removeClass('active');
    }
    if ($(event.target).closest(".smaili").length || $(event.target).closest(".smiles.chat_pic").length) return;
    else
    {
    $('.smaili').hide();
    $('.smiles.chat_pic').removeClass('active');
    }
    if ($(event.target).closest(".golosovalka").length || $(event.target).closest(".poll.chat_pic").length) return;
    else
    {
    $('.golosovalka').hide();
    $('.poll.chat_pic').removeClass('active');
    }
    if ($(event.target).closest(".options_popup").length || $(event.target).closest(".li_fourth").length) return;
    else
    {
    $('.options_popup').hide();
    $('.li_fourth').removeClass('active');
    }
    if ($(event.target).closest(".search_popup").length || $(event.target).closest(".li_first").length) return;
    else
    {
    $('.search_popup').hide();
    $('.li_first').removeClass('active');
    }
        event.stopPropagation();
    });
    /*GROUP ONCLICK FINCTIONS*/

    //FADE
    $('.fade').click(function(){
        $('.other_category_choose').css('visibility','hidden');
        $(this).hide();
        });
    //open choose category popup
        $('.show_category_search').click(function(){
            $('.other_category_choose').css('visibility','visible');
            $('.fade').show();
            });
    //close category choose popup
        $('.close_category').click(function(){
            $('.other_category_choose').css('visibility','hidden');
            $('.fade').hide();
            });

    //hide user_in_chat_list when clicking on someone's nick
    $('.user_in_chat_row').click(function(){
        $('.who_is_in_chat').hide();
    });

    //toggle search in rooms
    $('.search_icon').click(function(){
        $('.standart_input').toggle(300);
    });

    //channel chats list
    $('.selected_channel').click(function(){
        if ($('.popup_chats_list').css('display')=='none')
            $('.popup_chats_list').show();
        else
            $('.popup_chats_list').hide();
    });
    $('.channel_name_row').click(function(){
        $('.popup_chats_list').hide();
        $('.channel_name_row').removeClass('active');
        $(this).addClass('active');
        $('.selected_channel .text').text($(this).find('.chat_name').text());
    });
    //buttons under the chat
    $('.user_chats .chat_pic').hover(function(){
            $(this).find('.chat_hint').show();
            },
        function() {
            $(this).find('.chat_hint').hide();
            });

    $('.user_chats .chat_pic').click(function(){
        $('.click_user_popup').hide();

        if ($(this).hasClass('active'))
            $(this).removeClass('active');
        else
        {
            if ($('.user_chats .mat_filter').hasClass('active'))
            {
                $('.user_chats .chat_pic').removeClass('active');
                $('.user_chats .mat_filter').addClass('active');
            }
            else
                $('.user_chats .chat_pic').removeClass('active');
            $(this).addClass('active');
        }
        if ($(this).hasClass('player_popup'))
        {
            if ($(this).hasClass('active'))
                $('.click_user_popup.player').show();
            else
                $('.click_user_popup.player').hide();
        }
        else if ($(this).hasClass('options'))
        {
            if ($(this).hasClass('active'))
                $('.click_user_popup.option_popup').show();
            else
                $('.click_user_popup.option_popup').hide();
        }
        else if ($(this).hasClass('smiles'))
        {
            if ($(this).hasClass('active'))
                $('.click_user_popup.smaili').show();
            else
                $('.click_user_popup.smaili').hide();
        }
        else if ($(this).hasClass('poll'))
        {
            if ($(this).hasClass('active'))
                $('.click_user_popup.golosovalka').show();
            else
                $('.click_user_popup.golosovalka').hide();
        }
    });
    //CREATE STREAM HIDE INPUT
    $('#newstream_customstart').on('ifChecked', function(event){
        $('.registr_input.custom_time').show();
    });
    $('#newstream_autostart').on('ifChecked', function(event){
        $('.registr_input.custom_time').hide();
    });
    //button and the room chat
    $('.room_smiles_block .chat_pic').click(function(){
        $('.click_user_popup').hide();
        if ($('.room_smiles_block .mat_filter').hasClass('active'))
        {
            $('.room_smiles_block .chat_pic').removeClass('active');
            $('.room_smiles_block .mat_filter').addClass('active');
        }
        else
            $('.room_smiles_block .chat_pic').removeClass('active');
        if ($(this).hasClass('active'))
            $(this).removeClass('active');
        else
            $(this).addClass('active');

        if ($(this).hasClass('options'))
        {
            if ($(this).hasClass('active'))
                $('.click_user_popup.option_popup').show();
            else
                $('.click_user_popup.option_popup').hide();
        }
        else if ($(this).hasClass('smiles'))
        {
            if ($(this).hasClass('active'))
                $('.click_user_popup.smaili').show();
            else
                $('.click_user_popup.smaili').hide();
        }
        else if ($(this).hasClass('poll'))
        {
            if ($(this).hasClass('active'))
                $('.click_user_popup.golosovalka').show();
            else
                $('.click_user_popup.golosovalka').hide();
        }
    });
    //close popup when clicking some option
    $('.click_user_popup_row').click(function(){
        $('.click_user_popup').hide();
        $('.chat_images .chat_pic').removeClass('active');
        /*if ($(this).hasClass('enabled'))
        {
            $(this).removeClass('enabled');
            $(this).addClass('disabled');
        }
        else if ($(this).hasClass('disabled'))
        {
            $(this).removeClass('disabled');
            $(this).addClass('enabled');
        }*/
    });
    $('.chat_smiles').click(function(){
        $('.click_user_popup.smaili').hide();
        $('.chat_images .chat_pic').removeClass('active');
    });

    //show user_popup_profile
    $('.user_pic').click(function(){
        $(this).find('.user_pic_arrow').toggle();
        if ($('#user_popup').css('visibility')=='hidden')
            {
            $('#user_popup').css('visibility','visible');
        $('.user_popup_body').css('top','88px');
        }
        else
    {
    $('#user_popup').css('visibility','hidden');
    $('.user_popup_body').css('top','-9999px');
    }
    });
    $('.operacii_tabs .oper_tab').click(function(){
        $('.operacii_tabs .oper_tab').each(function(){
            $(this).removeClass('active');
            $('.lenta_operacii').hide();
        });
        $(this).addClass('active');
        if ($(this).hasClass('first_tab'))
            $('.lenta_operacii.tab1').show();
        else if ($(this).hasClass('second_tab'))
            $('.lenta_operacii.tab2').show();
        else if ($(this).hasClass('third_tab'))
            $('.lenta_operacii.tab3').show();
        else if ($(this).hasClass('fourth_tab'))
            $('.lenta_operacii.tab4').show();
    });
    //adding class to active user_popup_menu and switch user_popup_body
    $('#user_popup_menu li').click(function(){
        $('#user_popup_menu li').each(function(){
            $(this).removeClass('active_li');
            $(this).find('a').removeClass('active');
        });
        $(this).addClass('active_li');
        $(this).find('a').addClass('active');

        $(".user_popup_body").each(function(){
            $(this).css('visibility','hidden');
        });
        //show popup user's category
        if ( $(this).find('a').hasClass("seven_menu_pic") )
            $(".user_achievements").css('visibility','visible');
        else if ( $(this).find('a').hasClass("third_menu_pic") )
            $(".user_messages").css('visibility','visible');
        else if ( $(this).find('a').hasClass("second_menu_pic") )
            $(".user_streams").css('visibility','visible');
        else if ( $(this).find('a').hasClass("first_menu_pic") )
            $(".user_profile").css('visibility','visible');
    });
    //switchers. пробовал по-другому, без динамичесокого изменения стилей не получилось.
    $('.switch-label-on.uvedomlenia_on').click(function(){
        $('.uvedomlenia_span').css('left',1);
        $('.uvedomlenia_span').css('width',33);
        $('.uvedomlenia_span').css('background','#0099ff');
        $(this).css('color','#fff');
        $('.switch-label-off.uvedomlenia_off').css('color','#666666');
    });
    $('.switch-label-off.uvedomlenia_off').click(function(){
        $('.uvedomlenia_span').css('left',33);
        $('.uvedomlenia_span').css('width',51);
        $('.uvedomlenia_span').css('background','#666666');
        $(this).css('color','#fff');
        $('.switch-label-on.uvedomlenia_on').css('color','#666666');
    });
    $('.switch-label-on.uvedomlenia_sound_on').click(function(){
        $('.uvedomlenia_sound_span').css('left',1);
        $('.uvedomlenia_sound_span').css('width',33);
        $('.uvedomlenia_sound_span').css('background','#0099ff');
        $(this).css('color','#fff');
        $('.switch-label-off.uvedomlenia_sound_off').css('color','#666666');
    });
    $('.switch-label-off.uvedomlenia_sound_off').click(function(){
        $('.uvedomlenia_sound_span').css('left',33);
        $('.uvedomlenia_sound_span').css('width',51);
        $('.uvedomlenia_sound_span').css('background','#666666');
        $(this).css('color','#fff');
        $('.switch-label-on.uvedomlenia_sound_on').css('color','#666666');
    });
    $('.switch-label-on.newsstream18_on').click(function(){
        $('.newstream_span').css('left',1);
        $('.newstream_span').css('width',104);
        $('.newstream_span').css('background','#0099ff');
        $(this).css('color','#fff');
        $('.switch-label-off.newsstream18_off').css('color','#666666');
    });
    $('.switch-label-off.newsstream18_off').click(function(){
        $('.newstream_span').css('left',124);
        $('.newstream_span').css('width',104);
        $('.newstream_span').css('background','##0099ff');
        $(this).css('color','#fff');
        $('.switch-label-on.newsstream18_on').css('color','#666666');
    });
    $('.switch-label-on.newpoll_golosovanie').click(function(){
        $('.newpoll_span').css('left',1);
        $('.newpoll_span').css('width',118);
        $('.newpoll_span').css('background','#0099ff');
        $(this).css('color','#fff');
        $('.switch-label-off.newpoll_opros').css('color','#666666');
    });
    $('.switch-label-off.newpoll_opros').click(function(){
        $('.newpoll_span').css('left',133);
        $('.newpoll_span').css('width',118);
        $('.newpoll_span').css('background','##0099ff');
        $(this).css('color','#fff');
        $('.switch-label-on.newpoll_golosovanie').css('color','#666666');
    });
    //adding active class when we click on menu

    //popup s valutoy
    $('.li_second').click(function(){
        $('.hide_popup').hide();

        $('.valute_popup').show();
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            $('.valute_popup').hide();
        }
        else {
            $('.user_main_menu .some_li').find('div').removeClass('active');
            $(this).addClass('active');
            $('.valute_popup').show();
        }
    });
    //popup search, popup options
    $('.user_main_menu .li_first').click(function(){
        $('.hide_popup').hide();
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            $('.search_popup').hide();
        } else {
            $('.user_main_menu .some_li').find('div').removeClass('active');
            $(this).addClass('active');
            $('.search_popup').show();
        }
    });
    //option popup
    $('.user_main_menu .li_fourth').click(function(){
        $('.hide_popup').hide();
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            $('.options_popup').hide();

        } else {
            $('.user_main_menu .some_li').find('div').removeClass('active');
            $(this).addClass('active');
            $('.options_popup').show();
        }
    });
    //create stream popup
    $('.user_main_menu .li_third').click(function(){
        $('.hide_popup').hide();
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            $('.create_stream_popup').hide();

        } else {
            $('.user_main_menu .some_li').find('div').removeClass('active');
            $(this).addClass('active');
            $('.create_stream_popup').show();
        }
    });
    //change chat list
    $('.user_message_list_row').click(function(){
        $('.user_message_list_row').each(function(){
            $(this).removeClass('active');
        });
        $(this).addClass('active');
    });
    //popup_submenu
    $('.submenu.achievements li').click(function(){
        $('.submenu.achievements li').each(function(){
            $(this).removeClass('active');
        });
        $(this).addClass('active');
    });
    $('.submenu.streams li').click(function(){
        $('.submenu.streams li').each(function(){
            $(this).removeClass('active');
        });
        $(this).addClass('active');
    });

    //change register captcha pic
    $('.captcha_pic').click(function(){
        $('.captcha_pic').each(function(){
            $(this).removeClass('true');
            $(this).find('span').removeClass('true_captcha');
        });
        $(this).addClass('true');
        $(this).find('span').addClass('true_captcha');
    });
    //subsribe on stream
    $('.subsribe').click(function(){
        if ($(this).hasClass('true'))
            $(this).removeClass('true');
        else
            $(this).addClass('true');
    });
    //show registration popup
    $('.reg').click(function(){
        $('.hide_popup').hide();
        $('.user_main_menu .some_li').find('div').removeClass('active');
        $('.registration_popup').show();
    });
    $('.registration_popup .close_btn').click(function(){
        $('.registration_popup').hide();
        $('.user_main_menu .some_li').find('div').removeClass('active');
    });
    $('.valute_popup .close_btn').click(function(){
        $('.valute_popup').hide();
        $('.user_main_menu .some_li').find('div').removeClass('active');
    });
    $('.create_stream_popup .close_btn').click(function(){
        $('.create_stream_popup').hide();
        $('.user_main_menu .some_li').find('div').removeClass('active');
    });
    $('.add_cash_popup .close_btn').click(function(){
        $('.add_cash_popup').hide();
        $('.user_main_menu .some_li').find('div').removeClass('active');
    });
    //show forget password popup
    $('.forgot').click(function(){
        $('.hide_popup').hide();
        $('.user_main_menu .some_li').find('div').removeClass('active');
        $('.forgot_password_popup').show();
    });
    $('.forgot_password_popup .close_btn').click(function(){
        $('.forgot_password_popup').hide();
    });

    // my work
    $('.hide_popup').hide();
    $('.add_cash_button').click(function(){
        $('.hide_popup').hide();
        $('.user_main_menu .some_li').find('div').removeClass('active');
        $('.add_cash_popup').show();
    });
    //DEL FROM FAVORITE POPUP
    $('.favorite_del').click(function(){
        $('.stream_popup_del').show();
    });
    $('.stream_popup_del .blue_a_button.yes').click(function(){
        $('.stream_popup_del').hide();
    });
    $('.stream_popup_del .blue_a_button.no').click(function(){
        $('.stream_popup_del').hide();
    });
    //FAVORITE SUBMENU SWITCHER
    $('.submenu_li.podpiski').click(function(){
        $('.user_streams_wrapper').show();
        $('.user_streams_ignore_wrapper').hide();
    });
    $('.submenu_li.ignorelist').click(function(){
        $('.user_streams_wrapper').hide();
        $('.user_streams_ignore_wrapper').show();
    });
    //LIST TOP NEWS SWITCHER
    $('.material_list_switcher .list_switcher').click(function(){
        $('.list_switcher').each(function(){
            $(this).removeClass('active');
        });
        $(this).addClass('active');
    });
    var slide=0;
    //hiding time in raspisanie if not our time
    $('.prev_raspisanie').click(function(){
        slide--;
        if (slide===0)
            $('.time_now').addClass('nowadays');
        else
            $('.time_now').removeClass('nowadays');
    });
    $('.next_raspisanie').click(function(){
        slide++;
        if (slide===0)
            $('.time_now').addClass('nowadays');
        else
            $('.time_now').removeClass('nowadays');
    });


    /*GROUP OF CLICKS 2*/


    $('.search_image_holder').click(function(){
        $('.content_search_input').toggle(300);
    });
    //dell after test
    $('.chat_message .user_name').click(function(){
        $('.click_user_popup').hide();
        if ( ($(this).offset().top-$('.chat_body .chat_wrapper').offset().top)<110)
            $(this).parent().find('.click_user_popup.action_user').addClass('bottom');
        else
            $(this).parent().find('.click_user_popup.action_user').removeClass('bottom');
        $(this).parent().find('.click_user_popup.action_user').show();
    });
    //close sysmessage
    $('.close_sysmess_popup').click(function(){
        $(this).parent().fadeOut(500); //maybe we can del this code instead of hidding?
    });
    //popup users in chat
    $('.people_in_this_chat .text span').click(function(){
        if ($('.user_chats .mat_filter').hasClass('active'))
        {
            $('.user_chats .chat_pic').removeClass('active');
            $('.mat_filter').addClass('active');
        }
        else
            $('.user_chats .chat_pic').removeClass('active');
        if ( $('.who_is_in_chat').is(':visible'))
            $('.click_user_popup').hide();
        else
        {
            $('.click_user_popup').hide();
            $('.who_is_in_chat').show();
        }
    });
    $('.users_in_chat_list_how_sort span').click(function(){
        $('.users_in_chat_list_how_sort span').removeClass('active');
        $(this).addClass('active');
    });
    //show popup how much donate
    $('.support_add').click(function(){
        var form = $(this).data('form');
        $('.how_much_donate_popup').hide();
        $('#' + form).show();
    });
    $('.how_much_donate_popup .close_btn').click(function(){
        $('.how_much_donate_popup').hide();
    });
    /*ROOM RIGHT BLOCK*/
    $('.room_right_block_images .poll').click(function(){
        $('.room_right_block_images .chat_pic').removeClass('active');
        $('.wrapper_for_arrow').css('left','51px');
        $(this).addClass('active');
        $('.right_room_block').hide();
        $('.room_create_poll').show();
        $('.next_room_page').hide();
        $('.prev_room_page').hide();
    });
    $('.room_right_block_images .poll2').click(function(){
        $('.room_right_block_images .chat_pic').removeClass('active');
        $('.wrapper_for_arrow').css('left','119px');
        $(this).addClass('active');
        $('.right_room_block').hide();
        $('.room_vote_poll').show();
        $('.next_room_page').hide();
        $('.prev_room_page').hide();
    });
    $('.room_right_block_images .poll3').click(function(){
        $('.room_right_block_images .chat_pic').removeClass('active');
        $('.wrapper_for_arrow').css('left','153px');
        $(this).addClass('active');
        $('.right_room_block').hide();
        $('.room_results_poll').show();
        $('.next_room_page').hide();
        $('.prev_room_page').hide();
    });
    $('.room_right_block_images .people_in').click(function(){
        $('.room_right_block_images .chat_pic').removeClass('active');
        $(this).addClass('active');
        $('.wrapper_for_arrow').css('left','16px');
        $('.right_room_block').hide();
        $('.room_list_wrapper').show();
        $('.next_room_page').show();
        $('.prev_room_page').show();
    });
    $('.room_right_block_images .options').click(function(){
        $('.room_right_block_images .chat_pic').removeClass('active');
        $(this).addClass('active');
        $('.wrapper_for_arrow').css('left','85px');
        $('.right_room_block').hide();
        $('.room_option').show();
        $('.next_room_page').hide();
        $('.prev_room_page').hide();

    });


    /*GROUP CALLBACKS ONLOAD*/

    //changing big stream pic from 2 to 3
    Resize_blocks();
    Resize_news();
    Resize_rooms();

    window.script_Chat_list_users = function(){
        $('.who_is_in_chat').show();
        if ($('.user_in_chat_list .user_in_chat_row').size()<=18)
        {
            var users_in_chat_list_height=$('.user_in_chat_list .user_in_chat_row').size()*22;
            $('.user_in_chat_wrapper').css('height',users_in_chat_list_height);
        }
        else
        {
            console.log($('.user_in_chat_list .user_in_chat_row').size());
            $('.user_in_chat_wrapper').css('height',18*22+'px');
        }
        $(".user_in_chat_list").carouFredSel({
            items : 18,
            auto:{play:false},
            circular: false,
            infinite: false,
            direction : "up",
            responsive : true,
            prev : ".prev_users_page",
            next : ".next_users_page",
            scroll : {
                items : 18,
                easing : "linear",
                duration : 1000,
                pauseOnHover : true
            },
            destroy :function(){
                origOrder:true;
            }
        });
    }

    script_Chat_list_users();
    $('.who_is_in_chat').hide();//hide popup after initializing slider, cause if we won't make it display:block, it won't work


    /*GROUP FOR EACH FUNCTION*/

    //for ciferki on top_menu
    $('.cifri_wrapper').each(function(){
        $(this).css("width",$(this).find('a').outerWidth(true)+"px");
    });

    //hide containers without new messages
    $('.menu_number').each(function(){
        if($(this).text().length <=0)
            $(this).hide();
    });
    //height in case of rating
    /*  В индекс.хтмл есть спан  padding, в нем пишется численное значение, на сайт
     * это не выводится, но скрипт считывает его, и по его значениям строит
     * линию рейтинга.
     * Переменная padd в функции ниже - есть значение паддинга из индекс.хтмл
     * падд является суммарным рейтингом всех стриммеров в одном таймблоке.
     * Минимальный padding в индекс хтмл - 1. при 0 не работает.
     * Максимальный padding - 137
     * if x<strcount*27 -
     * then
     * 117
     */
    $('.one_time_block').each(function(){
        var padd = parseInt($(this).find('.padding').text());
        var strc = $(this).find('.stream_row').size();
        if (padd>(137-(strc*27))) {
            var x = 137 - padd;
            $(this).find('.streams_at_this_time').css('margin-top',padd - (27*strc-x));
            $(this).find('.straight_down').css('margin-top',padd);
            $(this).find('.straight_down').css('padding-bottom',$('.one_time_block').height() - padd -30);
        } else {
            $(this).find('.streams_at_this_time').css('margin-top',padd);
            $(this).find('.straight_down').css('margin-top',padd);
            $(this).find('.straight_down').css('padding-bottom',$('.one_time_block').height() - padd -30);
        }

    });
    //height in case of rating FOR STREAMER PAGE
    $('.streamerpage_rating').each(function(){
        $(this).css('margin-top',parseInt($(this).find('.padding_rating').text()));
    });
    /*GROUP CUSTOM SCROLLBAR PLUGIN*/

    //user message_list
    $(".user_message_list").mCustomScrollbar({
        axis:"y",
        theme:"light",
        scrollInertia: 950,
        mouseWheel:{ scrollAmount: 1000 },
        callbacks:{
            onScrollStart:function(){
                $(".user_message_list_wrapper .top_shadow").show();
                $(".user_message_list_wrapper .bottom_shadow").show();
            },
            onTotalScroll:function(){
                $(".user_message_list_wrapper .top_shadow").show();
                $(".user_message_list_wrapper .bottom_shadow").hide();
            },
            onTotalScrollBack:function(){
                $(".user_message_list_wrapper .top_shadow").hide();
                $(".user_message_list_wrapper .bottom_shadow").show();
            }
        }
    });
    //valute operations
    $('.lenta_operacii').each(function(){
        $(this).mCustomScrollbar({
            axis:"y",
            scrollInertia: 950,
            mouseWheel:{ scrollAmount: 1000 },
            theme:"light"
        });
    });
    //create_poll_room
    $('.room_create_poll').each(function(){
        $(this).mCustomScrollbar({
            axis:"y",
            scrollInertia: 950,
            mouseWheel:{ scrollAmount: 1000 },
            theme:"light"
        });
    });
    //result room polls
    $('.room_results_poll').each(function(){
        $(this).mCustomScrollbar({
            axis:"y",
            scrollInertia: 950,
            mouseWheel:{ scrollAmount: 1000 },
            theme:"light"
        });
    });
    //result room polls
    $('.room_vote_poll').each(function(){
        $(this).mCustomScrollbar({
            axis:"y",
            scrollInertia: 950,
            mouseWheel:{ scrollAmount: 1000 },
            theme:"light"
        });
    });
    $('.selectBox-menuShowing-bottom').mCustomScrollbar({
        axis:"y",
        scrollInertia: 950,
        mouseWheel:{ scrollAmount: 1000 },
        theme:"light"
    });
    //smiles_list
    $('.chat_list_wrapper').mCustomScrollbar({
        axis:"y",
        scrollInertia: 950,
        mouseWheel:{ scrollAmount: 1000 },
        theme:"light"
    });
    //chat so specom
    $('.chat_specialist_wrapper').mCustomScrollbar({
        axis:"y",
        scrollInertia: 950,
        mouseWheel:{ scrollAmount: 1000 },
        theme:"light"
    });
    $('.room_chat_list').mCustomScrollbar({
        axis:"y",
        scrollInertia: 950,
        mouseWheel:{ scrollAmount: 1000 },
        theme:"light"
    });
    //user_message_chat
    $(".user_message_chat").mCustomScrollbar({
        axis:"y",
        theme:"light",
        callbacks:{
            onScrollStart:function(){
                $(".user_message_chat_wrapper .top_shadow").show();
                $(".user_message_chat_wrapper .bottom_shadow").show();
            },
            onTotalScroll:function(){
                $(".user_message_chat_wrapper .top_shadow").show();
                $(".user_message_chat_wrapper .bottom_shadow").hide();
            },
            onTotalScrollBack:function(){
                $(".user_message_chat_wrapper .top_shadow").hide();
                $(".user_message_chat_wrapper .bottom_shadow").show();
            }
        }
    });
    //registration
    $(".registr_contract").mCustomScrollbar({
        axis:"y",
        scrollInertia: 950,
        mouseWheel:{ scrollAmount: 1000 },
        theme:"light"
    });

    //achievments
    $(".user_achievements_list").mCustomScrollbar({
        axis:"y",
        theme:"light",
        callbacks:{
            onScrollStart:function(){
                $(".achievements_wrapper .top_shadow").show();
                $(".achievements_wrapper .bottom_shadow").show();
            },
            onTotalScroll:function(){
                $(".achievements_wrapper .top_shadow").show();
                $(".achievements_wrapper .bottom_shadow").hide();
            },
            onTotalScrollBack:function(){
                $(".achievements_wrapper .top_shadow").hide();
                $(".achievements_wrapper .bottom_shadow").show();
            }
        }
    });
    //favorite stream list
    $(".user_streams_list").mCustomScrollbar({
        axis:"x",
        theme:"light",
        scrollInertia: 950,
        mouseWheel:{ scrollAmount: 1000 },
        callbacks:{
            onScrollStart:function(){
                $(".user_streams_wrapper .right_shadow").show();
                $(".user_streams_wrapper .left_shadow").show();
            },
            onTotalScroll:function(){
                $(".user_streams_wrapper .left_shadow").show();
                $(".user_streams_wrapper .right_shadow").hide();
            },
            onTotalScrollBack:function(){
                $(".user_streams_wrapper .left_shadow").hide();
                $(".user_streams_wrapper .right_shadow").show();
            }
        }
    });
    //favorite igronelist
    $(".user_streams_ignore_list").mCustomScrollbar({
        axis:"x",
        theme:"light",
        scrollInertia: 950,
        mouseWheel:{ scrollAmount: 1000 },
        callbacks:{
            onScrollStart:function(){
                $(".user_streams_ignore_wrapper .right_shadow").show();
                $(".user_streams_ignore_wrapper .left_shadow").show();
            },
            onTotalScroll:function(){
                $(".user_streams_ignore_wrapper .left_shadow").show();
                $(".user_streams_ignore_wrapper .right_shadow").hide();
            },
            onTotalScrollBack:function(){
                $(".user_streams_ignore_wrapper .left_shadow").hide();
                $(".user_streams_ignore_wrapper .right_shadow").show();
            }
        }
    });
    //profile history experience
    $(".profile_hist_wrapper").mCustomScrollbar({
        axis:"y",
        theme:"light",
        scrollInertia: 950,
        mouseWheel:{ scrollAmount: 1000 },
        callbacks:{
            onScrollStart:function(){
                $(".profile_hist .top_shadow").show();
                $(".profile_hist .bottom_shadow").show();
            },
            onTotalScroll:function(){
                $(".profile_hist .top_shadow").show();
                $(".profile_hist .bottom_shadow").hide();
            },
            onTotalScrollBack:function(){
                $(".profile_hist .top_shadow").hide();
                $(".profile_hist .bottom_shadow").show();
            }
        }
    });

    //all streams
    $(".all_streams_wrapper").mCustomScrollbar({
        axis:"y",
        theme:"light",
        scrollInertia: 950,
        mouseWheel:{ scrollAmount: 1000 },
        callbacks:{
            onScrollStart:function(){
                $(".all_streams .top_shadow").show();
                $(".all_streams .bottom_shadow").show();
            },
            onTotalScroll:function(){
                $(".all_streams .top_shadow").show();
                $(".all_streams .bottom_shadow").hide();
            },
            onTotalScrollBack:function(){
                $(".all_streams .top_shadow").hide();
                $(".all_streams .bottom_shadow").show();
            }
        }
    });
    //all rooms
    $(".all_rooms_wrapper").mCustomScrollbar({
        axis:"y",
        theme:"light",
        scrollInertia: 950,
        mouseWheel:{ scrollAmount: 1000 },
        callbacks:{
            onScrollStart:function(){
                $(".all_rooms_wrapper_with_shadow .top_shadow").show();
                $(".all_rooms_wrapper_with_shadow .bottom_shadow").show();
            },
            onTotalScroll:function(){
                $(".all_rooms_wrapper_with_shadow .top_shadow").show();
                $(".all_rooms_wrapper_with_shadow .bottom_shadow").hide();
            },
            onTotalScrollBack:function(){
                $(".all_rooms_wrapper_with_shadow .top_shadow").hide();
                $(".all_rooms_wrapper_with_shadow .bottom_shadow").show();
            }
        }
    });

    //chat robot
    $(".chat_robot_wrapper").mCustomScrollbar({
        axis:"y",
        scrollInertia: 950,
        mouseWheel:{ scrollAmount: 1000 },
        theme:"light"
    });
    $(".category_choose_wrapper").mCustomScrollbar({
        axis:"x",
        theme:"light",
        scrollInertia: 950,
        mouseWheel:{ scrollAmount: 1000 }
    });

    /*GROUP OF CUSTOM CHECKBOXES*/

    $('.blue_checkbox').iCheck({
        cursor: true,
        checkboxClass: 'icheckbox_futurico',
        radioClass: 'icheckbox_futurico2'
    });
    $('.white_checkbox').iCheck({
        cursor: true,
        checkboxClass: 'icheckbox_futurico_white',
        radioClass:'icheckbox_futurico_white'
    });
    $('.anonsi_checkbox').iCheck({
        cursor: true,
        checkboxClass: 'icheckbox_dark_blue'
    });
    $('.black_checkbox').iCheck({
        cursor: true,
        radioClass: 'icheckbox_black'
    });

    //SOME HOVER
    //show number of people in choose category popup
        $('.category_choose-category').hover(function(){
                $(this).find('.category_choose_people').show();
                $(this).find('.black_filtr').css("background","rgba(0,0,0,0)");
                },
            function() {
                $(this).find('.category_choose_people').hide();
                $(this).find('.black_filtr').css("background","rgba(0,0,0,0.5)");
            });

    /*GROUP OF CUSTOM SELECTBOXES*/

    //use this for all site selectses
//    $("select").select2();

    /*GROUP OF HINTS*/

    //hint for top_user_menu
    $('.some_li').hover(function(){
            $(this).find('.user_main_menu_hit').show();
        },
        function() {
            $(this).find('.user_main_menu_hit').hide();
        });
    //show checkbox in raspisanie
    $('.stream_row').hover(function(){
            $(this).find('.icheckbox_dark_blue').show();
        },
        function() {
            $(this).find('.icheckbox_dark_blue').hide();
        });
    $('.icheckbox_dark_blue .iCheck-helper').hover(function(){
            $(this).parent().next('.checkbox_hint').show();
        },
        function() {
            $(this).parent().next('.checkbox_hint').hide();
        });
    $('.icheckbox_dark_blue').on('ifChecked', function(event){
        $(this).parent().addClass('active');
    });
    $('.icheckbox_dark_blue').on('ifUnchecked', function(event){
        $(this).parent().removeClass('active');
    });
    /*GROUP OF FILLING CIRCLE PLUGIN*/

    //filling streamer lvl exp
    var numb=0;
    //streamer
    $('.its_streamer .favorite_lvl').each(function(){
        $(this).find('.for_canvas').rotator({
            num : numb,
            starting: 0,
            ending: parseInt($(this).find('.how_much_fill').text()),
            lineWidth: 6,
            color:'#3189ef',
            fontSize:'0px',
            backgroundColor: '#193c65',
            radius:24
        });
        numb++;
    });
    //author
    $('.its_author .favorite_lvl').each(function(){
        $(this).find('.for_canvas').rotator({
            num : numb,
            starting: 0,
            ending: parseInt($(this).find('.how_much_fill').text()),
            lineWidth: 6,
            color:'#0fd483',
            fontSize:'0px',
            backgroundColor: '#085b44',
            radius:24
        });
        numb++;
    });
    //category
    $('.its_category .favorite_lvl').each(function(){
        $(this).find('.for_canvas').rotator({
            num : numb,
            starting: 0,
            ending: parseInt($(this).find('.how_much_fill').text()),
            lineWidth: 6,
            color:'#3189ef',
            fontSize:'0px',
            backgroundColor: '#193c65',
            radius:24
        });
        numb++;
    });
    //room
    $('.its_room .favorite_lvl').each(function(){
        $(this).find('.for_canvas').rotator({
            num : numb,
            starting: 0,
            ending: parseInt($(this).find('.how_much_fill').text()),
            lineWidth: 6,
            color:'#3189ef',
            fontSize:'0px',
            backgroundColor: '#193c65',
            radius:24
        });
        numb++;
    });
    // USER PROFILE

    //streamer
    $('.profile_lvl.streamer').each(function(){
        $(this).find('.for_canvas').rotator({
            num : numb,
            starting: 0,
            ending: parseInt($(this).find('.how_much_fill').text()),
            lineWidth: 6,
            color:'#3189ef',
            fontSize:'0px',
            backgroundColor: '#193c65',
            radius:24
        });
        numb++;
    });
    //author
    $('.profile_lvl.author').each(function(){
        $(this).find('.for_canvas').rotator({
            num : numb,
            starting: 0,
            ending: parseInt($(this).find('.how_much_fill').text()),
            lineWidth: 6,
            color:'#0fd483',
            fontSize:'0px',
            backgroundColor: '#095d42',
            radius:24
        });
        numb++;
    });
    //support
    $('.profile_lvl.support').each(function(){
        $(this).find('.for_canvas').rotator({
            num : numb,
            starting: 0,
            ending: parseInt($(this).find('.how_much_fill').text()),
            lineWidth: 6,
            color:'#f9ea42',
            fontSize:'0px',
            backgroundColor: '#696628',
            radius:24
        });
        numb++;
    });
    //robot
    $('.profile_lvl.robot').each(function(){
        $(this).find('.for_canvas').rotator({
            num : numb,
            starting: 0,
            ending: parseInt($(this).find('.how_much_fill').text()),
            lineWidth: 6,
            color:'#bf1d30',
            fontSize:'0px',
            backgroundColor: '#4f0f1e',
            radius:24
        });
        numb++;
    });
    /*GROUP OF CONNECTING LINES PLUGIN. THEY ALL ARE REINITIALIZE ON "resize"*/

    //raspisanie. Call before initializing slider
    //Raspisanie();
});


//making 2 or 3 big block instead of monitor width
function Resize_blocks(){
    if ($('.all_streams_wrapper').width()>=1440 && $('.all_streams_wrapper .big_one').size()<3) {
        $('.all_streams_wrapper .normal_one').first().addClass('big_one');
        $('.all_streams_wrapper .normal_one').first().css('clear','none');
        $('.all_streams_wrapper .normal_one').first().removeClass('normal_one');
        $('.all_streams_wrapper .normal_one').first().css('clear','left');
    }
    else if($('.all_streams_wrapper').width()<1440 && $('.all_streams_wrapper .big_one').size()>=3) {
        $('.all_streams_wrapper .normal_one').first().css('clear','none');
        $('.all_streams_wrapper .normal_one').first().prev().addClass('normal_one');
        $('.all_streams_wrapper .normal_one.big_one').css('clear','left');
        $('.all_streams_wrapper .normal_one.big_one').removeClass('big_one');
    }
}

//making 2 or 3 big block instead of monitor width
function Resize_news(){
    if ($('.content_main_block .left_column').width()>=1440 && $('.content_main_block .left_column .big_one').size()<3) {
        $('.content_main_block .left_column .normal_one').first().prev().removeClass('zero_margin');
        $('.content_main_block .left_column .normal_one').first().addClass('big_one');
        $('.content_main_block .left_column .normal_one').first().css('clear','none');
        $('.content_main_block .left_column .normal_one').first().removeClass('normal_one');
        $('.content_main_block .left_column .normal_one').first().css('clear','left');
    }
    else if($('.content_main_block .left_column').width()<1440 && $('.content_main_block .left_column .big_one').size()>=3) {
        $('.content_main_block .left_column .normal_one').first().css('clear','none');
        $('.content_main_block .left_column .normal_one').first().prev().addClass('normal_one');
        $('.content_main_block .left_column .normal_one.big_one').css('clear','left');
        $('.content_main_block .left_column .normal_one.big_one').removeClass('big_one');

    }
    $('.content_main_block .left_column .normal_one').first().prev().addClass('zero_margin');
    $('.content_main_block .left_column .normal_one').first().css('clear','left');
}
//making 2 or 3 big block instead of monitor width
function Resize_rooms(){
    if ($('.all_rooms_wrapper_with_shadow').width()>=1440 && $('.all_rooms_wrapper_with_shadow .big_one').size()<3) {
        $('.all_rooms_wrapper_with_shadow .normal_one').first().addClass('big_one');
        $('.all_rooms_wrapper_with_shadow .normal_one').first().css('clear','none');
        $('.all_rooms_wrapper_with_shadow .normal_one').first().removeClass('normal_one');
        $('.all_rooms_wrapper_with_shadow .normal_one').first().css('clear','left');
    }
    else if($('.all_rooms_wrapper_with_shadow').width()<1440 && $('.all_rooms_wrapper_with_shadow .big_one').size()>=3) {
        $('.all_rooms_wrapper_with_shadow .normal_one').first().css('clear','none');
        $('.all_rooms_wrapper_with_shadow .normal_one').first().prev().addClass('normal_one');
        $('.all_rooms_wrapper_with_shadow .normal_one.big_one').css('clear','left');
        $('.all_rooms_wrapper_with_shadow .normal_one.big_one').removeClass('big_one');
    }
}

//OLD RASPISANIE CONNECTING LINES
function Raspisanie(){
    var i=0;
    var y=0;
    $('.one_time_block').each(function(){
        for (x=0;x<50;x++)
        {
            $(this).find('.streams_at_this_time').removeClass('point'+x);
            $(this).find('.time_stream').removeClass('time'+x);
        }

        $(this).find('.streams_at_this_time').addClass('point'+i);
        $(this).find('.time_stream').addClass('time'+i);
        jsPlumb.detachAllConnections($(".point"+i));
        i++;
    });
    i=0;
    var slides=Math.floor(($('.the_hardest_part').width()-322)/$('.one_time_block').width());
    //alert(slides);
    for (j=0;j<slides;j++){
        var Bottom3 = new Array(6);
        Bottom3 =[0.5,0,0,0];
        jsPlumb.connect({
            source:$('.point'+i),
            target:$('.time'+i),
            connector:[ "Flowchart"],
            endpoint:[ "Rectangle", {
                width:7,
                height:3
            }],
            endpointStyle:{ fillStyle:"#fff", outlineColor:"#fff" },
            anchors:["TopLeft",Bottom3 ],
            paintStyle:{ strokeStyle:"#fff",lineWidth:1}
        });
        if ($('.one_time_block').size() > (i+1))
        {
            y=i+1;
            jsPlumb.connect({
                source:$('.point'+i),
                target:$('.point'+y),
                connector:[ "Straight"],
                cssClass:"dot"+i,
                endpoint:[ "Dot", {
                    radius:7
                }],
                paintStyle:{ strokeStyle:"#1b82c6",lineWidth:4,width:25, height:21},
                endpointStyle:{ fillStyle:"#fff", outlineColor:"#fff" },
                anchors:["TopLeft","TopLeft" ]

            });
            i++;
        }
    }
}

window.script_error_popup = function(error_text){
    $('.error_popup span').html(error_text);
    $('.error_popup').show();
    setTimeout(function() {
        $('.error_popup').fadeOut('fast');
    }, 5000);
};

window.script_message_popup = function(message_from, message_text){
    for (var i=1;i<4;i++)
    {
        if ($('.system_message_popup.mess'+i).is(':visible') && i<4) ;
        else if(i<4)
        {
            $('.system_message_popup.mess'+i+' .user_sysmessage_nick').text(message_from);
            $('.system_message_popup.mess'+i+' .sysmessage_text').text(message_text);
            $('.system_message_popup.mess'+i).show();
            setTimeout(function() {
                $('.system_message_popup.mess'+i).fadeOut('fast');
            }, 5000);
            return ;
        }
        else
        {
            return "more than 3 messages";
        }
    }
};
