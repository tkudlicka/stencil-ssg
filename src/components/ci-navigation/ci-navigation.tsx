import { Build, Component, h } from '@stencil/core';

@Component({
  tag: 'ci-navigation',
})
export class ciNavigation {
  render() {
    const isBrowser = Build.isBrowser || Build.isTesting;
    return (
      <div class="ciHeader-subNav-wrapper">
        <span class="ciHeader-subNav-item" id="solutionsLink">
          <span class="ciHeader-subNav-link">
            <span class="ciHeader-subNav-text js-ciHeader-track" data-section="solutions" data-link="solutions">
              Solutions
            </span>
          </span>
          {isBrowser && (
            <div> test </div>
          )}
        </span>
      </div>
    );
  }
}
