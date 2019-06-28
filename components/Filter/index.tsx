import React from 'react';
import {Card, Select} from 'antd';
import styled from 'styled-components';

const StyledCard = styled(Card)`
  margin-bottom: 40px;
  box-shadow: 0 2px 8px #f0f1f2;
`;

const StyledSelect = styled(Select)`
  width: 200px;
`;

const { Option } = Select;

interface IProps {
  defaultDomain: string,
  handleChangeDomain: (value: string) => void
}

interface IState {

}

class Filter extends React.PureComponent<IProps, IState> {

  handleChange = (value) => {
    this.props.handleChangeDomain(value);
  };

  render() {
    const {defaultDomain} = this.props;
    return (
      <StyledCard>
        Select domain: {' '}
        <StyledSelect
          defaultValue={defaultDomain}
          onChange={this.handleChange}
        >
          <Option value="nytimes.com, cnn.com">ALL</Option>
          <Option value="cnn.com">CNN</Option>
          <Option value="nytimes.com">The New York Times</Option>
        </StyledSelect>
      </StyledCard>
    )
  }
}

export default Filter;
