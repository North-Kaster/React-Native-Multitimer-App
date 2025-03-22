import React from "react";
import TestRenderer, {
  type ReactTestRenderer,
  ReactTestRendererJSON,
} from "react-test-renderer";

import App from "./App";

jest.useFakeTimers();

describe("<App/>", () => {
  let renderer: ReactTestRenderer;

  beforeEach(() => {
    renderer = TestRenderer.create(<App />);
  });
  afterEach(() => {
    renderer.unmount();
  });
  it("compiles and has children", () => {
    const tree = renderer.toJSON() as ReactTestRendererJSON;
    jest.runOnlyPendingTimers();
    expect(tree).toBeDefined();
    expect(tree.children).toBeDefined();
    expect(tree.children).not.toBeNull();
    expect(tree.children).toBeTruthy();
    if (!Array.isArray(tree?.children)) {
      expect(Array.isArray(tree)).toBeTruthy();
      // This return is to help TypeScript determine that
      // tree cannot be an Array
      return;
    }
    expect(tree.children.length).toBeGreaterThan(0);
  });
});
