import styled from 'styled-components';

const ListItemRender = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 15px;
  border-radius: 5px;
  margin-bottom: 3px;
  &:hover {
    background-color: #d1dde8;
  }
`;

const H5pGridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, max(64px, 100%/3)), 1fr));
`;

export { ListItemRender, H5pGridWrapper };
