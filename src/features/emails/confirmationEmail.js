import React, { useEffect } from 'react';
import emailjs from '@emailjs/browser'

const confirmationEmail = (data) => {
    emailjs.send('service_7ol4swv', 'template_hvfdzdd', data, '-B50MNJykeVYwvBbj')
        .then((result) => {
            // window.location.reload()  //This is if you still want the page to reload (since e.preventDefault() cancelled that behavior) 
        }, (error) => {
            console.log(error.text);
        });
}

export default confirmationEmail
