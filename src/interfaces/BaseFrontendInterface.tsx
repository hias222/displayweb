import { eventHeat } from "../types/EventHeat";
import { LaneState } from "../state/LaneState";

export interface BaseFrontendInterface {
    startdelayms: number;
    EventHeat: eventHeat;
    lanes: LaneState[] | [];
    displayMode: string;
    runningTime: string;
}
