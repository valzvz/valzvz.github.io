//создаем общую функцию с параметрами 
const modalController1 = ({modal, btnOpen, btnClose, time = 200}) => {

    //создаем переменную, в которую закладываем кнопку, на которую нужно нажать, чтобы модальное окно открылось
    const buttonElem = document.querySelector(btnOpen);

    //создаем переменную, в которую закладываем само модальное окно 
    const modalElem = document.querySelector(modal);

    //прописываем изначальный стиль для модального окна (когда оно закрыто)
    modalElem.style.cssText = `
        display: flex;
        visibility: hidden;
        opacity: 0;
        transition: opacity ${time}ms ease-in-out;
    `;

    //создаем функцию для открытия модального окна
    const openModal = () => {

        //устанавливаем видимость модального окна как "видимое"
        modalElem.style.visibility = 'visible';

        //устанавливаем непрозрачность модального окна равную 1
        modalElem.style.opacity = 1;

        //добавляем обработчик события window при нажатии клавиши (keydown) для вызова функции закрытия мод. окна
        window.addEventListener('keydown', closeModal)
    };

    //создаем функцию для закрытия модального окна, принимающую event (чтобы определить, на какой элемент было кликнуто мышкой)
    const closeModal = event => {

        //создаем переменную таргет (это свойство объекта события (event), которое указывает на элемент, на котором произошло событие)
        const target = event.target;
 
        if (
            
            //проверяем, является ли таргет нужным нам модальным окном
            target === modalElem || 

            //проверяем наличие кнопки закрытия И проверяем, содержит ли таргет или его родитель кнопку закрытия
            (btnClose && target.closest(btnClose)) || 

            //проверяем, что клавиша для закрытия - esc
            event.code === 'Escape'
            )    {

            //устанавливаем непрозрачность модального окна равную нулю 
            modalElem.style.opacity = 0;

            //исользуем функцию для замедления закрытия модального окна на нужное нам время
            setTimeout(() => {
                modalElem.style.visibility = 'hidden';
            }, time);

            //отключаем обработчик события window при нажатии клавиши (keydown)
            window.removeEventListener('keydown', closeModal);
        }
    }

    //при событии "клика" по переменной, открывающей мод. окно, запускаем функцию для откытия мод. окна
    buttonElem.addEventListener('click', openModal);

    //при событии "клика" по переменной мод. окна, запускаем функцию для закрытия мод. окна
    modalElem.addEventListener('click', closeModal);
}

modalController1({
    modal: '.modal',
    btnOpen: '.head_link_1',
    btnClose: '.modal_close'
});

modalController1({
    modal: '.fodal',
    btnOpen: '.head_link_2',
    btnClose: '.fodal_close'
});

modalController1({
    modal: '.fodal',
    btnOpen: '.autorization'
});

modalController1({
    modal: '.modal',
    btnOpen: '.registration'
});