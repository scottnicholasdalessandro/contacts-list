import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import ImageInput from './ImageInput';
import serializeForm from 'form-serialize';

class CreateContact extends React.Component {
  handleSubmit(e){
    e.preventDefault();
    
    const contact = serializeForm(e.target, {hash:true});
    console.log(this);
    this.props.onCreateContact(contact);
  }
  render() {
    return (
      <div>
        <Link className="close-create-contact" to="/">
          Close
        </Link>
        <form onSubmit={this.handleSubmit}className="create-contact-form">
          <ImageInput className="create-contact-avatar-input" name="avatarURL" maxHeight={64} />
          <div className="create-contact-details">
            <input type="text" placeholder="Name" name="name" />
            <input type="text" placeholder="Email" name="email" />
            <button>Add Contact</button>
          </div>
        </form>
      </div>
    );
  }
}

export default CreateContact;
