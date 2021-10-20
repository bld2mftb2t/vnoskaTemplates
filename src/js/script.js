const hide = ((/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) && (document.documentElement.clientWidth < 1045)) ? 'desktop' : 'mobile'
const show = (hide === 'mobile') ? 'desktop' : 'mobile'
var addEvent = function(object, type, callback) {
    if (object == null || typeof(object) == 'undefined') return;
    if (object.addEventListener) {
        object.addEventListener(type, callback, false);
    } else if (object.attachEvent) {
        object.attachEvent("on" + type, callback);
    } else {
        object["on"+type] = callback;
    }
};
addEvent(window, "resize", function(event) {
  toggleDesktop(hide,show)
})

function toggleDesktop() {
	let hide = ((/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) && (document.documentElement.clientWidth < 1045)) ? 'desktop' : 'mobile'
	let show = (hide === 'mobile') ? 'desktop' : 'mobile'
	let classesHide = document.querySelectorAll('[class*="_' + hide +'"]')
  for (let i = 0; i < classesHide.length; i++)
	{
		classesHide[i] = document.querySelector(classesHide[i]['className'])
		classesHide[i].classList.add('_hide')
	}
	let classesShow = document.querySelectorAll('[class*="_'+ show +'"]')	
  for (let i = 0; i < classesShow.length; i++)
	{
		classesShow[i] = document.querySelector(classesShow[i]['className'])
		classesShow[i].classList.remove('_hide')
  }
}

function popupTitle() {
  let f = new Array('.main-block__title', '.main-block__purple', '.main-block__text', '.main-block__buttons','.flying__card')
        const a = []
        for (let i = 0; i < f.length; i++) {
            a[i] = document.querySelector(f[i])
            for (elem of a) {
                elem.classList.add('visible')
            }
        }  
}
try {
    window.onload = toggleDesktop(hide,show), popupTitle()
}
catch (e) {
    //console.error(e)
}
