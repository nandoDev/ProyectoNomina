$(function () {
    $('.autocomplete-with-hidden-multiplefilter').autocomplete({
        minLength: 0,
        source: function (request, response) {
            var url = $(this.element).data('url');

            $.getJSON(url, { term: request.term }, function (data) {
                response(data);
            })
        },
        select: function (event, ui) {
            $(event.target).next('input[type=hidden]').val(ui.item.id);

        },
        change: function (event, ui) {
            if (!ui.item) {
                $(event.target).val('').next('input[type=hidden]').val('');

            }
        }
    });
})

$(function () {
    $('.autocomplete-with-hidden').autocomplete({
        minLength: 0,
        source: function (request, response) {
            var url = $(this.element).data('url');

            $.getJSON(url, { term: request.term }, function (data) {
                response(data);
            })
        },

        select: function (event, ui) {
            $(event.value).val(ui.item.value);

        },

        select: function (event, ui) {
            $(event.target).next('input[type=hidden]').val(ui.item.value);

        },
        
        change: function (event, ui) {
            if (!ui.item) {
                $(event.target).val('').next('input[type=hidden]').val('');

            }
        }
    });
})