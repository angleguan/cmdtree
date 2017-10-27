(function(){
    function updateSnippets () {
        moment.locale('zh-cn');
    }
    function updateClock(){
        var now = moment(),
            second = now.seconds() * 6,
            minute = now.minutes() * 6 + second / 60,
            hour = ((now.hours() % 12) / 12) * 360 + 90 + minute / 12;
        $('#hour').css("transform", "rotate(" + hour + "deg)");
        $('#minute').css("transform", "rotate(" + minute + "deg)");
        $('#second').css("transform", "rotate(" + second + "deg)");
    }
    function timedUpdate () {
        updateClock();
        updateSnippets();
        setTimeout(timedUpdate, 1000);
    }
    timedUpdate();
    if ($(window).width() < 800 ) {
        $(".top").text("建议使用电脑浏览，以获得更佳体验")
    }
    $(".github-corner>svg").css("top",$(".top").css("height"));
    // var oReadingTime = $(".reading-time>strong");
    // var articleLength = $(".article>.content").text().length;
    // var readingTime;
    // if ( articleLength <= 100 ) {
    //     readingTime = 1 + Math.ceil( ( $(".article>p>img").length ) * 0.16 );
    // } else {
    //     readingTime= Math.ceil( articleLength / 240 + ( $(".article>p>img").length ) * 0.16);
    // }
    // oReadingTime.text("You need about " + readingTime + " minute to read.");
})();