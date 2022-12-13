import { PORT } from "./libs/env.ts";
import { router } from "./libs/router.ts";

router.listen(
  PORT,
  () => console.log(`Listening on http://localhost:${PORT}`),
);
