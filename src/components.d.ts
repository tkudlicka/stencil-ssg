/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface CiHeader {
    }
    interface CiNavigation {
    }
}
declare global {
    interface HTMLCiHeaderElement extends Components.CiHeader, HTMLStencilElement {
    }
    var HTMLCiHeaderElement: {
        prototype: HTMLCiHeaderElement;
        new (): HTMLCiHeaderElement;
    };
    interface HTMLCiNavigationElement extends Components.CiNavigation, HTMLStencilElement {
    }
    var HTMLCiNavigationElement: {
        prototype: HTMLCiNavigationElement;
        new (): HTMLCiNavigationElement;
    };
    interface HTMLElementTagNameMap {
        "ci-header": HTMLCiHeaderElement;
        "ci-navigation": HTMLCiNavigationElement;
    }
}
declare namespace LocalJSX {
    interface CiHeader {
    }
    interface CiNavigation {
    }
    interface IntrinsicElements {
        "ci-header": CiHeader;
        "ci-navigation": CiNavigation;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "ci-header": LocalJSX.CiHeader & JSXBase.HTMLAttributes<HTMLCiHeaderElement>;
            "ci-navigation": LocalJSX.CiNavigation & JSXBase.HTMLAttributes<HTMLCiNavigationElement>;
        }
    }
}
