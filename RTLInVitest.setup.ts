import { expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";

declare global {
  namespace Vi {
    interface JestAssertion<T = any>
      extends jest.Matchers<void, T>,
        matchers.TestingLibraryMatchers<T, void> {}
  }
}
declare module 'vitest' {
    interface Assertion<T = any> extends matchers.TestingLibraryMatchers<T,void> {}
    interface AsymmetricMatchersContaining<T = any> extends matchers.TestingLibraryMatchers<T,void> {}
  }
// 继承 testing-library 的扩展 except
expect.extend(matchers);
// 全局设置清理函数，避免每个测试文件手动清理
afterEach(() => {
  cleanup();
});