import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Progress } from './progress.model'

export namespace ProgressApi {
  export function findMany(
    queryOptions?: ApiHelper.QueryOptions<Progress>,
  ): Promise<Progress[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/progresss${buildOptions}`)
  }

  export function findOne(
    progressId: string,
    queryOptions?: ApiHelper.QueryOptions<Progress>,
  ): Promise<Progress> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/progresss/${progressId}${buildOptions}`,
    )
  }

  export function createOne(
    progress: Partial<Progress>,
  ): Promise<Progress> {
    return HttpService.api.post(`/v1/progresss`, progress)
  }

  export function updateOne(
    progressId: string,
    values: Partial<Progress>,
  ): Promise<Progress> {
    return HttpService.api.patch(
      `/v1/progresss/${progressId}`,
      values,
    )
  }

  export function deleteOne(progressId: string): Promise<void> {
    return HttpService.api.delete(`/v1/progresss/${progressId}`)
  }

export function findManyByMilestoneId(
    milestoneId: string,
    queryOptions?: ApiHelper.QueryOptions<Progress>,
  ): Promise<Progress[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/milestones/milestone/${milestoneId}/progresss${buildOptions}`,
    )
  }

  export function createOneByMilestoneId(
    milestoneId: string,
    values: Partial<Progress>,
  ): Promise<Progress> {
    return HttpService.api.post(
      `/v1/milestones/milestone/${milestoneId}/progresss`,
      values,
    )
  }

}
