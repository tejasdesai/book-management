import { ElementRef } from '@angular/core';
export declare class ExpiryFormatDirective {
    private el;
    target: any;
    constructor(el: ElementRef);
    onKeypress(e: any): boolean;
    onKeydown(e: any): void;
    onChange(e: any): void;
    onInput(e: any): void;
    private formatExpiry(e);
    private formatForwardSlashAndSpace(e);
    private formatForwardExpiry(e);
    private formatBackExpiry(e);
    private reformatExpiry(e);
}
