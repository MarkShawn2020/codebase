/**
 * Issue wechaty/wechaty#2250
 *  - https://github.com/wechaty/wechaty/issues/2250
 */
export interface LocationPayload {
    accuracy: number;
    address: string;
    latitude: number;
    longitude: number;
    name: string;
}
