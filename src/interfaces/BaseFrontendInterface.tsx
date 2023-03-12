import { eventHeat } from "../types/EventHeat";
import { LaneState } from "../state/LaneState";

export interface BaseFrontendInterface {
    startdelayms: number;
    changeMode: boolean;
    EventHeat: eventHeat;
    lanes: LaneState[] | [];
    displayMode: string;
    runningTime: string;
    round: number;
}
