import React from 'react';
import {Navigate, Outlet} from "react-router-dom";

export const ProtectedRoute = ({allow, fallback}:{ allow: boolean, fallback: string }) => {
    if (!allow) {
        return <Navigate to={fallback} replace />;
    }

    return <Outlet />;
};
