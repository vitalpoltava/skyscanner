import React from 'react';

import STYLES from './App.scss';
import Header from './../Header';
import Loading from './../Loading';
import List from './../List';
import Direction from './../Direction';
import TableHeader from './../TableHeader';

import configs from './../../service/configs';
import service from './../../service/service';

const c = className => STYLES[className] || 'UNKNOWN';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      data: null,
    };
  }

  componentDidMount() {
    this.initialLoad();
  }

  initialLoad() {
    this.setState({ isLoading: true });

    // Initial data load
    service.getData(configs.initialParams)
      .then((data) => {
        this.setState({ data });
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }

  render() {
    return (
      <div className={c('App-gray-background')}>
        <Header />
        <Direction config={configs} />
        <TableHeader />
        <main className={c('App__main')}>
          <Loading isLoading={this.state.isLoading} />
          <List data={this.state.data} />
        </main>
      </div>
    );
  }
}

export default App;
