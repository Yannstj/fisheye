import { expect, test } from "vitest";
import { init } from "./lightboxView";

test("return false", () => {
  expect(init()).false;
});
