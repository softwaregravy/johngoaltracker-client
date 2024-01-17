'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { MrbDescription, MrbButton, MrbLink, MrbLoader, MrbRow, MrbTypography, MrbDescriptionList, MrbForm } from '@/designSystem'
import { Goal, GoalApi } from '@/domain/goal'

import { Resource, ResourceApi } from '@/domain/resource'
import {MrbToast} from '@/designSystem'
import { useAuthentication } from '@/modules/authentication'
import { DateLibrary } from '@/libraries/date'
import { AiApi } from '@/domain/ai'
import { PageLayout } from '@/layouts/Page.layout'

export default function GoalResourcesPage() {
  const router = useRouter()
  const params = useParams<any>()
  const toast = MrbToast.useToast()

  const [isLoading, setLoading] = useState<boolean>(true)
  const [resources, setResources] = useState<Resource[]>([])

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const resourcesList = await ResourceApi.findManyByGoalId(params.id)
        setResources(resourcesList)
      } catch (error) {
        toast.error('Failed to fetch resources.')
      } finally {
        setLoading(false)
      }
    }

    fetchResources()
  }, [params.id])

  const handleAddResource = async (values: any) => {
    try {
      const newResource = await ResourceApi.createOneByGoalId(params.id, {
        url: values.url,
        description: values.description,
      })
      setResources(prevResources => [...prevResources, newResource])
      toast.success('Resource added successfully.')
    } catch (error) {
      toast.error('Failed to add resource.')
    }
  }

  const handleBackToGoalDetails = () => {
    router.push(`/goals/${params.id}`)
  }

  return (
    <PageLayout layout="narrow">
      {isLoading && <MrbLoader size="large" isExpanded />}

      {!isLoading && (
        <>
          <MrbTypography variant="h2">Goal Resources</MrbTypography>
          <MrbDescriptionList>
            {resources.map(resource => (
              <MrbDescription key={resource.id}>
                <MrbDescription.Label>URL</MrbDescription.Label>
                <MrbDescription.Value>
                  <MrbLink to={resource.url} newWindow>
                    {resource.url}
                  </MrbLink>
                </MrbDescription.Value>
                <MrbDescription.Label>Description</MrbDescription.Label>
                <MrbDescription.Value>
                  {resource.description}
                </MrbDescription.Value>
              </MrbDescription>
            ))}
          </MrbDescriptionList>

          <MrbForm
            onSubmit={handleAddResource}
            inputs={[
              {
                key: 'url',
                type: 'text',
                label: 'URL',
              },
              {
                key: 'description',
                type: 'textarea',
                label: 'Description',
              },
            ]}
          >
            <MrbButton type="submit">Add Resource</MrbButton>
          </MrbForm>

          <MrbRow horizontal="center">
            <MrbButton onClick={handleBackToGoalDetails}>
              Back to Goal Details
            </MrbButton>
          </MrbRow>
        </>
      )}
    </PageLayout>
  )
}