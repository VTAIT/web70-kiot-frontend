const handleSameItem = (arr1, arr2, sort = false) => {
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

    if (sort) {
        arr.sort((a, b) => b._id - a._id);
    }
    return arr;
};

const filteredDataClient = (totalData, query) => {
    const remainData = totalData.filter((item) => {
        let isMatchItem = true;
        // filter name, id
        const isId = !isNaN(parseInt(query.search));

        if (query.search && isId && parseInt(query.search) !== item._id) {
            isMatchItem = false;
        }

        if (
            query.search &&
            !isId &&
            !item.name_product
                .toLowerCase()
                .includes(query.search.toLowerCase())
        ) {
            isMatchItem = false;
        }

        //filter price
        if (query.price && isMatchItem) {
            let isMatchPrice = false;

            const limit = query.price.split("-");
            const min = parseInt(limit[0]);
            const max = parseInt(limit[1]);

            if (!isNaN(min) && isNaN(max) && item.price >= min) {
                isMatchPrice = true;
            } else if (
                !isNaN(min) &&
                !isNaN(max) &&
                item.price >= min &&
                item.price <= max
            ) {
                isMatchPrice = true;
            }

            isMatchItem = isMatchPrice;
        }

        //filter category

        if (query.category && item.category !== query.category && isMatchItem) {
            isMatchItem = false;
        }

        //filter date
        if (
            query.fromdate &&
            new Date(item.createdAt) < new Date(query.fromdate) &&
            isMatchItem
        ) {
            isMatchItem = false;
        }

        if (
            query.todate &&
            new Date(item.createdAt) > new Date(query.todate) &&
            isMatchItem
        ) {
            isMatchItem = false;
        }

        return isMatchItem;
    });

    return remainData;
};

export { handleSameItem, filteredDataClient };
