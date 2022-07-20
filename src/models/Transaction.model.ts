export interface Transaction {
    blockHash:         string;
    blockNumber:       number;
    contractAddress:   null;
    cumulativeGasUsed: number;
    from:              string;
    gasUsed:           number;
    effectiveGasPrice: number;
    logsBloom:         string;
    status:            boolean;
    to:                string;
    transactionHash:   string;
    transactionIndex:  number;
    events:            Events;
}

export interface Events {
    Transfer: Transfer;
}

export interface Transfer {
    address:          string;
    blockNumber:      number;
    transactionHash:  string;
    transactionIndex: number;
    blockHash:        string;
    logIndex:         number;
    removed:          boolean;
    id:               string;
    returnValues:     ReturnValues;
    event:            string;
    signature:        string;
    raw:              Raw;
}

export interface Raw {
    data:   string;
    topics: string[];
}

export interface ReturnValues {
    "0":     string;
    "1":     string;
    "2":     string;
    from:    string;
    to:      string;
    tokenId: string;
}