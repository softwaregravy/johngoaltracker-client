

import { User } from "../user"

import { Milestone } from "../milestone"

import { Resource } from "../resource"

export class Goal {

id: string

title: string

description?: string

year?: number

dateCreated: string

dateUpdated: string

dateDeleted: string

userId: string

user?: User

milestones?: Milestone[]

resources?: Resource[]

}
