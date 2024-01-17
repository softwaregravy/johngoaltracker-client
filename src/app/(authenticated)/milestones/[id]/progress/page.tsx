'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { MrbCard, MrbButton, MrbLink, MrbTypography, MrbForm } from '@/designSystem'
import { Goal, GoalApi } from '@/domain/goal'
import { Milestone, MilestoneApi } from '@/domain/milestone'
import { Progress, ProgressApi } from '@/domain/progress'
import {MrbToast} from '@/designSystem'
import { useAuthentication } from '@/modules/authentication'
import { DateLibrary } from '@/libraries/date'
import { AiApi } from '@/domain/ai'
import { PageLayout } from '@/layouts/Page.layout'

export default function ProgressLogPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const toast = MrbToast.useToast()
  const milestoneId = params.id
  const userId = authentication.user?.id

  const [isLoading, setLoading] = useState<boolean>(false)
  const [progressEntries, setProgressEntries] = useState([])

  useEffect(() => {
    const fetchProgressEntries = async () => {
      const entries = await ProgressApi.findManyByMilestoneId(milestoneId)
      setProgressEntries(entries)
    }
    fetchProgressEntries()
  }, [milestoneId])

  const handleSubmit = async (values) => {
    setLoading(true)
    try {
      await ProgressApi.createOneByMilestoneId(milestoneId, values)
      toast.success('Progress note added successfully')
      setProgressEntries([...progressEntries, values])
    } catch (error) {
      toast.error('Failed to add progress note')
    }
    setLoading(false)
  }

  return (
    <PageLayout layout="narrow">
      <MrbTypography variant="h1">Log Progress</MrbTypography>
      <MrbCard size="full-width" className="m-2">
        <MrbCard.Body>
          <MrbForm
            onSubmit={handleSubmit}
            inputs={[
              {
                key: 'note',
                type: 'textarea',
                label: 'Progress Note',
              },
              {
                key: 'progressDate',
                type: 'date',
                label: 'Date',
              },
            ]}
          >
            <MrbButton variant="primary" type="submit" isLoading={isLoading}>
              Log Progress
            </MrbButton>
          </MrbForm>
        </MrbCard.Body>
      </MrbCard>
      <MrbLink to={`/goals/${userId}`} variant="primary">Back to Goal Details</MrbLink>
      <MrbLink to={`/goals/${userId}/milestones`} variant="primary">Back to Milestones Management</MrbLink>
      {progressEntries.map((entry, index) => (
        <MrbCard key={index} size="full-width" className="m-2">
          <MrbCard.Body>
            <MrbTypography variant="primary">{entry.note}</MrbTypography>
            <MrbTypography variant="secondary">{entry.progressDate}</MrbTypography>
          </MrbCard.Body>
        </MrbCard>
      ))}
    </PageLayout>
  )
}