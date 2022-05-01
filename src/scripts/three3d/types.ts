export interface BaseOptionsType {
    clearColor?: string,
    needHelp?: boolean,
    needStats?: boolean

}
export interface adjustCameraOptionsType {
    position?: [number, number, number],
    lookAt?: [number, number, number],
}
export type animationPropsType = {
    [key: string]: number;
};