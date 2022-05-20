import React from "react";
import {Box, CircularProgress} from "@mui/material";
import {css} from "@emotion/react";

export default function Loading(){
    return <Box css={css`
            width: 100%; 
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
`}>
        <CircularProgress size={"5rem"} />
    </Box>
}
