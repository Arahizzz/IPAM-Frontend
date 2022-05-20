import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {
    NetworkInfoInput,
    useDeleteNetworkDeviceMutation, useDeleteNetworkMutation,
    useGetNetworkQuery,
    useUpdateNetworkMutation
} from "../../graphql";
import {NetworkInfoInputModel} from "../../models/Ipam";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    Dialog, DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Typography
} from "@mui/material";
import {ValidatorForm} from "react-material-ui-form-validator";
import NetworkForm from "./NetworkForm";
import SaveAlert, {SaveResult, SaveState} from "../../components/SaveAlert";
import NetworkDevices from "./NetworkDevices";
import {useApolloClient} from "@apollo/client";

export default function EditNetwork() {
    const {networkId} = useParams();
    const id = parseInt(networkId!);
    const [saveState, setSaveState] = useState<SaveResult>({saveState: SaveState.NotSaved});
    const [updateNetwork, {error}] = useUpdateNetworkMutation();
    const {data, loading} = useGetNetworkQuery({variables: {id}});
    const [network, setNetwork] = useState<NetworkInfoInput>();
    const [openRemoveNetwork, setOpenRemoveNetwork] = useState(false);


    useEffect(() => {
        if (!loading && data) {
            setNetwork(NetworkInfoInputModel.fromResponse(data));
        }
    }, [loading, data]);

    const onSubmit = () => {
        if (network) {
            setSaveState({saveState: SaveState.Saving})
            console.log(network)
            updateNetwork({
                variables: {id, network}
            }).then(() => setSaveState({saveState: SaveState.Saved}))
                .catch(error => setSaveState({saveState: SaveState.Error, error}));
        }
    };

    const setDescription = (d: string) => {
        setNetwork(dev => {
            return dev ? {...dev, description: d} : undefined;
        })
    }

    const setIpAddress = (d: string) => {
        setNetwork(dev => {
            return dev ? {...dev, ipAddress: d} : undefined
        })
    }

    const setName = (d: string) => {
        setNetwork(dev => {
            return dev ? {...dev, name: d} : undefined;
        })
    }

    const setParentId = (n?: number) => {
        setNetwork(dev => {
            return dev ? {...dev, parentId: n} : undefined
        })
    }

    const setDhcpEnabled = () => {
        setNetwork(dev => {
            return dev ? {...dev, dhcpEnabled: !dev.dhcpEnabled} : undefined;
        })
    }

    const setDnsServer = (d: string) => {
        setNetwork(dev => {
            return dev ? {...dev, dnsServer: d} : undefined;
        })
    }

    const setVlan = (d: string) => {
        if (d) {
            setNetwork(dev => {
                return dev ? {...dev, vlan: parseInt(d)} : undefined;
            })
        } else {
            setNetwork(dev => {
                return dev ? {...dev, vlan: undefined} : undefined
            })
        }
    }

    return <div><Card key={"edit-form"}><ValidatorForm onSubmit={onSubmit}>
        <CardContent>
            <SaveAlert saveState={saveState} setSaveState={setSaveState}/>
            <Typography variant={"h3"} mb={4}>Network - {id}</Typography>
            <NetworkForm network={network} setName={setName} setDescription={setDescription}
                         setIpAddress={setIpAddress} setParentId={setParentId}
                         setVlan={setVlan} setDhcp={setDhcpEnabled} setDnsServer={setDnsServer}/>
            <RemoveNetworkDialog open={openRemoveNetwork} setOpenModal={setOpenRemoveNetwork}
                                 setSaveState={setSaveState} networkId={id}/>
        </CardContent>
        <CardActions>
            <Button type="submit" variant={"contained"}>Save</Button>
            <Button onClick={() => setOpenRemoveNetwork(true)} color="error" variant={"contained"}>Delete</Button>
        </CardActions>
    </ValidatorForm>
    </Card>
        {(data?.network?.subNetworks.length ?? -1) === 0 && <NetworkDevices key={"devices"} networkId={id}/>}
    </div>
}

type RemoveNetworkDialogProps = {
    open: boolean,
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
    setSaveState: React.Dispatch<React.SetStateAction<SaveResult>>
    networkId: number,
}

function RemoveNetworkDialog({open, setOpenModal, setSaveState, networkId}: RemoveNetworkDialogProps) {
    const apolloClient = useApolloClient();
    const navigate = useNavigate();
    const [removeNetwork] = useDeleteNetworkMutation();

    const onRemove = () => {
        setSaveState({saveState: SaveState.Saving})
        removeNetwork({
            variables: {
                id: networkId,
            }
        }).then(() => {
            setSaveState({saveState: SaveState.Saved})
            setOpenModal(false)
            apolloClient.refetchQueries({
                include: ["ChildNetworks"],
            });
            navigate("/networks", {replace: true});
        })
            .catch(error => setSaveState({saveState: SaveState.Error, error}))
    };

    return <Dialog open={open} onClose={() => setOpenModal(false)}>
        <DialogTitle>Remove Network</DialogTitle>
        <DialogContent>
            <DialogContentText>Are you sure want to delete network?</DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={onRemove} color={"error"}>Remove</Button>
            <Button onClick={() => setOpenModal(false)}>Cancel</Button>
        </DialogActions>
    </Dialog>
}
