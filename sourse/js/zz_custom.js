(function ($) {
    $(document).ready(function () {
        //Стилизация списка выбора языков
        $('.b-header__lang-select').styler({
            selectSearch: false
        });

        //стилизация салектов в формах
        setTimeout(function() {
            $('.b-form__select').styler({
                selectSearch: false
            });
        }, 100);

        //Маска для полей ввода телефона
        $(".b-form__text_tel").mask("(999) 999-9999",{placeholder:"*"});

        //UI дейтпикер
        $.datepicker.regional['ru'] = {
            closeText: 'Закрыть',
            prevText: '<Пред',
            nextText: 'След>',
            currentText: 'Сегодня',
            monthNames: ['Январь','Февраль','Март','Апрель','Май','Июнь',
                'Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
            monthNamesShort: ['Янв','Фев','Мар','Апр','Май','Июн',
                'Июл','Авг','Сен','Окт','Ноя','Дек'],
            dayNames: ['воскресенье','понедельник','вторник','среда','четверг','пятница','суббота'],
            dayNamesShort: ['вск','пнд','втр','срд','чтв','птн','сбт'],
            dayNamesMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
            weekHeader: 'Не',
            dateFormat: 'dd.mm.yy',
            firstDay: 1,
            isRTL: false,
            showMonthAfterYear: false,
            yearSuffix: ''
        };
        $.datepicker.setDefaults($.datepicker.regional['ru']);
        $('.b-form_datepicker').datepicker({
            beforeShow: function() {
                setTimeout(function(){
                    $('.ui-datepicker').css('z-index', 150);
                }, 0);
            }
        });
        //$('.b-form__text_num').;
        $('.b-rating__star').rating();

        $('.colorbox-inline').colorbox({
            inline:true,
            close: ""
        });

        //faq (spoiler)
        $('.b-faq__title').click(function(){
            el = $(this).parent();
            if(el.hasClass('open')){
                el.removeClass('open');
            } else {
                el.addClass('open');
            }
        });
    });

    $(window).load(function () {
        $('.b-slider, .b-pslider').flexslider({
            prevText: "",
            nextText: ""
        });

    });
}(jQuery));