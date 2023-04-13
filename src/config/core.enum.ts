export enum ModuleProperties {
    Controller   = "controllers",
    Repositories = "repositories",
    Service      = "services",
    Modules      = "modules",
    Routes       = "routes",
    Prefix       = "prefix",
}

export enum HTTPMethods {
    Get   = "get",
    Post  = "post",
    Put   = "put",
    Patch = "patch",
}

export enum DroneStates {
    IDLE       = "IDLE",
    LOADING    = "LOADING",
    LOADED     = "LOADED",
    DELIVERING = "DELIVERING",
    DELIVERED  = "DELIVERED",
    RETURNING  = "RETURNING",
}

export enum DroneModels {
    Lightweight   = "Lightweight",
    Middleweight  = "Middleweight",
    Cruiserweight = "Cruiserweight",
    Heavyweight   = "Heavyweight",
}

export enum DroneWeightLimits {
    Lightweight   = 100,
    Middleweight  = 250,
    Cruiserweight = 350,
    Heavyweight   = 500,
}