declare module "@uppercod/request" {
    export function request<T extends string>(
        url: T,
        limitRequest: number = 5
    ): Promise<[T, string]>;
}
