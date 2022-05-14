/* to launch this example, change 'entry' in webpack.config.js to
 * './babel_result/example/youtube-iframe-example.js'
 */
import ReactDOM from 'react-dom/client';
import { YoutubeIframe } from '../YoutubeIframe'

const root = ReactDOM.createRoot(
    // @ts-ignore (Argument of type 'HTMLElement | null' is not assignable)
    document.getElementById('main')
);
root.render(<Players />)

class Record {
    name: string;
    videoId: string;

    constructor(name: string, id: string) {
        this.name = name;
        this.videoId = id;
    }
}

function Players() {
    let playlist = [
        new Record('비밀의 화원', 'U6FopXugJo8'),
        new Record('Ah-puh', '7n9D8ZeOQv0'),
        new Record('미아', 'G6GczDUM270'),
        new Record('아이와 나의 바다', 'TqIAndOnd74'),
        new Record('이름에게', 'JSOBF_WhqEM')
    ];
    return (
        <>
            <h1>Hello!</h1>
            {playlist.map(({name, videoId}) => {
                return (<YoutubeIframe
                            YTViewId={videoId}
                            videoId={videoId}
                            key={videoId} />);
            })}
        </>);
}
