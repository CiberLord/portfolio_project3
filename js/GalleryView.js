/*
    Модуль для создания пролистываемого списка изображений из списка изображений
    для работы модуля треубется наличие jquery

    * подключить к html файлу сначала jqurey
    * подключите к html файлу потом этот скрипт
    * создайте контейнер с изображениями  в документе
    * создайте обьект галлереи gallery=GalleryView.createFromPath(data)
    * задайте один обработчик событий всем изображениям в контейнере
    * в методе обработчика укажите следующий метод gallery.open()
    * параметр data - массив путей к и изображениям относительно html документа
    * и все пользуйтесь нa здоровье))
*/


(function () {

    let g = {};

    //обьект хранящий список изображений и управляющий измениеями картинок 
    let Gallery = function (mask) {
        this.images = [];//список изображений
        this._index = 0;
        this.mask = mask;//это главный контэйнер который хранит в себе кнопки  и изображения
    }

    //метод добавления нового изображения в список
    Gallery.prototype.append = function (imgElem) {
        this.images.push(imgElem);
        this.mask.append(imgElem);
    }

    //открытие галлерии
    Gallery.prototype.open = function () {
        this.images[this._index].css("display", "block");
        this.mask.css("display", "block");
        console.log(this.mask.css('display'));
        $('body').css("overflow", "hidden");
    }

    //закрытие галлереи
    Gallery.prototype.close = function () {
        this.mask.css("display", "none");
        $('body').css("overflow", "auto");
    }
    //перейти к следующей картинке
    Gallery.prototype.next = function () {
        if (this._index < this.images.length - 1) {
            this.images[this._index++].css("display", "none");
            this.images[this._index].css("display", "block");
            if (this._index === this.images.length - 1) {
                this.mask.find("#rightArrow").css("opacity", "0")
            }
            if (this._index === 1) {
                this.mask.find("#leftArrow").css("opacity", "1")
            }
        }
    }
    //перейти к прошлой картинке
    Gallery.prototype.prev = function () {
        if (this._index > 0) {
            this.images[this._index--].css("display", "none");
            this.images[this._index].css("display", "block");
            if (this._index === 0) {
                this.mask.find("#leftArrow").css("opacity", "0")
            }
            if (this._index === this.images.length - 2) {
                this.mask.find("#rightArrow").css("opacity", "1")
            }
        }
    }

    //создает кнопку выхода из диалогового окна
    function getExitButton(id) {
        let exitButton = $('<div id="' + id + '"><span id="l1"></span><span id="l2"></span></div>');//кнопка выхода
        exitButton.css(
            {
                'z-index': '1000',
                "float": "right",
                "margin": "10px",
                "width": "40px",
                "height": "40px",
                "position": "relative",
                "cursor": "pointer",
                "transition": "all .3s",
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
            "background-color": "#000",

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
    function getMask() {
        let mask = $("<div></div>"); //элмент для затемнения области за модальным окном 

        mask.css({
            "position": "fixed",
            "top": "0px",
            "left": "0px",
            "width": "100vw",
            "height": "100vh",
            "z-index": "10000",
            "display": "none",
            "background-color": "#fff",
        });
        return mask;
    }
    function getLeftArrow() {
        let arrow = $('<div id="leftArrow"><span id="l1"></span><span id="l2"></span></div>');
        arrow.css({
            'position': 'absolute',
            'z-index': '1000',
            'top': '50%',
            'left': '10px',
            'transform': 'translateY(-50%)',
            'width': '70px',
            'height': '100px',
            'cursor': 'pointer'
        })
        arrow.find("span").css({
            "display": "block",
            "width": "100%",
            "height": "8px",
            "position": "absolute",
            "top": "50%",
            "left": "0",
            "transform-origin": "4px center",
            "transform": "translateY(-50%)",
            "background-color": "#2d2d2d",
            "border-bottom-left-radius": "4px",
            "border-top-left-radius": "4px"
        })
        arrow.find('#l1').css({
            "transform": "rotateZ(50deg)"
        })
        arrow.find('#l2').css({
            "transform": "rotateZ(-50deg)"
        });

        return arrow;

    }
    function getRightArrow() {
        let arrow = $('<div id="rightArrow"><span id="l1"></span><span id="l2"></span></div>');
        arrow.css({
            'position': 'absolute',
            'top': '50%',
            'z-index': '1000',
            'right': '10px',
            'transform': 'translateY(-50%)',
            'width': '70px',
            'height': '100px',
            'cursor': 'pointer'
        })
        arrow.find("span").css({
            "display": "block",
            "width": "100%",
            "height": "8px",
            "position": "absolute",
            "top": "50%",
            "left": "0",
            "transform-origin": "66px center",
            "transform": "translateY(-50%)",
            "background-color": "#2d2d2d",
            "border-bottom-left-radius": "4px",
            "border-top-left-radius": "4px"
        })
        arrow.find('#l1').css({
            "transform": "rotateZ(50deg)"
        })
        arrow.find('#l2').css({
            "transform": "rotateZ(-50deg)"
        });

        return arrow;

    }


    //возвращает галлерею изображений из абсолютных путей изображений
    // data - абсолютные пути изображений
    // adaptivClass - название класса которрый будет сработывать при мобильных экранах
    g.createFromPath = function (data, adaptivClass) {
        let exitButton = getExitButton("exit");
        let leftArrow = getLeftArrow();
        let rightArrow = getRightArrow();
        let mask = getMask();
        mask.append(exitButton);
        mask.append(leftArrow);
        mask.append(rightArrow);
        $('body').append(mask);
        let gallery = new Gallery(mask);
        rightArrow.on('click', function () {
            gallery.next();
        })
        leftArrow.on('click', function () {
            gallery.prev();
        })
        exitButton.on('click', function () {
            gallery.close();
        })

        const max = matchMedia('(max-width: 540px)');//создание медиа запроса при ширине планшета
        const min = matchMedia('(min-width: 541px)');//создание медиа запроса при ширине
        for (let e of data) {
            let img = $('<img src="" alt="">');
            img.attr("src", e);
            img.css({
                'display': 'none',
                'max-width': '1000px',
                'height': '100vh',
                'position': 'absolute',
                'top': '0px',
                'left': '50%',
                'cursor': 'zoom-in',
                "transform": "translateX(-50%)",
            })

            if (max.matches) {
                img.css({
                    'width': '100',
                    'height': 'auto',
                    'transform': 'none',
                    'left': '0%',
                    'top': '50%',
                    'transform': 'translateY(-50 %)'
                })
            }

            gallery.append(img);

        }
        //добавление обработчика измененмий размера экрана
        max.addListener(function (e) {
            if (e.matches) {
                mask.find('img').css({
                    'width': '100%',
                    'height': 'auto',
                    'transform': 'none',
                    'left': '0%',
                    'top': '50%',
                    'transform': 'translateY(-50%)'
                })
            }
        })
        min.addListener(function(e){
            if(e.matches){
                mask.find('img').css({
                    "transform": "none",
                    'max-width': '700px',
                    'height': '100vh',
                    'top': '0px',
                    'left': '50%',
                    "transform": "translateX(-50%)",
                })
            }
        })

        return gallery;
    }


    window.GalleryView = g;
})();