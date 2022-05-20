import {
    DeviceInfoInput,
    GetDeviceQuery, GetNetworkQuery,
    InputMaybe,
    NetworkDeviceInfoInput,
    NetworkInfoInput,
    Scalars
} from "../graphql";

export class DeviceInfoInputModel implements DeviceInfoInput {
    name?: InputMaybe<Scalars['String']>;
    description?: InputMaybe<Scalars['String']>;
    serialNumber?: InputMaybe<Scalars['String']>;
    manufacturer?: InputMaybe<Scalars['String']>;
    macAddress?: InputMaybe<Scalars['MacAddress']>;


    public constructor(device: DeviceInfoInput) {
        this.name = device.name;
        this.description = device.description;
        this.macAddress = device.macAddress;
        this.manufacturer = device.manufacturer;
        this.serialNumber = device.serialNumber;
    }

    static fromResponse(response: GetDeviceQuery): DeviceInfoInputModel | undefined {
        if (response.device) return new DeviceInfoInputModel(response.device);
        return undefined;
    }
}

export class NetworkInfoInputModel implements NetworkInfoInput {
    parentId?: InputMaybe<Scalars['Int']>;
    name?: InputMaybe<Scalars['String']>;
    description?: InputMaybe<Scalars['String']>;
    ipAddress?: InputMaybe<Scalars['IPNetwork']>;
    dnsServer?: InputMaybe<Scalars['String']>;
    dhcpEnabled: Scalars['Boolean'];
    vlan?: InputMaybe<Scalars['Int']>;

    public constructor(network: NetworkInfoInput) {
        this.name = network.name;
        this.description = network.description;
        this.ipAddress = network.ipAddress;
        this.parentId = network.parentId;
        this.dhcpEnabled = network.dhcpEnabled;
        this.dnsServer = network.dnsServer;
        this.vlan = network.vlan;
    }

    static fromResponse(response: GetNetworkQuery): NetworkInfoInputModel | undefined {
        if (response.network) return new NetworkInfoInputModel(response.network);
        return undefined;
    }
}

export class NetworkDeviceInfoInputModel implements NetworkDeviceInfoInput {
    networkId: Scalars['Int'];
    deviceId: Scalars['Int'];
    ipAddress?: InputMaybe<Scalars['IPAddress']>;
    dhcp: Scalars['Boolean'];

    public constructor(device: NetworkDeviceInfoInput) {
        this.networkId = device.networkId;
        this.deviceId = device.deviceId;
        this.ipAddress = device.ipAddress;
        this.dhcp = device.dhcp;
    }
}
