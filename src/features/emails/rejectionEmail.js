import React, { useEffect } from 'react';
import emailjs from 'emailjs-com';


const rejectionEmail = (data) => {
        emailjs.send('service_7ol4swv', 'template_9kdj6l7', data, '-B50MNJykeVYwvBbj')
            .then((result) => {
                // window.location.reload()  //This is if you still want the page to reload (since e.preventDefault() cancelled that behavior) 
            }, (error) => {
                console.log(error.text);
            });
}

export default rejectionEmail
