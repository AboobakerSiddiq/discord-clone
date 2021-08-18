import { configureStore } from '@reduxjs/toolkit';
import { discordReducer } from '../Reducer/discordReducer';
import { channelReducer } from '../Reducer/channelReducer';

export default configureStore({
  reducer: {
    discord:discordReducer,
    channel:channelReducer
  },
});
