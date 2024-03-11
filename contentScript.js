function startWazzupFunc() {
    const inputElement = document.querySelector('input[ng-reflect-mask-type="phone"]');
    let phone = inputElement.getAttribute('ng-reflect-model');

    // Проверка 1: Очистка от лишних символов кроме цифр
    phone = phone.replace(/\D/g, '');

    // Проверка 2: Если цифр меньше 11, добавить 7 в начало
    if (phone.length === 10) {
        phone = '7' + phone;
    }

    // Проверка 3: Если первая цифра не 7, заменить на 7
    if (phone.charAt(0) !== '7') {
        phone = '7' + phone.substring(1);
    }

    // Проверка 4: Должно быть 11 цифр
    if (phone.length !== 11) {
        console.log('Неверный формат номера телефона');
        return;
    }

    const iframe = document.createElement('iframe');
    iframe.src = '';

    const url = 'https://api.wazzup24.com/v3/iframe';
    const headers = {
        'Authorization': 'Bearer d9334c5a479e49078422fcddae635e54',
        'Content-Type': 'application/json'
    };
    const data = {
        'user': {
            'id': 'fdd84f41f',
            'name': 'Черней Ольга'
        },
        'scope': 'card',
        'filter': [
            {
                'chatType': 'whatsapp',
                'chatId': phone
            }
        ]
    };

    fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(responseData => {
        iframe.src = responseData.url;
    })
    .catch(error => {
        console.log('Ошибка:', error);
    });

    iframe.setAttribute('id', 'myIframe');
    iframe.setAttribute('frameborder', '0');
    iframe.style.cssText += `
      width: 100%;
      height: 80vh;
      overflow-y: auto;
    `;

    const chatWrapper = document.querySelector('ra-client-chat');
    if (chatWrapper) {
        const parent = chatWrapper.parentNode;
        parent.replaceChild(iframe, chatWrapper);
    } else {
        console.log("Chat wrapper element not found");
    }
}

document.addEventListener('click', function(e) {
    if (e.target && e.target.matches('span.action-btn')) {
        startWazzupFunc();
    }
});