import React from 'react';
import PostTile from '../Post/PostTile';
import {Layout, Card, Col, Row} from 'antd';
import styled from "styled-components";
import {IPost} from '../Post';

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

interface IHistoryProps {
  historyDataSource: IPost[]
}

const History: React.FC<IHistoryProps> = ({historyDataSource}) => {
  return (
    <Row>
      <Col span={24}>
        <Layout style={{background: 'white'}}>
          <StyledContentWrapper>
            {historyDataSource.length > 0
              ? historyDataSource.map((item: any, index) => (
                <PostTile disabledForStorage={true} key={index} post={item}/>
              ))
              : (
                <Card>
                  No have data
                </Card>
              )}
          </StyledContentWrapper>
        </Layout>
      </Col>
    </Row>
  );
};

export default History;
