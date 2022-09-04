interface Households {
    households : Household[];
}

interface Household {
    name : string
}

interface Groups {
    groups : Group[];
}

interface Group {
    id : string;
    name : string;
    coordinatorId : string,
    playbackState : string,
    playerIds : string[]
}