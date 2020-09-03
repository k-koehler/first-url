const isUrl = require("is-url");
const split = require("string-split-by-whitespace");
const commandLineArgs = require("command-line-args");

const options = commandLineArgs({
  name: "regex",
  alias: "r",
  type: String,
  multiple: true,
});

process.stdin.on("data", (data) => {
  split(data.toString()).forEach((maybeUrl) => {
    if (isUrl(maybeUrl)) {
      if (
        options.regex &&
        options.regex.some((s) => !new RegExp(s).test(maybeUrl))
      ) {
        return;
      }
      console.log(maybeUrl);
      process.exit(0);
    }
  });
});
process.stdin.on("close", () => {
  console.error("No URL found");
  process.exit(1);
});
