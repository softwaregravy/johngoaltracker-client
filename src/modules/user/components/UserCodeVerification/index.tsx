import { User, UserManager } from '@/domain'
import { AuthorizationType } from '@/domain/authorization'
import { useAuthentication } from '@/modules/authentication'
import { AuthorizationCodeVerification } from '@/modules/authorization/components'
import React from 'react'

export const UserCodeVerification: React.FC = () => {
  const authentication = useAuthentication()

  const user = authentication.user as User

  const handleComplete = () => {
    window.location.reload()
  }

  const isVerified = UserManager.isVerified(user)

  if (isVerified) {
    return <></>
  }

  return (
    <>
      <AuthorizationCodeVerification
        title="Verify your email"
        user={user}
        type={AuthorizationType.USER_VERIFICATION}
        onComplete={handleComplete}
      />
    </>
  )
}
