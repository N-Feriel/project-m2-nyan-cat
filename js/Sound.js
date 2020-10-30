class Sound {

    constructor(src) {
        this.sound = document.createElement("audio");


        this.source = document.createElement('source');
        this.sound.appendChild(this.source)
        this.source.src = src;

        this.source.setAttribute("type", 'audio/mpeg')
        document.getElementById('app').appendChild(this.sound);

    }



    playSound = () => {

        this.sound.play();
    }
    stopSound = () => {
        this.sound.pause();
    }
}