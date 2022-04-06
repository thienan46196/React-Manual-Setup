import { Person, impMyFn } from './interfaces';

import { Component } from 'react';
import React from 'react';

class ABC extends Component<any, any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      person: new Person()
    };
  }

  componentDidMount() {
    this.setState({ person: new Person('An', 'Truong') });
  }

  handleUpdate = () => {
    this.setState({ person: new Person('Khue', 'Truong', 'An') });
  };

  render() {
    console.log(
      impMyFn(this.state.person.name, this.state.person.surName, this.state.person.middleName)
    );

    return (
      <div className={'container'}>
        <span style={{ color: 'red' }}>
          {impMyFn(this.state.person.name, this.state.person.surName, this.state.person.middleName)}
          {/* ABC */}
        </span>
      </div>
    );
  }
}

export default ABC;
