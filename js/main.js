'use strict'



let docWidth = document.body.clientWidth

// Функционал блокировки скрола при открытии модального окна
const BlockScroll = {
    open: function () {
        setTimeout(function () {

            if (!document.body.hasAttribute('data-body-scroll-fix')) {
                let scrollPosition = window.pageYOffset || document.documentElement.scrollTop; // Получаем позицию прокрутки

                document.body.setAttribute('data-body-scroll-fix', scrollPosition); // Cтавим атрибут со значением прокрутки
                document.body.style.overflow = 'hidden';
                document.body.style.position = 'fixed';
                document.body.style.top = '-' + scrollPosition + 'px';
                document.body.style.left = '0';
                document.body.style.right = '0';
                if ($('body').height() < $(window).height()) {
                    document.body.style.bottom = '0';
                }

            }
        }, 10);
    },
    close: function () {
        setTimeout(function () {
            if (document.body.hasAttribute('data-body-scroll-fix')) {

                let scrollPosition = document.body.getAttribute('data-body-scroll-fix'); // Получаем позицию прокрутки из атрибута

                document.body.removeAttribute('data-body-scroll-fix'); // Удаляем атрибут
                document.body.style.overflow = '';
                document.body.style.position = '';
                document.body.style.top = '';
                document.body.style.left = '';
                document.body.style.right = '';
                window.scroll(0, scrollPosition); // Прокручиваем на полученное из атрибута значение
            }
        }, 10)
    }
}
// ------------------------------------


