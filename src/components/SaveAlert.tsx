import React from 'react';
import MuiAlert from "@mui/material/Alert";
import {Snackbar} from "@mui/material";
import {ApolloError} from "@apollo/client";

export enum SaveState {
    NotSaved,
    Saving,
    Saved,
    Error
}

export type SaveResult = {
    saveState: SaveState,
    error?: ApolloError
}

export type SaveAlertProps = {
    saveState: SaveResult,
    setSaveState: React.Dispatch<React.SetStateAction<SaveResult>>
}

export default function SaveAlert({saveState, setSaveState}: SaveAlertProps){
    const message = saveState;



    return <Snackbar open={saveState.saveState === SaveState.Saved || saveState.saveState === SaveState.Error}
                     autoHideDuration={6000} onClose={() => setSaveState({saveState: SaveState.NotSaved})}>
        <MuiAlert severity={saveState.error ? "error" : "success"} variant={"filled"}>
            {saveState.saveState === SaveState.Saved ? "Saved successfully" : saveState.error?.message}
        </MuiAlert>
    </Snackbar>
}
