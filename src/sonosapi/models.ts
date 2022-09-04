export interface Households {
    households: Household[];
}

export interface Household {
    id: string
}

export interface Groups {
    players?: (PlayersEntity)[] | null;
    groups?: (GroupsEntity)[] | null;
}

export interface PlayersEntity {
    name: string;
    websocketUrl: string;
    deviceIds?: (string)[] | null;
    id: string;
    icon: string;
}

export interface GroupsEntity {
    playerIds?: (string)[] | null;
    playbackState: string;
    coordinatorId: string;
    id: string;
    name: string;
}

export interface Playback {
    playbackState: string;
    queueVersion: string;
    itemId: string;
    positionMillis: number;
    playModes: PlayModes;
    availablePlaybackActions: AvailablePlaybackActions;
}

export interface PlayModes {
    repeat: boolean;
    repeatOne: boolean;
    crossfade: boolean;
    shuffle: boolean;
}

export interface AvailablePlaybackActions {
    canSkip: boolean;
    canSkipBack: boolean;
    canSeek: boolean;
    canRepeat: boolean;
    canRepeatOne: boolean;
    canCrossfade: boolean;
    canShuffle: boolean;
}
