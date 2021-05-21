const wait = async (timeoutMillis: number): Promise<void> =>
    new Promise(resolve => setTimeout(resolve, timeoutMillis));

export default wait;