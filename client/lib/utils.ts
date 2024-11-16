export const removeDuplicates = (array: any[]) => {
    const sortedArray = array.sort();
    const set = [];
    for (let i = 0; i < sortedArray.length; i++) {
    if(i === 0 || sortedArray[i - 1] !== sortedArray[i]) {
        set.push(sortedArray[i]);
    }
    }
    return set;
}