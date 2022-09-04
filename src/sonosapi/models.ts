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

export interface PlaybackMetadata {
    container: Container;
    currentItem: CurrentItem;
}
export interface Container {
    name: string;
    type: string;
    id: Id;
    service: Service;
    imageUrl: string;
}
export interface Id {
    serviceId: string;
    objectId: string;
    accountId: string;
}
export interface Service {
    name: string;
    id: string;
}
export interface CurrentItem {
    track: Track;
}
export interface Track {
    type: string;
    name: string;
    imageUrl: string;
    album: AlbumOrArtist;
    artist: AlbumOrArtist;
    id: Id;
    service: Service;
    durationMillis: number;
}
export interface AlbumOrArtist {
    name: string;
}
