import { atom } from "jotai";
import type { IUser } from "packages/common-wechaty/schema";

export const botSocketOpenedAtom = atom(false);

export const botScanValueAtom = atom("");
export const botUserAtom = atom<IUser>(null);
export const botLoggedInAtom = atom(false);

export enum ScanStatus {
  Unknown = 0,
  Cancel = 1,
  Waiting = 2,
  Scanned = 3,
  Confirmed = 4,
  Timeout = 5,
}

export const botScanStatusAtom = atom<ScanStatus>(ScanStatus.Unknown);
