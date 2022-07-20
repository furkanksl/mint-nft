export interface NFTMetadata {
    name:        string;
    description: string;
    image:       string;
    attributes:  Attributes;
}

export interface Attributes {
    level: number;
    class: string;
}