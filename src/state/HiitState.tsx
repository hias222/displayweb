import { swimmerPosition } from "../types/SwimmerPosition";

export type HiitState = {
    event: string,
    mode: string,
    departure: string,
    gap: string;
    varianz: string;
    rows: swimmerPosition[]
};

