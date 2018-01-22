$(document).ready(() => {
  $("#back-to-top").click(() => {
    $("html,body").animate({
      scrollTop: 0
    }, 500)
  })
  $(".navbar-burger").click(() => {
    $(".navbar-menu").toggle()
  })
})
