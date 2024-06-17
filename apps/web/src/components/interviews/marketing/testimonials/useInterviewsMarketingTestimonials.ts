import type { InterviewsMarketingTestimonial } from './InterviewsMarketingTestimonialCard';
import { useInterviewsMarketingTestimonialsDict } from './InterviewsMarketingTestimonials';

export function useInterviewsMarketingTestimonials(
  showAll = false,
  columns = 3,
) {
  const testimonialsObjects = useInterviewsMarketingTestimonialsDict();

  const testimonials: ReadonlyArray<InterviewsMarketingTestimonial> = showAll
    ? Object.values(testimonialsObjects).sort((a, b) =>
        a.createdAt < b.createdAt ? 1 : -1,
      )
    : [
        testimonialsObjects.edWang,
        testimonialsObjects.lucaVaccarini,
        testimonialsObjects.chenweiZhang,
        testimonialsObjects.shoaibAhmed,
        testimonialsObjects.pratikMehta,
        testimonialsObjects.alan,
        testimonialsObjects.luke,
        testimonialsObjects.larry,
        testimonialsObjects.ryan,
        testimonialsObjects.nafis,
        testimonialsObjects.ismail,
        testimonialsObjects.anand,
        testimonialsObjects.yuChienChan,
        testimonialsObjects.jacky,
        testimonialsObjects.prashanth,
        testimonialsObjects.gouseBasha,
      ];

  const testimonialColumns: ReadonlyArray<{
    charCount: number;
    items: Array<InterviewsMarketingTestimonial>;
  }> = Array.from({ length: columns }).map((_) => ({
    charCount: 0,
    items: [],
  }));

  testimonials.forEach((testimonial) => {
    let smallestColumn = 0;

    for (let i = 1; i < columns; i++) {
      if (
        testimonialColumns[i].charCount <
        testimonialColumns[smallestColumn].charCount
      ) {
        smallestColumn = i;
      }
    }

    testimonialColumns[smallestColumn].items.push(testimonial);
    testimonialColumns[smallestColumn].charCount +=
      testimonial.testimonial.length;
  });

  return testimonialColumns.map(({ items }) => items).flat();
}
