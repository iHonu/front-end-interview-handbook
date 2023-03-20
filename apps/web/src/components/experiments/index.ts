import jsCookie from 'js-cookie';

export type ABExperiment = {
  getValue: () => string;
  isRunning: boolean;
  loggingPrefix: string;
  name: string;
  variants: {
    a: string;
    b: string;
  };
};

export const currentExperiment: ABExperiment = {
  getValue() {
    return jsCookie.get(currentExperiment.name) ?? currentExperiment.variants.a;
  },
  isRunning: false,
  loggingPrefix: '',
  name: 'gfe:dec_2022_qns',
  variants: {
    a: 'old',
    b: 'new',
  },
};
