import React, { useState, useRef, useEffect, useContext } from 'react';
import { ChatStateContext } from '../../store/stateProviders/useChat';
import { addScrollStyle } from '../util';
import { useSelector, useDispatch } from 'react-redux';
import { actions, selectors } from '../../store';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { Button, TextField } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SocketIOClient from 'socket.io-client';
import axios from 'axios';
import { makeStyles } from '@mui/styles';
import { colors } from '../../styling';
const useStyles = makeStyles((theme) => ({
  chatBox: {
    height: '60%',
    position: 'relative',
    display: 'flex',
    zIndex: 0,
    flexDirection: 'column',
    [theme.breakpoints.down('sm')]: {},
  },
  chatOptions: {
    height: 'auto',
    background: 'black',
    display: 'flex',
    justifyContent: 'space-evenly',
    borderBottom: `.5px solid ${colors.white80}`,
  },
  chatOption: {
    cursor: 'pointer',
    padding: '3px 15px',
  },
  chatRoom: ({ primaryColor = colors.blue }) =>
    addScrollStyle(
      primaryColor,
      theme
    )({
      overflowY: 'scroll',
      overflowX: 'hidden',
      height: '100%',
    }),
  chatOptionSelected: {
    cursor: 'pointer',
    padding: '3px 15px',
    marginBottom: '5px',
    borderBottom: `2px solid ${colors.magenta}`,
    height: '30px',
  },
  message: ({ live }) => ({
    width: '50%',
    paddingBottom: '1%',
    [theme.breakpoints.down('sm')]: {
      width: '70%',
    },
    [theme.breakpoints.down('xs')]: {
      left: '20px',
    },
  }),
  sendIcon: ({ live }) => ({
    cursor: 'pointer',
    marginLeft: '20px',
    color: colors.blue,
    '&:hover': {
      color: theme.palette.primary.active,
    },
  }),
  commentImg: ({ live }) => ({
    height: '2rem',
    width: '2rem',
    borderRadius: '50%',
    objectFit: 'cover',
  }),
  chatImg: {
    width: '50px',
    height: '50px',
    margin: '0 10px',
    borderRadius: '50%',
    objectFit: 'cover',
    cursor: 'pointer',
  },
  authorName: {
    color: 'white',
    fontSize: '.9rem',
    position: 'absolute',
    top: 0,
    padding: 0,
    margin: '0 10px',
    fontWeight: 900,
    cursor: 'pointer',
  },
  chat: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    color: 'black',
    position: 'relative',
    minHeight: '10%',
    height: 'auto',
    margin: '1% 0',
  },
  Uchat: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row-reverse',
    color: 'black',
    minHeight: '10%',
    height: 'auto',
    margin: '1% 0',
  },
  uText: {
    maxWidth: '50%',
    borderRadius: '10px',
    background: colors.blue,
    padding: '0 1%',
    fontSize: '1rem',
    marginTop: '2%',
    [theme.breakpoints.down('sm')]: {
      marginTop: '4%',
    },
  },
  text: {
    maxWidth: '50%',
    borderRadius: '10px',
    background: colors.white80,
    padding: '0 1%',
    fontSize: '1rem',
    marginTop: '2%',
    [theme.breakpoints.down('sm')]: {
      marginTop: '4%',
    },
  },
  commentText: {
    maxWidth: '60%',
    borderRadius: '10px',
    background: colors.white80,
    padding: '0 1%',
    fontSize: '1rem',
    top: 0,
    margin: 0,
    left: '52px',
    marginTop: '2%',
    [theme.breakpoints.down('sm')]: {
      marginTop: '4%',
    },
  },
  commentCont: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    color: 'black',
    position: 'relative',
    height: 'auto',
    padding: 0,
  },
  question: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row-reverse',
    color: 'black',
    minHeight: '15%',
    height: 'auto',
    margin: '1% 0',
  },
  questionText: {
    borderRadius: '10px',
    background: 'white',
    padding: '0 1%',
    fontSize: '1rem',
    marginTop: '4%',
    [theme.breakpoints.down('sm')]: {
      marginTop: '4%',
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: '4%',
    },
  },
  formContainer: ({ live }) => ({
    position: live ? '' : 'absolute',
    top: live ? '' : '0px',
    bottom: live ? '64px' : '',
    width: '100%',
  }),
  chatInput: {
    background: 'black',
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      marginTop: '4%',
      background: colors.darkGray,
    },
  },
  questionContent: {
    maxWidth: '40%',
    width: '40%',
    display: 'flex',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    height: '100%',
  },
  questionBtns: {
    paddingRight: '10%',
    display: 'flex',
    alignItems: 'center',
  },
  declineBtn: {
    marginLeft: '5%',
    background: 'transparent',
    border: '1px solid red',
    color: 'red',
    '&:hover': {
      transition: 'all .2s ease-in-out',
      backgroundColor: 'red',
      color: 'white',
    },
  },
  acceptBtn: {
    background: colors.blue,
    '&:hover': {
      backgroundColor: theme.palette.primary.active,
    },
  },
  selectedQuestionCont: {
    position: 'relative',
    background: colors.blue80,
    minHeight: '15%',
    height: 'auto',
    maxheight: '30%',
    display: 'flex',
    alignItems: 'center',
  },
  selectedText: {
    color: 'white',
    fontSize: '1.2rem',
  },
}));

