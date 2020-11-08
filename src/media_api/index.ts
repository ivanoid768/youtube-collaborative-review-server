import { getSingleton, IceCandidateEvent } from 'kurento-client';

export const startMediaServer = async () => {
    let client = await getSingleton('ws://127.0.0.1:8888/kurento', {})
    let server = await client.getServerManager()
    let resp = await server.getName()
    console.log('server_name: ', resp);

    let pipeline = await client.create('MediaPipeline')
    // let dispatcher = await pipeline.create('Dispatcher')
    // console.log('dispatcher', dispatcher.id);

    let rtcEnd = await pipeline.create('WebRtcEndpoint')
    console.log('rtcEnd: ', rtcEnd.id);
    
    rtcEnd.on('OnIceCandidate', async (event: IceCandidateEvent) => {
        console.log(event.timestamp);

    })
}

// docker run --rm -p 8888:8888/tcp -p 5000-5050:5000-5050/udp -e KMS_MIN_PORT=5000 -e KMS_MAX_PORT=5050 kurento/kurento-media-server:latest