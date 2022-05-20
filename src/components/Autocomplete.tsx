import React, {HTMLAttributes, useCallback, useState} from 'react';
import {Autocomplete, Box, TextField} from "@mui/material";
import throttle from "lodash/throttle";
import {LazyQueryExecFunction, QueryResult} from "@apollo/client";

type AutocompleteProps<T, Q, J, K> = {
    label: string
    updateValue: (value: K | null) => void | Promise<void>,
    searchFunction: LazyQueryExecFunction<T, Q>,
    searchResult: QueryResult<J, Q>,
    resultExtractor: (res: QueryResult<J, Q>) => readonly K[],
    isOptionEqualToValue: (f: K, s: K) => boolean,
    renderOption: (props: HTMLAttributes<HTMLLIElement>, option: K) => React.ReactNode,
    getOptionLabel: (option: K) => string,
    makeSearchRequest: (s: string) => Q
}

export default function AutocompleteSelect<T, Q, J, K>(
    {
        label,
        updateValue, searchFunction, searchResult, resultExtractor, isOptionEqualToValue,
        renderOption, getOptionLabel, makeSearchRequest
    }: AutocompleteProps<T, Q, J, any>) {
    const [value, setValue] = useState<K | null>(null);

    const throttledAutocomplete = useCallback(throttle(async (s: string) => {
        await searchFunction({variables: makeSearchRequest(s)})
    }, 750), []);

    const searchSuggestions = resultExtractor(searchResult);

    return <Autocomplete
        renderInput={(params) => (
            <TextField
                {...params}
                label={label}
                inputProps={{
                    ...params.inputProps
                }}
            />
        )}
        filterOptions={x => x}
        value={value}
        isOptionEqualToValue={isOptionEqualToValue}
        onChange={(_, newValue) => {
            updateValue(newValue);
            setValue(newValue);
        }}
        onInputChange={(event, newInputValue) => {
            throttledAutocomplete(newInputValue);
        }}
        getOptionLabel={getOptionLabel}
        renderOption={renderOption}
        options={searchSuggestions}/>
}
