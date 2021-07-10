class Timer {
    constructor(time) {
        this.hours = parseInt(time[0]+time[1]);
        this.minutes = parseInt(time[3]+time[4]);
        this.seconds = parseInt(time[6] + time[7]);
    }

    start(func) {
        this.interval = setInterval(() => this.updateTime(func), 1000);
    }

    updateTime(func) {
        func(this.addSecond());
    }

    addSecond() {
        this.seconds++;
        return this.checkTime();
    }

    checkTime() {
        
        var time = ['00', '00', '00'];
        
        if (this.seconds === 60) {
            this.seconds = 0;
            this.minutes++;
        }
        if (this.minutes === 60){
            this.minutes = 0;
            this.hours++;
        }

        if (this.seconds >= 0 && this.seconds < 10) time[2] = "0" + this.seconds;
        else time[2] = this.seconds;
        if (this.minutes >= 0 && this.minutes < 10) time[1] = "0" + this.minutes;
        else time[1] = this.minutes;
        if (this.hours >= 0 && this.hours < 10) time[0] = "0" + this.hours;
        else time[0] = this.hours;

        return time.join(':');
    }
}

export default Timer;