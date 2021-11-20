import { server } from "./server";

server().then((app) =>
  app.listen(app.get("port"), () => {
    console.log(`server listening on port ${app.get("port")}`);
    console.log(`press CTRL+C to stop server`);
  })
);
