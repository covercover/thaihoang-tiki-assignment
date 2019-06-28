declare module "*.svg" {
  const content: any;
  export default content;
}

declare namespace NodeJS {
  interface Process {
    browser: boolean;
  }
  interface Global {
    fetch: any;
    document: Document;
    window: Window;
    navigator: Navigator;
  }
}