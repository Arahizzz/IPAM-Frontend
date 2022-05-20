import React, {useState} from "react";
import {GridSortItem, GridSortModel} from "@mui/x-data-grid/models/gridSortModel";
import {ChildNetworksQuery, useChildNetworksQuery} from "../../graphql";
import {
    Box,
    Button,
    Collapse, IconButton, Paper,
    Table, TableBody,
    TableCell,
    TableContainer,
    TableHead, TablePagination, TableRow,
    TableSortLabel,
    Typography
} from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Loading from "../../components/Loading";
import {getOrder} from "../../utils";
import {Link} from "react-router-dom";

type NetworksProps = {
    parentId?: number
};

interface HeadCell {
    id: string;
    label: string;
    width?: number;
}

const headCells: readonly HeadCell[] = [
    {
        id: 'subNetworks',
        label: 'SubNetworks',
        width: 100
    },
    {
        id: 'id',
        label: 'ID',
    },
    {
        id: 'name',
        label: 'Name'
    },
    {
        id: 'ipAddress',
        label: 'IP Address'
    }
];

export default function Networks({parentId}: NetworksProps) {
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(25);
    const [orderBy, setOrderBy] = useState<GridSortModel>([]);

    const result = useChildNetworksQuery({variables: {parentId, order: getOrder(orderBy)}});
    const data = result.data?.networks?.items;

    const [isOpenRows, setOpenRows] = useState(data?.map(() => false) ?? []);

    const onSortUpdate =
        (property: string) => (event: React.MouseEvent<unknown>) => {
            if (!orderBy[0] || orderBy[0].field !== property) {
                setOrderBy([{field: property, sort: 'asc'}])
            } else if (orderBy[0].sort === 'desc') {
                setOrderBy([])
            } else {
                setOrderBy([{field: property, sort: 'desc'}])
            }
        };

    return <Box component={Paper} mt={3}><TableContainer>
        <Table>
            <TableHead>
                <TableRow>
                    {headCells.map(headCell =>
                        <TableCell
                            key={headCell.id}
                            sortDirection={orderBy[0]?.field === headCell.id ? orderBy[0].sort! : false}
                            width={headCell.width}
                        >
                            <TableSortLabel
                                active={orderBy[0]?.field === headCell.id}
                                direction={orderBy[0]?.sort!}
                                onClick={onSortUpdate(headCell.id)}
                            >
                                {headCell.label}
                            </TableSortLabel>
                        </TableCell>)}
                    <TableCell key="actions">Actions</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {data ? data.map((i, index) => {
                    const isOpen = isOpenRows[index];
                    const setOpen = () => {
                        const openRows = [...isOpenRows];
                        openRows[index] = !openRows[index];
                        setOpenRows(openRows);
                    }
                    return <>
                        <TableRow key={i.id}>
                            <TableCell key="subnetworks"><IconButton
                                aria-label="expand row"
                                size="small"
                                onClick={() => setOpen()}
                            >
                                {isOpen ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                            </IconButton></TableCell>
                            <TableCell key="id">{i.id}</TableCell>
                            <TableCell key="name">{i.name}</TableCell>
                            <TableCell key="ipAddress">{i.ipAddress}</TableCell>
                            <TableCell key="actions"><Button variant="contained" color="primary" component={Link}
                                                             to={`/networks/${i.id}`}>Edit</Button></TableCell>
                        </TableRow>
                        <TableRow key={-i.id}><TableCell colSpan={50}
                                                         style={{paddingBottom: 0, paddingTop: 0}}><ChildNetworks
                            isOpen={isOpen}
                            parentId={i.id}/></TableCell></TableRow>
                    </>
                }) : <TableRow key="loading"><TableCell colSpan={50}><Loading/></TableCell></TableRow>}
            </TableBody>
        </Table>
    </TableContainer>
        <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={data?.length ?? 0}
            rowsPerPage={pageSize}
            page={page}
            onPageChange={(_, page) => setPage(page)}
            onRowsPerPageChange={event => setPageSize(parseInt(event.target.value, 10))}
        />
        <Button component={Link} to={"/networks/add"} variant={"contained"}>Add network</Button>
    </Box>
}

function ChildNetworks({isOpen, ...props}: NetworksProps & { isOpen: boolean }) {
    return <Collapse in={isOpen} timeout={"auto"} mountOnEnter>
        <Networks {...props} />
    </Collapse>
}
