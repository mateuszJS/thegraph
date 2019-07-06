import { IExchangeBalance } from '../queries/users'

export const getEthBalance = (data: IExchangeBalance[]) =>
  data.reduce(
    (result, item) =>
      result + parseFloat(item.ethSold) - parseFloat(item.ethBought),
    0,
  )
