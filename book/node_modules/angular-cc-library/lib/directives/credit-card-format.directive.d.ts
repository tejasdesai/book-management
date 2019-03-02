import { ElementRef } from '@angular/core';
export declare class CreditCardFormatDirective {
    private el;
    target: any;
    private cards;
    constructor(el: ElementRef);
    onKeypress(e: any): boolean;
    onKeydown(e: any): void;
    onKeyup(e: any): void;
    onPaste(e: any): void;
    onChange(e: any): void;
    onInput(e: any): void;
    private formatCardNumber(e);
    private formatBackCardNumber(e);
    private setCardType(e);
    private reFormatCardNumber(e);
}
