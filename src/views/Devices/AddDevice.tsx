import React, {useEffect, useState} from 'react';
import {DeviceInfoInput, useAddDeviceMutation, useGetDeviceQuery, useUpdateDeviceMutation} from "../../graphql";
import {DeviceInfoInputModel} from "../../models/Ipam";
import {Button, Card, CardActions, CardContent, Snackbar, Typography} from "@mui/material";
import MuiAlert, {AlertProps} from '@mui/material/Alert';
import {ValidatorForm} from "react-material-ui-form-validator";
import DeviceForm from "./DeviceForm";
import {useNavigate} from "react-router-dom"
import {ApolloError} from "@apollo/client";
import SaveAlert, {SaveResult, SaveState} from "../../components/SaveAlert";


export default function AddDevice() {
    const navigate = useNavigate();
    const [saveState, setSaveState] = useState<SaveResult>({saveState: SaveState.NotSaved});
    const [addDevice] = useAddDeviceMutation();
    const [device, setDevice] = useState<DeviceInfoInput>(new DeviceInfoInputModel({}));

    const onSubmit = () => {
        if (device) {
            setSaveState({saveState: SaveState.Saving});
            addDevice({
                variables: {device}
            }).then(res => {
                setSaveState({saveState: SaveState.Saved});
                navigate(`/devices/${res.data?.addDevice.id}`, {replace: true});
            }).catch(error => setSaveState({saveState: SaveState.Error, error}));
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
            <Typography variant={"h3"} mb={4}>Add New Device</Typography>
            <DeviceForm device={device} setName={setName} setDescription={setDescription}
                        setMacAddress={setMacAddress} setSerial={setSerial} setManufacturer={setManufacturer}/>
        </CardContent>
        <CardActions>
            <Button type="submit" variant={"contained"}>Save</Button>
        </CardActions>
    </ValidatorForm>
    </Card>
}
