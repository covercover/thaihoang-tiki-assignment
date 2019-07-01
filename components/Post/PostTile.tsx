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

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Body = styled.div`
  display: flex;
  margin-bottom: 20px;
  justify-content: space-between;
  
  /* Extra small devices (phones, 600px and down) */
  @media only screen and (max-width: 600px) {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    justify-content: space-between;
  }
`;

const BodyLeft = styled.div`
  padding-right: 40px;
  
  /* Extra small devices (phones, 600px and down) */
  @media only screen and (max-width: 600px) {
    padding-right: 0;
  }
`;

const BodyRight = styled.div``;

const Footer = styled.div`
  @media only screen and (max-width: 600px) {
    display: flex;
    justify-content: space-between;
  }
`;

const Source = styled.span`
  margin-right: 40px;
  @media only screen and (max-width: 600px) {
    margin-right: 0;
  }
`;

const PublishAt = styled.span``;

const HeroImage = styled.img`
  width: 300px;
  
  /* Extra small devices (phones, 600px and down) */
  @media only screen and (max-width: 600px) {
    width: 100%;
  }
`;

const Description = styled.div`
  margin-bottom: 30px;
  
  /* Extra small devices (phones, 600px and down) */
  @media only screen and (max-width: 600px) {
    margin-bottom: 20px;
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

const handleRedirect = ({disabledForStorage = false, post}) => {
  // Pre set local storage
  if (!disabledForStorage) {
    preSetLocalStorage(post);
  }

  // Redirect
  window.open(post.url, '_blank');
};

interface IProps {
  disabledForStorage?: boolean,
  post: IPost
}

export interface IPost {
  title: string,
  description: string,
  publishedAt: string,
  urlToImage: string
  source: ISource,
}

interface ISource {
  id: string,
  name: string
}

const PostTile: React.FC<IProps> = (props) => {
  const {post} = props;
  return (
    <StyledCard>
      <Wrapper>
        <Body>
          <BodyLeft>
            <TitleWrapper onClick={() => handleRedirect(props)}>
              <Title level={3}>
                {post.title}
              </Title>
            </TitleWrapper>
            <Description>
              {post.description}
            </Description>
          </BodyLeft>
          <BodyRight>
            <HeroImage src={post.urlToImage}/>
          </BodyRight>
        </Body>
        <Footer>
          <Source>
            {post.source.name}
          </Source>
          <PublishAt>
            <Icon type="clock-circle" /> {post.publishedAt}
          </PublishAt>
        </Footer>
      </Wrapper>
    </StyledCard>
  )
};

export default PostTile;
