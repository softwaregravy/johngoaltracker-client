'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { MrbCard, MrbDescription, MrbCol, MrbLink, MrbList, MrbLoader, MrbRow, MrbTag, MrbTypography, MrbDescriptionList } from '@/designSystem'
import { Goal, GoalApi } from '@/domain/goal'
import { Milestone, MilestoneApi } from '@/domain/milestone'
import { Progress, ProgressApi } from '@/domain/progress'
import { Resource, ResourceApi } from '@/domain/resource'
import {MrbToast} from '@/designSystem'
import { useAuthentication } from '@/modules/authentication'
import { DateLibrary } from '@/libraries/date'
import { AiApi } from '@/domain/ai'
import { PageLayout } from '@/layouts/Page.layout'

export default function GoalDetailsPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const toast = MrbToast.useToast()
  const userId = authentication.user?.id

  const [isLoading, setLoading] = useState<boolean>(true)
  const [goalDetails, setGoalDetails] = useState<Goal | null>(null)

  useEffect(() => {
    const fetchGoalDetails = async () => {
      try {
        const goalData = await GoalApi.findOne(params.id, { includes: ['milestones', 'resources'] })
        setGoalDetails(goalData)
      } catch (error) {
        toast.error('Failed to load goal details.')
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchGoalDetails()
    }
  }, [params.id])

  return (
    <PageLayout layout="narrow">
      {isLoading && <MrbLoader size="large" isExpanded />}

      {!isLoading && goalDetails && (
        <MrbCard>
          <MrbCard.Body>
            <MrbTypography variant="h3">{goalDetails.title}</MrbTypography>
            <MrbDescriptionList>
              <MrbDescription>
                <MrbDescription.Label>Description</MrbDescription.Label>
                <MrbDescription.Value>{goalDetails.description}</MrbDescription.Value>
              </MrbDescription>
            </MrbDescriptionList>

            <MrbTypography variant="h3">Milestones</MrbTypography>
            <MrbList>
              {goalDetails.milestones?.map((milestone) => (
                <MrbList.Item key={milestone.id} onClick={() => router.push(`/goals/${goalDetails.id}/milestones`)}>
                  <MrbRow gap={2} vertical="center" className="mrb-fill-x">
                    <MrbCol xs="fill">
                      <MrbTypography>{milestone.title}</MrbTypography>
                      <MrbTypography variant="secondary">{milestone.description}</MrbTypography>
                    </MrbCol>
                    <MrbTag variant="primary">{milestone.progresss?.length > 0 ? 'In Progress' : 'Not Started'}</MrbTag>
                  </MrbRow>
                </MrbList.Item>
              ))}
            </MrbList>

            <MrbTypography variant="h3">Resources</MrbTypography>
            <MrbList>
              {goalDetails.resources?.map((resource) => (
                <MrbList.Item key={resource.id}>
                  <MrbRow gap={2} vertical="center" className="mrb-fill-x">
                    <MrbCol xs="fill">
                      <MrbTypography>{resource.description}</MrbTypography>
                    </MrbCol>
                    <MrbLink to={resource.url} newWindow>{resource.url}</MrbLink>
                  </MrbRow>
                </MrbList.Item>
              ))}
            </MrbList>
          </MrbCard.Body>
          <MrbCard.Footer>
            <MrbRow horizontal="right" gap={1}>
              <MrbLink to="/dashboard">Back to Dashboard</MrbLink>
            </MrbRow>
          </MrbCard.Footer>
        </MrbCard>
      )}
    </PageLayout>
  )
}