import React from 'react';
import styled from "styled-components";
import {Card, Typography, Icon} from "antd";

const {Title} = Typography;

const StyledCard = styled(Card)`
  transition: transform .5s;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px #f0f1f2;
`;

const TitleWrapper = styled.div`
  cursor: pointer;
`;

const PostContent = styled.div`
  display: flex;
  justify-content: space-between;
  > div:first-child {
    margin-right: 50px;
  }
  
  /* Extra small devices (phones, 600px and down) */
  @media only screen and (max-width: 600px) {
    flex-direction: column;
    justify-content: normal;
    > div:first-child {
      margin-right: 0;
    }
  } 
  
  /* Small devices (portrait tablets and large phones, 600px and up) */
  @media only screen and (min-width: 600px) {
    
  } 
  
  /* Medium devices (landscape tablets, 768px and up) */
  @media only screen and (min-width: 768px) {
    flex-direction: column;
    justify-content: normal;
    > div:first-child {
      margin-right: 0;
    }
  } 
  
  /* Large devices (laptops/desktops, 992px and up) */
  @media only screen and (min-width: 992px) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    > div:first-child {
      margin-right: 50px;
    }
  } 
`;

const WrapperImg = styled.div`
  @media only screen and (max-width: 600px) {
    img {
      max-width: 100%;
      margin-top: 10px;
    }
  }
  
  /* Medium devices (landscape tablets, 768px and up) */
  @media only screen and (min-width: 768px) {
    img {
      max-width: 100%;
      margin-top: 10px;
    }
  } 
  
  /* Large devices (laptops/desktops, 992px and up) */
  @media only screen and (min-width: 992px) {
    img {
      max-width: 300px;
    }
  } 
`;

const HeroImage = styled.img`
  max-width: 300px;
`;

const Footer = styled.div`
  display: flex;
  font-size: 12px;
  > span:first-child {
    margin-right: 40px;
  }
`;

const setLocalStorage = data => {
  localStorage.setItem("history", JSON.stringify(data));
};

const preSetLocalStorage = postDetails => {
  if (typeof(Storage) !== "undefined") {

    // Retrieve
    const historyStorage = localStorage.getItem('history');
    let historyDataSource = [];

    if (historyStorage) {
      historyDataSource = JSON.parse(historyStorage);

      // Check exists before push
      const index = historyDataSource.findIndex(item => item.url === postDetails.url);

      // If not exist
      if (index === -1) {
        // Push latest post into history data source
        historyDataSource.unshift(postDetails)
      }
      setLocalStorage(historyDataSource);
    } else {
      historyDataSource.push(postDetails);
      setLocalStorage(historyDataSource);
    }
  } else {
    console.log('Sorry, your browser does not support Web Storage...')
  }
};

const handleRedirect = ({disabledForStorage, ...postDetails}) => {
  // Pre set local storage
  if (!disabledForStorage) {
    preSetLocalStorage(postDetails);
  }

  // Redirect
  window.open(postDetails.url, '_blank');
};

const PostTile: React.FC = (props: any) => {
  return (
    <StyledCard>
      <PostContent>
        <div>
          <TitleWrapper onClick={() => handleRedirect(props)}>
            <Title level={3} >
              {props.title}
            </Title>
          </TitleWrapper>
          <div style={{marginBottom: '30px'}}>{props.description}</div>
          <Footer>
            <span>
              {props.source.name}</span>
            <span><Icon type="clock-circle" /> {props.publishedAt}</span>
          </Footer>
        </div>
        <WrapperImg>
          <HeroImage src={props.urlToImage}/>
        </WrapperImg>
      </PostContent>
    </StyledCard>
  )
};

export default PostTile;
