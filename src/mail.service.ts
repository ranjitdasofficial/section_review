// mail.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as ejs from 'ejs';
import * as path from 'path';
import { MailerService } from '@nestjs-modules/mailer';



@Injectable()
export class MyMailService {
  constructor(private readonly mailService:MailerService){
    
  }

  async sendOtpVerificationEmail(to: string, otpCode: string,username:string,verifyLink:string) {
  
    const data = {
      username: username,
      otpCode: otpCode,
      verifyLink: verifyLink,
    };

    console.log(data);
    await this.mailService.sendMail({
      to: to,
      subject: 'Otp Verification',
      template: 'otp-verification', // Name of your template file without extension
      context: data,
    }).then((d)=>{
      console.log("Email Has been Sent",d);
    }).catch((err)=>{
      console.log(err);
    });



    



}

async sendPassReset(to: string, resetLink:string,username:string) {
 
  await this.mailService.sendMail({
    to: to,
    subject: 'Password Reset',
    template: 'reset-password', // Name of your template file without extension
    context: {
     username:username,
     resetLink:resetLink
    },
  }).then((d)=>{
    console.log("Eail Has been Sent",d);
  }).catch((err)=>{
    console.log(err);
  });
      
}

async sendAccountCreated(data:{email:string,name:string,branch:string,year:string,activateLink:string}) {
  await this.mailService.sendMail({
    to: data.email,
    subject: 'Account Created!',
    template: 'register-done', // Name of your template file without extension
    context:data,
  }).then(()=>{
    console.log("Email Has been Sent");
  }).catch((err)=>{
    console.log(err);
  });


}



async sendPaymentConfirmation(data:{email:string,name:string,branch:string,year:string,amount:string,paymentDate:string}) {
    await this.mailService.sendMail({
      to: data.email,
      subject: 'Payment Confirmation!',
      template: 'payment-confirmation', // Name of your template file without extension
      context:data,
    }).then(()=>{
      console.log("Email Has been Sent");
    }).catch((err)=>{
      console.log(err);
    });
  
  
  }


async sendAccountActivated(data:{email:string,name:string,branch:string,year:string}) {
    await this.mailService.sendMail({
      to: data.email,
      subject: 'Account Activated',
      template: 'account-activated', // Name of your template file without extension
      context:data,
    }).then(()=>{
      console.log("Email Has been Sent");
    }).catch((err)=>{
      console.log(err);
    });
  
  
  }


async passwordChanged(to: string,username:string) {
  await this.mailService.sendMail({
    to: to,
    subject: 'Password Changed!',
    template: 'password-changed', // Name of your template file without extension
    context: {
     username:username,
   
    },
  }).then(()=>{
    console.log("Eail Has been Sent");
  }).catch((err)=>{
    console.log(err);
  });
}


}