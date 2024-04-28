// deno-lint-ignore-file no-explicit-any
export type FlexMessage = {
  type: "flex";
  altText: string;
  contents: {
    type: "bubble";
    body: any;
    styles: Record<string, any>;
  };
};
