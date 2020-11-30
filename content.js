const thumb_regex = /^.*(youtu.be\/|v\/|embed\/|watch\?|youtube.com\/user\/[^#]*#([^\/]*?\/)*)\??v?=?([^#\&\?]*).*/;

if (location.host.includes('.youtube.com')) {
	function waitFor(selector, callback, timeout) {
		const element = document.querySelector(selector);
		if (element) {
			callback(element);
		} else {
			if (timeout) {
				return window.setTimeout(function () {
					return window.requestAnimationFrame(function () {
						waitFor(selector, callback);
					});
				}, timeout);
			}
			return window.requestAnimationFrame(function () {
				waitFor(selector, callback);
			});
		}
	}

	waitFor('#watch-header, ytd-video-primary-info-renderer', function (target) {
			target.style.position = 'relative';
			target.insertBefore((function() {
				const btn = document.createElement('a');
				btn.setAttribute('style', 'display:block;height:20px;position:absolute;top:2px;right:3px;z-index:9;color:#666;font-size:11px;font-weight:700;line-height:17px;text-decoration:none;font-weight:400;cursor:pointer;');
				btn.innerHTML = 'Thumb';
				btn.onclick = function () {
					if (location.href.match(thumb_regex)) {
						const keywords = {
								_90: '/default.jpg',
								_180: '/mqdefault.jpg',
								_360: '/hqdefault.jpg',
								_480: '/sddefault.jpg',
								_720: '/maxresdefault.jpg',
							},
							url = 'https://i.ytimg.com/vi/' + location.href.match(thumb_regex)[3],
							htmlStr = '<html><head><title>YThumb</title></head><body>Select quality<br>' + (function () {const p=[];for (const k of Object.keys(keywords)) {const v = keywords[k];p.push('<a href="' + url + v + '" target="_blank">' + k.substring(1) + '</a>');}return p.join('<br>');})() + '</body></html>',
							windw = window.open('','popUpWindow','height=500,width=400,left=100,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes');
						windw.document.write(htmlStr);
					} else {
						alert('Impossible.');
					}
				};
				return btn;
			})(), target.firstChild);
		}, 100
	);
}