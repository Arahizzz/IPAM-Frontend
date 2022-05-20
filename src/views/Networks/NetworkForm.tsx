import React, {ChangeEvent, useCallback, useEffect, useMemo, useState} from "react";
import {
    DeviceInfoInput,
    NetworkInfoInput, useSearchNetworksLazyQuery,
} from "../../graphql";
import {Autocomplete, Box, Checkbox, FormControlLabel, Stack, TextareaAutosize, TextField} from "@mui/material";
import ReactInputMask from "react-input-mask";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import isCidr from "is-cidr";
import Loading from "../../components/Loading";
import throttle from 'lodash/throttle';
import {css} from "@emotion/react";
import AutocompleteSelect from "../../components/Autocomplete";


type NetworkFormProps = {
    network?: NetworkInfoInput,
    setName: (_: string) => void,
    setDescription: (_: string) => void,
    setIpAddress: (_: string) => void,
    setVlan: (_: string) => void,
    setDnsServer: (_: string) => void,
    setDhcp: () => void,
    setParentId: (_: number | undefined) => void,
}

export default function NetworkForm(
    {network, setName, setDescription, setIpAddress, setParentId, setVlan, setDhcp, setDnsServer}
        : NetworkFormProps) {
    if (network) {
        return <Stack spacing={5}>
            <TextField label="Name" id="name" value={network.name}
                       onChange={e => setName(e.currentTarget.value)}></TextField>
            <ParentNetworkAutocomplete setParentId={setParentId}/>
            <TextValidator css={css`width: 100%`} name={"ip"} label="IP Address" id="ip" value={network.ipAddress}
                           validators={['required', 'validIpCidr']}
                           errorMessages={['This field is required', 'Enter correct Ipv4 or Ipv6 cidr']}
                           onChange={e => setIpAddress((e as ChangeEvent<HTMLInputElement>).currentTarget.value)}
            ></TextValidator>
            <TextField label="VLAN" id="name" value={network.vlan} type={"number"}
                       onChange={e => setVlan(e.currentTarget.value)}></TextField>
            <TextField label="DNS Server" id="name" value={network.dnsServer}
                       onChange={e => setDnsServer(e.currentTarget.value)}></TextField>
            <FormControlLabel control={<Checkbox id="name" checked={network.dhcpEnabled}
                                                 onChange={e => setDhcp()}></Checkbox>} label={"DHCP enabled"}/>
            <TextareaAutosize placeholder="Enter description" minRows={5} id="description"
                              value={network.description ?? ""}
                              onChange={e => setDescription(e.currentTarget.value)}/>

        </Stack>;
    } else return <Loading/>;
}

function ParentNetworkAutocomplete({setParentId}: { setParentId: (_: number | undefined) => void }) {
    const [searchNetworks, networksAutoComplete] = useSearchNetworksLazyQuery();

    return <AutocompleteSelect
        label={"Parent network ID"}
        updateValue={newValue => setParentId(newValue?.id)}
        searchFunction={searchNetworks}
        searchResult={networksAutoComplete}
        resultExtractor={r => r.data?.searchNetworks ?? []}
        isOptionEqualToValue={(o1, o2) => o1.id === o2.id}
        makeSearchRequest={s => {
            return {searchQuery: s}
        }}
        renderOption={(props, option) => (
            <Box component="li" {...props}>
                {option.id} - {option.name} - {option.ipAddress}
            </Box>
        )}
        getOptionLabel={(option) => option.id.toString()}/>
}
