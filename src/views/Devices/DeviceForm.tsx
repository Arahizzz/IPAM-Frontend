import React from 'react';
import {Stack, TextareaAutosize, TextField} from "@mui/material";
import {TextValidator} from "react-material-ui-form-validator";
import Loading from "../../components/Loading";
import {DeviceInfoInput} from "../../graphql";
import ReactInputMask from 'react-input-mask';
import {css} from "@emotion/react";

type DeviceFormProps = {
    device?: DeviceInfoInput,
    setName: (_: string) => void,
    setSerial: (_: string) => void,
    setManufacturer: (_: string) => void,
    setDescription: (_: string) => void,
    setMacAddress: (_: string) => void,
}

const macRegex = "^[0-9A-Fa-f]{1,2}([\\.:-])(?:[0-9A-Fa-f]{1,2}\\1){4}[0-9A-Fa-f]{1,2}$";
const maskChars = {
  'A': '[0-9A-Fa-f]'
};

export default function DeviceForm({device, setName, setDescription, setMacAddress, setSerial, setManufacturer}: DeviceFormProps) {
    if (device) {

        return <Stack spacing={5}>
            <TextField label="Name" id="name" value={device.name}
                       onChange={e => setName(e.currentTarget.value)}></TextField>
            <ReactInputMask
                mask="AA:AA:AA:AA:AA:AA"
                formatChars={maskChars}
                value={device.macAddress}
                onChange={e => setMacAddress((e.target as any).value)}
                // className={this.props.classes.textField}
            >{(() => <TextValidator name={"mac"} label="MAC Address" id="mac" value={device.macAddress}
                            validators={['required', `matchRegexp:${macRegex}`]} css={css`width: 100%`}
                            errorMessages={['This field is required', 'Enter correct MAC address']}
            ></TextValidator>) as any}
            </ReactInputMask>
            <TextField label="SerialNumber" id="name" value={device.serialNumber}
                       onChange={e => setSerial(e.currentTarget.value)}></TextField>
            <TextField label="Manufacturer" id="name" value={device.manufacturer}
                       onChange={e => setManufacturer(e.currentTarget.value)}></TextField>
            <TextareaAutosize placeholder="Enter description" minRows={5} id="description"
                              value={device.description ?? ""}
                              onChange={e => setDescription(e.currentTarget.value)}/>

        </Stack>;
    } else return <Loading/>;
}