jQuery(document).ready(function ($) {



    // Инициализация плагина анимации
    AOS.init({
        once: true,
    });
    // ------------------------------------

    // Инициализация плагина параллакс
    if ($('.rellax').length)
        var rellax = new Rellax('.rellax');



    // Функционал пагинации справа
    const RightPag = {
        defaultOptions: {
            pagList: $('.pagination-list')
        },
        init: function (options) {
            var options = $.extend(this.defaultOptions, options)
            this.events(options)
        },
        events: function (options) {
            console.log(options)
            const pagLi = options.pagList.find('li')
            pagLi.on('click', function (e) {
                e.preventDefault()
                const $this = $(this)
                $this.siblings().removeClass('active')
                $this.addClass('active')
            })
        }
    }
    if ($('.pagination-list').length) {
        RightPag.init()
    }
    // ------------------------------------


    // Функционал слайдера
    const MainSlider = {
        defaultOptions: {
            sliderOuter: $('.slider-outer')
        },
        init: function (options) {
            var options = $.extend(this.defaultOptions, options)
            // console.log(options.sliderOuter)
            const sliderWrapper = options.sliderOuter,
                sliderContainer = sliderWrapper.find('.swiper-container'),
                PrevArrow = sliderWrapper.find('.swiper-arrow.--prev'),
                NextArrow = sliderWrapper.find('.swiper-arrow.--next')


            let swiper = new Swiper(sliderContainer, {
                slidesPerView: 'auto',
                // spaceBetween: 80,
                slidesPerGroup: 3,
                speed: 1000,
                lazy: true,
                watchOverflow: true,
                watchSlidesVisibility: true,
                touchReleaseOnEdges: true,
                // loop: true,
                grabCursor: true,
                navigation: {
                    nextEl: NextArrow,
                    prevEl: PrevArrow,
                },
                // autoplay: {
                //     delay: 5000,
                //     disableOnInteraction: false,
                //     pauseOnMouseEnter: true,
                // },
            })
        },


    }
    if ($('.slider-outer').length) {
        MainSlider.init()
    }
    // ------------------------------------


    if ($('.marquee-wrapper').length) {
        $('.marquee-wrapper').marquee({
            //speed in milliseconds of the marquee
            duration: 20000,
            //gap in pixels between the tickers
            gap: 50,
            //time in milliseconds before the marquee will start animating
            delayBeforeStart: 0,
            //'left' or 'right'
            direction: 'left',
            //true or false - should the marquee be duplicated to show an effect of continues flow
            duplicated: true,
            duplicateCount: 10,
            startVisible: true
        });
    }

    // Функционал работы Header
    const InitHeader = {
        defaultsOptions: {
            headerWrapper: $('header'),
            headerOuter: $('.header-outer'),
            // headerHamburger: $('.header-hamburger'),
            windowWidth: document.body.clientWidth,
            lastScrollTop: 0,
            // headerMob: $('.header-mob'),
            // topSocials: $('.top-socials')
        },
        init: function () {
            // console.log($(this.HeaderBurger))
            this.events()
            // this.checkMargin()
            // this.checkAdaptive(this.defaultsOptions.windowWidth)
            // this.checkSticky($(window).scrollTop(), this.defaultsOptions.headerWrapper)

        },
        checkAdaptive: function (windowWidth) {
            // console.log(windowWidth)
            const headerWrapper = this.defaultsOptions.headerWrapper

            if (windowWidth < 1200) {
                if (headerWrapper.hasClass('show'))
                    BlockScroll.open()
                // console.log('jr')
                // if ()
                this.defaultsOptions.topSocials.prependTo('.header-inner')
                const headerMob = this.defaultsOptions.headerMob
                if (!this.defaultsOptions.headerMob.find('.header-nav').length) {
                    const HeaderNav = this.defaultsOptions.headerOuter.find('.header-nav')
                    HeaderNav.prependTo(headerMob.find('.header-mob-inner'))
                }
                if (!this.defaultsOptions.headerMob.find('.link-request').length) {
                    const HeaderRequest = this.defaultsOptions.headerOuter.find('.link-request')
                    HeaderRequest.appendTo(headerMob.find('.header-mob-inner'))
                }
            }
            else {
                BlockScroll.close()
                this.defaultsOptions.headerWrapper.removeClass('show')
                this.defaultsOptions.headerMob.hide()
                this.defaultsOptions.topSocials.prependTo('.top-section-content .new-container')

                const headerDesc = this.defaultsOptions.headerOuter
                if (this.defaultsOptions.headerMob.find('.header-nav').length) {
                    const HeaderNav = this.defaultsOptions.headerMob.find('.header-nav')
                    HeaderNav.prependTo(headerDesc.find('.header-inner'))
                }
                if (this.defaultsOptions.headerMob.find('.link-request').length) {
                    const HeaderRequest = this.defaultsOptions.headerMob.find('.link-request')
                    HeaderRequest.insertBefore(headerDesc.find('.header-inner .header-socials'))
                }
            }
        },
        checkSticky: function (scrollTop, headerOuter) {
            // const headerOuter = headerWrapper.find('.header-top'),
            //     headerTopHeight = headerTop.innerHeight()
            scrollTop > headerOuter.innerHeight()
                ? this.defaultsOptions.headerWrapper.addClass('sticky')
                : this.defaultsOptions.headerWrapper.removeClass('sticky')
        },
        events: function () {
            const $thisObj = this,
                options = this.defaultsOptions
            // console.log(options.windowWidth)
            // this.checkAdaptive(options.windowWidth)

            let scrollTop = $(window).scrollTop();
            $thisObj.checkSticky(scrollTop, options.headerOuter)
            $(window).on('scroll', function () {
                scrollTop = $(window).scrollTop();
                // if (options.windowWidth < 1200) { }
                // else {
                if (!$('.jquery-modal').length && !$('header.show').length)
                    $thisObj.checkSticky(scrollTop, options.headerOuter)
                // }
            })
            $(window).on('resize', function () {
                if (options.windowWidth != document.body.clientWidth) {
                    // console.log(options.windowWidth)
                    options.windowWidth = document.body.clientWidth
                    // console.log(options.windowWidth)
                    // $thisObj.checkMargin()
                    // $thisObj.checkAdaptive(options.windowWidth)
                }

            })

            // options.headerHamburger.on('click', function (e) {
            //     e.preventDefault()
            //     options.headerMob.slideDown({
            //         start: function () {
            //             options.headerWrapper.addClass('show')
            //             BlockScroll.open()
            //         }
            //     })
            // })
            // options.headerMob.find('.header-close').on('click', function (e) {
            //     console.log('click')
            //     e.preventDefault()
            //     options.headerMob.slideUp({
            //         start: function () {
            //             BlockScroll.close()
            //             options.headerWrapper.removeClass('show')
            //         }
            //     })
            // })
        }
    }


    if ($('header').length) {
        InitHeader.init()
    }
    // ------------------------------------



    // Инициализация счётчиков
    const CounterInit = {
        defaultsOptions: {
            countWrapper: $('.count-wrapper'),
            windowHeight: $(window).height(),
            CountInited: false,
        },
        init: function (options) {
            var options = $.extend(this.defaultsOptions, options)
            // console.log(options)
            // let CountInited = false
            this.events(options)
        },
        events: function (options) {
            let CounterFunction = function (options) {
                // console.log('options')
                // console.log($(options.countWrapper))
                let CounterItems = options.countWrapper.find('.number')
                CounterItems.each(function () {
                    if (!$(this).hasClass('inited')) {

                        $(this)
                            .prop("Counter", 0)
                            .animate(
                                {
                                    Counter: parseInt($(this).text().replaceAll(' ', '')),
                                },
                                {
                                    duration: 4000,
                                    easing: "swing",
                                    step: function (now) {
                                        now = Number(Math.ceil(now)).toLocaleString('en');
                                        now = now.replaceAll(',', ' ')
                                        $(this).text(now);
                                    },
                                }
                            ).addClass('inited');
                    }
                })
                return true
            }

            let scroll = $(window).scrollTop();
            const CountOffset = options.countWrapper.offset().top
            if ((scroll + options.windowHeight >= CountOffset && options.countWrapper != undefined && options.CountInited != true)) {
                options.CountInited = CounterFunction(options)
            }
            // console.log(options.countWrapper)

            $(window).scroll(function () {
                scroll = $(window).scrollTop();
                if ((scroll + options.windowHeight >= CountOffset && options.countWrapper != undefined && options.CountInited != true)) {
                    options.CountInited = CounterFunction(options)
                }
            })
        }
    }

    if ($('.count-wrapper').length) {
        CounterInit.init({
            countWrapper: $('.count-wrapper')
        })
    }
    //------------------------------------

    // Инициализация бибилиотеки валидности номера телефона //
    function InitMaskPhone() {
        if ($(".input-phone").length > 0) {
            $(".input-phone").inputmask({
                mask: "+7 999 999 99 99",
            });
        }
    }
    //----------------------//
    InitMaskPhone();

    function InitMaskName() {
        if ($('.input-name').length > 0) {
            $(".input-name").inputmask({
                mask: "z{*} ",
                showMaskOnHover: false,
                // greedy: false,
                definitions: {
                    'z': {
                        validator: "[A-Za-zА-Яа-яЁё\u0020\-]",
                    }
                }
            });
        }
    }
    InitMaskName()

    let ValidateEmail = function (email) {
        // console.log(email.value)
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (reg.test(email.val()) == false) {
            return false
        }
        else return true
    }
    // Инициадизация отправки формы
    const Forms = {
        defaultsOptions: {
            FormsElems: $('.form-default')
        },
        submit: function (options) {
            var options = $.extend(this.defaultsOptions, options)
            // console.log(options)
            options.FormsElems.on('submit', function (e) {
                e.preventDefault()
                let EditInputWrapper = function (input, invalidText) {
                    if (!input.closest('.default-input-wrapper.invalid').length) {
                        var ItemInputWrapper = input.closest('.default-input-wrapper')
                        ItemInputWrapper.addClass('invalid')
                        if (invalidText) {
                            var InvalidText = "<span class='invalid-text'>" + invalidText + "</span>"
                            $(InvalidText).appendTo(ItemInputWrapper)
                        }
                    }
                }

                // console.log('submit')
                let $this = $(this),
                    InvalidCount = 0,
                    AllRequiredInputs = $this.find('.required input')
                // console.log(AllRequiredInputs)

                $.each(AllRequiredInputs, function (i, input) {
                    // console.log(input)
                    if ($(input).val() == '') {
                        EditInputWrapper($(input), 'Заполните обязательное поле')
                        InvalidCount += 1
                    }
                    else {
                        if ($(input).hasClass('input-phone') && !$(input).inputmask("isComplete")) {
                            EditInputWrapper($(input), 'Введите корректный номер')
                            InvalidCount += 1
                        }
                        if ($(input).hasClass('input-mail') && !ValidateEmail($(input))) {
                            EditInputWrapper($(input), 'Введите корректный email')
                            InvalidCount += 1
                        }
                    }
                })

                const FormConfInput = $this.find('input[type="checkbox"]')
                if (FormConfInput.prop('checked') == false) {
                    const ItemInputWrapper = FormConfInput.closest('.default-input-wrapper')
                    ItemInputWrapper.addClass('invalid')
                    InvalidCount += 1
                }

                if (InvalidCount == 0) {
                    const formData = new FormData()
                    $.each(AllRequiredInputs, function () {
                        let $thisVal = this.value
                        if (this.getAttribute('name') == 'input-phone') {
                            $thisVal = $thisVal.replace(/\s+/g, '')
                        }
                        formData.append(this.getAttribute('name'), $thisVal)
                    })
                    formData.append('form-type', $this.attr('data-type'))
                    for (let [name, value] of formData) {
                        console.log(`${name} = ${value}`)
                        // alert(`${name} = ${value}`); // key1=value1, потом key2=value2
                    }

                    // Ajax-запрос тут можно написать


                    const RequestSuccess = $this.siblings('.request-success-wrapper'),
                        $thisFormHeight = $this.innerHeight()
                    RequestSuccess.fadeIn({
                        start: function () {
                            if (docWidth < 1200)
                                window.scrollTo(0, ($this.closest('.inline-request').offset().top - $('.header-outer').innerHeight()))
                            $this.hide()
                            $(this).css({
                                'height': $thisFormHeight + 'px',
                            })
                        },
                        /*   complete: function () {
                              console.log($this.offset().top)

                          } */
                    })
                }
                // e.preventDefault()
            })
            this.events(options.FormsElems)
        },
        events: function (forms) {
            // Функционал изменения input
            forms.on('input change', 'input[type="text"], input[type="checkbox"]', function (e) {
                var $this = $(this),
                    $thisInputWrapper = $this.closest('.default-input-wrapper')
                $thisInputWrapper.find('.invalid-text').remove()
                $thisInputWrapper.removeClass('invalid')

                // $this.val() != ''
                //     ? $this.addClass('active')
                //     : $this.removeClass('active')
            })
        }
    }

    if ($('.form-default').length) {
        Forms.submit()
    }
    //------------------------------------

    // инициализация модальных окон
    const ModalElem = {
        defaultsOption: {
            modalHash: '',
            projectsJsonLink: './json/projects.json',
        },
        init: function (options) {
            this.modalElem = $('#' + options.modalHash + '')

            this.initModal()
            this.events(this.modalElem, options)


        },
        initModal: function () {
            let click_close = true;
            this.modalElem.modal({
                fadeDuration: 150,
                closeExisting: false, // новое 11.07.2022
                closeClass: "close-custom",
                closeText: '<span class="visually-hidden">Закрыть</span>',
                clickClose: click_close, // новое 28.11.2022
            });
        },
        events: function (modalElem, options) {
            $('body').on('modal:open', modalElem, function (event, modal) {

                BlockScroll.open();
            })
            $('body').on('modal:close', modalElem, function (event, modal) {
                BlockScroll.close();

            })
        }
    }


    $('.modal-open').on('click', function (e) {
        e.preventDefault()
        const $this = $(this),
            thisHash = $this.attr('data-modal')
        // console.log(thisHash)
        ModalElem.init({
            // targetElem: $this,
            modalHash: thisHash
        })
        return false;
    })
    // ------------------------------------




    $("body").on("click", ".btn-animate", function (e) {
        e.preventDefault();
        // console.log('click')
        let header_offset = 0,
            $thisHash = $(this.hash),
            $thisHashOffset,
            $duration = 1000,
            BodyScroll
        // console.log($thisHash, $thisHashOffset)
        if (docWidth > 1200) {
            header_offset = $('.header-outer').innerHeight();
            // console.log(header_offset)
        } else {
            if ($('header.show').length) {
                BodyScroll = parseInt($('body').attr('data-body-scroll-fix'))
                $('.header-mob .header-close').trigger('click')
            }

            header_offset = $('.header-outer').innerHeight();

        }
        // console.log(header_offset)
        $thisHashOffset = $thisHash.offset().top
        let $scrollTop = $thisHashOffset - header_offset
        if (BodyScroll != 0 && BodyScroll != undefined) {
            $scrollTop = $scrollTop + BodyScroll
        }
        console.log($scrollTop)

        $("html, body")
            .stop()
            .animate(
                {
                    scrollTop: $scrollTop,
                },
                {
                    duration: $duration, // продолжительность анимации
                    easing: "linear", // скорость анимации
                    queue: false // не ставим в очередь
                }
            );
        // e.preventDefault();
        return false;
    });

    // Инициализация custom-select
    const InitSelect2 = {
        defaultsOptions: {
            selects: $('.select-custom')
        },
        init: function (options) {
            var options = $.extend(this.defaultsOptions, options)
            // console.log(options)
            $.each(options.selects, function () {
                const $this = $(this)
                $this.select2({
                    minimumResultsForSearch: Infinity,
                    theme: "custom-select",
                    language: "ru",
                    width: 'style',
                });


            })
            this.events(options)
        },
        events: function (options) {
            options.selects.on("change", function (e) {
                // console.log($(this).prop("selectedIndex"))
                if ($(this).prop("selectedIndex") != 0)
                    $(this).siblings('.select2').addClass('select2-selected')
            });
            // console.log(options)
        }
    }

    if ($('.select-custom').length) {
        InitSelect2.init({
            selects: $('.select-custom')
        })
    }
    //------------------------------------


    const InitTabsWrapper = {
        defaultsOptions: {
            tabs_wrapper: $('.tabs-wrapper')
        },
        init: function (options) {
            var options = $.extend(this.defaultsOptions, options)
            const tabs_switcher = options.tabs_wrapper.find('.tabs-switcher'),
                tabs_content = options.tabs_wrapper.find('.tabs-content')

            tabs_switcher.on('click', function () {
                const $this = $(this),
                    IndexNow = $this.index()
                $this.addClass('active')
                $this.siblings().removeClass('active')
                tabs_content.filter('.active').removeClass('active').hide()
                tabs_content.eq(IndexNow).fadeIn().addClass('active')

            })
        }
    }
    if ($('.tabs-wrapper').length) {
        InitTabsWrapper.init()
    }



    if ($('.lightgallery').length > 0) {
        $('.lightgallery').lightGallery({
            share: false,
            selector: '.lightgallery_item', // новое 08.08.2022
            videojs: false,
            autoplayFirstVideo: false,
            download: false,
            videojs: false,
            // exThumbImage: 'data-external-thumb-image'
        });
        // $('body').on('onAfterOpen.lg onBeforeClose.lg onCloseAfter.lg', '.lightgallery', function (e) {
        //     /* console.log(e.type) */
        //     if (e.type == "onAfterOpen") {
        //         $('.lg-outer').addClass('lg-used-auto')
        //         blockScroll('open')
        //     }
        //     if (e.type == 'onBeforeClose') {
        //         blockScroll('close')
        //     }
        // })
        //----------------------//
    }
}) // end ready

// console.log(projectsJson)



$(window).on('resize', function () {
    // docWidth = document.body.clientWidth
    // console.log(docWidth)
})

