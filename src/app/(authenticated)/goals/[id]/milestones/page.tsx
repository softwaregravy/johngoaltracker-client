'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { MrbButton, MrbCol, MrbEmptyState, MrbList, MrbLoader, MrbRow, MrbTypography, MrbModal, MrbForm } from '@/designSystem'
import { Goal, GoalApi } from '@/domain/goal'
import { Milestone, MilestoneApi } from '@/domain/milestone'
import {MrbToast} from '@/designSystem'
import { useAuthentication } from '@/modules/authentication'
import { DateLibrary } from '@/libraries/date'
import { AiApi } from '@/domain/ai'
import { PageLayout } from '@/layouts/Page.layout'

export default function MilestoneManagementPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const toast = MrbToast.useToast()
  const [isLoading, setLoading] = useState<boolean>(true)
  const [items, setItems] = useState<Milestone[]>([])
  const [isModalOpen, setModalOpen] = useState<boolean>(false)
  const [currentMilestone, setCurrentMilestone] = useState<Milestone | null>(null)

  useEffect(() => {
    async function fetchMilestones() {
      try {
        setLoading(true)
        const milestones = await MilestoneApi.findManyByGoalId(params.id, { includes: ['goal'] })
        setItems(milestones)
      } catch (error) {
        toast.error('Failed to load milestones.')
      } finally {
        setLoading(false)
      }
    }

    fetchMilestones()
  }, [params.id])

  const handleAddMilestone = async (values: any) => {
    try {
      const newMilestone = await MilestoneApi.createOneByGoalId(params.id, values)
      setItems(prevItems => [...prevItems, newMilestone])
      toast.success('Milestone added successfully.')
      setModalOpen(false)
    } catch (error) {
      toast.error('Failed to add milestone.')
    }
  }

  const handleEditMilestone = async (values: any) => {
    if (!currentMilestone) return
    try {
      const updatedMilestone = await MilestoneApi.updateOne(currentMilestone.id, values)
      setItems(prevItems =>
        prevItems.map(item => (item.id === updatedMilestone.id ? updatedMilestone : item))
      )
      toast.success('Milestone updated successfully.')
      setModalOpen(false)
    } catch (error) {
      toast.error('Failed to update milestone.')
    }
  }

  const handleDeleteMilestone = async (milestoneId: string) => {
    if (confirm('Are you sure you want to delete this milestone?')) {
      try {
        await MilestoneApi.deleteOne(milestoneId)
        setItems(prevItems => prevItems.filter(item => item.id !== milestoneId))
        toast.success('Milestone deleted successfully.')
      } catch (error) {
        toast.error('Failed to delete milestone.')
      }
    }
  }

  return (
    <PageLayout layout="narrow">
      {isLoading && <MrbLoader size="large" isExpanded />}

      {!isLoading && (
        <>
          {items.length === 0 && (
            <MrbEmptyState>
              There are no milestones to display.
              <MrbButton variant="primary" onClick={() => setModalOpen(true)}>
                Add Milestone
              </MrbButton>
            </MrbEmptyState>
          )}

          <MrbList divider={false}>
            {items.map(item => (
              <MrbList.Item key={item.id}>
                <MrbRow gap={2} className="mrb-fill-x">
                  <MrbCol xs="fill">
                    <MrbTypography variant="h3">{item.title}</MrbTypography>
                    <MrbTypography>{item.description}</MrbTypography>
                    <MrbTypography variant="caption">Quarter: {item.quarter}</MrbTypography>
                  </MrbCol>
                  <MrbCol>
                    <MrbButton variant="primary" onClick={() => {
                      setCurrentMilestone(item)
                      setModalOpen(true)
                    }}>
                      Edit
                    </MrbButton>
                    <MrbButton variant="danger" onClick={() => handleDeleteMilestone(item.id)}>
                      Delete
                    </MrbButton>
                  </MrbCol>
                </MrbRow>
              </MrbList.Item>
            ))}
          </MrbList>

          <MrbButton variant="primary" onClick={() => setModalOpen(true)}>
            Add Milestone
          </MrbButton>
        </>
      )}

      <MrbModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} header="Milestone">
        <MrbForm
          onSubmit={currentMilestone ? handleEditMilestone : handleAddMilestone}
          defaultValues={currentMilestone || {}}
          inputs={[
            { key: 'title', type: 'text', label: 'Title' },
            { key: 'description', type: 'textarea', label: 'Description' },
            { key: 'quarter', type: 'number', label: 'Quarter' },
          ]}
        >
          <MrbButton type="submit">{currentMilestone ? 'Update' : 'Add'} Milestone</MrbButton>
        </MrbForm>
      </MrbModal>
    </PageLayout>
  )
}