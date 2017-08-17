/*
  Parser for http://novelonlinefree.com/
*/
"use strict";

parserFactory.register("novelonlinefree.com", function() { return new NovelOnlineFreeParser() });

class NovelOnlineFreeParser extends Parser{
    constructor() {
        super();
    }

    getChapterUrls(dom) {
        let menuItems = [...dom.querySelectorAll("div.chapter-list a")];
        return Promise.resolve(this.buildChapterList(menuItems));
    };

    buildChapterList(menuItems) {
        return menuItems.reverse().map(
           a => ({sourceUrl: a.href, title: a.getAttribute("title")})
       );
    };
    
    findContent(dom) {
        return dom.querySelector("div.vung_doc");
    };

    // title of the story
    extractTitle(dom) {
        return dom.querySelector("h1").textContent;
    };

    extractAuthor(dom) {
        let link = dom.querySelector("a[href*='search_author']");
        return (link == null) ? super.extractAuthor(dom) : link.textContent;
    };

    // individual chapter titles are not inside the content element
    findChapterTitle(dom) {
        return dom.querySelector("h1");
    }

    findCoverImageUrl(dom) {
        return util.getFirstImgSrc(dom, "div", e => e.className.startsWith("entry-header"));
    }

    populateUI(dom) {
        super.populateUI(dom);
        CoverImageUI.showCoverImageUrlInput(true);
    }
}
