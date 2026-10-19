const FOCUSABLE_SELECTOR =
  'button, a[href], input, textarea, select, video[controls], [tabindex]:not([tabindex="-1"])';

export function trapFocus(event: KeyboardEvent, container: HTMLElement): void {
  const focusableElements =
    container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
  if (focusableElements.length === 0) return;
  const first = focusableElements[0];
  const last = focusableElements[focusableElements.length - 1];

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}
