class UrState {
    constructor(name) {
        this.name = name
        this.isActive = true
    }

    enter(args) {
        if (this.isActive && (typeof this['onEnter'] === 'function')) {
            this.onEnter(args)
        }
    }

    exit(args) {
        if (this.isActive && (typeof this['onExit'] === 'function')) {
            this.isActive = false
            this.onExit(args)
        }
    }
}

class UrStateMachine {
    constructor(stateDefinitions) {
        this.stateDefinitions = stateDefinitions || {}
        this.currentState = null
    }

    changeState(stateName, args) {
        if (this.currentState) {
            this.currentState.exit()
            this.currentState = null
        }

        if (stateName && this.stateDefinitions[stateName]) {
            let stateDefinition = this.stateDefinitions[stateName]
            this.currentState = new UrState(stateName)
            for (let name in stateDefinition) {
                this.currentState[name] = stateDefinition[name];
            }
            this.currentState.enter(args)
        }

        if (this.onStateChange && (typeof this['onStateChange'] === 'function')) {
            this.onStateChange(this.currentState)
        }
    }

}
