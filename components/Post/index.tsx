import React from 'react';
import {Dispatch} from 'redux';
import { connect } from 'react-redux';
import { Layout, Row, Col, Spin } from 'antd';
import {withRouter} from 'next/router';
import styled from 'styled-components';
import {actionTypes} from '../../utils/post/actions';
import FilterDataSource from '../../components/Filter';
import InfiniteScroll from "react-infinite-scroll-component";
import PostTile, {IPost} from './PostTile';
import {formatTimePost} from '../../utils/formatTimePost';

const StyledContentWrapper = styled(Layout)`
	width: 1200px;
	margin: 0 auto;
	padding-top: 40px;
	background: white;
	
  /* Extra small devices (phones, 600px and down) */
  @media only screen and (max-width: 600px) {
    width: 100%;
  } 
  
  /* Small devices (portrait tablets and large phones, 600px and up) */
  @media only screen and (min-width: 600px) {
    width: 100%;
  } 
  
  /* Medium devices (landscape tablets, 768px and up) */
  @media only screen and (min-width: 768px) {
    width: 100%;
    padding: 40px 50px 0 50px;
  } 
  
  /* Large devices (laptops/desktops, 992px and up) */
  @media only screen and (min-width: 992px) {
    width: 100%;
    padding: 40px 50px 0 50px;
  } 
  
  @media only screen and (min-width: 1200px) {
    width: 1200px;
    padding: 40px 0;
  }
`;

interface IProps {
  searchPostsStatus: any,
  posts: IPost[],
  pageSize: number,
  defaultDomain: string
  dispatch: Dispatch
}

interface IState {
  list: object[],
  page: number,
  domain: string
}

export interface IPost {
  source: IPostSource,
  title: string,
  description: string,
  url: string,
  urlToImage: string,
  publishedAt: string
}

interface IPostSource {
  id: string,
  name: string
}

interface IResponse {
  status: string,
  totalResults: number
  articles: IPost[]
}

const LoadingWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
`;

class Home extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      list: props.posts || [],
      page: 1,
      domain: props.defaultDomain
    }
  }

  handleChangeDomain = domain => {
    this.setState({
      domain
    }, async () => {
      const payload = {
        domains: this.state.domain,
        pageSize: this.props.pageSize,
        page: 1
      };
      await this.getData(actionTypes.FETCH_POST_LIST_REQUEST, payload);
    });
  };

  getData = (actionTypes, params) => {
    return new Promise((resolve, reject) => {
      this.props.dispatch({
        type: actionTypes,
        payload: params,
        resolve,
        reject
      })
    })
  };

  fetchMoreData = () => {
    this.setState((prevState) => {
      return {
        page: prevState.page + 1
      }
    }, () => {
      const payload = {
        domains: this.state.domain,
        pageSize: this.props.pageSize,
        page: this.state.page
      };
      this.getData(actionTypes.LOAD_MORE_POST_LIST_REQUEST, payload).then((res: IResponse) => {
        if (res) {
          const posts = formatTimePost(res.articles);
          this.props.dispatch({
            type: actionTypes.LOAD_MORE_POST_LIST_REQUEST,
            payload: posts,
          });
          this.setState(
            {},
            () => {
              // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
              // In real scene, you can using public method of react-virtualized:
              // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
              window.dispatchEvent(new Event('resize'));
            },
          );
        }
      })
    })
  };

  render() {
    const {defaultDomain, posts, searchPostsStatus} = this.props;
    return (
      <Row>
        <Col span={24}>
          <Layout style={{background: 'white'}}>
            <StyledContentWrapper>
              <FilterDataSource
                defaultDomain={defaultDomain}
                handleChangeDomain={this.handleChangeDomain}
              />
              {searchPostsStatus.loading ? (
                <LoadingWrapper><Spin size="large" tip="Searching..."/></LoadingWrapper>
              ) : (
                <InfiniteScroll
                  dataLength={posts.length}
                  next={this.fetchMoreData}
                  hasMore={true}
                  loader={<LoadingWrapper><Spin size="large" tip="Loading..."/></LoadingWrapper>}
                >
                  {posts.map((item, index) => (
                    <PostTile key={index} post={item}/>
                  ))}
                </InfiniteScroll>
              )}
            </StyledContentWrapper>
          </Layout>
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = ({postsReducer}) => {
  return {
    posts: postsReducer.posts,
    fetchPostsStatus: postsReducer.fetchPostsStatus,
    searchPostsStatus: postsReducer.searchPostsStatus
  }
};

export default connect(mapStateToProps)(withRouter(Home));
