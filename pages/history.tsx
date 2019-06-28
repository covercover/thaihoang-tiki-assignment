import React from 'react'
import BasicLayout from '../layouts/BasicLayout';
import History from '../components/History';
import {IPost} from '../components/Post';

interface IProps {

}

interface IState {
  historyDataSource: IPost[]
}

export default class Index extends React.PureComponent<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      historyDataSource: []
    }
  }
  componentDidMount(): void {
    const historyStorage = localStorage.getItem("history");
    if (historyStorage) {
      const historyDataSource = JSON.parse(historyStorage);
      this.setState({
        historyDataSource
      })
    }
  }

  render() {
    const {historyDataSource} = this.state;
    return (
      <BasicLayout>
        <History historyDataSource={historyDataSource} />
      </BasicLayout>
    )
  }
}
