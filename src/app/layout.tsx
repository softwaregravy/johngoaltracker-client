'use client'

import { CoreStoreProvider } from '@/core/store'
import { MrbHtml, MrbMain } from '@/designSystem'
import { AuthenticationProvider } from '@/modules/authentication'
import { GoogleOauth } from '@/modules/googleOauth'
import { ReactNode } from 'react'

import { SocketProvider } from '@/core/socket'
import './main.scss'

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <MrbHtml>
      <GoogleOauth.Provider>
        <CoreStoreProvider>
          <AuthenticationProvider>
            <SocketProvider>
              <MrbMain name="JohnGoalTracker">{children}</MrbMain>
            </SocketProvider>
          </AuthenticationProvider>
        </CoreStoreProvider>
      </GoogleOauth.Provider>
    </MrbHtml>
  )
}
