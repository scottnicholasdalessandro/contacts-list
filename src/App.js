import React, {Component} from 'react';
import ListContacts from './ListContacts';
import * as ContactsAPI from './utils/ContactsAPI';
import CreateContact from './CreateContact';
import {Route} from 'react-router-dom';

class App extends Component {
  state = {contacts: []};

  componentDidMount() {
    ContactsAPI.getAll().then(contacts => {
      this.setState({contacts});
    });
  }

  removeContact = contact => {
    this.setState(state => ({
      contacts: state.contacts.filter(c => {
        return c.id !== contact.id;
      })
    }));

    ContactsAPI.remove(contact); // return not needed, feels a little hacky
    // the promise can also return to the .then and then setState is called.
    // that feels a little safer...
  };

  createContact = contact => {
    ContactsAPI.create(contact).then(savedContact => {
      this.setState(state => {
        {
          contacts: state.contacts.concat([savedContact]);
        }
      });
    });
  };

  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => <ListContacts contacts={this.state.contacts} onDeleteContact={this.removeContact} />}
        />
        <Route
          path="/create"
          render={({history}) => (
            <CreateContact
              onCreateContact={contact => {
                this.createContact(contact);
                history.path('/');
              }}
            />
          )}
        />
      </div>
    );
  }
}

export default App;
