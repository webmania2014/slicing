var LEADERSHIP_ANIMATION_SPEED = 1500; // 1.5 seconds
var isAnimating = false;

(function (document, window) {
    function Brightergy (o) {
        this.options = {
            pagewrapperID : o.pagewrapperID || '#page-content',
            mobileNavWidth: o.mobileNavWidth || 229,
            mobileScreenWidth: o.mobileScreenWidth || 767,
            mediumScreenWidth: o.mediumScreenWidth || 1200
        };
    }
    
    Brightergy.prototype = {
        setTopbarWhiteOnScroll: function () {
            $(window).scroll(function () {
                if ($(document).scrollTop() > 20) {
                    $('.navbar-static-top').not('.has-bg').addClass('has-bg');
                } else {
                    if (!$('.navbar-nav > li.active').length && !$('.navbar-collapse').is('.in')) {
                        $('.navbar-static-top.has-bg').removeClass('has-bg');
                    }
                }
            });
            $('.navbar-collapse').on('show.bs.collapse', function() {
             $('.navbar-static-top').addClass('has-bg');
             });
             $('.navbar-collapse').on('hidden.bs.collapse', function() {
             if ($(document).scrollTop() <= 20) {
             $('.navbar-static-top.has-bg').removeClass('has-bg');
             }
             });
            return this;
        },
        setTopBarDropdown: function () {
            var that = this;
            var open = function (me) {
                if ($(me).has('.dropdown').length) {
                    $('.navbar:not(.has-bg)').addClass('has-bg');
                }
                $('.navbar-nav > li.active').removeClass('active');
                $(me).addClass('active');
            };
            var close = function (me) {
                $(me).removeClass('active');
                if ($(document).scrollTop() < 20 && $(window).width() > that.options.mobileScreenWidth) {
                    $('.navbar.has-bg').removeClass('has-bg');
                }
            };
            $('.navbar-nav > li').off();
            if ($(window).width() <= that.options.mobileScreenWidth) {
                $('.navbar-nav > li').on('click', function (e) {
                    if ($(this).is('.active')) {
                        close(this);
                    } else {
                        open(this);
                    }
                    e.preventDefault();
                });
            } else {
                $('.navbar-nav > li').on('mouseenter', function () {
                    open(this);
                }).on('mouseleave', function () {
                    close(this);
                });
            }

            return this;
        },
        'navBarMobilize': function () {

            var o = this.options;

            var toggler = '.navbar-toggle'
                , navigationwrapper = '.navbar-header'
                , menuneg = -1 * o.mobileNavWidth
                , animationOption = {
                    'duration': 400,
                    'easing': 'swing'
                };

            //stick in the fixed 100% height behind the navbar but don't wrap it
            $('#slide-nav.navbar .container').append($('<div id="navbar-height-col"></div>'));

            $("#slide-nav").on("click", toggler, function (e) {

                var selected = $(this).hasClass('slide-active');

                $('#navbar-height-col').stop().animate({
                    left: selected ? menuneg : 0
                }, animationOption);

                $(o.pagewrapperID).stop().animate({
                    left: selected ? 0 : o.mobileNavWidth + 'px'
                }, animationOption);

                $(navigationwrapper).stop().animate({
                    left: selected ? 0 : o.mobileNavWidth + 'px'
                }, animationOption);

                $('#slidemenu').stop().animate({
                    left: selected ? menuneg : 0
                }, animationOption);

                $(this).toggleClass('slide-active', !selected);
                $('#slidemenu').toggleClass('slide-active');


                $('#page-content, .navbar, body, .navbar-header').toggleClass('slide-active');
            });
            $('#slidemenu').css({left: menuneg});
            $(window).on("resize", function () {
                if ($(window).width() > o.mobileScreenWidth && $('.navbar-toggle').is(':hidden')) {
                    $('#slidemenu, #page-content, body, .navbar, .navbar-header').removeClass('slide-active');
                }
            });
        },
        setClientsHoverOnLanding: function () {
            $('.grid-clients.gray')
                .on('mouseenter', '.client-box', function () {
                    $(this)
                        .removeClass('gray')
                        .find('.logo').addClass('hover');
                }).on('mouseleave','.client-box', function () {
                    $(this)
                        .addClass('gray')
                        .find('.logo').removeClass('hover');
                });
            return this;
        },
        setClientGridHeight: function () {
            var gridsPerRow = 4,
                gridDimensionRatio = 0.78,
                windowWidth = $(window).width(),
                gridWidth = parseInt(windowWidth/gridsPerRow),
                gridHeight = parseInt(gridWidth * gridDimensionRatio);

            $('.client-box').height(gridHeight);
        },
        run: function () {
            this.setTopbarWhiteOnScroll()
                .setClientsHoverOnLanding()
                .setTopBarDropdown()
                /*.navBarMobilize()*/;
        }
    };

    var brightergy = new Brightergy({});
    brightergy.run();

    $(window).resize(function () {
        brightergy.setTopBarDropdown();
    });

    $(".filter-form-mobile .filter-parent-item").click(function(){
        var cls = $(this).attr("class");
        var id = $(this).attr("id");
        if (cls == "col-xs-4 filter-parent-item")
        {
            $(".filter-form-mobile").find(".filter-parent-item").attr("class", "col-xs-4 filter-parent-item");
            $(".sub-item").css("display", "none");
            $(this).attr("class", "col-xs-4 filter-parent-item on");
            if (id == "filter")
                $(this).parent().find("#sub-filter").css("display", "block");
            else if (id == "sort")
                $(this).parent().find("#sub-sort").css("display", "block");
            else if (id == "search")
                $(this).parent().find("#sub-search").css("display", "block");
        }
        else
        {
            $(this).attr("class", "col-xs-4 filter-parent-item");
            if (id == "filter")
                $(this).parent().find("#sub-filter").css("display", "none");
            else if (id == "sort")
                $(this).parent().find("#sub-sort").css("display", "none");
            else if (id == "search")
                $(this).parent().find("#sub-search").css("display", "none");
        }
    });

    $(".sub-item .title").click(function(){
        $(".comment").css("display", "none");
        var comment = $(this).parent().find(".comment");
        if (comment.css("display") == "none")
            comment.css("display", "block");
        else
            comment.css("display", "none");
    });

    $(".wrapper-careers-choose .title").click(function(){
        var cls = $(this).parent().attr("class");
        if (cls == "wrapper-careers-choose on")
        {
            $(this).parent().attr("class", "wrapper-careers-choose");
            $(this).parent().find(".content").css("display", "none");
        }
        else
        {
            $(this).parent().parent().find(".wrapper-careers-choose").attr("class", "wrapper-careers-choose");
            $(this).parent().attr("class", "wrapper-careers-choose on");
            $(".content").css("display", "none");
            $(this).parent().find(".content").css("display", "block");
        }
    });

    $(".blog-filter .title").click(function(){
        var parent = $(this).parent();
        var parent_cls = parent.attr("class");
        if ( parent_cls == "filter-element-wrapper on" || parent_cls == "sort-box filter-element-wrapper on" )
        {
            if ( parent_cls == "filter-element-wrapper on" )
                parent.attr("class", "filter-element-wrapper");
            else
                parent.attr("class", "sort-box filter-element-wrapper");

            parent.find(".filter-dropdown").css("display", "none");
        }
        else
        {
            $(".blog-filter .filter-element-wrapper").each(function(){
                var cls = $(this).attr("class");
                if ( cls == "sort-box filter-element-wrapper on" || cls == "sort-box filter-element-wrapper" )
                    $(this).attr("class", "sort-box filter-element-wrapper");
                else
                    $(this).attr("class", "filter-element-wrapper");
            });
            $(".filter-dropdown").css("display", "none");
            if ( parent_cls == "filter-element-wrapper" )
                parent.attr("class", "filter-element-wrapper on");
            else
                parent.attr("class", "sort-box filter-element-wrapper on");
            parent.find(".filter-dropdown").css("display", "block");
        }
    });

    $(".filter-dropdown a").click(function(){
        var parent = $(this).parent().parent().parent();
        var parent_cls = parent.attr("class");
        var title = $(this).parent().parent().parent().find(".title");

        title.html($(this).html());
        if ( parent_cls == "sort-box filter-element-wrapper on" )
            parent.attr("class", "sort-box filter-element-wrapper");
        else
            parent.attr("class", "filter-element-wrapper");
        $(".filter-dropdown").css("display", "none");
    });

    $('.blog-list').isotope({
        isOriginLeft: false,
        layoutMode: 'packery'
    });

    $(".grid-clients.transform .client-box").hover(function(){
        $(this).find(".mask-sentence").fadeIn(200);
    }, function () {
        $(this).find(".mask-sentence").fadeOut(200);
    });

    function switchLeaderInfo(from_obj, to_obj, from_html, to_html){
        from_obj.html(from_html.replace("item team-person-new small-img", "team-profile-new leader-ceo"));
        to_obj.html(to_html.replace("team-profile-new leader-ceo", "item team-person-new small-img"));
        isAnimating = false;
    }


    $(document).ready(function () {
        $(".team-person-new.small-img").click(function(){
            if(isAnimating == true){
                //It already is animating now, so skip.
                return;
            }
            isAnimating = true;
            var ceo_obj = $(".team-person-new.leader-ceo");
            ceo_obj.effect("transfer", {to: $(this)}, LEADERSHIP_ANIMATION_SPEED);
            var from_html = ceo_obj.html();
            $(".ui-effects-transfer").first().html("<li class='item team-person-new leader-ceo'>" + from_html + "</li>");
            ceo_obj.html("");

            $(this).effect("transfer", {to: ceo_obj}, LEADERSHIP_ANIMATION_SPEED);
            var to_html = $(this).html();
            $(".ui-effects-transfer").last().html("<li class='item team-person-new'>" + to_html + "</li>");
            $(this).html("");

            setTimeout(switchLeaderInfo, LEADERSHIP_ANIMATION_SPEED-10, $(this), ceo_obj, from_html, to_html);
        });

        $('#bgvid').bind('ended', function () {
            this.load();
        });
    });

    var videoLength = 18; // 18 sec
    document.getElementById('bgvid') && window.setInterval(function () {
        document.getElementById('bgvid').load();
    }, videoLength * 1000);

    $('.wrapper-office-map-global').load('assets/img/map.svg',function(){
        $(this).addClass("svgLoaded");
    });

})(document, window);