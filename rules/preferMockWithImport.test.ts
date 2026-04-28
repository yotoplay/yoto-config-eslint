import { describe, it } from "vitest";
import { RuleTester } from "eslint";
import { preferMockWithImport } from "./preferMockWithImport.js";

const ruleTester = new RuleTester();

describe("preferMockWithImport", () => {
  it("passes when vi.mock uses import()", () => {
    ruleTester.run("prefer-mock-with-import", preferMockWithImport, {
      valid: [
        `vi.mock(import('./module.js'))`,
        `vi.mock(import('./module.js'), () => ({}))`,
        `vi.mock(import('./module.js'), async (importOriginal) => {
          const actual = await importOriginal();
          return { ...actual };
        })`,
      ],
      invalid: [],
    });
  });

  it("flags vi.mock with a string literal", () => {
    ruleTester.run("prefer-mock-with-import", preferMockWithImport, {
      valid: [],
      invalid: [
        {
          code: `vi.mock('./module.js')`,
          errors: [
            {
              messageId: "preferImport",
              suggestions: [
                {
                  messageId: "replaceWithImport",
                  output: `vi.mock(import('./module.js'))`,
                },
              ],
            },
          ],
        },
        {
          code: `vi.mock('./module.js', () => ({}))`,
          errors: [
            {
              messageId: "preferImport",
              suggestions: [
                {
                  messageId: "replaceWithImport",
                  output: `vi.mock(import('./module.js'), () => ({}))`,
                },
              ],
            },
          ],
        },
        {
          code: `vi.mock("../utils/helper.js", () => ({ foo: vi.fn() }))`,
          errors: [
            {
              messageId: "preferImport",
              suggestions: [
                {
                  messageId: "replaceWithImport",
                  output: `vi.mock(import("../utils/helper.js"), () => ({ foo: vi.fn() }))`,
                },
              ],
            },
          ],
        },
      ],
    });
  });

  it("ignores non vi.mock calls", () => {
    ruleTester.run("prefer-mock-with-import", preferMockWithImport, {
      valid: [
        `vi.fn()`,
        `vi.spyOn(obj, 'method')`,
        `mock('./module.js')`,
        `other.mock('./module.js')`,
      ],
      invalid: [],
    });
  });
});
