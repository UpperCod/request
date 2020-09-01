import { IncomingMessage } from "http";
declare module "@uppercod/request" {
    export type Return = [string, string, IncomingMessage];
    export function request(
        url: string,
        limitRequest?: number
    ): Promise<Return>;
}
