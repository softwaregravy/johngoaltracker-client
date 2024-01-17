

import { Goal } from "../goal"

import { Progress } from "../progress"

export class Milestone {

id: string

title: string

description?: string

quarter?: number

dateCreated: string

dateUpdated: string

dateDeleted: string

goalId: string

goal?: Goal

progresss?: Progress[]

}
