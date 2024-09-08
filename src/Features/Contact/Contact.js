import React from 'react'

import { Title } from '../../components/Title/Title'

import { TextInput } from '../../components/TextInput/TextInput'

import { TextArea } from '../../components/TextArea/TextArea';

import { TextButton } from '../../components/Buttons/TextButton/TextButton';

import { Error } from '../../components/Error/Error';

import { MessageSentIndicator } from '../../components/MessageSentIndicator/MessageSentIndicator';

import "./Contact.css";

export const Contact = () => {

    const [sent, toggleSent] = React.useState(false);

    const [error, toggleError] = React.useState(false);

    const [errorMessage, setErrorMessage] = React.useState("");

    const [name, setName] = React.useState("");

    const [email, setEmail] = React.useState("");

    const [message, setMessage] = React.useState("");

    const [nameError, setNameError] = React.useState();

    const [emailError, setEmailError] = React.useState();

    const [messageError, setMessageError] = React.useState();

    const encode = (data) => {
        return Object.keys(data)
          .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
          .join("&");
    };

    const handleSubmit = (e) => {
        try {
            
            e.preventDefault();

            setNameError(null);

            setEmailError(null);

            setMessageError(null);

            toggleError(false);

            if (name.length === 0) {
                setNameError("Name input cannot be empty");
                return;
            }

            if (!email.includes('.') || !email.includes('@') || email.length === 0) {
                setEmailError("Invalid email")
                return;
            }

            if (message.length < 10) {
                setMessageError("Message input cannot be less than 10 characters long")
                return;
            }



            fetch("/", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: encode({"form-name": "contact-form", "name": name, "email": email, "message": message})
            }).then(() => {
                setName("")
                setEmail("")
                setMessage("")
                setNameError(null);

                setEmailError(null);

                setMessageError(null);

                toggleError(false);
                toggleSent(true);
            }).catch(error => {
                setNameError(null);

                setEmailError(null);

                setMessageError(null);

                toggleError(false);
                setName("")
                setEmail("")
                setMessage("")

                toggleError(true);
                setErrorMessage("Fatal error occured sending message");
            })
        } catch (error) {
            console.log(error)
            toggleError(true);
            setErrorMessage("Fatal error occured sending message");
            
        }
    }

    return (
        <div className='page contact'>
            <Title title={"CONTACT"} subTitle={"FREE QUOTES AVAILABLE"} />
            <form action="/" data-netlify="true" id="contact" name="contact-form" onSubmit={handleSubmit}>
                {
                sent ?
                <MessageSentIndicator />
                :
                <>
                <TextInput error={nameError} value={name} action={(e) => {setName(e.target.value)}} id={"NAME"} placeholder='NAME' />
                <TextInput error={emailError} value={email} action={(e) => {setEmail(e.target.value)}} margin="10px 0px" id="EMAIL" placeholder='EMAIL' />
                <TextArea error={messageError} value={message} action={(e) => {setMessage(e.target.value)}} placeholder='MESSAGE' id={"MESSAGE"} />
                <TextButton type='submit' margin={"10px 0px 0px 0px"} name={"SEND"}  />
                <Error error={error} errorMessage={errorMessage} />
                </>
                }
                <div className='email-wrapper'>
                <h3>OR</h3>
                <a href='mailto:norxwestdesigns@gmail.com'>NORXWESTDESIGNS@GMAIL.COM</a>
                </div>
            </form>
        </div>
    )
}
