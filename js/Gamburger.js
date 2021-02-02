/*
    * данный модуль предназначен для автоматического создания кнопки меню для мобильных устройств
    * модуль создает только кнопку гамбургер
    * для работы данного модуля нужен jquery
    * как работать:
    * добавьте данный модуль в документ
    * в своем скрипте напишите строку Gamburger.cooke(nav,options)
    * nav - это контейнер который хранит список меню, логотип, и прочее
    * options - это дополнительные параметры меню:
       color - цвет полосок кнопки
       open - задать функцию срабатывающую при открытии меню
       close - функция срабатывающая при закрытии меню
       media - ширина экрана при котором должна показаться кнопка меню
      after - если true меню добавляется в начале всех дочерних элементов nav!
      id - айди кнопки

*/







(function () {

    let mb = {};

    //опции по умолчанию
    let option = {
        color: '#fff',
        open: function () {
            console.log('menu opened');
        },
        close: function () {
            console.log('menu closed');
        },
        media: '(max-width: 768px)',
        after: false,
        id: "gamb",
        openAnimation: function (gamb) {
            gamb.find('#l2').css('width', '0px')
            gamb.find('#l1').css({
                "top": "50%",
                "transform": "rotateZ(45deg)",
            })
            gamb.find('#l3').css({
                "top": "50%",
                "transform": "rotateZ(-45deg)",
            })
        },
        closeAnimation: function (gamb) {
            gamb.find('#l2').css('width', '100%')
            gamb.find('#l1').css({
                "top": "0%",
                "transform": "rotateZ(0deg)",
            })
            gamb.find('#l3').css({
                "top": "100%",
                "transform": "rotateZ(0deg)",
            })
        }
    }

    function Gamburger(button) {
        this.button = button;
    }


    //возвращает див блок кнопку
    function getButton(id) {
        let gamb = $('<div id="' + id + '"><span id="l1"></span><span id="l2"></span><span  id="l3"></span></div>')
        gamb.flag = false;//флаг если false то озночает что меню не открыто
        gamb.css({
            'display': 'none',
            'position': 'relative',
            'width': '40px',
            'top': '10px',
            'left': '5px',
            'right':'0px',
            'height': '24px',
            'z-index': '800',
            'background-color': 'transparent',
        });
        gamb.find('span').css({
            "display": "block",
            "width": "100%",
            "height": "2px",
            "position": "absolute",
            "top": "0px",
            "left": "0px",
            "transform-origin": "center center",
            "transform": "translateY(-50%)",
            "transition": "all 300ms"
        })
        gamb.find('#l2').css({
            "top": "50%",
            "transform": "translateY(-50%)",
        })
        gamb.find('#l3').css({
            "top": "100%",
            "transform": "translateY(-50%)",
        })

        return gamb;
    }
    //установка опций
    function setOPtion(opt) {
        for (let key of Object.keys(opt)) {
            switch (key) {
                case 'id': {
                    option.id = opt[key];
                    break;
                }
                case 'color': {
                    option.color = opt[key];
                    break;
                }
                case 'media': {
                    option.media = opt[key];
                    break;
                }
                case 'open': {
                    option.open = opt[key];
                    break;
                }
                case 'close': {
                    option.close = opt[key];
                    break;
                }
                case 'after': {
                    option.after = opt[key];
                    break;
                }
            }
        }
    }

    //приготовить гамбургер
    mb.cooke = function (nav, opt) {
        setOPtion(opt);

        let media = window.matchMedia(option.media);

        let gamb = getButton(option.id);
        gamb.find("span").css("background-color", option.color);

        function mediaHandle(e) {
            if (e.matches) {
                gamb.css("display", "block")
            }
        }
        //обработчик открытия закрытия меню
        gamb.on('click', function (e) {
            if (!gamb.flag) {

                option.openAnimation(gamb);
                option.open();
                gamb.flag = true;
            } else {

                option.closeAnimation(gamb);
                option.close();
                gamb.flag = false;
            }
        })
        if (option.after) {
            $(nav).append(gamb);
        } else {
            $(nav).prepend(gamb);
        }


        //добавления медиа запроса 
        media.addListener(mediaHandle)
        mediaHandle(media);
        return gamb;
    }

    window.Gamburger = mb;
})();