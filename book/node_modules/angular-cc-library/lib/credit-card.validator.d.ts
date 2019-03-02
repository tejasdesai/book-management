import { AbstractControl, ValidationErrors } from '@angular/forms';
export declare class CreditCardValidator {
    static validateCCNumber(control: AbstractControl): ValidationErrors | null;
    static validateExpDate(control: AbstractControl): ValidationErrors | null;
}
