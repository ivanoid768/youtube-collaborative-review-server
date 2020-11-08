const socket = io('/')

const audioGrid = document.getElementById('audio-grid')

const myPeer = new Peer(undefined, {
    host: '/',
    port: '9001'
})

const myAudio = document.createElement('audio')
myAudio.muted = true

const peers = {}

navigator.mediaDevices.getUserMedia({
    audio: true
}).then(stream => {
    addAudioStream(myAudio, stream)

    myPeer.on('call', call => {
        call.answer(stream)
        
        const audio = document.createElement('audio')

        call.on('stream', useraudioStream => {
            addAudioStream(audio, useraudioStream)
        })
    })

    socket.on('user-connected', userId => {
        connectToNewUser(userId, stream)
    })
})

socket.on('user-disconnected', userId => {
    if (peers[userId]) peers[userId].close()
})

myPeer.on('open', id => {
    socket.emit('join-room', ROOM_ID, id)
})

function connectToNewUser(userId, stream) {
    const call = myPeer.call(userId, stream)

    const audio = document.createElement('audio')

    call.on('stream', useraudioStream => {
        addAudioStream(audio, useraudioStream)
    })

    call.on('close', () => {
        audio.remove()
    })

    peers[userId] = call
}

function addAudioStream(audio, stream) {
    audio.srcObject = stream

    audio.addEventListener('loadedmetadata', () => {
        audio.play()
    })

    audioGrid.append(audio)
}
