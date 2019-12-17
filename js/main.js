var windowWidth = (window.innerWidth ); // вся ширина окна
var documentWidth = (document.documentElement.clientWidth ); // ширина минус прокрутка
document.addEventListener('touchmove', function (event) {
    if (event.scale !== 1) { event.preventDefault(); }
}, false);


$(window).on("load", function () {
    // $('.slider').fadeIn(3000);
});

$(function () {

    //добавление выбора города

    $(document).on('click', '.popup-menu-city a', function (e) {
        e.preventDefault();
        $('.popup-menu-body').addClass('is-hide');
        $('.popup-menu-city__body').addClass('is-show');
    });

    $(document).on('click', '.popup-menu-city__link, .popup-close', function () {
        $('.popup-menu-body').removeClass('is-hide');
        $('.popup-menu-city__body').removeClass('is-show');
    });



    $('.slider').slick({
        dots: true,
        arrows: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        focusOnSelect: true
    });


    $('.product .catalog-list').slick({
        dots: true,
        arrows: false,
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 1
    });


    $(document).on('click', '.catalog-card-add__btn', function (e) {
        e.preventDefault();
        $(this).parents('.catalog-card').addClass('active');
    });

    $(document).on('click', '.catalog-card-favorite', function (e) {
        e.preventDefault();
        $(this).toggleClass('active');
    });


    //корзина в каталоге
    var catalogBasketHeight = $('.catalog-basket').height();
    var catalogBasketHeadHeight = $('.catalog-basket-head').height();
    var pos = +(catalogBasketHeight - catalogBasketHeadHeight);
    var posHead = -(catalogBasketHeight - catalogBasketHeadHeight);
    console.log('catalogBasketHeight: ' + catalogBasketHeight);
    console.log('catalogBasketHeadHeight: ' + catalogBasketHeadHeight);
    console.log('posHead: ' + posHead);
    console.log(pos);
    var catalogBasket = $('.catalog-basket');

    $(document).on('click', '.product-buy__price, .catalog-basket-head__info', function (e) {
        e.preventDefault();
        catalogBasket.addClass('is-show');
        catalogBasket.css({
            'bottom': 0
        });
    });

    $(document).on('click', '.c-product-card-operation__add, .catalog-card-add__btn', function (e) {
        e.preventDefault();
        catalogBasket.css({
            'bottom': posHead
        });
    });
    $(document).on('click', '.catalog-basket-title', function (e) {
        e.preventDefault();
        catalogBasket.removeClass('is-show');
        catalogBasket.css({
            'bottom': posHead
        });
    });

    $('.basket').each(function(){
        catalogBasket.css({
            'bottom': posHead
        });
    });
    // if($('div').hasClass('basket')){
    //     catalogBasket.css({
    //         'bottom': posHead
    //     });
    // }


    $(document).on('click', '.header-menu', function (e) {
        e.preventDefault();
        $('.popup-menu').addClass('is-visible');
        $('.popup-bg').addClass('is-visible');
        $('html').addClass('blocked');
    });

    $(document).on('click', '.popup-close, .popup-bg', function (e) {
        e.preventDefault();
        $('.popup-menu').removeClass('is-visible');
        $('.popup-bg').removeClass('is-visible');
        $('html').removeClass('blocked');
    });

    $(document).on('click', '.c-tabs-menu a', function (event) {
        event.preventDefault();
        $(this).parent().addClass("current");
        $(this).parent().siblings().removeClass("current");
        var tab = $(this).attr("href");
        $('.c-tabs').find(".tab-content").not(tab).css("display", "none");
        // $(this).parents('.tabs-menu').parent().siblings('.tab').find(".tab-content").not(tab).css("display", "none");
        $(tab).fadeIn();
    });


    $(document).on('click', '.order-history-info__head', function (event) {
        event.preventDefault();
        $('.order-history-info__body').slideToggle(200);
    });

    $(document).on('click', '.c-product-card-operation__add, .catalog-card-add__btn', function (event) {
        event.preventDefault();
        $(this).parents('.c-product-card-operation').toggleClass('is-show');
    });


    $(document).on('click', '.c-counter__btn.dec', function (event) {
        event.preventDefault();
        var countValue = $(this).parents('.c-counter').find('.c-counter__field').val();
        if(countValue == 1){
            $('.catalog-basket').removeClass('is-show');
            $('.catalog-card').removeClass('active');
            $('.c-product-card-operation').removeClass('is-show');
            // $('.c-product-card-operation').removeClass('is-show');
            catalogBasket.css({
                'bottom': -500
            });
        }
        // console.log('hide-catalog-basket');

    });



    $('.header-layout').each(function(){

        if($('div').hasClass('header-layout')){
            $('.wrapper').addClass('has-header');
        }else {
            $('.wrapper').removeClass('has-header');
        }
        // console.log('header-layout');

    });

    $('.header-layout div').each(function(num, elem){

        console.log(elem);

        if($(elem).hasClass('search-area')){
            $('.wrapper').addClass('has-search');
        }else {
            $('.wrapper').removeClass('has-search');
        }
        // console.log('header-layout');

    });

    $('.catalog-basket').each(function(){

        if($('div').hasClass('header-layout')){
            $('.wrapper').addClass('has-basket');
        }else {
            $('.wrapper').removeClass('has-basket');
        }

    });

    function fix_size($img, $parentImg) {
        var images = $($img);
        images.each(setsize);

        function setsize() {
            var img = $(this),
                img_dom = img.get(0),
                container = img.parents($parentImg);
            if (img_dom.complete) {
                resize();
            } else img.one('load', resize);

            function resize() {
                if ((container.width() / container.height()) < (img_dom.width / img_dom.height)) {
                    img.width('100%');
                    img.height('auto');
                    return;
                }
                img.height('100%');
                img.width('auto');
            }
        }
    }
    $(window).on('resize', fix_size('.catalog-card__img img','.catalog-card__img'));
    fix_size('.catalog-card__img img','.catalog-card__img');





    if ($(window).width() < 1000) {

    }

    $(window).resize(function () {
        if ($(window).width() < 1000) {

        }
    });




    



    /*функция счета больше/меньше*/
    function catalogItemCounter(field) {
        var fieldCount = function (el) {
            var
            // Мин. значение
                min = el.data('min') || false,
            // Макс. значение
                max = el.data('max') || false,
            // Кнопка уменьшения кол-ва
                dec = el.siblings('.dec'),
            // Кнопка увеличения кол-ва
                inc = el.siblings('.inc');

            function init(el) {
                if (!el.attr('disabled')) {
                    dec.on('click', decrement);
                    inc.on('click', increment);
                }
                // Уменьшим значение
                function decrement() {
                    var value = parseInt(el[0].value);
                    value--;

                    if (!min || value >= min) {
                        el[0].value = value;
                    }
                };
                // Увеличим значение
                function increment() {
                    var value = parseInt(el[0].value);

                    value++;

                    if (!max || value <= max) {
                        el[0].value = value++;
                    }
                };
            }

            el.each(function () {
                init($(this));
            });
        };
        $(field).each(function () {
            fieldCount($(this));
        });
    }

    catalogItemCounter('.fieldCount');


    //footer-bottom__scrollup

    //кнопка вверх
    function backToTop (btnElem, parentElem){
        var offset = 300,
            offset_opacity = 1200,
            scroll_top_duration = 700,
            $back_to_top = $(btnElem);
        // кнопка назад
        $(window).scroll(function(){
            ( $(this).scrollTop() > offset ) ? $back_to_top.addClass('cd-is-visible') : $back_to_top.removeClass('cd-is-visible cd-fade-out');
            if( $(this).scrollTop() > offset_opacity ) {
                $back_to_top.addClass('cd-fade-out');
            }
        });

        $back_to_top.on('click', function(event){
            event.preventDefault();
            $(parentElem).animate({
                    scrollTop: 0
                }, scroll_top_duration
            );
        });
    }

    backToTop('.footer-bottom__scrollup', 'body,html');

    /*------------------------------*/
    /*------------------------------*/
    /*------------------------------*/

    $('.mfp-content-bg').on('click', function(e){
        e.preventDefault();
        $(this).parents('.mfp-wrap').removeClass('is-visible');
        $('.mfp-bg').removeClass('is-visible');
        $html.css({
            'margin-right':'0'
        }).removeClass('blocked');
        $('.wrapper').removeClass('fixed-input');
        $('.header.sticky').css({
            // 'right':'0'
        });
        // console.log('hide popup');

        $header.css({
            'padding-right': '0'
        });

        var parentModal = $(this).parents('.mfp-wrap');
        if(parentModal.data('save')){
            onPopupClose(parentModal);
        }
    });

    $(".popup-bg").click(function (e) {
        e.preventDefault();
        $('.popup').parents().removeClass('is-visible');
        // $('.fixed-overlay').removeClass('is-visible');
        $('html').removeClass('body-popup');
    });


    var $html = $('html');
    var $header = $('.header-layout');
    /*функция показа модального окна*/
    function showPopup(icon, popup) {
        $(document).on('click', icon, function (e) {

            e.preventDefault();
            $(popup).addClass('is-visible');
            $('.mfp-bg').addClass('is-visible');


            $html.addClass('blocked');
            // $('body').addClass('blocked');

            var widthScroll = windowWidth - documentWidth;
            console.log('widthScroll: ' + widthScroll);
            if(windowWidth > documentWidth){
                $html.css({
                    'margin-right': widthScroll
                });
                $header.css({
                    'padding-right': widthScroll
                });
                // $('.mfp-wrap').css({
                //     'overflow-y':'scroll'
                // });
                // console.log('Есть полоса прокрутки');
            }else {
                // console.log('Нет полосы прокрутки');
            }
        });
    }

    $(document).on('click', '.js-popup-close', function (e) {
        e.preventDefault();
        $(this).parents('.mfp-wrap').removeClass('is-visible');
        $('.mfp-bg').removeClass('is-visible');
        $html.css({
            'margin-right':'0'
        }).removeClass('blocked');

        $header.css({
            'padding-right': '0'
        });

        var parentModal = $(this).parents('.mfp-wrap');
        if(parentModal.data('save')){
            onPopupClose(parentModal);
        }
    });

    showPopup(".order-card-number__icon", '.popup-card');
    showPopup("#order-data-link", '.popup-user');
    showPopup(".header-menu", '.popup-menu');
    showPopup(".order-address-select", '.popup-address');
    showPopup(".order-address-add__btn", '.popup-address-new');



    $('.js-phone-mobile-mask').mask('0(000)000-00-00', {clearIfNotMatch: true});
    $('.js-phone-stationary-mask').mask('00-00-00', {clearIfNotMatch: true});



    $(document).on('click', '.popup-address .delivery-card-add', function(e){
        e.preventDefault();
        $('.js-popup-close').trigger('click');
        $('.order-address-add__btn').trigger('click');
    });
    
    /*кастомный скролл в корзине*/
    // $(".popup-basket__body").mCustomScrollbar({
    //     // theme:"rounded-dots",
    //     scrollInertia:300
    // });

    //footer script
});