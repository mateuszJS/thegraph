import React, { useCallback } from 'react'
import { FixedSizeList } from 'react-window'
import InfiniteLoader from 'react-window-infinite-loader'
import { IUser } from '../queries/users'
import AutoSizer from 'react-virtualized-auto-sizer'
import messages from '../messages';

interface IProps {
  users: IUser[]
  getMoreData: VoidFunction
  isLoading: boolean
  hasNextItem: boolean
}

const UsersList: React.FC<IProps> = ({
  users,
  getMoreData,
  isLoading,
  hasNextItem,
}) => {
  const itemCount = hasNextItem ? users.length + 1 : users.length
  const loadMoreItems = (isLoading ? () => { } : getMoreData) as unknown as (
    startIndex: number,
    stopIndex: number,
  ) => Promise<any>

  const isItemLoaded = (index: number) => !hasNextItem || index < users.length

  const renderItem = useCallback(
    ({ index, style }: { index: number, style: React.CSSProperties }) => {
      const content = !isItemLoaded(index) ? messages.loading : users[index].id
      return <div style={style}>{content}</div>
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
              itemSize={40}
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
