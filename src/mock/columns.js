const columns = [
    {
        "Header": "Name"
    },
    {
        "Header": "Location"
    },
    {
        "Header": "Registered",
        "accessor": "registered.date"
    },
    {
        "Header": "Phone",
        "accessor": "phone",
        "disableSortBy": true
    },
    {
        "Header": "Picture",
        "accessor": "picture.thumbnail",
        "disableSortBy": true,
        "disableFilters": true
    },
    {
        "Header": "Actions",
        "id": "delete",
        "disableSortBy": true,
        "disableFilters": true
    }
];

export default columns;