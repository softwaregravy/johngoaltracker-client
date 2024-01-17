import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Milestone } from './milestone.model'

export namespace MilestoneApi {
  export function findMany(
    queryOptions?: ApiHelper.QueryOptions<Milestone>,
  ): Promise<Milestone[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/milestones${buildOptions}`)
  }

  export function findOne(
    milestoneId: string,
    queryOptions?: ApiHelper.QueryOptions<Milestone>,
  ): Promise<Milestone> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/milestones/${milestoneId}${buildOptions}`,
    )
  }

  export function createOne(
    milestone: Partial<Milestone>,
  ): Promise<Milestone> {
    return HttpService.api.post(`/v1/milestones`, milestone)
  }

  export function updateOne(
    milestoneId: string,
    values: Partial<Milestone>,
  ): Promise<Milestone> {
    return HttpService.api.patch(
      `/v1/milestones/${milestoneId}`,
      values,
    )
  }

  export function deleteOne(milestoneId: string): Promise<void> {
    return HttpService.api.delete(`/v1/milestones/${milestoneId}`)
  }

export function findManyByGoalId(
    goalId: string,
    queryOptions?: ApiHelper.QueryOptions<Milestone>,
  ): Promise<Milestone[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/goals/goal/${goalId}/milestones${buildOptions}`,
    )
  }

  export function createOneByGoalId(
    goalId: string,
    values: Partial<Milestone>,
  ): Promise<Milestone> {
    return HttpService.api.post(
      `/v1/goals/goal/${goalId}/milestones`,
      values,
    )
  }

}
