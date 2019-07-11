import React, { useState, useEffect } from 'react'
import { graphql, ChildDataProps } from 'react-apollo'
import styled from 'styled-components'
import UsersList from '../UsersList'
import Transactions from '../Transactions'
import Header from '../Header'
import Transfer from '../Transfer'
import USERS_QUERY, {
  IUsersQueryData, IUsersQueryVars,
} from '../../queries/users'
import { numberOfUsersToLoad } from '../../consts'
import { ErrorText, CircularProgress } from '../common'

const Wrapper = styled.div`
  flex-grow: 1;
`

const LoadingWrapper = styled.div`
  padding: 2rem;
  text-align: center;
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
  const [
    areShownTransactions,
    setAreShownTransactions,
  ] = useState<null | string>(null)
  const [hasNextItem, setHasNextItem] = useState(true)
  const [isShownTransfer, setIsShownTransfer] = useState(false)
  const [skipValue, setSkipValue] = useState(initNumberOfItemsToSkip)

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

  const getMoreData = () => setSkipValue(skipValue + numberOfUsersToLoad)
  const hideTransfer = () => setIsShownTransfer(false)
  const showTransfer = () => setIsShownTransfer(true)
  const hideTransactions = () => setAreShownTransactions(null)
  const showTransactions = (userId: string) => setAreShownTransactions(userId)

  return (
    <>
      <Header showTransfer={showTransfer} />
      <Wrapper>
        <Transfer
          isOpen={isShownTransfer}
          closeModal={hideTransfer}
        />
        <Transactions
          userId={areShownTransactions}
          closeModal={hideTransactions}
        />
        {error && <ErrorText>{error.message}</ErrorText>}
        {loading && (
          <LoadingWrapper>
            <CircularProgress />
          </LoadingWrapper>
        )}
        {users && (
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