const ChatRoom = ({ audiocastId, live, audiocast }) => {
  const classes = useStyles({ live });
  const { allChatsByRoom, getMessagesByRoom, message, setMessage } =
    useContext(ChatStateContext);
  const dispatch = useDispatch();
  const [partyChat, setPartyChat] = useState(true);
  const [qA, setQA] = useState(false);
  const [comments, setComments] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState();
  const [isHost, setIsHost] = useState(false);
  const currentUser = useSelector(selectors.getUserData);

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = SocketIOClient('https://leagueday-api.herokuapp.com', {
      query: audiocastId,
    });
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);

  useEffect(() => {
    socket?.on('new_chat', () => {
      console.log('triggered new chat ');
      getMessagesByRoom(audiocastId);
    });

    socket?.on('accepted_question', () => {
      console.log('socket accepted question');
      getQuestions(audiocastId);
    });

    socket?.on('new_question', () => {
      console.log('new question');
      getQuestions(audiocastId);
    });

    return () => {
      socket?.off('new_chat', () => {
        getMessagesByRoom(audiocastId);
      });
      socket?.off('accepted_question', () => {
        getQuestions(audiocastId);
      });
      socket?.off('new_question', () => {
        console.log('new question');
        getQuestions(audiocastId);
      });
    };
  }, [socket]);

  const messageEl = useRef(null);

  const scrollToBottom = () => {
    messageEl?.current?.scrollIntoView({ behavior: 'auto' });
  };

  useEffect(scrollToBottom, [
    allChatsByRoom,
    comments,
    questions,
    selectedQuestion,
    partyChat,
    qA,
  ]);

  const getQuestions = async () => {
    await axios
      .get(`https://leagueday-api.herokuapp.com/questions/${audiocastId}`)
      .then((res) => {
        setQuestions(
          res.data.data
            .sort((a, b) => {
              return new Date(a.date) - new Date(b.date);
            })
            .filter((question) => question.status !== 'accepted')
        );
        setSelectedQuestion(
          res.data.data.filter((question) => question.status === 'accepted')[0]
        );
      })
      .catch((err) => console.log(err));
  };

  const askQuestion = (e) => {
    e.preventDefault();
    axios
      .post('https://leagueday-api.herokuapp.com/questions/create', {
        audiocastId: audiocastId,
        question: message,
        authorId: currentUser.fields.userId,
      })
      .then((res) => {
        console.log('asked question ', res);
        socket.emit('new_question', {
          audiocastId: audiocastId,
          question: message,
          authorId: currentUser.fields.userId,
        });
        setMessage('');
      })
      .catch((err) => {
        console.log('couldnt ask question ', err);
      });
  };

  const acceptQuestion = async (id, question) => {
    if (selectedQuestion) {
      await axios
        .delete(
          `https://leagueday-api.herokuapp.com/questions/delete/${selectedQuestion.id}`
        )
        .then((res) => {
          socket.emit('new_question', question);
          console.log('deleted question ', res);
        })
        .catch((err) => {
          console.log('declined question ', err);
        });
    }

    await axios
      .post('https://leagueday-api.herokuapp.com/questions/accept', {
        id: id,
      })
      .then((res) => {
        socket.emit('new_question', question);
        console.log('accepted question ', res);
      })
      .catch((err) => {
        console.log('declined question ', err);
      });
  };

  const getComments = () => {
    axios
      .get(`https://leagueday-api.herokuapp.com/comments/get/${audiocastId}`)
      .then((res) => {
        setComments(
          res.data.data.comments.sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
          })
        );
      })
      .catch((err) => console.log('error in AudiocastScreen ', err));
  };

  const sendChat = (e) => {
    e.preventDefault();
    if (message) {
      axios
        .post('https://leagueday-api.herokuapp.com/chats/create', {
          userId: currentUser.fields.userId,
          roomId: audiocastId,
          message: message,
          authorName: currentUser.fields.username,
          image: currentUser.fields.image
            ? currentUser.fields.image
            : 'https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1214428300?k=6&m=1214428300&s=170667a&w=0&h=hMQs-822xLWFz66z3Xfd8vPog333rNFHU6Q_kc9Sues=',
        })
        .then((res) => {
          socket.emit('new_chat', { message });
          setMessage('');
          console.log('sent message ', res);
        })
        .catch((err) => {
          console.log('message send error ', err);
        });
    }
  };

  const postComment = (e) => {
    e.preventDefault();
    axios
      .post('https://leagueday-api.herokuapp.com/comments/create', {
        referenceId: audiocastId,
        commentorId: currentUser.fields.userId,
        comment: message,
      })
      .then((res) => {
        setMessage('');
        console.log('posted comment ', res);
        getComments();
      })
      .catch((err) => {
        console.log('comment post error ', err);
      });
  };

  useEffect(() => {
    getMessagesByRoom(audiocastId);
    getComments();
    getQuestions();
    if (audiocast?.fields?.userId === currentUser?.fields?.userId) {
      setIsHost(true);
    } else {
      setIsHost(false);
    }
  }, [audiocastId, audiocast]);

  const listener = (event) => {
    if (event.code === 'Enter' || event.code === 'NumpadEnter') {
      live && partyChat
        ? sendChat(event)
        : live && qA
        ? askQuestion(event)
        : postComment(event);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', listener);
    return () => {
      document.removeEventListener('keydown', listener);
    };
  }, []);

  return (
    <>
      <div className={classes.chatOptions}>
        {live ? (
          <>
            <b
              className={
                partyChat ? classes.chatOptionSelected : classes.chatOption
              }
              onClick={() => {
                setPartyChat(true);
                setQA(false);
              }}
            >
              Party Chat
            </b>
            <b
              className={qA ? classes.chatOptionSelected : classes.chatOption}
              onClick={() => {
                setPartyChat(false);
                setQA(true);
              }}
            >
              Q&A
            </b>
          </>
        ) : (
          <b className={classes.chatOptionSelected}>Comments</b>
        )}
      </div>
      <div className={classes.chatBox}>
        <div className={classes.chatRoom}>
          {live &&
            partyChat &&
            allChatsByRoom?.map((chat, ind) => (
              <div
                className={
                  chat?.authorId === currentUser?.fields?.userId
                    ? classes.Uchat
                    : classes.chat
                }
                key={ind}
              >
                <img className={classes.chatImg} src={chat?.authorImg} alt="" />
                <p
                  className={classes.authorName}
                  style={{
                    right:
                      currentUser?.fields?.username === chat?.authorName
                        ? '55px'
                        : '',
                    left:
                      currentUser?.fields?.username === chat?.authorName
                        ? ''
                        : '50px',
                  }}
                >
                  {chat?.authorName}
                </p>
                <div style={{ height: '30px' }}></div>
                <p
                  className={
                    chat?.authorId === currentUser?.fields?.userId
                      ? classes.uText
                      : classes.text
                  }
                >
                  {chat?.message}
                </p>
              </div>
            ))}
          {live && selectedQuestion && qA && (
            <>
              <p
                style={{
                  fontWeight: 900,
                  margin: 0,
                  padding: 0,
                }}
              >
                Current Question:
              </p>
              <div className={classes.selectedQuestionCont}>
                <div
                  style={{
                    width: '30%',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <p style={{ margin: '0 20px' }}>By:</p>
                  <img
                    src={selectedQuestion?.user?.image}
                    className={classes.chatImg}
                    alt=""
                    onClick={() =>
                      dispatch(
                        actions.pushHistory(
                          `/profile/${selectedQuestion?.user?.id}`
                        )
                      )
                    }
                  />
                  <p
                    style={{
                      fontWeight: 900,
                      marginLeft: '15px',
                      fontSize: '1rem',
                    }}
                  >
                    {selectedQuestion?.user?.username}
                  </p>
                </div>
                <p className={classes.selectedText}>
                  {selectedQuestion?.question}
                </p>
              </div>
            </>
          )}
          {live &&
            qA &&
            questions?.map((item, ind) => {
              return (
                <div className={classes.question} key={ind}>
                  <div className={classes.questionContent}>
                    <img
                      src={item?.user?.image}
                      className={classes.chatImg}
                      alt=""
                      onClick={() =>
                        dispatch(
                          actions.pushHistory(`/profile/${item?.user?.id}`)
                        )
                      }
                    />
                    <p className={classes.authorName} style={{ right: '55px' }}>
                      {item?.user?.username}
                    </p>
                    <div style={{ height: '30px' }}></div>
                    <p className={classes.questionText}>{item?.question}</p>
                  </div>
                  {isHost && (
                    <div className={classes.questionBtns}>
                      <button
                        className={classes.acceptBtn}
                        onClick={() => acceptQuestion(item?.id, item)}
                      >
                        Accept
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          {!live &&
            comments?.map((comment, ind) => (
              <div
                className={classes.commentCont}
                style={{ marginTop: ind === 0 ? '70px' : '1%' }}
                key={ind}
              >
                <img
                  src={comment?.user?.image}
                  className={classes.chatImg}
                  alt=""
                  onClick={() =>
                    dispatch(
                      actions.pushHistory(`/profile/${comment?.user?.id}`)
                    )
                  }
                />
                <p
                  className={classes.authorName}
                  onClick={() =>
                    dispatch(
                      actions.pushHistory(`/profile/${comment?.user?.id}`)
                    )
                  }
                  style={{ left: '50px' }}
                >
                  {comment?.user?.username}
                </p>
                <p className={classes.commentText}>{comment.comment}</p>
              </div>
            ))}
          <div ref={messageEl} />
        </div>
        <div className={classes.formContainer}>
          <form className={classes.chatInput}>
            <img
              src={currentUser?.fields?.image}
              className={classes.commentImg}
            />
            <TextField
              type="text"
              label={
                !live && currentUser
                  ? 'Add a Comment'
                  : live && partyChat
                  ? 'Send a Chat'
                  : live && qA && 'Ask a Question'
              }
              name="Comment"
              className={classes.message}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => listener(e)}
              disabled={!currentUser}
            />
            <button
              type="submit"
              style={{
                border: 'none',
                outline: 'none',
                background: 'transparent',
              }}
              onClick={(e) => {
                e.preventDefault();
                live && partyChat
                  ? sendChat(e)
                  : live && qA
                  ? askQuestion(e)
                  : postComment(e);
              }}
            >
              <FontAwesomeIcon
                icon={faPaperPlane}
                className={classes.sendIcon}
                size={'2x'}
              />
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChatRoom;
