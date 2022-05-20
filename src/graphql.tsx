import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    /** The `MacAddress` scalar type represents a IEEE 802 48-bit or 64-bit Mac address, represented as UTF-8 character sequences. The scalar follows the specifications defined in RFC7042 and RFC7043 respectively. */
    MacAddress: any;
    /** Ipv4 or Ipv6 cidr */
    IPNetwork: any;
    /** Ipv4 or Ipv6 address */
    IPAddress: any;
    /** The `DateTime` scalar represents an ISO-8601 compliant date time type. */
    DateTime: any;
};

export enum ApplyPolicy {
    BeforeResolver = 'BEFORE_RESOLVER',
    AfterResolver = 'AFTER_RESOLVER'
}

export type Query = {
    __typename?: 'Query';
    networks?: Maybe<NetworkCollectionSegment>;
    network?: Maybe<Network>;
    networkByAddress?: Maybe<Network>;
    devices?: Maybe<DeviceCollectionSegment>;
    device?: Maybe<Device>;
    searchNetworks: Array<Network>;
    searchDevices: Array<Device>;
    networkDevices?: Maybe<NetworkDeviceCollectionSegment>;
    users?: Maybe<UserCollectionSegment>;
    user?: Maybe<User>;
};


export type QueryNetworksArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    take?: InputMaybe<Scalars['Int']>;
    where?: InputMaybe<NetworkFilterInput>;
    order?: InputMaybe<Array<NetworkSortInput>>;
};


export type QueryNetworkArgs = {
    id: Scalars['Int'];
};


export type QueryNetworkByAddressArgs = {
    address: Scalars['IPNetwork'];
};


export type QueryDevicesArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    take?: InputMaybe<Scalars['Int']>;
    where?: InputMaybe<DeviceFilterInput>;
    order?: InputMaybe<Array<DeviceSortInput>>;
};


export type QueryDeviceArgs = {
    id: Scalars['Int'];
};


export type QuerySearchNetworksArgs = {
    searchQuery: Scalars['String'];
};


export type QuerySearchDevicesArgs = {
    searchQuery: Scalars['String'];
    excludeNetworkId?: InputMaybe<Scalars['Int']>;
};


export type QueryNetworkDevicesArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    take?: InputMaybe<Scalars['Int']>;
    where?: InputMaybe<NetworkDeviceFilterInput>;
    order?: InputMaybe<Array<NetworkDeviceSortInput>>;
};


export type QueryUsersArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    take?: InputMaybe<Scalars['Int']>;
    where?: InputMaybe<UserFilterInput>;
    order?: InputMaybe<Array<UserSortInput>>;
};


export type QueryUserArgs = {
    id: Scalars['String'];
};

export type Mutation = {
    __typename?: 'Mutation';
    addNetwork: Network;
    updateNetwork: Network;
    deleteNetwork: Network;
    addDevice: Device;
    updateDevice: Device;
    deleteDevice: Device;
    addNetworkDevice: NetworkDevice;
    updateNetworkDevice: NetworkDevice;
    deleteNetworkDevice: NetworkDevice;
};


export type MutationAddNetworkArgs = {
    network: NetworkInfoInput;
};


export type MutationUpdateNetworkArgs = {
    id: Scalars['Int'];
    network: NetworkInfoInput;
};


export type MutationDeleteNetworkArgs = {
    id: Scalars['Int'];
};


export type MutationAddDeviceArgs = {
    device: DeviceInfoInput;
};


export type MutationUpdateDeviceArgs = {
    id: Scalars['Int'];
    device: DeviceInfoInput;
};


export type MutationDeleteDeviceArgs = {
    id: Scalars['Int'];
};


export type MutationAddNetworkDeviceArgs = {
    device: NetworkDeviceInfoInput;
};


export type MutationUpdateNetworkDeviceArgs = {
    id: Scalars['Int'];
    device: NetworkDeviceInfoInput;
};


export type MutationDeleteNetworkDeviceArgs = {
    networkId: Scalars['Int'];
    deviceId: Scalars['Int'];
};

export type NetworkFilterInput = {
    and?: InputMaybe<Array<NetworkFilterInput>>;
    or?: InputMaybe<Array<NetworkFilterInput>>;
    name?: InputMaybe<StringOperationFilterInput>;
    description?: InputMaybe<StringOperationFilterInput>;
    id?: InputMaybe<ComparableInt32OperationFilterInput>;
    ipAddress?: InputMaybe<IpNetworkFilterInput>;
    parentId?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
};

export type NetworkSortInput = {
    id?: InputMaybe<SortEnumType>;
    name?: InputMaybe<SortEnumType>;
    ipAddress?: InputMaybe<SortEnumType>;
    parentId?: InputMaybe<SortEnumType>;
};

export type DeviceFilterInput = {
    and?: InputMaybe<Array<DeviceFilterInput>>;
    or?: InputMaybe<Array<DeviceFilterInput>>;
    id?: InputMaybe<ComparableInt32OperationFilterInput>;
    name?: InputMaybe<StringOperationFilterInput>;
    description?: InputMaybe<StringOperationFilterInput>;
    serialNumber?: InputMaybe<StringOperationFilterInput>;
    manufacturer?: InputMaybe<StringOperationFilterInput>;
    macAddress?: InputMaybe<PhysicalAddressFilterInput>;
    networkDevices?: InputMaybe<ListFilterInputTypeOfNetworkDeviceFilterInput>;
};

export type DeviceSortInput = {
    id?: InputMaybe<SortEnumType>;
    name?: InputMaybe<SortEnumType>;
    macAddress?: InputMaybe<SortEnumType>;
};

export type NetworkDeviceFilterInput = {
    and?: InputMaybe<Array<NetworkDeviceFilterInput>>;
    or?: InputMaybe<Array<NetworkDeviceFilterInput>>;
    networkId?: InputMaybe<ComparableInt32OperationFilterInput>;
    ipAddress?: InputMaybe<IpAddressFilterInput>;
};

export type NetworkDeviceSortInput = {
    networkId?: InputMaybe<SortEnumType>;
    deviceId?: InputMaybe<SortEnumType>;
    ipAddress?: InputMaybe<SortEnumType>;
};

