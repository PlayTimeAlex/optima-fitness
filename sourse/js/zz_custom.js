(function ($) {
    $(document).ready(function () {
        //Стилизация списка выбора языков
        $('.b-header__lang-select').styler({
            selectSearch: false
        });

        //стилизация салектов в формах
        setTimeout(function () {
            $('.b-form__select').styler({
                selectSearch: false
            });
        }, 100);

        //Маска для полей ввода телефона
        $(".b-form__text_tel").mask("(999) 999-9999", {placeholder: "*"});

        //UI дейтпикер
        $.datepicker.regional['ru'] = {
            closeText: 'Закрыть',
            prevText: '<Пред',
            nextText: 'След>',
            currentText: 'Сегодня',
            monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
                'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
            monthNamesShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн',
                'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
            dayNames: ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
            dayNamesShort: ['вск', 'пнд', 'втр', 'срд', 'чтв', 'птн', 'сбт'],
            dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
            weekHeader: 'Не',
            dateFormat: 'dd.mm.yy',
            firstDay: 1,
            isRTL: false,
            showMonthAfterYear: false,
            yearSuffix: ''
        };
        $.datepicker.setDefaults($.datepicker.regional['ru']);
        $('.b-form_datepicker').datepicker({
            beforeShow: function () {
                setTimeout(function () {
                    $('.ui-datepicker').css('z-index', 150);
                }, 0);
            }
        });
        //$('.b-form__text_num').;
        $('.b-rating__star').rating();

        $('.colorbox-inline').colorbox({
            inline: true,
            close: ""
        });
        $('.cb-close').click(function(){
            $.colorbox.close();
            return false;
        });
        //faq (spoiler)
        $('.b-faq__title').click(function () {
            el = $(this).parent();
            if (el.hasClass('open')) {
                el.removeClass('open');
            } else {
                el.addClass('open');
            }
        });

        //float block

        setTimeout(function () {
            $('.b-form__select').styler({
                selectSearch: false
            });
        }, 100);
        if ($('.rnd__float-container').length) {
            var elParent = $('.rnd__float-container');
            var el = $('.rnd__float', elParent);
            var contheight = elParent.height();
            var elheight = el.outerHeight();
            var maxtop = elParent.height() - elheight;
            var toppos = el.offset().top;

            $(window).scroll(function () {
                var scrollTop = $(window).scrollTop();
                if (scrollTop > toppos) {
                    if ((scrollTop - toppos + 150) < maxtop - 50) {
                        el.css("top", scrollTop - toppos + 50);
                    } else {
                        el.css("top", maxtop - 150);
                    }
                } else {
                    el.css("top", 0);
                }
            });
        }

        //colorbox image
        $('.b-gallery__item, .b-fitem_gl').colorbox({
            close: "",
            rel: true,
            previous: "",
            next: "",
            current: "{current}/{total}"
        });
        $(".b-fitem_gyt").colorbox({
            iframe: true,
            innerWidth: 640,
            innerHeight: 390});

        //print
        $('.rnd__print').click(function () {
            window.print();
            return false;
        });

        //compare items
        if ($('.b-compare').length) {
            $(".b-compare__table tr").each(function () {
                var content = false;
                var contentNew = null;
                $('.tocompare', this).each(function () {
                    var contentNew = $(this).html();
                    if (content && contentNew != content) {
                        console.log('test');
                        $(this).parent().removeClass('equal').addClass('different');
                        return false;
                    } else {
                        $(this).parent().addClass('equal');
                    }
                    content = $(this).html();
                });
            });
            $('.b-compare').each(function () {
                if (!$('.different', this).length) {
                    $(this).addClass('equal');
                }
            })
        }

        //compare swith
        $('.b-compare__switch-btn').click(function () {
            if (!$(this).hasClass('active')) {
                $('.b-compare__switch-btn').removeClass('active');
                $(this).addClass('active');

                if ($(this).data('action') == "all") {
                    $('.equal').show('fast');
                } else {
                    $('.equal').hide('fast');
                }
            }
            return false;
        });

        //filter slider
        $('#b-filter__slider').slider({
            range: true,
            min: $('#filtermin').data('min'),
            max: $('#filtermax').data('max'),
            values: [ 0, 10000 ],
            slide: function (event, ui) {
                $("#filtermax").val(ui.values[ 1 ]);
                $("#filtermin").val(ui.values[ 0 ]);
            }
        });

        $('#filtermax, #filtermin').keyup(function () {
            var re = /^[0-9-'.'-',']*$/;
            var field = $(this);
            var fieldval = field.val();
            var max = $('#filtermax').data('max');
            var min = $('#filtermin').data('min');
            if (!re.test(field.val())) {
                field.val(field.val().replace(/[^0-9-'.'-',']/g, ""));
            }

            if (fieldval < min) {
                su = min;
            } else if (fieldval > max) {
                su = max;
            } else {
                su = fieldval;
            }

            if ($(this).attr('id') == 'filtermax') {
                $("#b-filter__slider").slider({ values: [ $('#filtermin').val(), su ] });
            } else {
                $("#b-filter__slider").slider({ values: [ su, $('#filtermax').val() ] });
            }
        }).blur(function () {
            var fieldval = $(this).val();
            fieldmax = $('#filtermax');
            fieldmin = $('#filtermin');
            var max = fieldmax.data('max');
            var min = fieldmin.data('min');

            if (fieldval < min) {
                $(this).val(min);
            } else if (fieldval > max) {
                $(this).val(max);
            }

            var curmax = parseFloat(fieldmax.val());
            var curmin = parseFloat(fieldmin.val());

            if (curmin > curmax) {
                fieldmax.val(curmin);
                fieldmin.val(curmax);
            }
            $("#b-filter__slider").slider({ values: [ fieldmin.val(), fieldmax.val() ] });
        });

        //cart tabs
        $('.next-order-step').click(function () {
            var nextTab = $('.current-tab').next(".b-cart-tab__tab");
            $('.current-tab').removeClass('current-tab').hide('fast');
            $('.b-cart-tab__item').eq($(this).data('step')).addClass('b-cart-tab__item_active').prev().removeClass('b-cart-tab__item_active');

            nextTab.addClass('current-tab').show('fast');
            if ($(this).data('step') == 3) {
                $(this).hide('fast');
                $('.finish-order').show('fast');
            } else {
                $('.prev-order-step').show('fast');
            }
            $(this).data('step', $(this).data('step') + 1);
            return false;
        });

        $('.prev-order-step').click(function () {
            var nextTab = $('.current-tab').prev(".b-cart-tab__tab");
            $('.current-tab').removeClass('current-tab').hide('fast');
            $('.b-cart-tab__item').eq($('.next-order-step').data('step') - 1).removeClass('b-cart-tab__item_active').prev().addClass('b-cart-tab__item_active');

            nextTab.addClass('current-tab').show('fast');
            if ($('.next-order-step').data('step') == 2) {
                $(this).hide('fast');
            } else if ($('.next-order-step').data('step') == 4) {
                $('.finish-order').hide('fast');
                $('.next-order-step').show('fast');
            }
            $('.next-order-step').data('step', $('.next-order-step').data('step') - 1);
            return false;
        });

        function cartTotal() {
            var price = 0;
            $('.total', '.b-cart__cart').each(function () {
                price = price + parseFloat($(this).html().replace(/\s/g, ''));
            });
            $('.num', '.b-cart__ttotal').html(price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "));
        }

        function updatePrice(item, quantity) {
            var itemPrice = parseFloat($('.price', item).html().replace(/\s/g, ''));
            var itemTotalPrice = itemPrice * quantity;
            $('.total', item).html(itemTotalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "));
        }

        $('.b-cart__quant-m').click(function () {
            var currField = $(this).siblings('.b-cart__quant-i');
            var min = parseFloat(currField.data('min'));
            var currQ = parseFloat(currField.val());
            if (currQ > min) {
                currField.val(currQ - 1);
                updatePrice($(this).closest("tr"), currQ - 1);
                cartTotal();
            }
            return false;
        });
        $('.b-cart__quant-p').click(function () {
            var currField = $(this).siblings('.b-cart__quant-i');
            var currQ = parseFloat(currField.val());
            currField.val(currQ + 1);
            updatePrice($(this).closest("tr"), currQ + 1);
            cartTotal();
            return false;
        });

        $('.b-cart__quant-i').blur(function () {
            var re = /^[0-9-'.'-',']*$/;
            var field = $(this);
            if (!re.test(field.val())) {
                field.val(field.val().replace(/[^0-9-'.'-',']/g, ""));
            }
            var fieldval = field.val();
            var min = parseFloat($(this).data('min'));
            if (fieldval < min) {
                fieldval = min;
                field.val(fieldval);
            }

            updatePrice($(this).closest("tr"), fieldval);
            cartTotal();
        })
        //full item slider
        $(".b-fitem__navlink").click(function () {
            var slide = parseFloat($(this).data('slide')) - 1;
            var slider = $(this).data('slider');
            $(".b-fitem__navlink").removeClass('active')
            $(this).addClass('active');
            console.log(slider);
            $('#'+slider).flexslider(slide);

            return false;
        });

        //features
        $('.b-features__pitem').click(function () {
            $('.b-features__item').hide('fast');
            $('#featureitem' + $(this).data('item')).show('fast');
            $('.b-features__pitem').removeClass('active')
            $(this).addClass('active');
            return false;
        });

        //menu
        function onScroll(event) {
            var scrollPos = $(document).scrollTop() + 200;
            $('.b-itemmenu a').each(function () {
                var currLink = $(this);
                var refElement = $(currLink.attr("href"));
                if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
                    $('.b-menu__list a').removeClass("active");
                    currLink.addClass("active");
                }
                else {
                    currLink.removeClass("active");
                }
            });
        }

        setTimeout(function () {
            if ($('.b-itemmenu').length) {
                var menupos = $('.b-itemmenu').offset().top;
                var headheight = $('.b-itemmenu').outerHeight();
            }
            if ($('.b-compare__list-wrap').length) {
                var comparemenu = $('.b-compare__list-wrap').offset().top;
            }

            $(window).scroll(function () {

                if (menupos < $(window).scrollTop()) {
                    $('.b-itemmenu').css('position', 'fixed');
                } else {
                    $('.b-itemmenu').css('position', 'absolute');
                }

                if (comparemenu < $(window).scrollTop()) {
                    $('.b-compare__list').css('position', 'fixed');
                } else {
                    $('.b-compare__list').css('position', 'absolute');
                }
                onScroll();
            });
        }, 200);

        //scroll
        function scrollto_c(elem) {
            $('html, body').animate({
                scrollTop: $(elem).offset().top - 72
            }, 500);
        }

        $('.anim-scroll').click(function () {
            scrollto_c($(this).attr('href'));
            return false;
        });

        //submenu position
        $('.b-nav__item').hover(function(){
            $('.b-nav__sub',this).show();
            if($(this).position().left > 460){
                $('.b-nav__sub',this).addClass('right');
            }
        }, function(){
            $('.b-nav__sub',this).hide();
        });

        //where to buy map function
        $('.b-where-buy__gomap').click(function(){
            $('.b-where-buy__m-item').removeClass('active');
            $(this).closest('.b-where-buy__m-item').addClass('active');
            return false;
        });
    });


    $(window).load(function () {
        $('.b-slider, .b-pslider, .b-special__slider').flexslider({
            prevText: "",
            nextText: ""
        });

        $('.b-fitem__slider').flexslider({
            prevText: "",
            nextText: "",
            animationSpeed: 250,
            slideshow: false,
            after: function (slider) {
                console.log(slider.currentSlide);
                $(".b-fitem__navlink", '#' + slider.attr('id') + '_nav').removeClass('active').eq(slider.currentSlide).addClass('active');
            }
        });

        $('.b-features__pislider').flexslider({
            prevText: "",
            nextText: "",
            slideshow: false
        });
    });
}(jQuery));