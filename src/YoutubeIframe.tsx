import { Component, useEffect, useRef } from 'react';

declare global{
    var YT: any;
    function onYouTubeIframeAPIReady(): void
}
type voidFn = () => void;

// loadYTDone: loadYT 함수가 한 번 호출되면 true가 됨
let loadYTDone: boolean = false;
// loadAPIDone: Youtube Iframe API 스크립트의 로딩이 끝나고
// onYoutubeIframeAPIReady가 호출되면 true가 됨
let loadAPIDone: boolean = false;
// youtubeIframeAPIWating: Youtube Iframe API 스크립트 로딩 중에 다른
// YoutubePlayer 컴포넌트가 그려질 경우 onYoutubeIframeAPIReady가 호출되지
// 않았기 때문에 이 대기 리스트에서 실행을 기다리게 된다.
let youtubeIframeAPIWating: Array<voidFn> = [];
function loadYT(): void {
    // YouTube Iframe API 스크립트 로드는 단 한 번만 일어남
    if (!loadYTDone) {
        var tag: HTMLScriptElement = document.createElement('script');

        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        // @ts-ignore (firstScript.parentNode: Object is possibly null)
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        // 스크립트가 로드되는 동안 렌더링된 YoutubeIframe
        // 컴포넌트들의 초기화 코드 실행
        window.onYouTubeIframeAPIReady = () => {
            loadAPIDone = true;
            console.log('api load done');
            console.log(`${youtubeIframeAPIWating.length} callbacks are wating.`);
            for (let callback of youtubeIframeAPIWating) {
                callback();
            }
        }
        loadYTDone = true;
    }
}

type Player = any;
type YoutubeEvent = any;
interface YoutubeIframeProps {
    YTViewId: String,
    height?: Number,
    width?: Number,
    videoId: String,
    events?: Record<string, (a0: Player, a1: YoutubeEvent) => void>
    // 참고 - https://developers.google.com/youtube/iframe_api_reference#Events
}

export function YoutubeIframe(props: YoutubeIframeProps): JSX.Element {
    let player: Player;
    const playerId = `ytiframe-${props.YTViewId}`;
    useEffect(() => {
        loadYT();
        let eventListeners: Record<string, (a0: YoutubeEvent) => void> = {};
        for (let event in props.events) {
            eventListeners[event] =
                (e) => props.events?.[event](player, e);
        }
        let onAPIReady = () => {
            console.log(`${playerId} loading.`);
            player = new YT.Player(playerId, {
                height: props.height || 390,
                width: props.width || 640,
                videoId: props.videoId,
                events: eventListeners
            });
            console.log(`${playerId} load done.`);
        }
        if (loadAPIDone)
            onAPIReady();
        else // onYouTubeIframeAPIReady 콜백 실행 시점에 수행됨
            youtubeIframeAPIWating.push(onAPIReady)
    });

    return (<div id={playerId} />);
}
