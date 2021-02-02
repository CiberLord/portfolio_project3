/*
    это фрэймворк для создания модальных окон
    
    как использовать
    * подключить к html файлу сначала jqurey
    * подключите к html файлу потом этот скрипт
    * создайте теги окна присвойте ему айди
    * стилизуйте окно в css
    * создайте диалоговое окно с помощю метода dialog=eWindow.create(<id окна>)
    * добавьте функцию анимации появления окна методом dialog.setAnimation(callback)
    * иcпользуйте метод dialog.show(), dialog.hidden() для пока и скрытия окна
    * Пользуйтесь на здоровье!)
    
        created by Yuldash
*/

(function () {

    let ew = {};

    function Dialog(mask, wind) {
        this.mask = mask;
        this.wind = wind;
        this.posx = 0;
        this.posy = 0;
        this.visible = function () { }
        this.hide = function () {

        }
    }
    Dialog.prototype.show = function () {
        this.mask.css("display", "block");
        this.wind.css("display", "block");
        $('body').css("overflow", "hidden");
        this.visible();
    }
    Dialog.prototype.hidden = function () {
        this.mask.css("display", "none");
        this.wind.css("display", "none");
        $('body').css("overflow", "auto");
        this.hide();
    }


    //я тут не разобрался с анимацией вернутся позже
    //принмает обект диалог и опцианальные параметры
    function setOptions(dialog, data) {
        for (let key in data) {
            switch (key) {
                case "animation": {
                    if (data[key] = true) {
                        //начальные установки
                        dialog.mask.css({
                            "opacity": "0",
                            "transition":"all 3s;"
                        })
                        dialog.wind.css({

                        })

                        // функции анимации
                        dialog.hide = function () {
                            dialog.mask.css({
                                "opacity": "0"                                
                            })
                            dialog.wind.css({

                            })
                        }
                        dialog.visible = function () {
                            dialog.mask.css({
                            "opacity": "1"
                            })
                            dialog.wind.css({

                            })
                            console.log('vis')
                        }
                    }
                    break;
                }
                case "unblock": {
                    if (data[key] === true) {
                        dialog.mask.on('click', function () {
                            dialog.hidden();
                        })
                    }
                    break;
                }
                case "overElement": {
                    //добавить дополнительные кастомные элементы в модальное окно                    
                    break;
                }
            }
        }
    }
    //создает кнопку выхода из диалогового окна
    function getExitButton(){
        let exitButton = $('<div><span id="l1"></span><span id="l2"></span></div>');//кнопка выхода
        exitButton.css(
            {
                "margin": "10px",
                "width": "40px",
                "height": "40px",
                "z-index":"2000",
                "position": "absolute",
                "top":"10px",
                "right":"10px",
                "cursor": "pointer",
                "background-color": "transparent"
            });
        exitButton.find('span').css({
            "display": "block",
            "width": "100%",
            "height": "2px",
            "position": "absolute",
            "top": "50%",
            "left": "0",
            "transform-origin": "center",
            "transform": "translateY(-50%)",
            "background-color": "red",
        });
        exitButton.find('#l1').css({
            "transform": "rotateZ(45deg)"
        })
        exitButton.find('#l2').css({
            "transform": "rotateZ(-45deg)"
        });

        return exitButton;
    }
    //затемняющий фон для для для окна
    function getMask(){
        let mask = $("<div></div>"); //элмент для затемнения области за модальным окном 

        mask.css({
            "position": "fixed",
            "top": "0px",
            "left": "0px",
            "width": "100vw",
            "height": "100vh",
            "z-index": "900",
            "display": "none",
            "background-color": "rgba(0,0,0,0.8)",
        });
        return mask;
    }
    //получить диалоговое окно из документа
    function getModalView(selector){
        //модальное окно
        let wind = $(selector);
        wind.css({
            "position": "absolute",
            "top": "50%",
            "left": "50%",
            "transform": "translate(-50%, -50%)",
            "z-index": "1000",
            "display": "none",
        })

        return wind;
    }

    //создает диалоговое окно, параметром функции - css cелектор диалогового окна
    ew.create = function (selector, data) {
        
        //добавление всех в элементов в тело
        let exitButton=getExitButton();
        let mask=getMask();
        let wind=getModalView(selector);

        let media=window.matchMedia('(max-width: 590px)');

        if(media.matches){
            exitButton.css({
                "width":"30px",
                "height":"30px"
            })
            exitButton.find('span').css("background-color","rgba(175, 175, 175)")
        }
        media.addListener(function(e){
            if(e.matches){
                exitButton.find('span').css("background-color","rgba(175, 175, 175)")
            }   
        })

        mask.append(exitButton);
        $('body').append(mask);
        mask.append(wind);

        dialog = new Dialog(mask, wind);// диалоговый обьект который должен вернутся
        exitButton.on("click", function () {
            dialog.hidden();
        });

        setOptions(dialog,data)

        return dialog;
    }


    window.eWindow = ew;//обект для создания диалоговых окон


})();