export type UserFilterInput = {
    and?: InputMaybe<Array<UserFilterInput>>;
    or?: InputMaybe<Array<UserFilterInput>>;
    roles?: InputMaybe<ListFilterInputTypeOfRoleFilterInput>;
    id?: InputMaybe<StringOperationFilterInput>;
    userName?: InputMaybe<StringOperationFilterInput>;
    normalizedUserName?: InputMaybe<StringOperationFilterInput>;
    email?: InputMaybe<StringOperationFilterInput>;
    normalizedEmail?: InputMaybe<StringOperationFilterInput>;
    emailConfirmed?: InputMaybe<BooleanOperationFilterInput>;
    passwordHash?: InputMaybe<StringOperationFilterInput>;
    securityStamp?: InputMaybe<StringOperationFilterInput>;
    concurrencyStamp?: InputMaybe<StringOperationFilterInput>;
    phoneNumber?: InputMaybe<StringOperationFilterInput>;
    phoneNumberConfirmed?: InputMaybe<BooleanOperationFilterInput>;
    twoFactorEnabled?: InputMaybe<BooleanOperationFilterInput>;
    lockoutEnd?: InputMaybe<ComparableNullableOfDateTimeOffsetOperationFilterInput>;
    lockoutEnabled?: InputMaybe<BooleanOperationFilterInput>;
    accessFailedCount?: InputMaybe<ComparableInt32OperationFilterInput>;
};

export type UserSortInput = {
    id?: InputMaybe<SortEnumType>;
    userName?: InputMaybe<SortEnumType>;
    normalizedUserName?: InputMaybe<SortEnumType>;
    email?: InputMaybe<SortEnumType>;
    normalizedEmail?: InputMaybe<SortEnumType>;
    emailConfirmed?: InputMaybe<SortEnumType>;
    passwordHash?: InputMaybe<SortEnumType>;
    securityStamp?: InputMaybe<SortEnumType>;
    concurrencyStamp?: InputMaybe<SortEnumType>;
    phoneNumber?: InputMaybe<SortEnumType>;
    phoneNumberConfirmed?: InputMaybe<SortEnumType>;
    twoFactorEnabled?: InputMaybe<SortEnumType>;
    lockoutEnd?: InputMaybe<SortEnumType>;
    lockoutEnabled?: InputMaybe<SortEnumType>;
    accessFailedCount?: InputMaybe<SortEnumType>;
};

export type NetworkCollectionSegment = {
    __typename?: 'NetworkCollectionSegment';
    items?: Maybe<Array<Network>>;
    /** Information to aid in pagination. */
    pageInfo: CollectionSegmentInfo;
};

export type DeviceCollectionSegment = {
    __typename?: 'DeviceCollectionSegment';
    items?: Maybe<Array<Device>>;
    /** Information to aid in pagination. */
    pageInfo: CollectionSegmentInfo;
};

export type NetworkDeviceCollectionSegment = {
    __typename?: 'NetworkDeviceCollectionSegment';
    items?: Maybe<Array<NetworkDevice>>;
    /** Information to aid in pagination. */
    pageInfo: CollectionSegmentInfo;
};

export type UserCollectionSegment = {
    __typename?: 'UserCollectionSegment';
    items?: Maybe<Array<User>>;
    /** Information to aid in pagination. */
    pageInfo: CollectionSegmentInfo;
};

export type StringOperationFilterInput = {
    and?: InputMaybe<Array<StringOperationFilterInput>>;
    or?: InputMaybe<Array<StringOperationFilterInput>>;
    eq?: InputMaybe<Scalars['String']>;
    neq?: InputMaybe<Scalars['String']>;
    contains?: InputMaybe<Scalars['String']>;
    ncontains?: InputMaybe<Scalars['String']>;
    in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
    nin?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
    startsWith?: InputMaybe<Scalars['String']>;
    nstartsWith?: InputMaybe<Scalars['String']>;
    endsWith?: InputMaybe<Scalars['String']>;
    nendsWith?: InputMaybe<Scalars['String']>;
};

export type ComparableInt32OperationFilterInput = {
    eq?: InputMaybe<Scalars['Int']>;
    neq?: InputMaybe<Scalars['Int']>;
    in?: InputMaybe<Array<Scalars['Int']>>;
    nin?: InputMaybe<Array<Scalars['Int']>>;
    gt?: InputMaybe<Scalars['Int']>;
    ngt?: InputMaybe<Scalars['Int']>;
    gte?: InputMaybe<Scalars['Int']>;
    ngte?: InputMaybe<Scalars['Int']>;
    lt?: InputMaybe<Scalars['Int']>;
    nlt?: InputMaybe<Scalars['Int']>;
    lte?: InputMaybe<Scalars['Int']>;
    nlte?: InputMaybe<Scalars['Int']>;
};

export type IpNetworkFilterInput = {
    and?: InputMaybe<Array<IpNetworkFilterInput>>;
    or?: InputMaybe<Array<IpNetworkFilterInput>>;
    eq?: InputMaybe<Scalars['IPNetwork']>;
    neq?: InputMaybe<Scalars['IPNetwork']>;
};

export type ComparableNullableOfInt32OperationFilterInput = {
    eq?: InputMaybe<Scalars['Int']>;
    neq?: InputMaybe<Scalars['Int']>;
    in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
    nin?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
    gt?: InputMaybe<Scalars['Int']>;
    ngt?: InputMaybe<Scalars['Int']>;
    gte?: InputMaybe<Scalars['Int']>;
    ngte?: InputMaybe<Scalars['Int']>;
    lt?: InputMaybe<Scalars['Int']>;
    nlt?: InputMaybe<Scalars['Int']>;
    lte?: InputMaybe<Scalars['Int']>;
    nlte?: InputMaybe<Scalars['Int']>;
};

export enum SortEnumType {
    Asc = 'ASC',
    Desc = 'DESC'
}

export type PhysicalAddressFilterInput = {
    and?: InputMaybe<Array<PhysicalAddressFilterInput>>;
    or?: InputMaybe<Array<PhysicalAddressFilterInput>>;
};

export type ListFilterInputTypeOfNetworkDeviceFilterInput = {
    all?: InputMaybe<NetworkDeviceFilterInput>;
    none?: InputMaybe<NetworkDeviceFilterInput>;
    some?: InputMaybe<NetworkDeviceFilterInput>;
    any?: InputMaybe<Scalars['Boolean']>;
};

export type IpAddressFilterInput = {
    and?: InputMaybe<Array<IpAddressFilterInput>>;
    or?: InputMaybe<Array<IpAddressFilterInput>>;
    eq?: InputMaybe<Scalars['IPAddress']>;
    neq?: InputMaybe<Scalars['IPAddress']>;
};

export type ListFilterInputTypeOfRoleFilterInput = {
    all?: InputMaybe<RoleFilterInput>;
    none?: InputMaybe<RoleFilterInput>;
    some?: InputMaybe<RoleFilterInput>;
    any?: InputMaybe<Scalars['Boolean']>;
};

export type BooleanOperationFilterInput = {
    eq?: InputMaybe<Scalars['Boolean']>;
    neq?: InputMaybe<Scalars['Boolean']>;
};

