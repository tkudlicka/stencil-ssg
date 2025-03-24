import { Build, Component, h } from '@stencil/core';

@Component({
  tag: 'ci-header',
})
export class Header {
  render() {
    return (
      <div class="ciHeader">
        <div class="ciHeader-overlay" />
        <div class="ciHeader-navigation">
          <div class="ciHeader-main-wrapper">
            <div class="ciHeader-subNav">
              {
                Build.isBrowser && (
                  <ci-navigation></ci-navigation>
                )
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
