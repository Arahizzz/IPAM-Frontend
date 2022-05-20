import React, {useEffect, useState} from 'react';
import {useRoute} from "@react-buddy/ide-toolbox/dist/routing/routing";
import {useNavigate, useParams} from "react-router-dom";
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {
    Box, Button,
    Card,
    CardActions,
    CardContent,
    CardHeader, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    FormControl,
    FormGroup, FormHelperText, Input, InputLabel,
    Paper, Snackbar, Stack, TextareaAutosize, TextField,
    Typography
} from "@mui/material";
import {
    DeviceInfoInput,
    useAddDeviceMutation, useDeleteDeviceMutation,
    useDeleteNetworkMutation,
    useGetDeviceQuery,
    useUpdateDeviceMutation
} from "../../graphql";
import Loading from "../../components/Loading";
import {DeviceInfoInputModel} from "../../models/Ipam";
import DeviceForm from "./DeviceForm";
import MuiAlert from "@mui/material/Alert";
import {ApolloError, useApolloClient} from "@apollo/client";
import SaveAlert, {SaveResult, SaveState} from "../../components/SaveAlert";


export default function EditDevice() {
    const {deviceId} = useParams();
    const id = parseInt(deviceId!);
    const {data, loading} = useGetDeviceQuery({variables: {id}});
    const [updateDevice, {error}] = useUpdateDeviceMutation();
    const [device, setDevice] = useState<DeviceInfoInput | undefined>();
    const [saveState, setSaveState] = useState<SaveResult>({saveState: SaveState.NotSaved});
    const [openRemoveDevice, setOpenRemoveDevice] = useState(false);

    useEffect(() => {
        if (!loading && data) {
            setDevice(DeviceInfoInputModel.fromResponse(data));
        }
    }, [loading, data]);

    const onSubmit = () => {
        if (device) {
            setSaveState({saveState: SaveState.Saving})
            updateDevice({
                variables: {id, device}
            }).then(() => setSaveState({saveState: SaveState.Error, error: error}))
                .catch(error => setSaveState({saveState: SaveState.Error, error: error}));
        }
    };

    const setDescription = (d: string) => {
        setDevice(dev => {
            return {...dev, description: d}
        })
    }

    const setMacAddress = (d: string) => {
        setDevice(dev => {
            return {...dev, macAddress: d}
        })
    }

    const setName = (d: string) => {
        setDevice(dev => {
            return {...dev, name: d}
        })
    }

    const setManufacturer = (d: string) => {
        setDevice(dev => {
            return {...dev, manufacturer: d}
        })
    };

    const setSerial = (d: string) => {
        setDevice(dev => {
            return {...dev, serialNumber: d}
        })
    }

    return <Card><ValidatorForm onSubmit={onSubmit}>
        <CardContent>
            <SaveAlert saveState={saveState} setSaveState={setSaveState}/>
            <Typography variant={"h3"} mb={4}>Device - {id}</Typography>
            <DeviceForm device={device} setName={setName} setDescription={setDescription}
                        setMacAddress={setMacAddress} setManufacturer={setManufacturer} setSerial={setSerial}/>
            <RemoveDeviceDialog open={openRemoveDevice} setOpenModal={setOpenRemoveDevice}
                                setSaveState={setSaveState} deviceId={id}/>
        </CardContent>
        <CardActions>
            <Button type="submit" variant={"contained"}>Save</Button>
            <Button onClick={() => setOpenRemoveDevice(true)} color="error" variant={"contained"}>Delete</Button>
        </CardActions>
    </ValidatorForm>
    </Card>
}

type RemoveDeviceDialogProps = {
    open: boolean,
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
    setSaveState: React.Dispatch<React.SetStateAction<SaveResult>>
    deviceId: number,
}

function RemoveDeviceDialog({open, setOpenModal, setSaveState, deviceId}: RemoveDeviceDialogProps) {
    const apolloClient = useApolloClient();
    const navigate = useNavigate();
    const [removeDevice] = useDeleteDeviceMutation();

    const onRemove = () => {
        setSaveState({saveState: SaveState.Saving})
        removeDevice({
            variables: {
                id: deviceId,
            }
        }).then(() => {
            setSaveState({saveState: SaveState.Saved})
            setOpenModal(false)
            apolloClient.refetchQueries({
                include: ["AllDevices"],
            })
            navigate("/devices", {replace: true});
        })
            .catch(error => setSaveState({saveState: SaveState.Error, error}))
    };

    return <Dialog open={open} onClose={() => setOpenModal(false)}>
        <DialogTitle>Remove Device</DialogTitle>
        <DialogContent>
            <DialogContentText>Are you sure want to delete device?</DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={onRemove} color={"error"}>Remove</Button>
            <Button onClick={() => setOpenModal(false)}>Cancel</Button>
        </DialogActions>
    </Dialog>
}
