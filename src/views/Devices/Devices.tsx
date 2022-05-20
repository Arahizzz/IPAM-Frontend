import React, {useState} from 'react';
import {
    Button,
    Typography
} from "@mui/material";
import {useAllDevicesQuery,} from "../../graphql";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {Link} from "react-router-dom";
import {GridSortModel} from "@mui/x-data-grid/models/gridSortModel";
import {GridCallbackDetails} from "@mui/x-data-grid/models/api";
import {getOrder} from "../../utils";

const columns: GridColDef[] = [
    {
        headerName: "ID",
        field: "id",
        maxWidth: 150,
        sortable: true
    },
    {
        headerName: "Name",
        field: "name",
        sortable: true,
        minWidth: 200
    },
    {
        headerName: "MAC Address",
        field: "macAddress",
        width: 200,
        sortable: true
    },
    {
        headerName: "Actions",
        field: "actions",
        renderCell: params => {
            return <Button variant="contained" color="primary" component={Link}
                           to={`/devices/${params.id}`}>Edit</Button>
        },
        sortable: false
    }
];

export default function Devices() {
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(25);
    const [sort, setSort] = useState<GridSortModel>([]);

    const result = useAllDevicesQuery({
        variables: {
            skip: (page) * pageSize,
            take: pageSize,
            order: getOrder(sort)
        },
    });

    const onSortModelChange = (model: GridSortModel, details: GridCallbackDetails) => {
        setSort(model);
    };

    return <div><Typography variant={"h3"}>Devices</Typography>
        <DataGrid pageSize={pageSize} onPageSizeChange={e => setPageSize(e)}
                  page={page} onPageChange={e => setPage(e)}
                  autoHeight loading={result.loading} columns={columns}
                  sortingMode={"server"} onSortModelChange={onSortModelChange}
                  sortModel={sort}
                  rows={result.data?.devices?.items ?? []}/>
        <Button component={Link} to={"/devices/add"} variant={"contained"}>Add device</Button>
    </div>

}
