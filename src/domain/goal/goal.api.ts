import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Goal } from './goal.model'

export namespace GoalApi {
  export function findMany(
    queryOptions?: ApiHelper.QueryOptions<Goal>,
  ): Promise<Goal[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/goals${buildOptions}`)
  }

  export function findOne(
    goalId: string,
    queryOptions?: ApiHelper.QueryOptions<Goal>,
  ): Promise<Goal> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/goals/${goalId}${buildOptions}`,
    )
  }

  export function createOne(
    goal: Partial<Goal>,
  ): Promise<Goal> {
    return HttpService.api.post(`/v1/goals`, goal)
  }

  export function updateOne(
    goalId: string,
    values: Partial<Goal>,
  ): Promise<Goal> {
    return HttpService.api.patch(
      `/v1/goals/${goalId}`,
      values,
    )
  }

  export function deleteOne(goalId: string): Promise<void> {
    return HttpService.api.delete(`/v1/goals/${goalId}`)
  }

export function findManyByUserId(
    userId: string,
    queryOptions?: ApiHelper.QueryOptions<Goal>,
  ): Promise<Goal[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/users/user/${userId}/goals${buildOptions}`,
    )
  }

  export function createOneByUserId(
    userId: string,
    values: Partial<Goal>,
  ): Promise<Goal> {
    return HttpService.api.post(
      `/v1/users/user/${userId}/goals`,
      values,
    )
  }

}
