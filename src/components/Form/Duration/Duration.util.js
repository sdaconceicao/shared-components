export function getHoursFromDuration(value){

    return Math.floor(value / 60);
}

export function getRemainderMinutesFromDuration(value){
    return value >= 60
        ? value % 60
        : value;
}