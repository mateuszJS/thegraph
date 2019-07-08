import React, { useCallback } from 'react'
import { FixedSizeList } from 'react-window'
import InfiniteLoader from 'react-window-infinite-loader'
import { IUser } from '../../queries/users'
import AutoSizer from 'react-virtualized-auto-sizer'
import messages from '../../messages'
import { getEthBalance } from '../../utils'
import { ListItem, ListItemText } from '../common'

interface IProps {
  users: IUser[]
  getMoreData: VoidFunction
  isLoading: boolean
  hasNextItem: boolean
  handleRowClick(id: string): void
}

const UsersList: React.FC<IProps> = ({
  users,
  getMoreData,
  isLoading,
  hasNextItem,
  handleRowClick,
}) => {
  const itemCount = hasNextItem ? users.length + 1 : users.length
  const loadMoreItems = (isLoading ? () => { } : getMoreData) as unknown as (
    startIndex: number,
    stopIndex: number,
  ) => Promise<any>

  const isItemLoaded = (index: number) => !hasNextItem || index < users.length

  const renderItem = useCallback(
    ({ index, style }: { index: number, style: React.CSSProperties }) => {
      if (!isItemLoaded(index)) {
        return (
          <ListItem style={style}>
            <ListItemText primary={messages.loading} />
          </ListItem>
        )
      }

      const user = users[index]
      const onClickHandler = () => handleRowClick(user.id)

      return (
        <ListItem
          key={user.id}
          divider
          button
          style={style}
          onClick={onClickHandler}
        >
          <ListItemText
            primary={user.id}
            secondary={getEthBalance(user.exchangeBalances)}
          />
        </ListItem>
      )
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [users],
  )

  return (
    <AutoSizer>
      {({ width, height }) => (
        <InfiniteLoader
          isItemLoaded={isItemLoaded}
          itemCount={itemCount}
          loadMoreItems={loadMoreItems}
        >
          {({ onItemsRendered, ref }) => (
            <FixedSizeList
              itemData={users}
              onItemsRendered={onItemsRendered}
              ref={ref}
              itemCount={users.length + 1}
              itemSize={73}
              height={height}
              width={width}
            >
              {renderItem}
            </FixedSizeList>
          )}
        </InfiniteLoader>
      )}
    </AutoSizer>
  )
}

export default UsersList
