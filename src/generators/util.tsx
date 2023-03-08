export const sampleSqrtGeo = (p: number): number => {
    return Math.ceil(Math.sqrt(Math.log(1-Math.random()) / Math.log(1-p)))
}

export const getRandWithNDigits = (n:number): number => {
    return Math.floor(Math.random() * (Math.pow(10, n) - Math.pow(10, n - 1))) + Math.pow(10, n- 1)
}