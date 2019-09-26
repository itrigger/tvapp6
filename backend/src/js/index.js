import popper from 'popper.js';
import bootstrap from 'bootstrap';


jQuery(document).ready(function () {

    /*Удаление слайда*/
    jQuery('.slide-delete-form').on("click", function (e) {
        e.preventDefault();
        if (window.confirm("Удалить этот слайд?")) {
            let id = jQuery(this).find('.id').val();
            console.log(id);
            jQuery.ajax({
                url: '/slides/' + id,
                type: 'DELETE',
                success: function (data) {
                    console.log(data);
                    location.reload();
                }
            });
        }
    });

    /*Удаление точки*/
    jQuery('.place-delete-form').on("click", function (e) {
        e.preventDefault();
        if (window.confirm("Удалить эту точку?")) {
            var id = jQuery(this).find('.id').val();
            jQuery.ajax({
                url: '/places/' + id,
                type: 'DELETE',
                success: function (data) {
                    console.log(data);
                    location.reload();
                }
            });
        }
    });

    /*Удаление ТВ экрана*/
    jQuery('.tvs-delete-form').on("click", function (e) {
        e.preventDefault();
        if (window.confirm("Удалить этот экран?")) {
            var id = jQuery(this).find('.id').val();
            jQuery.ajax({
                url: '/tvs/' + id,
                type: 'DELETE',
                success: function (data) {
                    console.log(data);
                    location.reload();
                }
            });
        }
    });

    /*Удаление события*/
    jQuery('.schedule-delete-form').on("click", function (e) {
        e.preventDefault();
        if (window.confirm("Удалить это событие?")) {
            var id = jQuery(this).find('.id').val();
            jQuery.ajax({
                url: '/schedule/' + id,
                type: 'DELETE',
                success: function (data) {
                    console.log(data);
                    location.reload();
                }
            });
        }
    });

    /*Выделяем активный пункт меню*/
    jQuery(function () {
        jQuery('#navbarNav li a').each(function () {
            var location = window.location.href;
            var link = this.href;
            if(location == link) {
                jQuery(this).parent().addClass('active');
            }
        });
    });



});

/*TODO
* node server.js
* npm run watch
* */