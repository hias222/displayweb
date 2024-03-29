import { eventHeat } from "../types/EventHeat";
import { LaneState } from "../state/LaneState";
import { TextMessageType } from "../types/TextMessageType";
import { HiitState } from "../state/HiitState";

export interface ChooseInterface {
    ChangeMode: boolean;
    startdelayms: number;
    EventHeat: eventHeat;
    lanes: LaneState[] | [];
    displayMode: string;
    runningTime: string;
    messageText: TextMessageType;
    result: string;
    round: number;
    hiit: HiitState;
}
