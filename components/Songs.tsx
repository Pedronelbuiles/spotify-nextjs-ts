import { useRecoilValue } from "recoil"
import { playlistState } from "../atoms/playlistAtom"
import { Song } from "./Song";

const Songs = () => {
    const playlist = useRecoilValue<any>(playlistState);

    return (
        <div className="text-white flex flex-col space-y-1 pb-28 px-8">
            {
                playlist?.tracks?.items.map((track: any, i: number) => (
                    <Song key={track.track.id} track={track} order={i} />
                ))
            }
        </div>
    )
}

export default Songs