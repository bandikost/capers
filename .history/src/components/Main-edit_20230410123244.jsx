import React from 'react'

export const MainEdit = () => {
  return (
    <div>
        <UserEditForm userId="user1" name={name.user1} balance={balance.user1} />
        <UserEditForm userId="user2" name={name.user2} balance={balance.user2} />
        <UserEditForm userId="user3" name={name.user3} balance={balance.user3} />
        <UserEditForm userId="user4" name={name.user4} balance={balance.user4} />
    </div>
  )
}

export default MainEdit;