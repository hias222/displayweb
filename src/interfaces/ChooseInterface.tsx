import { eventHeat } from "../types/EventHeat";
import { LaneState } from "../state/LaneState";
import { TextMessageType } from "../types/TextMessageType";

export interface ChooseInterface {
    startdelayms: number;
    EventHeat: eventHeat;
    lanes: LaneState[] | [];
    displayMode: string;
    runningTime: string;
    messageText: TextMessageType;
    result: string;
    round: number;
}
