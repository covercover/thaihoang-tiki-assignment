import React from 'react';
import {Layout, BackTop, Icon} from "antd";
import Navbar from '../components/Navbar';
import styled from 'styled-components';

const Top = styled.div`
  height: 40px;
  width: 40px;
  line-height: 40px;
  background-color: #1088e9;
  color: #fff;
  text-align: center;
  font-size: 20px;
  border-radius: 100%;
`;

interface IProps {

}

interface IState {

}

export default class BasicLayout extends React.Component<IProps, IState> {
  render() {
    return (
      <Layout style={{background: 'white'}}>
        <Navbar/>
        {this.props.children}
        <BackTop>
          <Top><Icon type="arrow-up" /></Top>
        </BackTop>
      </Layout>
    )
  }
}
