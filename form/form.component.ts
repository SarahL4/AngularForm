import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
//import { AngularFirestore } from '@angular/fire/firestore';
//import { tap,first } from 'rxjs/operators';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
    myForm: FormGroup;
    // Form state
    loading = false;
    success = false;

    constructor(private fb: FormBuilder) { }

    ngOnInit() {
        //const phone = this.fb.group({
        //    area: [],
        //    prefix: [],
        //    line:[],
        //})

        this.myForm = this.fb.group({
            email: ['', [Validators.required,
                Validators.email,
                Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')
            ]],
             age: [null, [
                Validators.minLength(2),
                Validators.min(18),
                Validators.max(65),
            ]],
            phones: this.fb.array([]),
            message: 'Default message',
            agree: [false, [
            Validators.requiredTrue]] //Checkbox
           
        })

        //this.myForm = this.fb.group({
        //            email: '',
        //            //homePhone: phone,
        //            //cellphone:phone,
        //            phones: this.fb.array([]),
        //    message: 'Default message',
        //        })

        
        this.myForm.valueChanges.subscribe(console.log);

    }   //ngOnInit

    get email() {
        return this.myForm.get('email');
    }

    get age() {
        return this.myForm.get('age');
    }
   
    get phoneForms() {
        return this.myForm.get('phones') as FormArray
    }
    get message() {
        return this.myForm.get('message');
    }

    addPhone() {
        const phone = this.fb.group({
            area: [],
            prefix: [],
            line:[],
        })

        this.phoneForms.push(phone);
    }

    deletePhone(i) {
        this.phoneForms.removeAt(i);
    }

    submitHandler() {
        this.loading = true;
        const formValue = this.myForm.value;
        try {
            //await this.afs.collection('contacts').add(formValue);
            this.success = true;
        } catch (err) {
            console.error(err);
        }
        this.loading = false;
    }




} // Class


// valid, invalid, Dirty(has typed in), Pristine(touch the form and left), Touched, Untouched, Pending
