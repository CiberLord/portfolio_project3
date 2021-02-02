//основной скрипт файл
let data=["C:/Users/Yuldash/Desktop/workspace/PROJECT__ONE/img/gallery1.jpg",
            "C:/Users/Yuldash/Desktop/workspace/PROJECT__ONE/img/gallery2.jpg",
            "C:/Users/Yuldash/Desktop/workspace/PROJECT__ONE/img/gallery3.jpg",
            "C:/Users/Yuldash/Desktop/workspace/PROJECT__ONE/img/gallery4.jpg",
            "C:/Users/Yuldash/Desktop/workspace/PROJECT__ONE/img/gallery5.jpg"];


(function(){
    
    let regPage=eWindow.create("#modal__dialog",{
        animation: true
    });//создание окна регистрации
    let gallery=GalleryView.createFromPath(data,"gallery460");
    Gamburger.cooke('.navbar',{
        color: "#fff",
        after: false,
        open: function(){
            $('.menu').css({
                'height':'50vh',
                'padding':'60px 0px'
            })
            
        },
        close: function(){
            $('.menu').css({
                'height':'0vh',
                'padding':'0px'
            })
        }
    })
    
    $(".sign__button").on('click',function(){
        regPage.show();
    })
    $(".gallery__item").on('click',function(){
        gallery.open();
    })

  
})();

