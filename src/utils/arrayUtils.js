const handleSameItem = (arr1, arr2) => {
    // const arr = [...arr1];

    // arr1.forEach((el1) => {
    //     arr2.forEach((el2) => {
    //         if (el1._id === el2._id) arr.push(el2);
    //     });
    // });

    const seenIds = {};
    const arr = [];

    arr1.forEach((obj) => {
        if (!seenIds[obj._id]) {
            arr.push(obj);
            seenIds[obj._id] = true;
        }
    });

    arr2.forEach((obj) => {
        if (!seenIds[obj._id]) {
            arr.push(obj);
            seenIds[obj._id] = true;
        }
    });

    arr.sort((a, b) => a._id - b._id);
    return arr;
};

export { handleSameItem };
