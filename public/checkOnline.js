function sendOnlineSignal(successFunc) {
    $.ajax({
        method: 'get',
        url: '/iamonline',
        data: {
            username: $('#username').val()
        },
        success: successFunc
    });
}
