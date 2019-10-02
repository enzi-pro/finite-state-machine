class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if (!config) throw new Error;
        this.configStates = config.states;
        this.initialState = config.initial;
        this.stateHistory = [];
        this.stateHistory.push(this.initialState);
        this.stateIndex = 0;
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.stateHistory[this.stateIndex];
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if (!this.configStates[state]) throw new Error;
        if (this.stateHistory[this.stateIndex + 1]) {
            this.stateHistory.pop();
        }
        this.stateHistory.push(state);
        this.stateIndex += 1;
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        let nextState = this.configStates[this.getState()].transitions[event];
        if (!nextState) throw new Error;
        this.changeState(nextState);
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        if (this.stateHistory[this.stateIndex + 1]) {
            this.stateHistory.pop();
        }
        this.stateHistory.push(this.initialState);
        this.stateIndex += 1;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        let states = [];
        if (!event) {
            for(let state in this.configStates) {
                states.push(state);
            }
        } else {
            for(let state in this.configStates) {
                if (this.configStates[state].transitions[event]) {
                    states.push(state);
                }
            }
        }
        return states;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (this.stateIndex - 1 < 0) {
            return false;
        } else {
            this.stateIndex -= 1;
            return true;
        }
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (this.stateIndex + 1 > this.stateHistory.length - 1) {
            return false;
        } else {
            this.stateIndex += 1;
            return true;
        }        
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.stateHistory = [];
        this.stateHistory.push(this.initialState);
        this.stateIndex = 0;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
