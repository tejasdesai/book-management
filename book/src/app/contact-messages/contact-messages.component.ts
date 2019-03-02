import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
import {Http, Response} from '@angular/http';
import {HttpHeaders} from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact-messages',
  templateUrl: './contact-messages.component.html',
  styleUrls: ['./contact-messages.component.scss',
  	'../../assets/css/bootstrap3.css']
})
export class ContactMessagesComponent implements OnInit {

  messages:any[] = [];

  constructor(public http:Http) { 
    this.http = http;
  }

  ngOnInit() {
  	const headers = new HttpHeaders().set("Access-Control-Allow-Origin", "http://localhost/");

  	this.http.post("http://localhost/Book/processing.php?method=getmessages", '')
      .subscribe(
         data => {
            this.messages = JSON.parse(data.text().trim());
         },
         error => {
            console.log("Error", error);
         }
      );    
  }

  delete(e, messagenumber) {
  	const headers = new HttpHeaders().set("Access-Control-Allow-Origin", "http://localhost/");

  	var output: any = {
        "messagenumber": messagenumber
    };

  	this.http.post("http://localhost/Book/processing.php?method=deletemessage", output)
      .subscribe(
         data => {
            if(data.text().trim() == 'Message Deleted'){
            	var parent = document.getElementById('messages-table-body');
            	var child = document.getElementById('tr_'+messagenumber);
            	var garbage = parent.removeChild(child);
            	if(parent.childElementCount == 0){
            		document.getElementById('message-container').style.visibility = 'hidden';
            		document.getElementById('nomessage-container2').style.display = 'block';
            	}
            	alert("Message has been deleted.");
            	return false;
            }
         },
         error => {
            console.log("Error", error);
         }
      );
  }

}
