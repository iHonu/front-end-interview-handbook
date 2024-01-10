import { useState } from 'react';

import Prose from '~/components/ui/Prose';

import SlideOut from './SlideOut';
import Button from '../Button';
import UIExamplesGroup from '../misc/UIExamplesGroup';

function Contents() {
  return (
    <Prose>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Magna etiam tempor
        orci eu lobortis elementum. In massa tempor nec feugiat nisl pretium.
        Habitant morbi tristique senectus et. Dictum at tempor commodo
        ullamcorper. Egestas tellus rutrum tellus pellentesque eu tincidunt
        tortor aliquam nulla. Cras sed felis eget velit aliquet sagittis id
        consectetur purus. Sem nulla pharetra diam sit amet nisl suscipit
        adipiscing bibendum. Tortor pretium viverra suspendisse potenti nullam
        ac tortor vitae. Magna eget est lorem ipsum.
      </p>
      <p>
        Non enim praesent elementum facilisis. Mattis aliquam faucibus purus in.
        Augue ut lectus arcu bibendum at varius vel pharetra. Tempor orci eu
        lobortis elementum nibh tellus molestie nunc non. Lorem sed risus
        ultricies tristique nulla. Egestas integer eget aliquet nibh. Varius
        quam quisque id diam vel quam elementum. Facilisis leo vel fringilla est
        ullamcorper eget nulla facilisi. Pulvinar neque laoreet suspendisse
        interdum consectetur libero id faucibus nisl. Blandit turpis cursus in
        hac habitasse platea dictumst. Massa vitae tortor condimentum lacinia
        quis vel. Egestas diam in arcu cursus euismod quis viverra nibh cras.
        Vel elit scelerisque mauris pellentesque pulvinar. Quis auctor elit sed
        vulputate mi sit amet mauris.
      </p>
    </Prose>
  );
}

export default function SlideOutExamples() {
  const [isShownStart, setIsShownStart] = useState(false);
  const [isShownEnd, setIsShownEnd] = useState(false);
  const [isShownDark, setIsShownDark] = useState(false);

  return (
    <UIExamplesGroup darkMode="none" title="Slide Out">
      <div className="flex gap-x-24">
        <Button
          label="Enter From Left"
          variant="primary"
          onClick={() => setIsShownStart(true)}
        />
        <SlideOut
          enterFrom="start"
          isShown={isShownStart}
          primaryButton={
            <Button
              label="Primary Action"
              size="md"
              variant="primary"
              onClick={() => setIsShownStart(false)}
            />
          }
          secondaryButton={
            <Button
              label="Secondary Action"
              size="md"
              variant="secondary"
              onClick={() => setIsShownStart(false)}
            />
          }
          size="md"
          title="Lorem Ipsum"
          onClose={() => setIsShownStart(false)}>
          <Contents />
        </SlideOut>
        <Button
          label="Enter From Right"
          variant="primary"
          onClick={() => setIsShownEnd(true)}
        />
        <SlideOut
          isShown={isShownEnd}
          primaryButton={
            <Button
              label="Primary Action"
              size="md"
              variant="primary"
              onClick={() => setIsShownEnd(false)}
            />
          }
          secondaryButton={
            <Button
              label="Secondary Action"
              size="md"
              variant="secondary"
              onClick={() => setIsShownEnd(false)}
            />
          }
          size="md"
          title="Lorem Ipsum"
          onClose={() => setIsShownEnd(false)}>
          <Contents />
        </SlideOut>
        <Button
          label="Dark Mode"
          variant="primary"
          onClick={() => setIsShownDark(true)}
        />
        <SlideOut
          dark={true}
          enterFrom="start"
          isShown={isShownDark}
          primaryButton={
            <Button
              label="Primary Action"
              size="md"
              variant="primary"
              onClick={() => setIsShownDark(false)}
            />
          }
          secondaryButton={
            <Button
              label="Secondary Action"
              size="md"
              variant="secondary"
              onClick={() => setIsShownDark(false)}
            />
          }
          size="md"
          title="Lorem Ipsum"
          onClose={() => setIsShownDark(false)}>
          <Contents />
        </SlideOut>
      </div>
    </UIExamplesGroup>
  );
}