export type ComparableNullableOfDateTimeOffsetOperationFilterInput = {
    eq?: InputMaybe<Scalars['DateTime']>;
    neq?: InputMaybe<Scalars['DateTime']>;
    in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
    nin?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
    gt?: InputMaybe<Scalars['DateTime']>;
    ngt?: InputMaybe<Scalars['DateTime']>;
    gte?: InputMaybe<Scalars['DateTime']>;
    ngte?: InputMaybe<Scalars['DateTime']>;
    lt?: InputMaybe<Scalars['DateTime']>;
    nlt?: InputMaybe<Scalars['DateTime']>;
    lte?: InputMaybe<Scalars['DateTime']>;
    nlte?: InputMaybe<Scalars['DateTime']>;
};

export type Network = {
    __typename?: 'Network';
    id: Scalars['Int'];
    parentId?: Maybe<Scalars['Int']>;
    name?: Maybe<Scalars['String']>;
    description?: Maybe<Scalars['String']>;
    dnsServer?: Maybe<Scalars['String']>;
    dhcpEnabled: Scalars['Boolean'];
    vlan?: Maybe<Scalars['Int']>;
    ipAddress?: Maybe<Scalars['IPNetwork']>;
    devices: Array<NetworkDevice>;
    subNetworks: Array<Network>;
};

/** Information about the offset pagination. */
export type CollectionSegmentInfo = {
    __typename?: 'CollectionSegmentInfo';
    /** Indicates whether more items exist following the set defined by the clients arguments. */
    hasNextPage: Scalars['Boolean'];
    /** Indicates whether more items exist prior the set defined by the clients arguments. */
    hasPreviousPage: Scalars['Boolean'];
};

export type Device = {
    __typename?: 'Device';
    id: Scalars['Int'];
    name?: Maybe<Scalars['String']>;
    description?: Maybe<Scalars['String']>;
    serialNumber?: Maybe<Scalars['String']>;
    manufacturer?: Maybe<Scalars['String']>;
    macAddress?: Maybe<Scalars['MacAddress']>;
    networkDevices: Array<NetworkDevice>;
};

export type NetworkDevice = {
    __typename?: 'NetworkDevice';
    networkId: Scalars['Int'];
    deviceId: Scalars['Int'];
    ipAddress?: Maybe<Scalars['IPAddress']>;
    dhcp: Scalars['Boolean'];
    network: Network;
    device: Device;
};

export type User = {
    __typename?: 'User';
    roles: Array<Role>;
    id?: Maybe<Scalars['String']>;
    userName?: Maybe<Scalars['String']>;
    normalizedUserName?: Maybe<Scalars['String']>;
    email?: Maybe<Scalars['String']>;
    normalizedEmail?: Maybe<Scalars['String']>;
    emailConfirmed: Scalars['Boolean'];
    passwordHash?: Maybe<Scalars['String']>;
    securityStamp?: Maybe<Scalars['String']>;
    concurrencyStamp?: Maybe<Scalars['String']>;
    phoneNumber?: Maybe<Scalars['String']>;
    phoneNumberConfirmed: Scalars['Boolean'];
    twoFactorEnabled: Scalars['Boolean'];
    lockoutEnd?: Maybe<Scalars['DateTime']>;
    lockoutEnabled: Scalars['Boolean'];
    accessFailedCount: Scalars['Int'];
};

export type RoleFilterInput = {
    and?: InputMaybe<Array<RoleFilterInput>>;
    or?: InputMaybe<Array<RoleFilterInput>>;
    users?: InputMaybe<ListFilterInputTypeOfUserFilterInput>;
    id?: InputMaybe<StringOperationFilterInput>;
    name?: InputMaybe<StringOperationFilterInput>;
    normalizedName?: InputMaybe<StringOperationFilterInput>;
    concurrencyStamp?: InputMaybe<StringOperationFilterInput>;
};

export type ListFilterInputTypeOfUserFilterInput = {
    all?: InputMaybe<UserFilterInput>;
    none?: InputMaybe<UserFilterInput>;
    some?: InputMaybe<UserFilterInput>;
    any?: InputMaybe<Scalars['Boolean']>;
};

export type Role = {
    __typename?: 'Role';
    users: Array<User>;
    id?: Maybe<Scalars['String']>;
    name?: Maybe<Scalars['String']>;
    normalizedName?: Maybe<Scalars['String']>;
    concurrencyStamp?: Maybe<Scalars['String']>;
};

export type NetworkInfoInput = {
    parentId?: InputMaybe<Scalars['Int']>;
    name?: InputMaybe<Scalars['String']>;
    description?: InputMaybe<Scalars['String']>;
    ipAddress?: InputMaybe<Scalars['IPNetwork']>;
    dnsServer?: InputMaybe<Scalars['String']>;
    dhcpEnabled: Scalars['Boolean'];
    vlan?: InputMaybe<Scalars['Int']>;
};

export type DeviceInfoInput = {
    name?: InputMaybe<Scalars['String']>;
    description?: InputMaybe<Scalars['String']>;
    serialNumber?: InputMaybe<Scalars['String']>;
    manufacturer?: InputMaybe<Scalars['String']>;
    macAddress?: InputMaybe<Scalars['MacAddress']>;
};

export type NetworkDeviceInfoInput = {
    networkId: Scalars['Int'];
    deviceId: Scalars['Int'];
    ipAddress?: InputMaybe<Scalars['IPAddress']>;
    dhcp: Scalars['Boolean'];
};

export type AllNetworksQueryVariables = Exact<{
    where?: InputMaybe<NetworkFilterInput>;
    skip?: InputMaybe<Scalars['Int']>;
    take?: InputMaybe<Scalars['Int']>;
    order?: InputMaybe<Array<NetworkSortInput> | NetworkSortInput>;
}>;


export type AllNetworksQuery = { __typename?: 'Query', networks?: { __typename?: 'NetworkCollectionSegment', items?: Array<{ __typename?: 'Network', id: number, name?: string | null, ipAddress?: any | null, subNetworks: Array<{ __typename?: 'Network', id: number }> }> | null } | null };

export type ChildNetworksQueryVariables = Exact<{
    parentId?: InputMaybe<Scalars['Int']>;
    skip?: InputMaybe<Scalars['Int']>;
    take?: InputMaybe<Scalars['Int']>;
    order?: InputMaybe<Array<NetworkSortInput> | NetworkSortInput>;
}>;


export type ChildNetworksQuery = { __typename?: 'Query', networks?: { __typename?: 'NetworkCollectionSegment', items?: Array<{ __typename?: 'Network', id: number, name?: string | null, ipAddress?: any | null }> | null } | null };

export type AllDevicesQueryVariables = Exact<{
    where?: InputMaybe<DeviceFilterInput>;
    skip?: InputMaybe<Scalars['Int']>;
    take?: InputMaybe<Scalars['Int']>;
    order?: InputMaybe<Array<DeviceSortInput> | DeviceSortInput>;
}>;


export type AllDevicesQuery = { __typename?: 'Query', devices?: { __typename?: 'DeviceCollectionSegment', items?: Array<{ __typename?: 'Device', id: number, name?: string | null, macAddress?: any | null }> | null } | null };

