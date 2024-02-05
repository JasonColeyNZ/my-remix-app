// import type { EventBinding, EventOptions } from './event-types';
type EventOptions = {
  passive?: boolean;
  capture?: boolean;
  // sometimes an event might only event want to be bound once
  once?: boolean;
};

type EventBinding = {
  eventName: string;
  fn: EventListenerOrEventListenerObject;
  options?: EventOptions;
};

type UnbindFn = () => void;

function getOptions(
  shared?: EventOptions,
  fromBinding?: EventOptions,
): EventOptions {
  return {
    ...shared,
    ...fromBinding,
  };
}

export default function bindEvents(
  el: HTMLElement | Window,
  bindings: EventBinding[],
  sharedOptions?: EventOptions,
): Function {
  const unbindings: UnbindFn[] = bindings.map(
    (binding: EventBinding): UnbindFn => {
      const options: Object = getOptions(sharedOptions, binding.options);

      // console.log("binding", binding.eventName, binding.fn, options);
      el.addEventListener(binding.eventName, binding.fn, options);

      return function unbind() {
        console.log("unbinding", binding.eventName, binding.fn, options);
        el.removeEventListener(binding.eventName, binding.fn, options);
      };
    },
  );

  // Return a function to unbind events
  return function unbindAll() {
    unbindings.forEach((unbind: UnbindFn) => {
      unbind();
    });
  };
}
