function guardFunc(func, transform) {
    return typeof func === 'function' ? transform(func) : undefined
}

class UrHashMap {
    constructor() {
        this.reset()
    }
    reset() { return this.map = {} }
    getValue(key) { return this.map[key] }
    setValue(key, value) { return this.map[key] = value }
    deleteValue(key) { return delete map[key] }
    isInMap(key) { return Array.from(this.map).includes(key) }
    getMap() { return this.map }
}

class UrEventCaller {
    contructor(events) {
        return this.init(events)
    }

    init(events) {
        if (events == null) { events = {} }
        this.events = events;
    }

    callEvent(eventName, eventData) {
        let event = this.events[eventName];
        return guardFunc(event, f => f({data: eventData}));
    }
}

class Urza {

    constructor(modules, settings) {
        console.log("hello from Urza")
        this.modules = modules || {}
        this.settings = settings || {}
        for (let moduleName of Object.keys(modules || {})) {
            let moduleData = modules[moduleName]
            this.addModule(moduleName, moduleData)
        }
    }

    get(property) {
        return this.settings[property]
    }

    set(property, value) {
        return this.settings[property] = value
    }

    addModule(moduleName, moduleData) {
        if ((moduleData != null) && moduleData.classDef) {
            let newModule = new moduleData.classDef(moduleData.params)
            return this[moduleName] = newModule
        } else if (moduleData) {
            return this[moduleName] = moduleData
        }
    }
}
