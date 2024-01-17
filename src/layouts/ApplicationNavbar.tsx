import { RouterObject } from '@/core/router'
import { useCoreStore } from '@/core/store'
import { MrbAvatar, MrbBadge, MrbIcon, MrbNavbar, MrbTag } from '@/designSystem'
import { useAuthentication } from '@/modules/authentication'
import React from 'react'

export const ApplicationNavbar: React.FC = () => {
  const oneLetterLogoName = 'JohnGoalTracker'.charAt(0).toUpperCase()

  const authentication = useAuthentication()

  const store = useCoreStore()

  const user = authentication.user

  const countNotifications = store.notifications.length

  return (
    <MrbNavbar>
      <MrbNavbar.Logo to={RouterObject.route.HOME} className="mr-5">
        {oneLetterLogoName}
      </MrbNavbar.Logo>

      <div className="mrb-fill-flex">

<MrbNavbar.Link to="/dashboard">
          My Goals
        </MrbNavbar.Link>

<MrbNavbar.Link to="/goals/create">
          Set New Goal
        </MrbNavbar.Link>

</div>

      {store.isAdmin && (
        <MrbNavbar.Item>
          <MrbTag variant="primary">
            <MrbIcon name="user-star-fill" className="mr-1" />
            Admin
          </MrbTag>
        </MrbNavbar.Item>
      )}

      <MrbNavbar.Link to={RouterObject.route.NOTIFICATIONS}>
        <MrbBadge content={countNotifications} variant="danger">
          <MrbIcon name="notification-2" />
        </MrbBadge>
      </MrbNavbar.Link>

      <MrbNavbar.Avatar to={RouterObject.route.PROFILE}>
        <MrbAvatar src={user?.pictureUrl}>{user?.name}</MrbAvatar>
      </MrbNavbar.Avatar>
    </MrbNavbar>
  )
}
