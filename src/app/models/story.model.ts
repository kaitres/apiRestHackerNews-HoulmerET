export interface Story{
  by : string,
  descendants : number | null,
  id : number,
  kids : number[],
  score : number,
  time : number,
  title : string,
  type : string,
  url : string
}