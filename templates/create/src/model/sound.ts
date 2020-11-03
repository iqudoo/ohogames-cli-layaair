module SoundManager {

    export function playMusic(url, loops?) {
        return OHOGame.audio.playMusic(url, loops)
    }

    export function playSound(url, loops?) {
        return OHOGame.audio.playSound(url, loops)
    }

}