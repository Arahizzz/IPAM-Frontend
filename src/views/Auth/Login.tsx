import React, {useState} from 'react';
import {Box, Button, Stack, TextField, Typography} from "@mui/material";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {setTokenVar, tokenVar} from "../../Token";

export default function Login() {
    const navigate = useNavigate();
    const [error, setError] = useState("")
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const onLogin = async () => {
        axios.post<{token: string}>('https://localhost:7211/auth/login', {
            'Login': login, 'Password': password
        }, {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        }).then(({data}) => {
            setTokenVar(data.token)
            navigate("/networks");
        }).catch(err => setError("Could not Login. Check Login/Password"))
    }

    return <Stack gap={5} sx={{display: 'flex',justifyContent: 'center', flexDirection: 'column', alignItems: 'center', height: '100%', width: '100%'}}>
        <Typography variant={"h3"}>Login</Typography>
        <TextField label={"Login"} value={login} onChange={e => setLogin(e.currentTarget.value)}/>
        <TextField type={"password"} label={"Password"} value={password}
                   onChange={e => setPassword(e.currentTarget.value)}/>
        <Typography variant={"body1"} color={"error"}>{error}</Typography>
        <Button onClick={onLogin} variant={"contained"}>Login</Button>
    </Stack>
}
