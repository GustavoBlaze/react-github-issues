import styled, { css } from 'styled-components';
import hexToRgb from '../../utils/HexToRgb';
import { Rotate } from '../../components/Keyframes';

export const Loading = styled.div`
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  ${css`
    svg {
      margin-left: 10px;
      animation: ${Rotate} 2.5s linear infinite;
    }
  `}
`;

export const Owner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    color: #7159c1;
    font-size: 16px;
    text-decoration: none;
  }

  img {
    width: 120px;
    border-radius: 50%;
    margin-top: 20px;
  }
  h1 {
    font-size: 24px;
    margin-top: 10px;
  }
  p {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }
`;

export const IssueFilter = styled.div`
  padding-top: 5px;
  margin-top: 50px;
  border-top: 1px solid #eee;
  display: flex;
  flex-direction: row;
  justify-content: center;
  span {
    font-size: 16px;
    font-weight: bold;
    color: #666;
    margin-right: 5px;
  }
`;

export const IssueFilterItem = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 5px;
  padding: 5px 12px;
  border-radius: 2px;
  color: ${props => props.color};
  border: 1px solid ${props => props.color};
  background: white;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;

  svg {
    margin-right: 5px;
  }

  input {
    /* display: none; */
  }

  &:hover {
    color: white;
    background: ${props => props.color};
  }
  ${props =>
    props.filter &&
    css`
      color: white;
      background: ${props.color};
    `}
`;

export const IssueLabel = styled.span`
  --red: ${props => hexToRgb(props.color).r};
  --geen: ${props => hexToRgb(props.color).g};
  --blue: ${props => hexToRgb(props.color).b};

  --accessible-color: calc(
    (
        (
            (
                (var(--red, 0) * 299) + (var(--green, 0) * 587) +
                  (var(--blue, 0) * 114)
              ) / 1000
          ) - 128
      ) * -1000
  );

  color: rgb(
    var(--accessible-color, 0),
    var(--accessible-color, 0),
    var(--accessible-color, 0)
  );

  background-color: rgb(var(--red, 0), var(--green, 0), var(--blue, 0));
`;

export const IssueList = styled.ul`
  padding-top: 30px;
  list-style: none;

  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: 4px;

    & + li {
      margin-top: 10px;
    }

    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 2 solid #eee;
    }

    div {
      flex: 1;
      margin-left: 15px;

      strong {
        font-size: 16px;

        a {
          text-decoration: none;
          color: #333;
          margin-right: 10px;
          &:hover {
            color: #7159c1;
          }
        }

        span {
          /* color: #333; */
          border-radius: 2px;
          font-size: 12px;
          font-weight: 600;
          height: 20px;
          line-height: 15px;
          padding: 3px 4px;
          margin-right: 10px;
          display: inline-block;
        }
      }

      p {
        margin-top: 5px;
        font-size: 12px;
        color: #999;
      }
    }
  }

  ${props => {
    let styles = '';
    for (let i = 0; i < props.length; i += 1) {
      styles += `
        li:nth-child(${i + 1}) {
          animation: issue-appear 500ms;
          animation-fill-mode: backwards;
          animation-delay: ${i * 100}ms;
        }
      `;
    }

    return css`
      ${styles}
    `;
  }}
`;

export const Pagination = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 5px;

  button {
    background-color: #7159c1;
    padding: 10px;
    border-radius: 4px;
    border: none;
    color: white;
  }

  button[disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }

  button:not([disabled]):hover {
    opacity: 0.8;
  }

  span {
    color: #666;
  }

  ${css`
    svg {
      margin-left: 10px;
      animation: ${Rotate} 2.5s linear infinite;
    }
  `}
`;
