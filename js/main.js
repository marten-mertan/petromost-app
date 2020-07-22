var windowWidth = (window.innerWidth); // вся ширина окна
var documentWidth = (document.documentElement.clientWidth); // ширина минус прокрутка
document.addEventListener('touchmove', function (event) {
    if (event.scale !== 1) {
        event.preventDefault();
    }
}, false);


$(window).on("load", function () {
    // $('.slider').fadeIn(3000);
});
$(document).ready(function () {
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
    var heightBasketBtnSmall = 45;

    // добавляет/удаляет отступ для всплывающей корзины
    var bottomPaddingBlock = {
        add: function(block){
            $(block).css({
                'padding-bottom': heightBasketBtnSmall
            });
        },
        remove: function(block){
            $(block).css({
                'padding-bottom': 0
            });
        },
    }
    
    // отступ для корзины по умолчанию, т.к. всплывающая блок есть всегда
    bottomPaddingBlock.add('.basket');

    $(document).on('click', '.product-buy__price, .catalog-basket-head__info', function (e) {
        e.preventDefault();
        catalogBasket.addClass('is-show');
        catalogBasket.css({
            'bottom': 0
        });

    });

    $(document).on('click', '.c-product-card-operation__add, .catalog-card-add__btn, .c-counter__btn, .js-pie-minus, .js-pie-plus', function (e) {
        e.preventDefault();
        catalogBasket.css({
            'bottom': posHead
        });
        catalogBasket.removeClass('is-show');
        bottomPaddingBlock.add('.catalog');
    });
    $(document).on('click', '.catalog-basket-title', function (e) {
        e.preventDefault();
        catalogBasket.removeClass('is-show');
        catalogBasket.css({
            'bottom': posHead
        });
    });

    $('.basket').each(function () {
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

    $(document).on('click', '.js-open-filter', function (e) {
        e.preventDefault();
        $('.popup-filter').addClass('is-visible');
        $('.popup-bg').addClass('is-visible');
        $('html').addClass('blocked');
    });

    $(document).on('click', '.popup-close, .popup-bg', function (e) {
        e.preventDefault();
        $('.popup-filter').removeClass('is-visible');
        $('.popup-bg').removeClass('is-visible');
        $('html').removeClass('blocked');
    });

    $(document).on('click', '.c-tabs-menu a', function (event) {

        event.preventDefault();
        $(this).parent().addClass("current");
        $(this).parent().siblings().removeClass("current");
        var tab = $(this).data("tab");
        $('.c-tabs').find(".tab-content").hide();
        //$(tab).show();
        //$('.c-tabs').find(".tab_content").not(tab).css("display", "none");

        $(tab).find('input.date_field').click();
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


    // $(document).on('click', '.c-counter__btn.dec', function (event) {
    //     event.preventDefault();
    //     var countValue = $(this).parents('.c-counter').find('.c-counter__field').val();
    //     if (countValue == 1) {
    //         $('.catalog-basket').removeClass('is-show');
    //         $('.catalog-card').removeClass('active');
    //         $('.c-product-card-operation').removeClass('is-show');
    //         // $('.c-product-card-operation').removeClass('is-show');
    //         catalogBasket.css({
    //             'bottom': -500
    //         });
    //     }
    //     // console.log('hide-catalog-basket');

    // });



    $('.header-layout').each(function () {

        if ($('div').hasClass('header-layout')) {
            $('.wrapper').addClass('has-header');
        } else {
            $('.wrapper').removeClass('has-header');
        }
        console.log('header-layout');

    });

    $('.catalog-basket').each(function () {

        if ($('div').hasClass('header-layout')) {
            $('.wrapper').addClass('has-basket');
        } else {
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

    $(window).on('resize', fix_size('.catalog-card__img img', '.catalog-card__img'));
    fix_size('.catalog-card__img img', '.catalog-card__img');

    $(window).on('resize', fix_size('.basket .c-product-card__img img','.basket .c-product-card__img'));
    fix_size('.basket .c-product-card__img img','.basket .c-product-card__img');


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
                    var unit = el[0].dataset.unit;
                    var value = parseInt(el[0].value);
                    value--;

                    if (!min || value >= min) {
                        //el[0].value = value;
                    }

                    el[0].value = getUnitValue(unit, el[0].value, 'dec');
                };

                // Увеличим значение
                function increment() {
                    var unit = el[0].dataset.unit;
                    var value = parseInt(el[0].value);

                    value++;
                    if (!max || value <= max) {
                        //el[0].value = value++;
                    }
                    el[0].value = getUnitValue(unit, el[0].value, 'inc');
                };

                function getUnitValue(unit, count, action) {
                    // Уведомление с лоудером

                    if (action == 'dec')
                        count = (unit == 'weight') ? (Math.round((parseFloat(count) - 0.1) * 10) / 10) : (parseInt(count) - 1);
                    else
                        count = (unit == 'weight') ? (Math.round((parseFloat(count) + 0.1) * 10) / 10) : (parseInt(count) + 1);

                    if (unit == 'weight' && count < 0.1)
                        count = 0.1;

                    if (unit == 'piece' && count < 1)
                        count = 1

                    if (unit == 'weight')
                        count = count.toFixed(1);

                    return count;
                }
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
    function backToTop(btnElem, parentElem) {
        var offset = 300,
            offset_opacity = 1200,
            scroll_top_duration = 700,
            $back_to_top = $(btnElem);
        // кнопка назад
        $(window).scroll(function () {
            ($(this).scrollTop() > offset) ? $back_to_top.addClass('cd-is-visible') : $back_to_top.removeClass('cd-is-visible cd-fade-out');
            if ($(this).scrollTop() > offset_opacity) {
                $back_to_top.addClass('cd-fade-out');
            }
        });

        $back_to_top.on('click', function (event) {
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

    $('.mfp-content-bg').on('click', function (e) {
        e.preventDefault();
        $(this).parents('.mfp-wrap').removeClass('is-visible');
        $('.mfp-bg').removeClass('is-visible');
        $html.css({
            'margin-right': '0'
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
        if (parentModal.data('save')) {
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
            if (windowWidth > documentWidth) {
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
            } else {
                // console.log('Нет полосы прокрутки');
            }
        });
    }

    $(document).on('click', '.js-popup-close', function (e) {
        e.preventDefault();
        $(this).parents('.mfp-wrap').removeClass('is-visible');
        $('.mfp-bg').removeClass('is-visible');
        $html.css({
            'margin-right': '0'
        }).removeClass('blocked');

        $header.css({
            'padding-right': '0'
        });

        var parentModal = $(this).parents('.mfp-wrap');
        if (parentModal.data('save')) {
            onPopupClose(parentModal);
        }
    });

    showPopup(".order-card-number__icon", '.popup-card');
    showPopup("#order-data-link", '.popup-user');
    showPopup(".header-menu", '.popup-mmenu');


    $('.js-phone-mobile-mask').mask('0(000)000-00-00', {clearIfNotMatch: true});
    $('.js-phone-stationary-mask').mask('00-00-00', {clearIfNotMatch: true});


    /*кастомный скролл в корзине*/
    // $(".popup-basket__body").mCustomScrollbar({
    //     // theme:"rounded-dots",
    //     scrollInertia:300
    // });

    //footer script

    /* catalog-category-new */
    $(document).on('click', '.js-open-category', function (e) {
        $('.js-category-dropdown').toggleClass('open');
    });

    /* раздел пирогов */
    $(document).on('click','.js-pie-minus', function(e){
        var count = parseInt($(this).siblings('.js-pie-input').find('input').val());
        var price = $(this).siblings('.js-pie-input').find('.js-pie-price').data('price').toString().replace(/\,/g,'.');
        if (count==1){
            $(this).parents('.js-pie').removeClass('in-cart');
        }
        if (count > 0){
            $(this).siblings('.js-pie-input').find('input').val(count-1);
        }
        if (count > 1){
            var currentPrice = (price*(count-1)).toFixed(2);
            currentPrice = currentPrice.toString().replace(/\./g,',');
            $(this).siblings('.js-pie-input').find('.js-pie-price').text(currentPrice);
        }
    });
    $(document).on('click','.js-pie-plus', function(e){
        var count = parseInt($(this).siblings('.js-pie-input').find('input').val());
        var max = parseInt($(this).siblings('.js-pie-input').find('input').data('max'));
        var price = $(this).siblings('.js-pie-input').find('.js-pie-price').data('price').toString().replace(/\,/g,'.');
        if (count==0){
            $(this).parents('.js-pie').addClass('in-cart');
        }
        if (count < max){
            $(this).siblings('.js-pie-input').find('input').val(count+1);
            var currentPrice = (price*(count+1)).toFixed(2);
            currentPrice = currentPrice.toString().replace(/\./g,',');
            $(this).siblings('.js-pie-input').find('.js-pie-price').text(currentPrice);
        }
    });

    // корзина пироги
    $(document).on('click','.js-cart-tab-all', function(e){
        $('.js-cart-tab-pies').removeClass('active');
        $(this).addClass('active');
        $('.js-cart-all').removeClass('mod-hide');
        $('.js-cart-pies').addClass('mod-hide');
    });
    $(document).on('click','.js-cart-tab-pies', function(e){
        $('.js-cart-tab-all').removeClass('active');
        $(this).addClass('active');
        $('.js-cart-pies').removeClass('mod-hide');
        $('.js-cart-all').addClass('mod-hide');

    });

    // фиксированная шапка
    let headerHeight = $('.header-layout').height();
    $('.wrapper').css('padding-top', headerHeight + 'px');

    $(document).on('click','.js-banner-close', function(e){
        $('.banner-back').addClass('hidden');
        let headerHeight = $('.header-layout').height();
        $('.wrapper').css('padding-top', headerHeight + 'px');
    });

    if ($('.barcode').length){
        JsBarcode('.barcode').init();
    }

    if ($('.js-slider-filter').length){
        $( ".js-slider-filter" ).slider({
            range: true,
            min: Number($( ".js-slider-filter" ).data('min')),
            max: Number($( ".js-slider-filter" ).data('max')),
            values: [ Number($( ".js-slider-filter" ).data('min')), Number($( ".js-slider-filter" ).data('max')) ],
            slide: function( event, ui ) {
                $( ".js-slider-min" ).val( ui.values[ 0 ]);
                $( ".js-slider-max" ).val( ui.values[ 1 ]);
                $('.js-filter-decor').addClass('active');
                $('.js-filter-clear').addClass('active');
            }
        });
    }
    $(document).on('change','.js-slider-min', function(e){
        let value = Number($( ".js-slider-min" ).val());
        let min = Number($( ".js-slider-min" ).attr('min'));
        let max = Number($( ".js-slider-max" ).val());
        if (value > max){
            value = max;
            $( ".js-slider-min" ).val(value);
        }
        if (value < min){
            value = min;
            $( ".js-slider-min" ).val(value);
        }
        $( ".js-slider-filter" ).slider( "values", 0, value);
        $('.js-filter-decor').addClass('active');
        $('.js-filter-clear').addClass('active');

    });
    $(document).on('change','.js-slider-max', function(e){
        let value = Number($( ".js-slider-max" ).val());
        let min = Number($( ".js-slider-min" ).val());
        let max = Number($( ".js-slider-max" ).attr('max'));
        console.log(max);
        if (value < min){
            value = min;
            $( ".js-slider-max" ).val(value);
        }
        if (value > max){
            value = max;
            $( ".js-slider-max" ).val(value);
        }
        $( ".js-slider-filter" ).slider( 'values', 1, value);
        $('.js-filter-decor').addClass('active');
        $('.js-filter-clear').addClass('active');

    });

    $(document).on('click','.js-filter-btn', function(e){
        e.preventDefault();
        $('.js-filter-btn').removeClass('active');
        $('.js-filter-decor').addClass('active');
        $('.js-filter-clear').addClass('active');
        $(this).addClass('active');
    });

    $(document).on('click','.js-filter-category-head', function(e){
        $(this).parent('.js-filter-category').toggleClass('closed');
    });

    $(document).on('click','.js-filter-check', function(e){
        $('.js-filter-decor').addClass('active');
        $('.js-filter-clear').addClass('active');
    });
    
    $(document).on('click','.js-filter-clear', function(e){
        $('.js-filter-search').val('');
        $('.js-filter-check').show();
        $('.js-filter-check input').prop('checked',false);
        $( ".js-slider-filter" ).slider( 'values', 0, Number($( ".js-slider-filter" ).data('min')));
        $( ".js-slider-filter" ).slider( 'values', 1, Number($( ".js-slider-filter" ).data('max')));
        $( ".js-slider-min" ).val(Number($( ".js-slider-filter" ).data('min')));
        $( ".js-slider-max" ).val(Number($( ".js-slider-filter" ).data('max')));
        $('.js-filter-btn').removeClass('active');
        $('.js-filter-btn').first().addClass('active');
        $('.js-filter-decor').removeClass('active');
        $('.js-filter-clear').removeClass('active');

    });

    $(document).on('click','.js-order-next', function(e){
        e.preventDefault();
        $(this).parents('.js-order-section').addClass('closed complete');
        var nextEl = $('.js-order-section').not('.complete').first();
        nextEl.removeClass('closed');
    });

    $(document).on('click','.js-order-back', function(e){
        e.preventDefault();
        $(this).parents('.js-order-section').addClass('closed').removeClass('complete');
        var prevEl = $('.js-order-section.complete').last();
        prevEl.removeClass('closed complete');
    });

    $('.js-filter-search').bind('input', function() {
        var $this = $(this);
        var delay = 300;
        clearTimeout($this.data('timer'));
        $this.data('timer', setTimeout(function(){
            var value = $this.val().toLowerCase();
            if (value){
                $('.js-filter-check').each(function( index ) {
                    var text = $(this).children('.js-filter-check-text').text().toLowerCase();
                    if ((text).indexOf(value) !== -1){
                        $(this).show();
                    } else{
                        $(this).hide();
                    }
                });
            } else{
                $('.js-filter-check').show();
            }
        }, delay));
    });
});