export type AllNetworkDevicesQueryVariables = Exact<{
    where?: InputMaybe<NetworkDeviceFilterInput>;
    skip?: InputMaybe<Scalars['Int']>;
    take?: InputMaybe<Scalars['Int']>;
    order?: InputMaybe<Array<NetworkDeviceSortInput> | NetworkDeviceSortInput>;
}>;


export type AllNetworkDevicesQuery = { __typename?: 'Query', networkDevices?: { __typename?: 'NetworkDeviceCollectionSegment', items?: Array<{ __typename?: 'NetworkDevice', ipAddress?: any | null, dhcp: boolean, device: { __typename?: 'Device', id: number, name?: string | null, description?: string | null, macAddress?: any | null } }> | null } | null };

export type GetDeviceQueryVariables = Exact<{
    id: Scalars['Int'];
}>;


export type GetDeviceQuery = { __typename?: 'Query', device?: { __typename?: 'Device', id: number, name?: string | null, description?: string | null, macAddress?: any | null, serialNumber?: string | null, manufacturer?: string | null } | null };

export type GetNetworkQueryVariables = Exact<{
    id: Scalars['Int'];
}>;


export type GetNetworkQuery = { __typename?: 'Query', network?: { __typename?: 'Network', id: number, name?: string | null, description?: string | null, ipAddress?: any | null, vlan?: number | null, dnsServer?: string | null, dhcpEnabled: boolean, devices: Array<{ __typename?: 'NetworkDevice', ipAddress?: any | null, device: { __typename?: 'Device', id: number, name?: string | null } }>, subNetworks: Array<{ __typename?: 'Network', id: number }> } | null };

export type SearchNetworksQueryVariables = Exact<{
    searchQuery: Scalars['String'];
}>;


export type SearchNetworksQuery = { __typename?: 'Query', searchNetworks: Array<{ __typename?: 'Network', id: number, name?: string | null, ipAddress?: any | null }> };

export type SearchDevicesQueryVariables = Exact<{
    searchQuery: Scalars['String'];
    excludeNetworkId?: InputMaybe<Scalars['Int']>;
}>;


export type SearchDevicesQuery = { __typename?: 'Query', searchDevices: Array<{ __typename?: 'Device', id: number, name?: string | null, macAddress?: any | null }> };

export type GetNetworkByAddressQueryVariables = Exact<{
    address: Scalars['IPNetwork'];
}>;


export type GetNetworkByAddressQuery = { __typename?: 'Query', networkByAddress?: { __typename?: 'Network', id: number, name?: string | null, description?: string | null, ipAddress?: any | null, devices: Array<{ __typename?: 'NetworkDevice', ipAddress?: any | null, device: { __typename?: 'Device', id: number, name?: string | null } }> } | null };

export type AddDeviceMutationVariables = Exact<{
    device: DeviceInfoInput;
}>;


export type AddDeviceMutation = { __typename?: 'Mutation', addDevice: { __typename?: 'Device', id: number, name?: string | null, description?: string | null, macAddress?: any | null } };

export type AddNetworkMutationVariables = Exact<{
    network: NetworkInfoInput;
}>;


export type AddNetworkMutation = { __typename?: 'Mutation', addNetwork: { __typename?: 'Network', id: number, parentId?: number | null, name?: string | null, description?: string | null, ipAddress?: any | null, dnsServer?: string | null, dhcpEnabled: boolean, vlan?: number | null } };

export type AddNetworkDeviceMutationVariables = Exact<{
    networkDevice: NetworkDeviceInfoInput;
}>;


export type AddNetworkDeviceMutation = { __typename?: 'Mutation', addNetworkDevice: { __typename?: 'NetworkDevice', networkId: number, deviceId: number, ipAddress?: any | null, dhcp: boolean } };

export type UpdateDeviceMutationVariables = Exact<{
    id: Scalars['Int'];
    device: DeviceInfoInput;
}>;


export type UpdateDeviceMutation = { __typename?: 'Mutation', updateDevice: { __typename?: 'Device', id: number, name?: string | null, description?: string | null, macAddress?: any | null } };

export type UpdateNetworkMutationVariables = Exact<{
    id: Scalars['Int'];
    network: NetworkInfoInput;
}>;


export type UpdateNetworkMutation = { __typename?: 'Mutation', updateNetwork: { __typename?: 'Network', id: number, parentId?: number | null, name?: string | null, description?: string | null, ipAddress?: any | null, dnsServer?: string | null, dhcpEnabled: boolean, vlan?: number | null } };

export type UpdateNetworkDeviceMutationVariables = Exact<{
    id: Scalars['Int'];
    networkDevice: NetworkDeviceInfoInput;
}>;


export type UpdateNetworkDeviceMutation = { __typename?: 'Mutation', updateNetworkDevice: { __typename?: 'NetworkDevice', networkId: number, deviceId: number, ipAddress?: any | null, dhcp: boolean } };

export type DeleteDeviceMutationVariables = Exact<{
    id: Scalars['Int'];
}>;


export type DeleteDeviceMutation = { __typename?: 'Mutation', deleteDevice: { __typename?: 'Device', id: number, name?: string | null, description?: string | null, macAddress?: any | null, serialNumber?: string | null, manufacturer?: string | null } };

export type DeleteNetworkMutationVariables = Exact<{
    id: Scalars['Int'];
}>;


export type DeleteNetworkMutation = { __typename?: 'Mutation', deleteNetwork: { __typename?: 'Network', id: number, name?: string | null, description?: string | null, ipAddress?: any | null, dhcpEnabled: boolean, dnsServer?: string | null, vlan?: number | null } };

export type DeleteNetworkDeviceMutationVariables = Exact<{
    networkId: Scalars['Int'];
    deviceId: Scalars['Int'];
}>;


export type DeleteNetworkDeviceMutation = { __typename?: 'Mutation', deleteNetworkDevice: { __typename?: 'NetworkDevice', networkId: number, deviceId: number, ipAddress?: any | null, dhcp: boolean } };

export type GetUsersQueryVariables = Exact<{
    order?: InputMaybe<Array<UserSortInput> | UserSortInput>;
    skip?: InputMaybe<Scalars['Int']>;
    take?: InputMaybe<Scalars['Int']>;
    where?: InputMaybe<UserFilterInput>;
}>;


export type GetUsersQuery = { __typename?: 'Query', users?: { __typename?: 'UserCollectionSegment', items?: Array<{ __typename?: 'User', id?: string | null, userName?: string | null, roles: Array<{ __typename?: 'Role', name?: string | null }> }> | null } | null };


export const AllNetworksDocument = gql`
    query AllNetworks($where: NetworkFilterInput, $skip: Int, $take: Int, $order: [NetworkSortInput!]) {
        networks(where: $where, skip: $skip, take: $take, order: $order) {
            items {
                id
                name
                ipAddress
                subNetworks {
                    id
                }
            }
        }
    }
`;

