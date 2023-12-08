import styled from "styled-components";
import Header from './Header';
import { Layout, Affix } from 'antd';
import * as React from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import axios from 'axios';

const labels = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};
function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}
const Contact = () => {
  const [value, setValue] = React.useState(2);
  const [hover, setHover] = React.useState(-1);
    const {  Footer } = Layout;
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      // Gửi dữ liệu form lên server
      try {
        const response = await axios.post('http://localhost:3001/send-feedback', {
          username: event.target.username.value,
          Email: event.target.Email.value,
          Message: event.target.Message.value,
          rating: value
        });
  
        console.log(response.data); // In ra thông báo từ server (thành công hoặc lỗi)
      } catch (error) {
        console.error(error);
      }
    };


  const Wrapper = styled.section`
    text-align: center;
    .common-heading {
      margin: 6rem;
      font-size: 4rem;
    }
    .fix2{
      height:30px !important;
      width:300px !important;
      font-size:30px !important;
    }
    .customStarIcon{
      font-size: 4rem !important; 
      opacity: 0.55;
    }
    input, textarea{
        max-width: 50rem;
    .fix2 {
      height: 30px !important;
      width: 300px !important;
      font-size: 30px !important;
    }
    .customStarIcon {
      font-size: 4rem !important;
      opacity: 0.55;
    }
    input,
    textarea {
      max-width: 50rem;

      color: ${({ theme }) => theme.colors.black};
      padding: 1.6rem 2.4rem;
      border: 1px solid ${({ theme }) => theme.colors.border};
      text-transform: uppercase;
      box-shadow: ${({ theme }) => theme.colors.shadowSupport};
    }
    input[type="submit"] {
      max-width: 10rem;
      margin-top: 2rem;
      background-color: ${({ theme }) => theme.colors.btn};
      color: ${({ theme }) => theme.colors.white};
      padding: 1.4rem 2.2rem;
      border-style: solid;
      border-width: 0.1rem;
      text-transform: uppercase;
      font-size: 1.5rem;
      cursor: pointer;
    }
    .container {
      margin-top: 6rem;
      font-size: 18px;

      .contact-form {
        max-width: 50rem;
        margin: auto;

        .contact-inputs {
          display: flex;
          flex-direction: column;
          gap: 3rem;

          input[type="submit"] {
            cursor: pointer;
            transition: all 0.2s;

            &:hover {
              background-color: ${({ theme }) => theme.colors.white};
              border: 1px solid ${({ theme }) => theme.colors.btn};
              color: ${({ theme }) => theme.colors.btn};
              transform: scale(0.9);
            }
          }
        }
      }
    }
  `;

  return (
    <Wrapper>
     <Header/>
      <h2 className="common-heading">Feedback</h2>

      <div className="container" style={{marginBottom:'50px'}}>
      
      
        <div className="contact-form">
          <form
            action="https://formspree.io/f/xeqdgwnq"
            method="POST"
            className="contact-inputs"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              placeholder="username"
              name="username"
              required
              autoComplete="off"
            />

            <input
              type="email"
              name="Email"
              placeholder="Email"
              autoComplete="off"
              required
            />

            <textarea
              name="Message"
              cols="30"
              rows="10"
              required
              autoComplete="off"
              placeholder="Enter you message"
            ></textarea>

<Box 
      sx={{
        width: 200,
        display: 'flex',
        alignItems: 'center',
      }}className="fix2"
    >
      <Rating
      className="customStarIcon"
        name="hover-feedback"
        value={value}
        precision={0.5}
        getLabelText={getLabelText}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon  fontSize="inherit" />}
      />
      {value !== null && (
        <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
      )}
    </Box>
            <Box
              sx={{
                width: 200,
                display: "flex",
                alignItems: "center",
              }}
              className="fix2"
            >
              <Rating
                className="customStarIcon"
                name="hover-feedback"
                value={value}
                precision={0.5}
                getLabelText={getLabelText}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
                onChangeActive={(event, newHover) => {
                  setHover(newHover);
                }}
                emptyIcon={<StarIcon fontSize="inherit" />}
              />
              {value !== null && (
                <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
              )}
            </Box>
            <input type="submit" value="send" />
          </form>
        </div>
      </div>
    </Wrapper>
  );
};

export default Contact
