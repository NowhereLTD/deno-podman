import { DockerClient } from "https://raw.githubusercontent.com/Oursin/denocker/main/client/client.ts";


export class Client {
  constructor(options = {}) {
    return (async function () {
      this.path = options.path ? options.path : "/run/podman/podman.sock";
      this.version = options.version ? options.version : "4.0.0";
      this.url = options.url ? options.url : "http://d/v" + this.version + "/libpod/";
      this.connection = await Deno.connect({path: this.path, transport: "unix"});
      this.client = new DockerClient(this.path, null);
      return this;
    }.bind(this)());
  }

  async send(path, method, body = [], query = []) {
    const url = this.url + path;
    const data = await this.client.makeRequest(method, url, JSON.stringify(body), query);
    return data; 
  }
}