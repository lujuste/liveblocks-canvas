import { createClient } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";

const client = createClient({
  publicApiKey:
    "pk_dev_kO1ArAVvDguEZDAFra6Fy_vHrsvHbHPuTcnjBASOq-bV0KkFvu3QH55-6fIRwnxl",
});

export const { RoomProvider, useOthers, useMyPresence, useMap } =
  createRoomContext(client);
