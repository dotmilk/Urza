class UrPage {

    constructor(params) { if (params != null) { this.init(params) } }

    init(params) {
        if (params == null) { params = {} }
        ({
            core: this.core,
            pageManager: this.pageManager,
            pageName: this.pageName,
            pageTransition: this.pageTransition
        } = params)

        // Init page handler
        let myClass = this
        return this.core.controller(this.pageName, function(page) {
            if (myClass.pageTransition) {
                this.transition = myClass.pageTransition
            }
            return myClass.pageController(page)
        })
    }

    pageController(page) {
        let myClass = this;
        $(page).on('appLayout', () => {
            myClass.onAppLayout(page)
        })
        $(page).on('appShow', () => {
            myClass.onAppShow(page)
        })
        $(page).on('appHide', () => {
            myClass.onAppHide(page)
        })
        $(page).on('appBack', () => {
            myClass.onAppBack(page)
        })
        $(page).on('appForward', () => myClass.onAppForward(page))
        $(page).on('appBeforeBack', () => myClass.onAppBeforeBack(page))
        $(page).on('appReady', () => myClass.onAppReady(page))
        return $(page).on('appDestroy', () => myClass.onAppDestroy(page))
    }

    load(params) {
        return this.core.load(this.pageName, function() {
            if (params != null) {
                let isParamsCallback = params && ({}.toString.call(params) === '[object Function]')
                if (isParamsCallback) { return params() }
            }
        });
    }

    back(params) {
        return this.core.back(this.pageName, function() {
            if (params != null) {
                let isParamsCallback = params && ({}.toString.call(params) === '[object Function]')
                if (isParamsCallback) { return params() }
            }
        })
    }

    onAppLayout(page) {}
    onAppShow(page) {
        // lpApp.analytics.trackEvent("page", "draw", this.pageName)
        return this.pageManager.setCurrentPageController(this)
    }
    onAppHide(page) {}
    onAppBack(page) {}
    onAppForward(page) {}
    onAppBeforeBack(page) {}
    onAppReady(page) {}
    onAppDestroy(page) {}
}
