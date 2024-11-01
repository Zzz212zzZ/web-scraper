import type { Prisma, Blog } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.BlogCreateArgs>({
  blog: {
    one: {
      data: {
        source: 'String',
        url: 'String',
        title: 'String',
        htmlContent: 'String',
      },
    },
    two: {
      data: {
        source: 'String',
        url: 'String',
        title: 'String',
        htmlContent: 'String',
      },
    },
  },
})

export type StandardScenario = ScenarioData<Blog, 'blog'>
