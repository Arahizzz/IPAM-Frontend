import React, {ChangeEvent, useState} from 'react';
import {
    useAddNetworkDeviceMutation,
    useAllNetworkDevicesQuery,
    useDeleteNetworkDeviceMutation,
    useSearchDevicesLazyQuery
} from "../../graphql";
import {GridSortModel} from "@mui/x-data-grid/models/gridSortModel";
import {getOrder} from "../../utils";
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent, Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, FormControlLabel,
    Stack, TextField,
    Typography
} from "@mui/material";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {Link} from "react-router-dom";
import {GridCallbackDetails} from "@mui/x-data-grid/models/api";
import SaveAlert, {SaveResult, SaveState} from "../../components/SaveAlert";
import AutocompleteSelect from "../../components/Autocomplete";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import {useApolloClient} from "@apollo/client";

const columns: GridColDef[] = [
    {
        headerName: "ID",
        field: "id",
        maxWidth: 150,
        sortable: false,
        valueGetter: params => params.row.device.id
    },
    {
        headerName: "Name",
        field: "name",
        sortable: true,
        minWidth: 200,
        valueGetter: params => params.row.device.name
    },
    {
        headerName: "MAC Address",
        field: "macAddress",
        width: 200,
        sortable: false,
        valueGetter: params => params.row.device.id
    },
    {
        headerName: "IP Address",
        field: "ipAddress",
        width: 200,
        sortable: true
    },
    {
        headerName: "DHCP",
        field: "dhcp",
        width: 100,
        sortable: false,
        renderCell: params => {
            return <Checkbox checked={params.row.dhcp}/>
        }
    },
    {
        headerName: "Actions",
        field: "actions",
        renderCell: params => {
            return <div>
                <Button variant="contained" color="primary" component={Link}
                        to={`/devices/${params.row.device.id}`}>Edit</Button>
                <Button variant="contained" color="error"
                        onClick={params.row.onDelete}>Remove</Button>
            </div>
        },
        width: 250,
        sortable: false
    }
];

type NetworkDevicesProps = {
    networkId: number
}

export default function NetworkDevices({networkId}: NetworkDevicesProps) {
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(25);
    const [sort, setSort] = useState<GridSortModel>([]);
    const result = useAllNetworkDevicesQuery({
        variables: {
            where: {
                networkId: {eq: networkId}
            },
            skip: (page) * pageSize,
            take: pageSize,
            order: getOrder(sort)
        }
    });

    const [openAddModal, setOpenAddModal] = useState(false);
    const [openRemoveModal, setOpenRemoveModal] = useState(false);
    const [removeDeviceId, setRemoveDeviceId] = useState<number>(0);

    const onSortModelChange = (model: GridSortModel, details: GridCallbackDetails) => {
        setSort(model);
    };

    const [saveState, setSaveState] = useState<SaveResult>({saveState: SaveState.NotSaved});

    const rows = result?.data?.networkDevices?.items?.map(r => {
        const onDelete = () => {
            setRemoveDeviceId(r.device.id);
            setOpenRemoveModal(true)
        };
        return {...r, onDelete};
    }) ?? [];

    return <Card>
        <CardContent>
            <SaveAlert saveState={saveState} setSaveState={setSaveState}/>
            <Typography variant={"h4"}>Network Devices</Typography>
            <DataGrid pageSize={pageSize} onPageSizeChange={e => setPageSize(e)}
                      page={page} onPageChange={e => setPage(e)}
                      autoHeight loading={result.loading} columns={columns}
                      sortingMode={"server"} onSortModelChange={onSortModelChange}
                      sortModel={sort} getRowId={row => row.device.id}
                      rows={rows}/>
            <AddNetworkDeviceDialog open={openAddModal} setOpenModal={setOpenAddModal}
                                    networkId={networkId} setSaveState={setSaveState}/>
            <RemoveDeviceDialog open={openRemoveModal} setOpenModal={setOpenRemoveModal}
                                setSaveState={setSaveState} networkId={networkId} deviceId={removeDeviceId}/>
        </CardContent>
        <CardActions>
            <Button variant="contained" onClick={() => setOpenAddModal(!openAddModal)}>
                Add Device
            </Button>
        </CardActions>
    </Card>
}

