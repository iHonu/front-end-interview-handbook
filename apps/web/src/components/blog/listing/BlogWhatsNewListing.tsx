'use client';

import { useState } from 'react';

import type { BlogMetadata, BlogViewField } from '~/components/blog/BlogTypes';
import BlogViewDropdown from '~/components/blog/filters/BlogViewDropdown';
import BlogList from '~/components/blog/filters/items/BlogList';
import BlogCountLabel from '~/components/blog/metadata/BlogCountLabel';

type Props = Readonly<{
  blogs: ReadonlyArray<BlogMetadata>;
}>;

export default function BlogWhatsNewListing({ blogs }: Props) {
  const [viewField, setViewField] = useState<BlogViewField>('article');

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex items-center justify-between gap-4">
        <BlogCountLabel count={blogs.length} showIcon={true} />
        <BlogViewDropdown viewField={viewField} onChange={setViewField} />
      </div>
      <BlogList posts={blogs} view={viewField} />
    </div>
  );
}
