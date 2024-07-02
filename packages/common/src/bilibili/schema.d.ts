import { IDimension } from "../ui/schema";
export interface IBilibiliVideoDetail {
    View: {
        dimension: {
            width: number;
            height: number;
            rotate: number;
        };
        bvid: string;
        aid: number;
        cid: number;
        videos: number;
        pic: string;
        title: string;
        desc: string;
        owner: {
            mid: string;
            name: string;
            face: string;
        };
        stat: {
            aid: number;
            view: number;
            danmaku: number;
            reply: number;
            favorite: number;
            coin: number;
            share: number;
            now_rank: number;
            his_rank: number;
            like: number;
            dislike: number;
            evaluation: string;
            vt: number;
        };
    };
}
export interface IBilibiliVideo {
    bvid: string;
    title?: string;
    dimension?: IDimension;
    enableDanmu?: number;
    enableHighQuality?: number;
}
export type BilibiliDisplayType = "video" | "cover" | "gif";
