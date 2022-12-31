import { swimmerData } from "../types/SwimmerData";

export type LaneState = {
    lane: string;
    finishtime: string;
    place: string;
    laptime: string;
    islaptime: boolean;
    changed: number;
    entrytime?: string;
    swimmerData: swimmerData;
};