/**
 * __useAllNetworksQuery__
 *
 * To run a query within a React component, call `useAllNetworksQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllNetworksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllNetworksQuery({
 *   variables: {
 *      where: // value for 'where'
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *      order: // value for 'order'
 *   },
 * });
 */
export function useAllNetworksQuery(baseOptions?: Apollo.QueryHookOptions<AllNetworksQuery, AllNetworksQueryVariables>) {
    const options = {...defaultOptions, ...baseOptions}
    return Apollo.useQuery<AllNetworksQuery, AllNetworksQueryVariables>(AllNetworksDocument, options);
}
export function useAllNetworksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllNetworksQuery, AllNetworksQueryVariables>) {
    const options = {...defaultOptions, ...baseOptions}
    return Apollo.useLazyQuery<AllNetworksQuery, AllNetworksQueryVariables>(AllNetworksDocument, options);
}
export type AllNetworksQueryHookResult = ReturnType<typeof useAllNetworksQuery>;
export type AllNetworksLazyQueryHookResult = ReturnType<typeof useAllNetworksLazyQuery>;
export type AllNetworksQueryResult = Apollo.QueryResult<AllNetworksQuery, AllNetworksQueryVariables>;
export const ChildNetworksDocument = gql`
    query ChildNetworks($parentId: Int, $skip: Int, $take: Int, $order: [NetworkSortInput!]) {
        networks(
            where: {parentId: {eq: $parentId}}
            skip: $skip
            take: $take
            order: $order
        ) {
            items {
                id
                name
                ipAddress
            }
        }
    }
`;

/**
 * __useChildNetworksQuery__
 *
 * To run a query within a React component, call `useChildNetworksQuery` and pass it any options that fit your needs.
 * When your component renders, `useChildNetworksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChildNetworksQuery({
 *   variables: {
 *      parentId: // value for 'parentId'
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *      order: // value for 'order'
 *   },
 * });
 */
export function useChildNetworksQuery(baseOptions?: Apollo.QueryHookOptions<ChildNetworksQuery, ChildNetworksQueryVariables>) {
    const options = {...defaultOptions, ...baseOptions}
    return Apollo.useQuery<ChildNetworksQuery, ChildNetworksQueryVariables>(ChildNetworksDocument, options);
}
export function useChildNetworksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ChildNetworksQuery, ChildNetworksQueryVariables>) {
    const options = {...defaultOptions, ...baseOptions}
    return Apollo.useLazyQuery<ChildNetworksQuery, ChildNetworksQueryVariables>(ChildNetworksDocument, options);
}
export type ChildNetworksQueryHookResult = ReturnType<typeof useChildNetworksQuery>;
export type ChildNetworksLazyQueryHookResult = ReturnType<typeof useChildNetworksLazyQuery>;
export type ChildNetworksQueryResult = Apollo.QueryResult<ChildNetworksQuery, ChildNetworksQueryVariables>;
export const AllDevicesDocument = gql`
    query AllDevices($where: DeviceFilterInput, $skip: Int, $take: Int, $order: [DeviceSortInput!]) {
        devices(where: $where, skip: $skip, take: $take, order: $order) {
            items {
                id
                name
                macAddress
            }
        }
    }
`;

/**
 * __useAllDevicesQuery__
 *
 * To run a query within a React component, call `useAllDevicesQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllDevicesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllDevicesQuery({
 *   variables: {
 *      where: // value for 'where'
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *      order: // value for 'order'
 *   },
 * });
 */
export function useAllDevicesQuery(baseOptions?: Apollo.QueryHookOptions<AllDevicesQuery, AllDevicesQueryVariables>) {
    const options = {...defaultOptions, ...baseOptions}
    return Apollo.useQuery<AllDevicesQuery, AllDevicesQueryVariables>(AllDevicesDocument, options);
}
export function useAllDevicesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllDevicesQuery, AllDevicesQueryVariables>) {
    const options = {...defaultOptions, ...baseOptions}
    return Apollo.useLazyQuery<AllDevicesQuery, AllDevicesQueryVariables>(AllDevicesDocument, options);
}
export type AllDevicesQueryHookResult = ReturnType<typeof useAllDevicesQuery>;
export type AllDevicesLazyQueryHookResult = ReturnType<typeof useAllDevicesLazyQuery>;
export type AllDevicesQueryResult = Apollo.QueryResult<AllDevicesQuery, AllDevicesQueryVariables>;
export const AllNetworkDevicesDocument = gql`
    query AllNetworkDevices($where: NetworkDeviceFilterInput, $skip: Int, $take: Int, $order: [NetworkDeviceSortInput!]) {
        networkDevices(where: $where, skip: $skip, take: $take, order: $order) {
            items {
                ipAddress
                dhcp
                device {
                    id
                    name
                    description
                    macAddress
                }
            }
        }
    }
`;

/**
 * __useAllNetworkDevicesQuery__
 *
 * To run a query within a React component, call `useAllNetworkDevicesQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllNetworkDevicesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllNetworkDevicesQuery({
 *   variables: {
 *      where: // value for 'where'
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *      order: // value for 'order'
 *   },
 * });
 */
export function useAllNetworkDevicesQuery(baseOptions?: Apollo.QueryHookOptions<AllNetworkDevicesQuery, AllNetworkDevicesQueryVariables>) {
    const options = {...defaultOptions, ...baseOptions}
    return Apollo.useQuery<AllNetworkDevicesQuery, AllNetworkDevicesQueryVariables>(AllNetworkDevicesDocument, options);
}
export function useAllNetworkDevicesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllNetworkDevicesQuery, AllNetworkDevicesQueryVariables>) {
    const options = {...defaultOptions, ...baseOptions}
    return Apollo.useLazyQuery<AllNetworkDevicesQuery, AllNetworkDevicesQueryVariables>(AllNetworkDevicesDocument, options);
}
export type AllNetworkDevicesQueryHookResult = ReturnType<typeof useAllNetworkDevicesQuery>;
export type AllNetworkDevicesLazyQueryHookResult = ReturnType<typeof useAllNetworkDevicesLazyQuery>;
export type AllNetworkDevicesQueryResult = Apollo.QueryResult<AllNetworkDevicesQuery, AllNetworkDevicesQueryVariables>;
export const GetDeviceDocument = gql`
    query GetDevice($id: Int!) {
        device(id: $id) {
            id
            name
            description
            macAddress
            serialNumber
            manufacturer
        }
    }
`;

