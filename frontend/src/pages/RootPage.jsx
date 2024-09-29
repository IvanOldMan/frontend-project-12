import React from 'react';
import {useSelector} from 'react-redux';
import {selectors} from "../store/slices/channelsSlice";

const RootPage = () => {
  const channels = useSelector(selectors.selectAll);
  //const messages = useSelector((state) => state.authentication.username);
  return (
  <div>
    {channels}
  </div>
  );
};

export default RootPage;
