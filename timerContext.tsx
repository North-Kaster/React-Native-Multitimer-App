import React from "react";
import { createContext, PropsWithChildren, useContext, useState } from "react";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { Timer, TimerCollection } from "./Types";

interface timerContextType {
  timerCollection: Timer[];
  timerCollectionList: TimerCollection[];
  addTimer: (collectionId: string, newTimer: Timer) => void;
  removeTimer: (collectionId: string, timerId: string) => void;
  editTimer: (collectionId: string, editedTimer: Timer) => void;
  addTimerCollection: (newTimerCollection: TimerCollection) => void;
  removeTimerCollection: (collectionIdToRemove: string) => void;
  editTimerCollectionName: (
    collectionId: string,
    newCollectionName: string,
  ) => void;
}

export const TimerContext = createContext<timerContextType>({
  timerCollection: [],
  timerCollectionList: [],
  addTimer: () => undefined,
  removeTimer: () => undefined,
  editTimer: () => undefined,
  addTimerCollection: () => undefined,
  removeTimerCollection: () => undefined,
  editTimerCollectionName: () => undefined,
});

export const useTimerContext = () => {
  return useContext(TimerContext);
};

export const TimerProvider = ({ children }: PropsWithChildren) => {
  const [timerCollection] = useState<Timer[]>([]);
  const [timerCollectionList, setTimerCollectionList] = useState<
    TimerCollection[]
  >([
    {
      collectionName: "Kitchen Timers",
      collectionId: uuidv4(),
      timerCollection: [
        {
          id: uuidv4(),
          name: "Biscuits",
          duration: 90,
          state: "stopped",
        },
        {
          id: uuidv4(),
          name: "Chicken",
          duration: 400,
          state: "stopped",
        },
      ],
    },
    {
      collectionName: "Pomodoro Timers",
      collectionId: uuidv4(),
      timerCollection: [
        {
          id: uuidv4(),
          name: "Pomodoro",
          duration: 1500,
          state: "stopped",
        },
        {
          id: uuidv4(),
          name: "Short Break",
          duration: 300,
          state: "stopped",
        },
        {
          id: uuidv4(),
          name: "Long Break",
          duration: 900,
          state: "stopped",
        },
      ],
    },
    {
      collectionName: "Sleep Timers",
      collectionId: uuidv4(),
      timerCollection: [
        {
          id: uuidv4(),
          name: "Short nap",
          duration: 1800,
          state: "stopped",
        },
        {
          id: uuidv4(),
          name: "Long nap",
          duration: 5400,
          state: "stopped",
        },
      ],
    },
  ]);

  const addTimer = (collectionId: string, newTimer: Timer) => {
    const updatedTimerCollectionList = timerCollectionList.map((collection) => {
      return collection.collectionId === collectionId
        ? {
            ...collection,
            timerCollection: [...collection.timerCollection, newTimer],
          }
        : collection;
    });
    setTimerCollectionList(updatedTimerCollectionList);
  };

  const removeTimer = (collectionId: string, timerId: string) => {
    const updatedTimerCollectionList = timerCollectionList.map((collection) => {
      return collection.collectionId === collectionId
        ? {
            ...collection,
            timerCollection: collection.timerCollection.filter(
              (timer) => timer.id !== timerId,
            ),
          }
        : collection;
    });
    setTimerCollectionList(updatedTimerCollectionList);
  };
  const editTimer = (collectionId: string, editedTimer: Timer) => {
    const updatedTimerCollectionList = timerCollectionList.map((collection) => {
      return collection.collectionId === collectionId
        ? {
            ...collection,
            timerCollection: collection.timerCollection.map((timer) =>
              timer.id === editedTimer.id ? editedTimer : timer,
            ),
          }
        : collection;
    });
    setTimerCollectionList(updatedTimerCollectionList);
  };

  const addTimerCollection = (newTimerCollection: TimerCollection) => {
    setTimerCollectionList([...timerCollectionList, newTimerCollection]);
  };

  const removeTimerCollection = (collectionIdToRemove: string) => {
    const updatedCollectionList = timerCollectionList.filter(
      (collection) => collection.collectionId !== collectionIdToRemove,
    );
    setTimerCollectionList(updatedCollectionList);
  };

  const editTimerCollectionName = (
    collectionId: string,
    newCollectionName: string,
  ) => {
    const updatedTimerCollectionList = timerCollectionList.map((collection) => {
      if (collection.collectionId === collectionId) {
        return { ...collection, collectionName: newCollectionName };
      }
      return collection;
    });
    setTimerCollectionList(updatedTimerCollectionList);
  };

  return (
    <TimerContext.Provider
      value={{
        timerCollection,
        timerCollectionList,
        addTimer,
        removeTimer,
        editTimer,
        addTimerCollection,
        removeTimerCollection,
        editTimerCollectionName,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};
