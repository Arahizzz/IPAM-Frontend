import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import Layout from "./Layout";
import Menu from "./Menu";
import {BrowserRouter} from "react-router-dom";
import {ApolloClient, ApolloProvider, createHttpLink, InMemoryCache} from "@apollo/client";
import {ValidatorForm} from "react-material-ui-form-validator";
import isCidr from "is-cidr";
import {setContext} from "@apollo/client/link/context";
import {onError} from "@apollo/client/link/error";
import {setTokenVar, tokenVar} from "./Token";

ValidatorForm.addValidationRule("validIpCidr", (value) => {
    return !!isCidr(value);
});

const httpLink = createHttpLink({
    uri: 'https://localhost:7211/graphql',
});

const unauthorized = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors?.some(e => e.extensions?.code === 'AUTH_NOT_AUTHENTICATED')){
        setTokenVar(null)
        location.reload()
    }
});


const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = tokenVar();
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    }
});

const apollo = new ApolloClient({
    uri: 'https://localhost:7211/graphql',
    cache: new InMemoryCache(),
    link: unauthorized.concat(authLink.concat(httpLink))
})

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ApolloProvider client={apollo}>
            <BrowserRouter>
                <Menu/>
            </BrowserRouter>
        </ApolloProvider>
    </React.StrictMode>
)