/**
 * __useGetDeviceQuery__
 *
 * To run a query within a React component, call `useGetDeviceQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDeviceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDeviceQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetDeviceQuery(baseOptions: Apollo.QueryHookOptions<GetDeviceQuery, GetDeviceQueryVariables>) {
    const options = {...defaultOptions, ...baseOptions}
    return Apollo.useQuery<GetDeviceQuery, GetDeviceQueryVariables>(GetDeviceDocument, options);
}
export function useGetDeviceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDeviceQuery, GetDeviceQueryVariables>) {
    const options = {...defaultOptions, ...baseOptions}
    return Apollo.useLazyQuery<GetDeviceQuery, GetDeviceQueryVariables>(GetDeviceDocument, options);
}
export type GetDeviceQueryHookResult = ReturnType<typeof useGetDeviceQuery>;
export type GetDeviceLazyQueryHookResult = ReturnType<typeof useGetDeviceLazyQuery>;
export type GetDeviceQueryResult = Apollo.QueryResult<GetDeviceQuery, GetDeviceQueryVariables>;
export const GetNetworkDocument = gql`
    query GetNetwork($id: Int!) {
        network(id: $id) {
            id
            name
            description
            ipAddress
            vlan
            dnsServer
            dhcpEnabled
            devices {
                ipAddress
                device {
                    id
                    name
                }
            }
            subNetworks {
                id
            }
        }
    }
`;

/**
 * __useGetNetworkQuery__
 *
 * To run a query within a React component, call `useGetNetworkQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNetworkQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNetworkQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetNetworkQuery(baseOptions: Apollo.QueryHookOptions<GetNetworkQuery, GetNetworkQueryVariables>) {
    const options = {...defaultOptions, ...baseOptions}
    return Apollo.useQuery<GetNetworkQuery, GetNetworkQueryVariables>(GetNetworkDocument, options);
}
export function useGetNetworkLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNetworkQuery, GetNetworkQueryVariables>) {
    const options = {...defaultOptions, ...baseOptions}
    return Apollo.useLazyQuery<GetNetworkQuery, GetNetworkQueryVariables>(GetNetworkDocument, options);
}
export type GetNetworkQueryHookResult = ReturnType<typeof useGetNetworkQuery>;
export type GetNetworkLazyQueryHookResult = ReturnType<typeof useGetNetworkLazyQuery>;
export type GetNetworkQueryResult = Apollo.QueryResult<GetNetworkQuery, GetNetworkQueryVariables>;
export const SearchNetworksDocument = gql`
    query SearchNetworks($searchQuery: String!) {
        searchNetworks(searchQuery: $searchQuery) {
            id
            name
            ipAddress
        }
    }
`;

/**
 * __useSearchNetworksQuery__
 *
 * To run a query within a React component, call `useSearchNetworksQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchNetworksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchNetworksQuery({
 *   variables: {
 *      searchQuery: // value for 'searchQuery'
 *   },
 * });
 */
export function useSearchNetworksQuery(baseOptions: Apollo.QueryHookOptions<SearchNetworksQuery, SearchNetworksQueryVariables>) {
    const options = {...defaultOptions, ...baseOptions}
    return Apollo.useQuery<SearchNetworksQuery, SearchNetworksQueryVariables>(SearchNetworksDocument, options);
}
export function useSearchNetworksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchNetworksQuery, SearchNetworksQueryVariables>) {
    const options = {...defaultOptions, ...baseOptions}
    return Apollo.useLazyQuery<SearchNetworksQuery, SearchNetworksQueryVariables>(SearchNetworksDocument, options);
}
export type SearchNetworksQueryHookResult = ReturnType<typeof useSearchNetworksQuery>;
export type SearchNetworksLazyQueryHookResult = ReturnType<typeof useSearchNetworksLazyQuery>;
export type SearchNetworksQueryResult = Apollo.QueryResult<SearchNetworksQuery, SearchNetworksQueryVariables>;
export const SearchDevicesDocument = gql`
    query SearchDevices($searchQuery: String!, $excludeNetworkId: Int) {
        searchDevices(searchQuery: $searchQuery, excludeNetworkId: $excludeNetworkId) {
            id
            name
            macAddress
        }
    }
`;

/**
 * __useSearchDevicesQuery__
 *
 * To run a query within a React component, call `useSearchDevicesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchDevicesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchDevicesQuery({
 *   variables: {
 *      searchQuery: // value for 'searchQuery'
 *      excludeNetworkId: // value for 'excludeNetworkId'
 *   },
 * });
 */
export function useSearchDevicesQuery(baseOptions: Apollo.QueryHookOptions<SearchDevicesQuery, SearchDevicesQueryVariables>) {
    const options = {...defaultOptions, ...baseOptions}
    return Apollo.useQuery<SearchDevicesQuery, SearchDevicesQueryVariables>(SearchDevicesDocument, options);
}
export function useSearchDevicesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchDevicesQuery, SearchDevicesQueryVariables>) {
    const options = {...defaultOptions, ...baseOptions}
    return Apollo.useLazyQuery<SearchDevicesQuery, SearchDevicesQueryVariables>(SearchDevicesDocument, options);
}
export type SearchDevicesQueryHookResult = ReturnType<typeof useSearchDevicesQuery>;
export type SearchDevicesLazyQueryHookResult = ReturnType<typeof useSearchDevicesLazyQuery>;
export type SearchDevicesQueryResult = Apollo.QueryResult<SearchDevicesQuery, SearchDevicesQueryVariables>;
export const GetNetworkByAddressDocument = gql`
    query GetNetworkByAddress($address: IPNetwork!) {
        networkByAddress(address: $address) {
            id
            name
            description
            ipAddress
            devices {
                ipAddress
                device {
                    id
                    name
                }
            }
        }
    }
`;

/**
 * __useGetNetworkByAddressQuery__
 *
 * To run a query within a React component, call `useGetNetworkByAddressQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNetworkByAddressQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNetworkByAddressQuery({
 *   variables: {
 *      address: // value for 'address'
 *   },
 * });
 */
export function useGetNetworkByAddressQuery(baseOptions: Apollo.QueryHookOptions<GetNetworkByAddressQuery, GetNetworkByAddressQueryVariables>) {
    const options = {...defaultOptions, ...baseOptions}
    return Apollo.useQuery<GetNetworkByAddressQuery, GetNetworkByAddressQueryVariables>(GetNetworkByAddressDocument, options);
}
export function useGetNetworkByAddressLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNetworkByAddressQuery, GetNetworkByAddressQueryVariables>) {
    const options = {...defaultOptions, ...baseOptions}
    return Apollo.useLazyQuery<GetNetworkByAddressQuery, GetNetworkByAddressQueryVariables>(GetNetworkByAddressDocument, options);
}
export type GetNetworkByAddressQueryHookResult = ReturnType<typeof useGetNetworkByAddressQuery>;
export type GetNetworkByAddressLazyQueryHookResult = ReturnType<typeof useGetNetworkByAddressLazyQuery>;
export type GetNetworkByAddressQueryResult = Apollo.QueryResult<GetNetworkByAddressQuery, GetNetworkByAddressQueryVariables>;
export const AddDeviceDocument = gql`
    mutation AddDevice($device: DeviceInfoInput!) {
        addDevice(device: $device) {
            id
            name
            description
            macAddress
        }
    }
`;
export type AddDeviceMutationFn = Apollo.MutationFunction<AddDeviceMutation, AddDeviceMutationVariables>;

