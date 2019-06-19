function mobileMenuToggle() {
   var menuTrigger = $('.mobile-menu-toggle');
   var dropdown = $('.dropdown-header');

   menuTrigger.click(function() {
       dropdown.toggleClass('show');
       menuTrigger.toggleClass('active');
       $('body').toggleClass('blocker');
   });
   dropdown.click(function () {
       dropdown.removeClass('show');
       $('body').removeClass('blocker');
       menuTrigger.removeClass('active');
   })
}

function stylesSelect() {
    $('.select-filter').each(function () {
        // Variables
        var $this = $(this),
            selectOption = $this.find('option'),
            selectOptionLength = selectOption.length,
            selectedOption = selectOption.filter(':selected'),
            dur = 500;

        $this.hide();
        // Wrap all in select box
        $this.wrap('<div class="select"></div>');
        // Style box
        $('<div>', {
            class: 'select__gap',
            text: 'Toyota LC Prado 150'
        }).insertAfter($this);

        var selectGap = $this.next('.select__gap'),
            caret = selectGap.find('.caret');
        // Add ul list
        $('<ul>', {
            class: 'select__list'
        }).insertAfter(selectGap);

        var selectList = selectGap.next('.select__list');
        // Add li - option items
        for (var i = 0; i < selectOptionLength; i++) {
            $('<li>', {
                class: 'select__item',
                html: $('<span>', {
                    text: selectOption.eq(i).text()
                })
            })
                .attr('data-value', selectOption.eq(i).val())
                .appendTo(selectList);
        }
        // Find all items
        var selectItem = selectList.find('li');

        selectList.slideUp(0);
        selectGap.on('click', function () {
            if (!$(this).hasClass('on')) {
                $(this).addClass('on');
                selectList.slideDown(dur);

                selectItem.on('click', function () {
                    var chooseItem = $(this).data('value');

                    $('select').val(chooseItem).attr('selected', 'selected');
                    selectGap.text($(this).find('span').text());

                    selectList.slideUp(dur);
                    selectGap.removeClass('on');
                });

            } else {
                $(this).removeClass('on');
                selectList.slideUp(dur);
            }
        });

    });
}

function maskNumber() {
    $(".mask-number").mask("+7( 999 ) 999 - 99 - 99");
}

function smoothJump() {
    $("body").on("click","a", function (event) {
        //отменяем стандартную обработку нажатия по ссылке
        event.preventDefault();

        //забираем идентификатор бока с атрибута href
        var id  = $(this).attr('href'),

        //узнаем высоту от начала страницы до блока на который ссылается якорь
        top = $(id).offset().top;

        //анимируем переход на расстояние - top за 1500 мс
        $('body,html').animate({scrollTop: top}, 1500);
    });

}

function fancybox() {
    $('[data-fancybox="gallery"]').fancybox();
}

$(window).on('load', function() {
    mobileMenuToggle();
    stylesSelect();
    maskNumber();
    smoothJump();
   fancybox();
});