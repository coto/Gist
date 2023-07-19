import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { GistItemInterface, OriginGistInterface } from "../../Interfaces";
import { GistItem } from "../GistItem";

export const Gist: React.FC = () => {
    const [gists, setGists] = useState<Array<GistItemInterface>>([]);
    const [page, setPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [selectedAvatar, setSelectedAvatar] = useState<string>('');
    const gistRef = useRef<HTMLDivElement>(null);

    const mapResponse = (payload: Array<OriginGistInterface>): Array<GistItemInterface> => (
        payload?.map(item => (
            {
                id: item?.id ?? '',
                login: item?.owner?.login ?? '',
                avatar_url: item?.owner?.avatar_url ?? ''
            }
        ))
    )

    const fetchGists = () => {
        setLoading(true);
        axios.get('https://api.github.com/gists/public', { params: { page: page, per_page: 30 } })
            .then(res => {
                const data = mapResponse(res.data);
                setGists((curGists) => [...curGists, ...data]);
                setLoading(false);
            })
            .catch(err => console.log(err));
    };

    const handleInfinite = () => {
        if (gistRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = gistRef.current;

            if ((scrollTop + clientHeight > scrollHeight - 1000) && loading === false) {
                setPage((prevPage) => prevPage + 1);
            }
        }
    }

    const handleOpen = (avatar_url: string) => {
        setSelectedAvatar(avatar_url);
        setOpen(true);
        setTimeout(() => setOpen(false), 1500)
    };
    useEffect(() => {
        fetchGists();
    }, [page]);

    return (
        <div>
            {loading ? <div className="ring">loading</div> : <></>}
            <div></div>
            <img src={selectedAvatar} alt={'avatar'} className={`center-image ${open?'fadeIn':'fadeOut'}`} ></img>
            <div className="container" ref={gistRef} onScroll={handleInfinite}>
                {gists.map((gist, index) => <GistItem {...gist} key={index} handleOpen={handleOpen} />)}
            </div>
        </div>
    );
}
