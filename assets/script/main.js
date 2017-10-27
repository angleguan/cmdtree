(function(){
    var oTop = document.getElementsByClassName("top")[0];
    if (document.body.offsetWidth < 800 ) {
        oTop.innerHTML = "建议使用电脑浏览，以获得更佳体验";
    }
    document.getElementsByTagName("svg")[0].style.top = oTop.offsetHeight +"px";
})();