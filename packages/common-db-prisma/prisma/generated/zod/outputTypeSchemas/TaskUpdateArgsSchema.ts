import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { TaskIncludeSchema } from '../inputTypeSchemas/TaskIncludeSchema'
import { TaskUpdateInputSchema } from '../inputTypeSchemas/TaskUpdateInputSchema'
import { TaskUncheckedUpdateInputSchema } from '../inputTypeSchemas/TaskUncheckedUpdateInputSchema'
import { TaskWhereUniqueInputSchema } from '../inputTypeSchemas/TaskWhereUniqueInputSchema'
import { WechatUserArgsSchema } from "../outputTypeSchemas/WechatUserArgsSchema"
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const TaskSelectSchema: z.ZodType<Prisma.TaskSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  title: z.boolean().optional(),
  description: z.boolean().optional(),
  status: z.boolean().optional(),
  ownerId: z.boolean().optional(),
  notes: z.boolean().optional(),
  owner: z.union([z.boolean(),z.lazy(() => WechatUserArgsSchema)]).optional(),
}).strict()

export const TaskUpdateArgsSchema: z.ZodType<Prisma.TaskUpdateArgs> = z.object({
  select: TaskSelectSchema.optional(),
  include: TaskIncludeSchema.optional(),
  data: z.union([ TaskUpdateInputSchema,TaskUncheckedUpdateInputSchema ]),
  where: TaskWhereUniqueInputSchema,
}).strict() ;

export default TaskUpdateArgsSchema;
