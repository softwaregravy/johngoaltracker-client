'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { MrbButton, MrbCol, MrbEmptyState, MrbList, MrbLoader, MrbRow, MrbTypography } from '@/designSystem'
import { User, UserApi } from '@/domain/user'

import { Goal, GoalApi } from '@/domain/goal'
import {MrbToast} from '@/designSystem'
import { useAuthentication } from '@/modules/authentication'
import { DateLibrary } from '@/libraries/date'
import { AiApi } from '@/domain/ai'
import { PageLayout } from '@/layouts/Page.layout'

export default function GoalsDashboardPage() {
  const router = useRouter()
  const authentication = useAuthentication()
  const toast = MrbToast.useToast()
  const userId = authentication.user?.id

  const [isLoading, setLoading] = useState<boolean>(true)
  const [items, setItems] = useState<Goal[]>([])

  useEffect(() => {
    if (userId) {
      GoalApi.findManyByUserId(userId, { includes: ['milestones', 'resources'] })
        .then(goals => {
          setItems(goals)
          setLoading(false)
        })
        .catch(error => {
          toast.error('Failed to fetch goals')
          setLoading(false)
        })
    }
  }, [userId])

  const handleGoalClick = (goalId: string) => {
    router.push(`/goals/${goalId}`)
  }

  const handleCreateGoal = () => {
    router.push('/goals/create')
  }

  return (
    <PageLayout layout="narrow">
      <MrbButton onClick={handleCreateGoal} variant="primary" size="medium">
        Add New Goal
      </MrbButton>

      {isLoading && <MrbLoader size="large" isExpanded />}

      {!isLoading && (
        <>
          {items.length === 0 && (
            <MrbEmptyState>
              You have not set any goals for this year.
              <MrbButton variant="primary" size="small" onClick={handleCreateGoal}>
                Add New Goal
              </MrbButton>
            </MrbEmptyState>
          )}
          <MrbList divider={true}>
            {items.map(goal => (
              <MrbList.Item
                key={goal.id}
                onClick={() => handleGoalClick(goal.id)}
              >
                <MrbRow gap={2} className="mrb-fill-x">
                  <MrbCol xs="fill">
                    <MrbTypography variant="h3">
                      {goal.title}
                    </MrbTypography>
                    <MrbTypography variant="secondary">
                      {goal.description}
                    </MrbTypography>
                    {/* Additional details like milestones can be added here */}
                  </MrbCol>
                </MrbRow>
              </MrbList.Item>
            ))}
          </MrbList>
        </>
      )}
    </PageLayout>
  )
}