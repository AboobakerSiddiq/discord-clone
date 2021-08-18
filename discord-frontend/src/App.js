import React from "react";
import "./App.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import { useDispatch, useSelector } from "react-redux";
import Login from "./Login";
import { useEffect } from "react";
import { auth } from "./firebase";
import { userinfo, userlogout } from "./action/discordaction";

function App() {
  const dispatch = useDispatch();
  const user = useSelector(state=>state.discord.user);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          userinfo({
            uid: authUser.uid,
            photo: authUser.photoURL,
            email: authUser.email,
            displayName: authUser.displayName,
          })
        );
      } else {
        dispatch(userlogout());
      }
    });
  }, [dispatch]);

  return (
    <div className="app">
      {user ? (
        <>
          <Sidebar />
          <Chat />
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
