/** @type {import('eslint').Rule.RuleModule} */
export const preferMockWithImport = {
  meta: {
    type: "suggestion",
    docs: {
      description:
        "Enforce vi.mock() to use import() instead of a string literal, so path changes are caught by tooling",
    },
    hasSuggestions: true,
    messages: {
      preferImport:
        'Use vi.mock(import("{{ path }}")) instead of a string literal so module path changes are caught by tooling.',
      replaceWithImport: "Replace string literal with import().",
    },
    schema: [],
  },
  create(context) {
    return {
      CallExpression(node) {
        const callee = node.callee;
        if (
          callee.type !== "MemberExpression" ||
          callee.object.type !== "Identifier" ||
          callee.object.name !== "vi" ||
          callee.property.type !== "Identifier" ||
          callee.property.name !== "mock"
        ) {
          return;
        }

        const firstArg = node.arguments[0];
        if (
          !firstArg ||
          firstArg.type !== "Literal" ||
          typeof firstArg.value !== "string"
        ) {
          return;
        }

        const modulePath = firstArg.value;
        const quote = firstArg.raw?.[0] ?? '"';

        context.report({
          node: firstArg,
          messageId: "preferImport",
          data: { path: modulePath },
          suggest: [
            {
              messageId: "replaceWithImport",
              fix(fixer) {
                return fixer.replaceText(
                  firstArg,
                  `import(${quote}${modulePath}${quote})`,
                );
              },
            },
          ],
        });
      },
    };
  },
};
