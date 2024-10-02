export const withResolvers = <T = unknown>() => {
  let resolve: Resolve<T>;
  let reject: Reject;

  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });

  return {
    promise,
    // @ts-expect-error - ignore
    resolve,
    // @ts-expect-error - ignore
    reject,
  };
};

export type Resolver<T = unknown> = {
  resolve: Resolve<T>;
  reject: Reject;
};

export type Resolve<T> = (value: T) => void;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Reject = (reason?: any) => void;
