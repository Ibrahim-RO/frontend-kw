'use client'

import { Switch } from '@base-ui/react/switch'
import { toast } from 'sonner'
import { useUpdateBlogPost } from '../hooks/useBlogMutations'
import type { BlogPost } from '../types'

export function BlogPublishSwitch({ post }: { post: BlogPost }) {
  const updateMutation = useUpdateBlogPost(post.blog_id)
  const isPublished = post.status === 'publicado'

  const handleChange = (checked: boolean) => {
    updateMutation.mutate(
      { status: checked ? 'publicado' : 'borrador' },
      {
        onSuccess: () => toast.success(checked ? 'Entrada publicada' : 'Entrada pasada a borrador'),
        onError: () => toast.error('No se pudo cambiar el estado'),
      },
    )
  }

  return (
    <label className="flex w-fit cursor-pointer items-center gap-2">
      <Switch.Root
        checked={isPublished}
        onCheckedChange={handleChange}
        disabled={updateMutation.isPending}
        className="relative inline-flex h-5 w-9 shrink-0 items-center rounded-full border border-input bg-muted transition-colors data-[checked]:border-primary data-[checked]:bg-primary disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Switch.Thumb className="block size-3.5 translate-x-0.5 rounded-full bg-background shadow transition-transform data-[checked]:translate-x-4" />
      </Switch.Root>
      <span className="text-xs font-medium text-muted-foreground">
        {isPublished ? 'Publicado' : 'Borrador'}
      </span>
    </label>
  )
}
