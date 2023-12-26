'use_strict';

const url = 'http://localhost/projects/chat-app/api/chat-service.php';
const refreshCadence = 1000;

let start = 0;
let author = '';

$(document).ready(() => {
    queryUserName();
    loadMessages();
    scheduleRefresh();
    setupOnFormSubmitListener();
});

function queryUserName() {
    author = prompt('Please enter your name');
}

function scheduleRefresh() {
    setInterval(loadMessages, refreshCadence);
}

function loadMessages() {
    $.get(`${url}?start=${start}`, (data, status) => {
        if (data.items) {
            data.items.forEach((item) => {
                start = item.ID;
                $('#messages').append(renderMessage(item));
            });
            $('#messages').animate({
                scrollTop: $('#messages')[0].scrollHeight
            });
        }
    });
}

function renderMessage(item) {
    const dateTime = new Date(item.CreatedAt);
    let time = `${dateTime.getHours() < 10 ? '0' : ''}${dateTime.getHours()}:${
        dateTime.getMinutes() < 10 ? '0' : ''
    }${dateTime.getMinutes()}`;
    return /*HTML*/ `
        <div class='message'>
            <p>${item.Author}</p>
            ${item.Message}
            <span>${time}</span>
        </div>
    `;
}

function setupOnFormSubmitListener() {
    $('form').submit((event) => {
        event.preventDefault();
        $.post(url, {
            message: $('#message').val(),
            author
        });
        $('#message').val('');
    });
}
