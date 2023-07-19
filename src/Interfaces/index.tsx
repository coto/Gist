import { FunctionBody } from "typescript"
export interface GistItemPropsInterface {
    id: string,
    login: string,
    avatar_url: string,
    handleOpen: Function
}
export interface GistItemInterface {
    id: string,
    login: string,
    avatar_url: string
}

export interface OriginGistInterface {
    id: string,
    owner: {
        login: string,
        avatar_url: string  
    }
}
