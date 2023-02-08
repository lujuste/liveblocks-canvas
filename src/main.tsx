import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { createRoomContext } from "@liveblocks/react";
import { createClient } from "@liveblocks/client";
import { RoomProvider } from "./liveblocks";
import { LiveMap } from "@liveblocks/client";

const client = createClient({
  publicApiKey:
    "pk_dev_kO1ArAVvDguEZDAFra6Fy_vHrsvHbHPuTcnjBASOq-bV0KkFvu3QH55-6fIRwnxl",
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RoomProvider
      id="react-whiteboard-app"
      initialPresence={{}}
      initialStorage={{
        shapes: new LiveMap(),
      }}
    >
      <App />
    </RoomProvider>
  </React.StrictMode>
);
