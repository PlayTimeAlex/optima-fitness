(function ($) {
    $(document).ready(function () {
        $('.b-header__lang-select').styler({
            selectSearch: false
        });
        $('.b-rating').jRating({
            step: true,
            length: 5,
            decimalLength: 0,
            bigStarsPath: "images/stars.png"
        });
    });

    $(window).load(function () {

    });
}(jQuery));