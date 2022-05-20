import React, {useState} from 'react';
import {GridSortModel} from "@mui/x-data-grid/models/gridSortModel";
import {GridColDef} from "@mui/x-data-grid";
import {Button} from "@mui/material";
import {Link} from "react-router-dom";

const columns: GridColDef[] = [
    {
        headerName: "ID",
        field: "id",
        maxWidth: 150,
        sortable: true
    },
    {
        headerName: "Username",
        field: "Username",
        sortable: true,
        minWidth: 200
    },
    {
        headerName: "Role",
        field: "macAddress",
        width: 200,
        sortable: true
    },
    // {
    //     headerName: "Actions",
    //     field: "actions",
    //     renderCell: params => {
    //         return <Button variant="contained" color="primary" component={Link}
    //                        to={`/devices/${params.id}`}>Edit</Button>
    //     },
    //     sortable: false
    // }
];

export default function Users(){
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(25);
    const [sort, setSort] = useState<GridSortModel>([]);
}
