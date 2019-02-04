/**
 * Convert given time to AM/PM version
 * @param ampm
 * @param date
 * @returns {number}
 */
export function convertTimeByAmPm(ampm, date){
    return ampm === 'am' && date.getHours() >= 12
        ? date.getHours()-12
        : ampm === 'pm' && date.getHours() < 12
            ? date.getHours()+12
            : null //hours and ampm combination that is invalid
}

/**
 * Get hour value based on current date being before or after noon
 * @param hour
 * @param mode
 * @param date
 * @returns {number}
 */
export function getHourFromDateAndMode(hour, mode, date){
    if (mode === '24') return hour;
    return hour === 12 && date.getHours() < 12
        ? 0
        : date.getHours() > 12
            ? hour + 12
            : hour;
}

/**
 * Get hour value dependant on time picker mode, 12 or 24 hour
 * @param mode
 * @param date
 * @returns {number}
 */
export function getHourValueByMode(mode, date){
    if(mode === '12'){
        return date.getHours() === 0
            ? 12
            : date.getHours() > 12
                ? date.getHours() - 12
                : date.getHours()
    } else {
        return date.getHours();
    }
}