/**
 * Takes an object array and adds keys, useful for react list mapping where array can be modified and index
 * can change
 * @param array
 * @returns array
 */
export function addIdsToArrayElements(array){
    if(!array) return null;
    return array.map(value => {
        return { value, key: Math.floor(Math.random() * 1000+1) };
    });
}