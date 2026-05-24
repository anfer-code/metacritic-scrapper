export const wait = async (delayInMs: number): Promise<void> => {
  await new Promise((resolve) => {
    setTimeout(resolve, delayInMs);
  });
};