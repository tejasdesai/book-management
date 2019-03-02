import { ElementRef } from '@angular/core';
export declare class CvcFormatDirective {
    private el;
    target: any;
    constructor(el: ElementRef);
    onKeypress(e: any): void;
    onPaste(e: any): void;
    onChange(e: any): void;
    onInput(e: any): void;
    private reformatCvc(e);
}
