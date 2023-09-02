import { priceRange } from "../components/searchComponents/Search";

const handleSameItem = (arr1, arr2) => {
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
        if (query.price) {
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

        if (query.category && item.category !== query.category) {
            isMatchItem = false;
        }

        //filter date
        if (
            query.fromdate &&
            new Date(item.createdAt) < new Date(query.fromdate)
        ) {
            isMatchItem = false;
        }

        if (query.todate && new Date(item.createdAt) > new Date(query.todate)) {
            isMatchItem = false;
        }

        return isMatchItem;
    });

    return remainData;
};

export { handleSameItem, filteredDataClient };
