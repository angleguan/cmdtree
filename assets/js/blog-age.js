$(document).ready(() => {
  if ($(".blog-age").length > 0) {
    $(".blog-age").text(`${DateDiff()}年`);
  }
})

function DateDiff() {
  const oDate1 = new Date(2017, 2, 18);
  let oDate2 = new Date();
  let iDays = (Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24 / 365).toFixed(1);
  return (iDays);
}