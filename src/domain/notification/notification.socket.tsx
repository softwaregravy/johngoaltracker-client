import { useSocket } from '@/core/socket'
import { Notification } from './notification.model'

export const OnNotificationCreated = (
  callback: (notification: Notification) => void,
) => {
  useSocket('notification.created', callback)
}