type AddNetworkDeviceDialogProps = {
    open: boolean,
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
    setSaveState: React.Dispatch<React.SetStateAction<SaveResult>>
    networkId: number
}

const ipRegex = "((^\\s*((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))\\s*$)|(^\\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:)))(%.+)?\\s*$))";

function AddNetworkDeviceDialog({open, setOpenModal, networkId, setSaveState}: AddNetworkDeviceDialogProps) {
    const apolloClient = useApolloClient();
    const [addDevice] = useAddNetworkDeviceMutation();
    const [searchDevices, devicesAutocomplete] = useSearchDevicesLazyQuery();

    const [deviceId, setDeviceId] = useState<number | null>(null);
    const [dhcp, setDhcp] = useState(false);
    const [ipAddress, setIpAddress] = useState<string>("");

    const onSave = () => {
        if (deviceId) {
            setSaveState({saveState: SaveState.Saving});
            addDevice({variables: {networkDevice: {deviceId, networkId, ipAddress, dhcp}}})
                .then(res => {
                    setSaveState({saveState: SaveState.Saved})
                    setOpenModal(false);
                    apolloClient.refetchQueries({
                        include: ["AllNetworkDevices"],
                    })
                }).catch(err => {
                setSaveState({saveState: SaveState.Error, error: err})
            });
        }
    }

    return <Dialog open={open} onClose={() => setOpenModal(false)}>
        <ValidatorForm onSubmit={() => onSave()}>
            <DialogTitle>Add Device to Network</DialogTitle>
            <DialogContent>
                <Stack mt={5} spacing={3}>
                    <AutocompleteSelect
                        label={"Device ID"}
                        updateValue={newValue => setDeviceId(newValue?.id)}
                        searchFunction={searchDevices}
                        searchResult={devicesAutocomplete}
                        resultExtractor={d => d.data?.searchDevices ?? []}
                        isOptionEqualToValue={(o1, o2) => o1.id === o2.id}
                        renderOption={(props, option) => (
                            <Box component="li" {...props}>
                                {option.id} - {option.name} - {option.macAddress}
                            </Box>
                        )}
                        getOptionLabel={(option) => option.id.toString()}
                        makeSearchRequest={s => {
                            return {searchQuery: s, excludeNetworkId: networkId}
                        }}/>
                    <TextValidator
                        name={"ip"} label={"IP Address"}
                        onChange={e => setIpAddress((e as ChangeEvent<HTMLInputElement>).currentTarget.value)}
                        validators={['required', `matchRegexp:${ipRegex}`]}
                        errorMessages={['Enter IP Address', 'Enter valid IPv4 or IPv6 address']}
                        value={ipAddress}/>
                    <FormControlLabel control={<Checkbox id="name" value={dhcp}
                                                         onChange={e => setDhcp(!dhcp)}></Checkbox>}
                                      label={"DHCP enabled"}/>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button type="submit">Add</Button>
                <Button onClick={() => setOpenModal(false)}>Cancel</Button>
            </DialogActions>
        </ValidatorForm>
    </Dialog>
}

type RemoveDeviceDialogProps = {
    open: boolean,
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
    setSaveState: React.Dispatch<React.SetStateAction<SaveResult>>
    networkId: number,
    deviceId: number
}

function RemoveDeviceDialog({open, setOpenModal, setSaveState, networkId, deviceId}: RemoveDeviceDialogProps) {
    const apolloClient = useApolloClient();
    const [removeDevice] = useDeleteNetworkDeviceMutation();

    const onRemove = () => {
        setSaveState({saveState: SaveState.Saving})
        removeDevice({
            variables: {
                networkId,
                deviceId
            }
        }).then(() => {
            setSaveState({saveState: SaveState.Saved})
            setOpenModal(false)
            apolloClient.refetchQueries({
                include: ["AllNetworkDevices"],
            })
        })
            .catch(error => setSaveState({saveState: SaveState.Error, error}))
    };

    return <Dialog open={open} onClose={() => setOpenModal(false)}>
        <DialogTitle>Remove Device</DialogTitle>
        <DialogContent>
            <DialogContentText>Are you sure want to remove device from network?</DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={onRemove} color={"error"}>Remove</Button>
            <Button onClick={() => setOpenModal(false)}>Cancel</Button>
        </DialogActions>
    </Dialog>
}
