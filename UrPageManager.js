class UrPageManager {

    constructor(params) {
        this.eventCaller = new UrEventCaller()
        this.pageHashMap = new UrHashMap()
        if (params != null) { this.init(params) }
    }

    init(params) {
        console.log("init page manager")
        if (params == null) { params = {} }
        if (!params.core) { throw "No core!!!!"}
        this.core = params.core
        this.eventCaller.init(params.events)

        // Init page controllers
        let appPages = $(".app-page")
        console.log(Array.from(appPages))
        for (let appPage of Array.from(appPages)) {
            var PageClass
            let pageName =  $(appPage).data("page")
            let pageTransition = $(appPage).data("transition")

            let pageClassString = $(appPage).data("controller")
            console.log(pageClassString)
            if (pageClassString && window[pageClassString]) {
                PageClass = window[pageClassString]
                console.log("OK!!!!!!!!",pageClassString)
            } else {
                PageClass = UrPage
            }

            let pageInstance = new PageClass({
                core: params.core,
                pageManager: this,
                pageName,
                pageTransition
            })

            this.pageHashMap.setValue(pageName, pageInstance)
        }
        return this
    }

    callEvent(eventName, eventData) {
        return this.eventCaller.callEvent(eventName, eventData)
    }

    getCurrentPageController() {
        return this.currentPageController
    }

    setCurrentPageController(pageController) {
        this.previousPageController = this.currentPageController
        return this.currentPageController = pageController
    }
    getPreviousPageController() {
        return this.previousPageController
    }

    getCurrentPageName() {
        if (this.currentPageController != null) {
            return this.currenPageController.pageName
        } else {
            return ""
        }
    }

    getPreviousPageName() {
        if (this.previousPageController != null) {
            return this.previousPageController.pageName
        } else {
            return ""
        }
    }

    load(pageName, params) {
        let pageController = this.pageHashMap.getValue(pageName)
        if (!pageController) { return console.error(`${pageName} is not a defined page.`) }
        pageController.load(params)
        return this
    }

    back(pageName, params) {
        let pageController = this.pageHashMap.getValue(pageName);
        if (!pageController) { return console.error(`${pageName} is not a defined page.`) }
        pageController.back(params)
        return this
    }

    getIsBackPage() {
        let pageStack = this.core.getStack()
        return pageStack.length > 1
    }

    navBack(callback) {
        if (this.getIsBackPage()) {
            this.core.back(() => guardFunc(callback, f => f()))
        } else {
            guardFunc(callback, f => f())
        }
        return this
    }

    clearPageStack(callback) {
        let pageStack = this.core.getStack()
        if (pageStack && (pageStack.length > 0)) {
            this.core.removeFromStack(0, pageStack.length - 1)
        }
        guardFunc(callback, f => f())
        return this
    }
}
