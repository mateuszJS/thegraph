import React, { useState, useEffect, useCallback } from 'react'
import { graphql, ChildDataProps } from 'react-apollo'
import styled from 'styled-components'
import UsersList from './UsersList'
import USERS_QUERY, { UsersQueryData, UsersQueryVars } from '../queries/users'
import TransactionsList from './TransactionsList'

const Wrapper = styled.div`
  flex-grow: 1;
`

const initNumberOfItemsToSkip = 0

type ChildProps = ChildDataProps<{}, UsersQueryData, UsersQueryVars>

const perPage = 30
const withUsers = graphql<
  {},
  UsersQueryData,
  UsersQueryVars,
  ChildProps
>(USERS_QUERY, {
  options: () => ({
    variables: { skip: initNumberOfItemsToSkip },
  }),
})

const MainView: React.FC<ChildProps> = ({ data: queryProps }) => {
  const { users, loading, error, fetchMore } = queryProps
  const [skipValue, setSkipValue] = useState(initNumberOfItemsToSkip)
  const [
    areShownTransactions,
    setAreShownTransactions,
  ] = useState<null | string>(null)
  const [hasNextItem, setHasNextItem] = useState(true)

  useEffect(() => {
    // INFO: Apollo send first request by itself,
    // so additional request on didMount isn't needed
    if (skipValue === initNumberOfItemsToSkip) return
    fetchMore({
      variables: {
        skip: skipValue,
      },
      updateQuery(prev, { fetchMoreResult }) {
        if (!fetchMoreResult) {
          return prev
        }
        if (!fetchMoreResult.users.length) {
          setHasNextItem(false)
        }
        return { users: [...prev.users, ...fetchMoreResult.users] }
      },
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skipValue])

  const getMoreData = useCallback(
    () => setSkipValue(skipValue + perPage),
    [skipValue],
  )

  const showTransactions = (userId: string) => setAreShownTransactions(userId)
  const hideTransactions = () => setAreShownTransactions(null)

  if (error) {
    return <p>Error occure {error}</p>
  }

  if (!users) {
    return <p>There is no users :(</p>
  }

  return (
    <Wrapper>
      <TransactionsList
        userId={areShownTransactions}
        hideTransactions={hideTransactions}
      />
      <UsersList
        users={users}
        getMoreData={getMoreData}
        isLoading={loading}
        hasNextItem={hasNextItem}
        handleRowClick={showTransactions}
      />
    </Wrapper>
  )
}

export default withUsers(MainView)
