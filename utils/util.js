function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
function extract_aws(data) {
  var res = { attr: [], abs: '', cover: '' };
  if (data.hasOwnProperty('ItemAttributes')) {
    res.attr = data.ItemAttributes;
  }
  if (data.hasOwnProperty('EditorialReviews')) {
    res.abs = data.EditorialReviews.EditorialReview.Content;
  }
  if (data.hasOwnProperty('LargeImage')) {
    res.cover = data.LargeImage;
  }
  return res;
}
module.exports = {
  formatTime: formatTime,
  extract_aws: extract_aws
}
