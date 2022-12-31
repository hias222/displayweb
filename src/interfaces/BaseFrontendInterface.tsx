import { eventHeat } from "../types/EventHeat";
//import { LaneState } from "../state/LaneState";

export interface BaseFrontendInterface {
    startdelayms: number;
    EventHeat: eventHeat;
    lanes:  string[];
    displayMode: string;
    runningTime: string;
}
