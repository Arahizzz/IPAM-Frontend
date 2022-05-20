import React, {useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {NetworkInfoInput, useAddNetworkMutation} from "../../graphql";
import {NetworkInfoInputModel} from "../../models/Ipam";
import {Button, Card, CardActions, CardContent, Typography} from "@mui/material";
import {ValidatorForm} from "react-material-ui-form-validator";
import NetworkForm from "./NetworkForm";
import SaveAlert, {SaveResult, SaveState} from "../../components/SaveAlert";

export default function AddNetwork() {
    const navigate = useNavigate();
    const location = useLocation();
    const [saveState, setSaveState] = useState<SaveResult>({saveState: SaveState.NotSaved});
    const [addNetwork] = useAddNetworkMutation();
    const [network, setNetwork] = useState<NetworkInfoInput>(
        new NetworkInfoInputModel({parentId: (location.state as any)?.parentId, dhcpEnabled: false}));

    const onSubmit = () => {
        if (network) {
            setSaveState({saveState: SaveState.Saving});
            addNetwork({
                variables: {network: network}
            }).then(res => {
                setSaveState({saveState: SaveState.Saved});
                navigate(`/networks/${res.data?.addNetwork.id}`, {replace: true});
            }).catch(error =>setSaveState({saveState: SaveState.Error, error}));
        }
    };

    const setDescription = (d: string) => {
        setNetwork(dev => {
            return {...dev, description: d, dhcpEnabled: !!dev?.dhcpEnabled}
        })
    }

    const setIpAddress = (d: string) => {
        setNetwork(dev => {
            return {...dev, ipAddress: d, dhcpEnabled: !!dev?.dhcpEnabled}
        })
    }

    const setName = (d: string) => {
        setNetwork(dev => {
            return {...dev, name: d, dhcpEnabled: !!dev?.dhcpEnabled}
        })
    }

    const setParentId = (n?: number) => {
        setNetwork(dev => {
            return {...dev, parentId: n, dhcpEnabled: !!dev?.dhcpEnabled}
        })
    }

    const setDhcpEnabled = () => {
        setNetwork(dev => {
            return {...dev, dhcpEnabled: !dev?.dhcpEnabled}
        })
    }

    const setDnsServer = (d: string) => {
        setNetwork(dev => {
            return {...dev, dnsServer: d, dhcpEnabled: !!dev?.dhcpEnabled}
        })
    }

    const setVlan = (d: string) => {
        if (d) {
            setNetwork(dev => {
                return {...dev, vlan: parseInt(d), dhcpEnabled: !!dev?.dhcpEnabled}
            })
        } else{ setNetwork(dev => {
            return {...dev, vlan: undefined, dhcpEnabled: !!dev?.dhcpEnabled}})
        }
    }

    return <Card><ValidatorForm onSubmit={onSubmit}>
        <CardContent>
            <SaveAlert saveState={saveState} setSaveState={setSaveState}/>
            <Typography variant={"h3"} mb={4}>Add New Network</Typography>
            <NetworkForm network={network} setName={setName} setDescription={setDescription}
                        setIpAddress={setIpAddress} setParentId={setParentId}
                         setVlan={setVlan} setDhcp={setDhcpEnabled} setDnsServer={setDnsServer}/>
        </CardContent>
        <CardActions>
            <Button type="submit" variant={"contained"}>Save</Button>
        </CardActions>
    </ValidatorForm>
    </Card>
}
