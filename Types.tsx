// export interface TimerCollectionList {
//   timerCollectionList:TimerCollection[]
// }
export interface TimerCollection {
  collectionId: string;
  collectionName: string;
  timerCollection: Timer[];
}
export interface Timer {
  id: string;
  name: string;
  duration: number;
  state: string;
  // states: "running", "stopped", "paused"
}

export type RootStackParamList = {
  TimerCollections: {
    timerCollection: string;
  };
  TimerSetView: {
    TimerCollectionId: string;
  };
  TimerComponent: {
    timerData: Timer;
    TimerCollectionId: string;
  };
};
