import type { TextAreaSize } from './TextArea';
import TextArea from './TextArea';
import UIExamplesGroup from '../misc/UIExamplesGroup';

const sizes: ReadonlyArray<TextAreaSize> = ['md', 'sm', 'xs'];

export default function TextAreaExamples() {
  return (
    <UIExamplesGroup darkMode="horizontal" gapSize="lg" title="Text Area">
      <div className="flex gap-x-12">
        {sizes.map((size) => (
          <TextArea
            key={size}
            label="Message"
            placeholder="Compliments only"
            size={size}
          />
        ))}
      </div>
      <TextArea
        description="Maximum of 200 characters"
        label="Message"
        placeholder="This is such a great product"
      />
      <TextArea
        errorMessage="Enter more than 4 words please"
        label="Message"
        placeholder="This is such a great product"
      />
      <TextArea
        isLabelHidden={true}
        label="Name"
        placeholder="Label is hidden"
      />
      <TextArea
        disabled={true}
        label="Disabled textarea"
        placeholder="You can't type here"
      />
      <TextArea
        label="Required textarea"
        placeholder="You shouldn't leave this empty"
        required={true}
      />
      <TextArea
        label="Resize horizontal"
        placeholder="You can resize this textarea horizontally"
        resize="horizontal"
      />
      <TextArea
        description="There's nothing to see here"
        descriptionStyle="tooltip"
        label="Description in tooltip"
        placeholder="You shouldn't leave this empty"
      />
    </UIExamplesGroup>
  );
}