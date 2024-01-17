'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { MrbCard, MrbButton, MrbTypography, MrbForm } from '@/designSystem'
import { User, UserApi } from '@/domain/user'

import { Goal, GoalApi } from '@/domain/goal'
import {MrbToast} from '@/designSystem'
import { useAuthentication } from '@/modules/authentication'
import { DateLibrary } from '@/libraries/date'
import { AiApi } from '@/domain/ai'
import { PageLayout } from '@/layouts/Page.layout'

export default function GoalCreationPage() {
  const router = useRouter()
  const authentication = useAuthentication()
  const toast = MrbToast.useToast()
  const userId = authentication.user?.id

  const [isLoading, setLoading] = useState<boolean>(false)

  const handleSubmit = async (values) => {
    if (!userId) {
      toast.error('User not authenticated')
      return
    }

    setLoading(true)
    try {
      await GoalApi.createOneByUserId(userId, values)
      toast.success('Goal created successfully')
      router.push('/dashboard')
    } catch (error) {
      toast.error('Failed to create goal')
    }
    setLoading(false)
  }

  return (
    <PageLayout layout="narrow">
      <MrbTypography variant="h1">Set New Goal</MrbTypography>
      <MrbCard size="full-width" className="m-2">
        <MrbCard.Body>
          <MrbForm
            onSubmit={handleSubmit}
            inputs={[
              {
                key: 'title',
                type: 'text',
                label: 'Goal Title',
              },
              {
                key: 'description',
                type: 'textarea',
                label: 'Goal Description',
              },
              {
                key: 'year',
                type: 'number',
                label: 'Year',
              },
            ]}
          >
            <MrbButton variant="primary" type="submit" isLoading={isLoading}>
              Create
            </MrbButton>
          </MrbForm>
        </MrbCard.Body>
      </MrbCard>
    </PageLayout>
  )
}