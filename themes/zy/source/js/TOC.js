const postHeaderList = {

	setScrollspy(target_name) {
		const $window = $(window);
		const $body = $(document.body);

		$body.scrollspy({
			target: target_name
		})
		$window.on('load', () => {
			$body.scrollspy('refresh')
		})
	},

	setSideNavAffixing(element) {
		const offset = element.offset();
		$(window).scroll(() => {
			if ($(window).scrollTop() > offset.top) {
				if (window.XMLHttpRequest) {
					element.css({
						position: "fixed",
						top: 50
					});
				} else {
					element.css({
						top: scrolls
					});
				}
			} else {
				element.css({
					position: "absolute",
					top
				});
			};
		});
	},

	createHeaderList(side_nav_element, article_body_element) {
		if (!article_body_element || article_body_element.length < 1 ||
			!side_nav_element) {
			return false;
		}

		const nodes = article_body_element.find("h1,h2,h3");
		const ulSideNav = side_nav_element;

		$.each(nodes, function () {
			const $this = $(this);

			let nodetext = $this.text();
			// There maybe HTML tags in header inner text, use regex to erase them
			nodetext = nodetext.replace(/<\/?[^>]+>/g, "");
			nodetext = nodetext.replace(/&nbsp;/ig, "");

			// btw: Jekyll generates id for each header.
			let nodeid = $this.attr("id");
			if (!nodeid) {
				nodeid = "top";
			}

			const item_a = $("<a></a>");
			item_a.attr("href", `#${nodeid}`);
			item_a.text(nodetext);

			let ret_li;
			// wrapper: ul ( in the template, outside this code )
			// h1: layer 1: li - a
			// h2: layer 2: ul - li - a
			// h3: layer 3: ul - ul - li - a
			switch ($this.get(0).tagName) {
				case "H1":
					var li_a = $("<li></li>").append(item_a);
					ret_li = li_a;
					break;
				case "H2":
					var li_a = $("<li></li>").append(item_a);
					var nav_li_a = $("<ul class=\"nav\"></ul>").append(li_a);
					ret_li = nav_li_a;
					break;
				case "H3":
					var li_a = $("<li></li>").append(item_a);
					var nav_li_a = $("<ul class=\"nav\"></ul>").append(li_a);
					const nav_nav_li_a = $("<ul class=\"nav\"></ul>").append(nav_li_a);
					ret_li = nav_nav_li_a;
					break;
			}

			if (!ret_li) {
				// do nothing
			} else {
				ulSideNav.append(ret_li);
			}
		}) // end of each
	}
};


$($ => {
	$(document).ready(() => {
		if ($("#sideNav").length > 0) {
			postHeaderList.createHeaderList($("#sideNav"), $(".post"));
			postHeaderList.setScrollspy(".header-list-sidebar");
			postHeaderList.setSideNavAffixing($("#sideNav"));
		}
	});
});