import clsx from 'clsx';
import { allSeries } from 'contentlayer/generated';
import { FormattedMessage } from 'react-intl';

import BlogListWithFilters from '~/components/blog/listing/BlogListingWithFilters';
import BlogBrowseSeries from '~/components/blog/series/BlogBrowseSeries';
import Heading from '~/components/ui/Heading';

import { getAllPosts } from '~/contentlayer/utils';

export default function BlogListingSection() {
  const blogs = getAllPosts({ sort: true });

  return (
    <div className="flex flex-col gap-y-4">
      <Heading className="text-xl font-semibold" level="custom">
        <FormattedMessage
          defaultMessage="Everything from the blog"
          description="Blog listing title for blog home page"
          id="hMx0CX"
        />
      </Heading>
      <div className="xl:grid xl:grid-cols-12 xl:gap-x-6">
        <div className="xl:col-span-9">
          <BlogListWithFilters
            blogs={blogs}
            layout="embedded"
            namespace="blog-listing"
          />
        </div>
        <aside
          className={clsx(
            'hidden h-full flex-col gap-y-12 xl:col-span-3 xl:flex',
          )}>
          <BlogBrowseSeries href="/blog/explore" seriesList={allSeries} />
        </aside>
      </div>
    </div>
  );
}