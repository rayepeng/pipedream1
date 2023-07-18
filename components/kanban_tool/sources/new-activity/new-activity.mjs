import common from "../common/activity-based.mjs";

export default {
  ...common,
  key: "kanban_tool-new-activity",
  name: "New Activity Event",
  description: "Emit new events when a new activity occured on selected board. [See the docs](https://kanbantool.com/developer/api-v3#listing-boards-changelogs)",
  version: "0.0.1",
  type: "source",
  dedupe: "unique",
};