/**
 * __useAddDeviceMutation__
 *
 * To run a mutation, you first call `useAddDeviceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddDeviceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addDeviceMutation, { data, loading, error }] = useAddDeviceMutation({
 *   variables: {
 *      device: // value for 'device'
 *   },
 * });
 */
export function useAddDeviceMutation(baseOptions?: Apollo.MutationHookOptions<AddDeviceMutation, AddDeviceMutationVariables>) {
    const options = {...defaultOptions, ...baseOptions}
    return Apollo.useMutation<AddDeviceMutation, AddDeviceMutationVariables>(AddDeviceDocument, options);
}
export type AddDeviceMutationHookResult = ReturnType<typeof useAddDeviceMutation>;
export type AddDeviceMutationResult = Apollo.MutationResult<AddDeviceMutation>;
export type AddDeviceMutationOptions = Apollo.BaseMutationOptions<AddDeviceMutation, AddDeviceMutationVariables>;
export const AddNetworkDocument = gql`
    mutation AddNetwork($network: NetworkInfoInput!) {
        addNetwork(network: $network) {
            id
            parentId
            name
            description
            ipAddress
            dnsServer
            dhcpEnabled
            vlan
        }
    }
`;
export type AddNetworkMutationFn = Apollo.MutationFunction<AddNetworkMutation, AddNetworkMutationVariables>;

/**
 * __useAddNetworkMutation__
 *
 * To run a mutation, you first call `useAddNetworkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddNetworkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addNetworkMutation, { data, loading, error }] = useAddNetworkMutation({
 *   variables: {
 *      network: // value for 'network'
 *   },
 * });
 */
export function useAddNetworkMutation(baseOptions?: Apollo.MutationHookOptions<AddNetworkMutation, AddNetworkMutationVariables>) {
    const options = {...defaultOptions, ...baseOptions}
    return Apollo.useMutation<AddNetworkMutation, AddNetworkMutationVariables>(AddNetworkDocument, options);
}
export type AddNetworkMutationHookResult = ReturnType<typeof useAddNetworkMutation>;
export type AddNetworkMutationResult = Apollo.MutationResult<AddNetworkMutation>;
export type AddNetworkMutationOptions = Apollo.BaseMutationOptions<AddNetworkMutation, AddNetworkMutationVariables>;
export const AddNetworkDeviceDocument = gql`
    mutation AddNetworkDevice($networkDevice: NetworkDeviceInfoInput!) {
        addNetworkDevice(device: $networkDevice) {
            networkId
            deviceId
            ipAddress
            dhcp
        }
    }
`;
export type AddNetworkDeviceMutationFn = Apollo.MutationFunction<AddNetworkDeviceMutation, AddNetworkDeviceMutationVariables>;

/**
 * __useAddNetworkDeviceMutation__
 *
 * To run a mutation, you first call `useAddNetworkDeviceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddNetworkDeviceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addNetworkDeviceMutation, { data, loading, error }] = useAddNetworkDeviceMutation({
 *   variables: {
 *      networkDevice: // value for 'networkDevice'
 *   },
 * });
 */
export function useAddNetworkDeviceMutation(baseOptions?: Apollo.MutationHookOptions<AddNetworkDeviceMutation, AddNetworkDeviceMutationVariables>) {
    const options = {...defaultOptions, ...baseOptions}
    return Apollo.useMutation<AddNetworkDeviceMutation, AddNetworkDeviceMutationVariables>(AddNetworkDeviceDocument, options);
}
export type AddNetworkDeviceMutationHookResult = ReturnType<typeof useAddNetworkDeviceMutation>;
export type AddNetworkDeviceMutationResult = Apollo.MutationResult<AddNetworkDeviceMutation>;
export type AddNetworkDeviceMutationOptions = Apollo.BaseMutationOptions<AddNetworkDeviceMutation, AddNetworkDeviceMutationVariables>;
export const UpdateDeviceDocument = gql`
    mutation UpdateDevice($id: Int!, $device: DeviceInfoInput!) {
        updateDevice(id: $id, device: $device) {
            id
            name
            description
            macAddress
        }
    }
`;
export type UpdateDeviceMutationFn = Apollo.MutationFunction<UpdateDeviceMutation, UpdateDeviceMutationVariables>;

/**
 * __useUpdateDeviceMutation__
 *
 * To run a mutation, you first call `useUpdateDeviceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateDeviceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateDeviceMutation, { data, loading, error }] = useUpdateDeviceMutation({
 *   variables: {
 *      id: // value for 'id'
 *      device: // value for 'device'
 *   },
 * });
 */
export function useUpdateDeviceMutation(baseOptions?: Apollo.MutationHookOptions<UpdateDeviceMutation, UpdateDeviceMutationVariables>) {
    const options = {...defaultOptions, ...baseOptions}
    return Apollo.useMutation<UpdateDeviceMutation, UpdateDeviceMutationVariables>(UpdateDeviceDocument, options);
}
export type UpdateDeviceMutationHookResult = ReturnType<typeof useUpdateDeviceMutation>;
export type UpdateDeviceMutationResult = Apollo.MutationResult<UpdateDeviceMutation>;
export type UpdateDeviceMutationOptions = Apollo.BaseMutationOptions<UpdateDeviceMutation, UpdateDeviceMutationVariables>;
export const UpdateNetworkDocument = gql`
    mutation UpdateNetwork($id: Int!, $network: NetworkInfoInput!) {
        updateNetwork(id: $id, network: $network) {
            id
            parentId
            name
            description
            ipAddress
            dnsServer
            dhcpEnabled
            vlan
        }
    }
`;
export type UpdateNetworkMutationFn = Apollo.MutationFunction<UpdateNetworkMutation, UpdateNetworkMutationVariables>;

/**
 * __useUpdateNetworkMutation__
 *
 * To run a mutation, you first call `useUpdateNetworkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateNetworkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateNetworkMutation, { data, loading, error }] = useUpdateNetworkMutation({
 *   variables: {
 *      id: // value for 'id'
 *      network: // value for 'network'
 *   },
 * });
 */
export function useUpdateNetworkMutation(baseOptions?: Apollo.MutationHookOptions<UpdateNetworkMutation, UpdateNetworkMutationVariables>) {
    const options = {...defaultOptions, ...baseOptions}
    return Apollo.useMutation<UpdateNetworkMutation, UpdateNetworkMutationVariables>(UpdateNetworkDocument, options);
}
export type UpdateNetworkMutationHookResult = ReturnType<typeof useUpdateNetworkMutation>;
export type UpdateNetworkMutationResult = Apollo.MutationResult<UpdateNetworkMutation>;
export type UpdateNetworkMutationOptions = Apollo.BaseMutationOptions<UpdateNetworkMutation, UpdateNetworkMutationVariables>;
export const UpdateNetworkDeviceDocument = gql`
    mutation UpdateNetworkDevice($id: Int!, $networkDevice: NetworkDeviceInfoInput!) {
        updateNetworkDevice(id: $id, device: $networkDevice) {
            networkId
            deviceId
            ipAddress
            dhcp
        }
    }
`;
export type UpdateNetworkDeviceMutationFn = Apollo.MutationFunction<UpdateNetworkDeviceMutation, UpdateNetworkDeviceMutationVariables>;

