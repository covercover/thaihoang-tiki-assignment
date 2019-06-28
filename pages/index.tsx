import React from 'react'
import {fetchPostListRequest} from '../utils/post/actions';
import PostContainer from '../components/Post';
import BasicLayout from '../layouts/BasicLayout';

export default class Index extends React.Component {
  static getInitialProps(props) {
    const { store } = props;
    const defaultDomain = 'nytimes.com';
    const defaultPageSize = 10;

    // Load nytimes.com by default
    const payload = {
      domains: defaultDomain,
      pageSize: defaultPageSize,
      page: 1
    };
    store.dispatch(fetchPostListRequest(payload));
    return {
      defaultDomain,
      pageSize: defaultPageSize
    }
  }

  render() {
    return (
      <BasicLayout>
        <PostContainer {...this.props}/>
      </BasicLayout>
    )
  }
}
