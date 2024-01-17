import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Resource } from './resource.model'

export namespace ResourceApi {
  export function findMany(
    queryOptions?: ApiHelper.QueryOptions<Resource>,
  ): Promise<Resource[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/resources${buildOptions}`)
  }

  export function findOne(
    resourceId: string,
    queryOptions?: ApiHelper.QueryOptions<Resource>,
  ): Promise<Resource> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/resources/${resourceId}${buildOptions}`,
    )
  }

  export function createOne(
    resource: Partial<Resource>,
  ): Promise<Resource> {
    return HttpService.api.post(`/v1/resources`, resource)
  }

  export function updateOne(
    resourceId: string,
    values: Partial<Resource>,
  ): Promise<Resource> {
    return HttpService.api.patch(
      `/v1/resources/${resourceId}`,
      values,
    )
  }

  export function deleteOne(resourceId: string): Promise<void> {
    return HttpService.api.delete(`/v1/resources/${resourceId}`)
  }

export function findManyByGoalId(
    goalId: string,
    queryOptions?: ApiHelper.QueryOptions<Resource>,
  ): Promise<Resource[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/goals/goal/${goalId}/resources${buildOptions}`,
    )
  }

  export function createOneByGoalId(
    goalId: string,
    values: Partial<Resource>,
  ): Promise<Resource> {
    return HttpService.api.post(
      `/v1/goals/goal/${goalId}/resources`,
      values,
    )
  }

}
