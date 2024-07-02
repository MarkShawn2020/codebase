/**
 * The event `scan` status number.
 */
export var ScanStatus;
(function (ScanStatus) {
    ScanStatus[ScanStatus["Unknown"] = 0] = "Unknown";
    ScanStatus[ScanStatus["Cancel"] = 1] = "Cancel";
    ScanStatus[ScanStatus["Waiting"] = 2] = "Waiting";
    ScanStatus[ScanStatus["Scanned"] = 3] = "Scanned";
    ScanStatus[ScanStatus["Confirmed"] = 4] = "Confirmed";
    ScanStatus[ScanStatus["Timeout"] = 5] = "Timeout";
})(ScanStatus || (ScanStatus = {}));
