interface Purchases {
  date: string,
  value: number
}

interface ViewsToClicks {
  date: string,
  view: number,
  click: number
}

export interface StatState {
  purchases: Purchases[],
  views_to_clicks: ViewsToClicks[]
};