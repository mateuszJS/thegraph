import React, { useState, useEffect, useCallback } from 'react'
import { graphql, ChildDataProps } from 'react-apollo'
import styled from 'styled-components'
import UsersList from '../UsersList'
import TransactionsList from '../TransactionsList'
import Header from '../Header'
import Transfer from '../Transfer'
import USERS_QUERY, {
  IUsersQueryData, IUsersQueryVars,
} from '../../queries/users'
import messages from '../../messages'
import { numberOfUsersToLoad } from '../../consts'

const Wrapper = styled.div`
  flex-grow: 1;
`

const initNumberOfItemsToSkip = 0

type ChildProps = ChildDataProps<{}, IUsersQueryData, IUsersQueryVars>

const withUsers = graphql<
  {},
  IUsersQueryData,
  IUsersQueryVars,
  ChildProps
>(USERS_QUERY, {
  options: () => ({
    variables: { skip: initNumberOfItemsToSkip },
  }),
})

const MainView: React.FC<ChildProps> = ({
  data: {
    users,
    loading,
    error,
    fetchMore,
  },
}) => {
  const [skipValue, setSkipValue] = useState(initNumberOfItemsToSkip)
  const [
    areShownTransactions,
    setAreShownTransactions,
  ] = useState<null | string>(null)
  const [hasNextItem, setHasNextItem] = useState(true)
  const [isShownTransfer, setIsShownTransfer] = useState(false)
  const closeModal = useCallback(() => setIsShownTransfer(false), [])
  const openModal = useCallback(() => setIsShownTransfer(true), [])

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
    () => setSkipValue(skipValue + numberOfUsersToLoad),
    [skipValue],
  )

  const showTransactions = (userId: string) => setAreShownTransactions(userId)
  const hideTransactions = () => setAreShownTransactions(null)

  return (
    <>
      <Header openTransferModal={openModal} />
      <Wrapper>
        <Transfer
          isOpen={isShownTransfer}
          closeModal={closeModal}
        />
        <TransactionsList
          userId={areShownTransactions}
          hideTransactions={hideTransactions}
        />
        {error && <p>{error.message}</p>}
        {loading && <p>{messages.loading}</p>}
        {!loading && !error && users && (
          <UsersList
            users={users}
            getMoreData={getMoreData}
            isLoading={loading}
            hasNextItem={hasNextItem}
            handleRowClick={showTransactions}
          />
        )}
      </Wrapper>
    </>
  )
}

export default withUsers(MainView)
