
export class Clock {
    time;
    on;
    constructor() {
        this.time = 0;
        this.on = false;
    }

    tick() {
        if (this.on) {
            this.time+=1
        }
    }

    reset() {
        this.time = 0;
    }

    start() {
        this.on = true;
    }

    pause() {
        this.on = false;
    }

    toString() {
        let minutes = Math.floor((this.time/60)).toString().padStart(2,"0");
        let seconds = Math.floor((this.time%60)).toString().padStart(2,"0");
        return minutes + ":" + seconds;
    }
}