/**
 * __useUpdateNetworkDeviceMutation__
 *
 * To run a mutation, you first call `useUpdateNetworkDeviceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateNetworkDeviceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateNetworkDeviceMutation, { data, loading, error }] = useUpdateNetworkDeviceMutation({
 *   variables: {
 *      id: // value for 'id'
 *      networkDevice: // value for 'networkDevice'
 *   },
 * });
 */
export function useUpdateNetworkDeviceMutation(baseOptions?: Apollo.MutationHookOptions<UpdateNetworkDeviceMutation, UpdateNetworkDeviceMutationVariables>) {
    const options = {...defaultOptions, ...baseOptions}
    return Apollo.useMutation<UpdateNetworkDeviceMutation, UpdateNetworkDeviceMutationVariables>(UpdateNetworkDeviceDocument, options);
}
export type UpdateNetworkDeviceMutationHookResult = ReturnType<typeof useUpdateNetworkDeviceMutation>;
export type UpdateNetworkDeviceMutationResult = Apollo.MutationResult<UpdateNetworkDeviceMutation>;
export type UpdateNetworkDeviceMutationOptions = Apollo.BaseMutationOptions<UpdateNetworkDeviceMutation, UpdateNetworkDeviceMutationVariables>;
export const DeleteDeviceDocument = gql`
    mutation DeleteDevice($id: Int!) {
        deleteDevice(id: $id) {
            id
            name
            description
            macAddress
            serialNumber
            manufacturer
        }
    }
`;
export type DeleteDeviceMutationFn = Apollo.MutationFunction<DeleteDeviceMutation, DeleteDeviceMutationVariables>;

/**
 * __useDeleteDeviceMutation__
 *
 * To run a mutation, you first call `useDeleteDeviceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteDeviceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteDeviceMutation, { data, loading, error }] = useDeleteDeviceMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteDeviceMutation(baseOptions?: Apollo.MutationHookOptions<DeleteDeviceMutation, DeleteDeviceMutationVariables>) {
    const options = {...defaultOptions, ...baseOptions}
    return Apollo.useMutation<DeleteDeviceMutation, DeleteDeviceMutationVariables>(DeleteDeviceDocument, options);
}
export type DeleteDeviceMutationHookResult = ReturnType<typeof useDeleteDeviceMutation>;
export type DeleteDeviceMutationResult = Apollo.MutationResult<DeleteDeviceMutation>;
export type DeleteDeviceMutationOptions = Apollo.BaseMutationOptions<DeleteDeviceMutation, DeleteDeviceMutationVariables>;
export const DeleteNetworkDocument = gql`
    mutation DeleteNetwork($id: Int!) {
        deleteNetwork(id: $id) {
            id
            name
            description
            ipAddress
            dhcpEnabled
            dnsServer
            vlan
        }
    }
`;
export type DeleteNetworkMutationFn = Apollo.MutationFunction<DeleteNetworkMutation, DeleteNetworkMutationVariables>;

/**
 * __useDeleteNetworkMutation__
 *
 * To run a mutation, you first call `useDeleteNetworkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteNetworkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteNetworkMutation, { data, loading, error }] = useDeleteNetworkMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteNetworkMutation(baseOptions?: Apollo.MutationHookOptions<DeleteNetworkMutation, DeleteNetworkMutationVariables>) {
    const options = {...defaultOptions, ...baseOptions}
    return Apollo.useMutation<DeleteNetworkMutation, DeleteNetworkMutationVariables>(DeleteNetworkDocument, options);
}
export type DeleteNetworkMutationHookResult = ReturnType<typeof useDeleteNetworkMutation>;
export type DeleteNetworkMutationResult = Apollo.MutationResult<DeleteNetworkMutation>;
export type DeleteNetworkMutationOptions = Apollo.BaseMutationOptions<DeleteNetworkMutation, DeleteNetworkMutationVariables>;
export const DeleteNetworkDeviceDocument = gql`
    mutation DeleteNetworkDevice($networkId: Int!, $deviceId: Int!) {
        deleteNetworkDevice(networkId: $networkId, deviceId: $deviceId) {
            networkId
            deviceId
            ipAddress
            dhcp
        }
    }
`;
export type DeleteNetworkDeviceMutationFn = Apollo.MutationFunction<DeleteNetworkDeviceMutation, DeleteNetworkDeviceMutationVariables>;

/**
 * __useDeleteNetworkDeviceMutation__
 *
 * To run a mutation, you first call `useDeleteNetworkDeviceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteNetworkDeviceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteNetworkDeviceMutation, { data, loading, error }] = useDeleteNetworkDeviceMutation({
 *   variables: {
 *      networkId: // value for 'networkId'
 *      deviceId: // value for 'deviceId'
 *   },
 * });
 */
export function useDeleteNetworkDeviceMutation(baseOptions?: Apollo.MutationHookOptions<DeleteNetworkDeviceMutation, DeleteNetworkDeviceMutationVariables>) {
    const options = {...defaultOptions, ...baseOptions}
    return Apollo.useMutation<DeleteNetworkDeviceMutation, DeleteNetworkDeviceMutationVariables>(DeleteNetworkDeviceDocument, options);
}
export type DeleteNetworkDeviceMutationHookResult = ReturnType<typeof useDeleteNetworkDeviceMutation>;
export type DeleteNetworkDeviceMutationResult = Apollo.MutationResult<DeleteNetworkDeviceMutation>;
export type DeleteNetworkDeviceMutationOptions = Apollo.BaseMutationOptions<DeleteNetworkDeviceMutation, DeleteNetworkDeviceMutationVariables>;
export const GetUsersDocument = gql`
    query GetUsers($order: [UserSortInput!], $skip: Int, $take: Int, $where: UserFilterInput) {
        users(order: $order, skip: $skip, take: $take, where: $where) {
            items {
                roles {
                    name
                }
                id
                userName
            }
        }
    }
`;

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *      order: // value for 'order'
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
    const options = {...defaultOptions, ...baseOptions}
    return Apollo.useQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
}
export function useGetUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
    const options = {...defaultOptions, ...baseOptions}
    return Apollo.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
}
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<typeof useGetUsersLazyQuery>;
export type GetUsersQueryResult = Apollo.QueryResult<GetUsersQuery, GetUsersQueryVariables>;
