import React from "react";
import { GistItemPropsInterface } from "../../Interfaces";

export const GistItem: React.FC<GistItemPropsInterface> = (props) => {
    return (
        <div className="gist-item" onClick={() => props.handleOpen(props.avatar_url)}>
            <div className="mr-20">
                <img src={props.avatar_url} className="avatar" alt={props.login}></img>
            </div>
            <div>
                {props.login}
            </div>
        </div>
    ); 
}