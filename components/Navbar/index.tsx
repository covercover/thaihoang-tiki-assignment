import React from 'react';
import Link from 'next/link';
import styled from "styled-components";
import {Layout, Input, Menu, Dropdown, Icon} from "antd";
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import {withRouter} from 'next/router';
import debounce from 'lodash/debounce';
import {actionTypes} from '../../utils/post/actions';

const {Header} = Layout;
const {Item} = Menu;
const { Search } = Input;

const StyledHeaderWrapper = styled(Header)`
	position: relative;
  height: 64px;
  padding: 0;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  z-index: 10;
  transition: all .3s;
  
  &.isSticky {
    position: fixed;
    top: 0;
    width: 100%;
  }
  
  @media only screen and (max-width: 600px) {
    padding: 0 20px;
  } 
  
  /* Small devices (portrait tablets and large phones, 600px and up) */
  @media only screen and (min-width: 600px) {
    
  } 
  
  /* Medium devices (landscape tablets, 768px and up) */
  @media only screen and (min-width: 768px) {
    
  } 
  
  /* Large devices (laptops/desktops, 992px and up) */
  @media only screen and (min-width: 992px) {
    
  } 
`;

const Inner = styled.div`
  margin: 0 auto;
  display: flex;
  max-width: 1200px;
  justify-content: space-between;
`;

const StyledMenu = styled(Menu)`
	line-height: 64px;
  border-bottom: none;
`;


const Group = styled.div`
  display: flex;
`;

const Logo = styled.div`
  width: 44px;
  height: 44px;
  margin: 10px 20px 10px 0;
  background: url('/static/assets/logo.svg') center center / cover no-repeat;
  background-size: cover;
  border-radius: 100%;
  border: 1px solid green;
`;

interface IProps {
  dispatch: Dispatch
}

interface IState {
  current: string,
  searchQuery: string,
  isMobile: boolean,
  isSticky: boolean
}

class Navbar extends React.PureComponent<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      current: props.router.pathname.substring(1) || 'news',
      searchQuery: '',
      isMobile: false,
      isSticky: false
    }
  }

  componentDidMount(): void {
    window.addEventListener("resize", this.resize.bind(this));
    window.addEventListener('scroll', this.handleScroll);
    this.resize();
  }

  componentWillUnmount(): void {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.resize.bind(this));
  }

  handleScroll = () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > 90) {
      this.setState({
        isSticky: true
      })
    } else {
      this.setState({
        isSticky: false
      })
    }
  };

  resize() {
    const currentIsMobile = window.innerWidth <= 760;
    if (currentIsMobile !== this.state.isMobile) {
      this.setState({isMobile: currentIsMobile});
    }
  }

  setDisplayedContacts = debounce(query => {
    if (query) {
      const payload = {
        q: query,
      };
      this.props.dispatch({
        type: actionTypes.SEARCH_POST_REQUEST,
        payload: payload,
      });
    }
  }, 1000);

  handleChange = e => {
    let input = e.target.value.toLowerCase();
    this.setDisplayedContacts(input);
  };

  menus = () => {
    const { current } = this.state;
    return (
      <StyledMenu
        selectedKeys={[current]}
        mode="horizontal"
        theme="light"
      >
        <Item key='news'>
          <Link href='/'>
            <a>News</a>
          </Link>
        </Item>
        <Item key='history'>
          <Link href='/history'>
            <a>History</a>
          </Link>
        </Item>
      </StyledMenu>
    )
  };

  responsiveMenu = () => {
    const { isMobile } = this.state;

    if (isMobile) {
      return (
        <Dropdown trigger={['click']} overlay={() => {
          return this.menus();
        }}>
          <Icon type="ellipsis" style={{ fontSize: '24px', lineHeight: '64px' }}/>
        </Dropdown>
      )
    }
    return this.menus();
  };

  render() {
    const {isSticky} = this.state;
    return (
      <StyledHeaderWrapper className={isSticky && 'isSticky'}>
        <Inner>
          <Group>
            <Logo/>
            {this.responsiveMenu()}
          </Group>
          <div>
            <Search
              onChange={this.handleChange}
              placeholder="Search..."
              onSearch={value => console.log(value)}
              style={{ width: 200 }}
            />
          </div>
        </Inner>
      </StyledHeaderWrapper>
    )
  }
}

export default connect()(withRouter(Navbar));
