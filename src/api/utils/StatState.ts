interface StatStateData {
  date: string,
  value: number
}

export interface StatState {
  purchases: [
    {data: StatStateData[]},
    {data: StatStateData[]},
  ] | [],
  views_to_clicks: [
    {data: StatStateData[]},
    {data: StatStateData[]},
  ] | []
};