import {Client} from "../podman.js";

Deno.test("init a client and send create and get request", async () => {
  try {
    // init a client
    const client = await new Client();

    const createRequest = await client.send("containers/create", "POST", {
      image: "fedora:latest",
      command: ["ls"]
    });
    console.log(createRequest);

    const request = await client.send("containers/json", "GET");
    console.log(request);
  }catch(e) {
    console.error(e);
  }
});
