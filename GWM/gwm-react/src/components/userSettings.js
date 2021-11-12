import React, {useState, useEffect} from "react"; 
import {Box, IconButton, Card, Collapse, Modal, Grid, Paper, Typography, TextField, FormControl, InputLabel, Select, MenuItem, Button, Tabs, Tab, CardContent, CardActions} from "@mui/material";
import {Switch, Route, useRouteMatch, Link} from "react-router-dom";
import { styled } from '@mui/material/styles';
import {DatePicker} from "@mui/lab";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import moment from "moment";

import Api from "../helpers/Api.js";
import MasterCard from "../images/mastercard.png"

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    minHeight: 240,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
  };

const style2 = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    minHeight: 400,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
  };


export default function Settings() {

    let { path } = useRouteMatch(); 
    const [value, setValue] = useState(`${path}`);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    return (
        <Box display="flex" justifyContent="center" sx={{ minHeight: "130vh", padding: "5vh" }}>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={3} md={3}>
                            <Paper sx={{height: "120vh", padding: "4vh"}}>
                                <Typography variant="h6" sx={{paddingLeft: "1vh", paddingBottom: "2vh" }}>
                                    Settings
                                </Typography>
                                <Tabs orientation="vertical" value={value} onChange={handleChange} variant='fullWidth' sx={{float: "left"}}>
                                    <Tab label="Profile" value={path} to={path} component={Link} sx={{fontWeight:"600", color: 'black', "&.Mui-selected": {color:"red"}, "&.hover": {color: "red", opacity: 1} }} />
                                    <Tab label="Finance" 
                                        value={`${path}/cards`} to={`${path}/cards`} 
                                        component={Link}  
                                        sx={{fontWeight:"600", color: "black", "&.Mui-selected": {color:"red"}, "&.hover": { color: "red", opacity: 1 },}} />
                                </Tabs>
                            </Paper>
                        </Grid>

                        <Grid item xs={9} md={9}>
                            <Switch>
                                <Route exact path={`${path}/cards`} component={CardSettings}/>
                                <Route exact path={path} component={ProfileSettings}/>
                            </Switch>
           
                        </Grid>
                    </Grid>
                </Grid>
            </Grid> 
        </Box>
    );
}

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

export function CardSettings() {
    const [balance, setBalance] = useState("");
    const [reload, setReload] = useState("");
    const [cards, setCards] = useState([]);
    const [cId, setCId] = useState("");

    //add card
    const [cardNum, setCardNum] = useState("");
    const [cardName, setCardName] = useState("");
    const [exp, setExp] = useState(moment("1990-01-01 00:00:00").toDate());
    const [cvv, setCvv] = useState("");

    //top up
    const [openTopupModal, setOpenTopupModal] = useState(false);
    const [topupAmt, setTopupAmt] = useState(0);
    const [topupWithCard, setTopupWithCard] = useState("");

    
    const [expanded, setExpanded] = useState(false);
    const [openDeleteCard, setOpenDeleteCard] = useState(false);
    const [openAddCard, setOpenAddCard] = useState(false);

    // console.log("rendering");

    const uId =
      window.localStorage.user === undefined
        ? 0 : JSON.parse(window.localStorage.user).userId;
    
    useEffect(() => {
        Api.getUser(uId)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                alert("Retrieving wallet failed");
            }
            }).then((tempUser) => {
                setBalance(tempUser.wallet);
                setCards(tempUser.cards);
        });

    }, [reload, uId]);

    //card expand more
    const handleExpandClick = () => {
        setExpanded(!expanded);
      };

    //modal stuff
    const handleClose = () => {
        setOpenDeleteCard(false);
        setOpenAddCard(false);
        setOpenTopupModal(false);
        setCardNum("");
        setCardName("");
        setExp("");
        setCvv("");
        setTopupAmt(0);
        setTopupWithCard("")
    };

    function handleDeleteCard(cardId, e) {
        e.preventDefault();
        console.log(cardId);
        setCId(cardId);
        setOpenDeleteCard(true);
    };


    //delete card
    const deleteCard = () => {
        Api.deleteCard(uId, cId)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                alert("Delete card failed");
            }
        }).then((temp) => {
            setReload(reload + 1);
            handleClose();
        });
    }

    function handleAddCard(e) {
        e.preventDefault();
        setOpenAddCard(true);
    }

    const addCard = () => {
        const newCard = {
            cardNum: cardNum,
            expDate: exp,
            cvv: cvv,
            name: cardName
        }
        Api.addCard(uId, newCard)    
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                alert("Add card failed, check the format");
            }
        }).then((temp) => {
            setReload(reload + 1);
            handleClose();
        }).catch((error) =>  {
            alert("Add card failed, ensure that all fields are filled");
        });
    }

    const topupWallet = () => {
        if (topupWithCard === "") {
            alert("Please select a card");
        } else {
            Api.topupWallet(uId, topupAmt)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    alert("Top up wallet failed");
                }
            }).then((temp) => {
                setReload(reload + 1);
                handleClose();
            }).catch((error) =>  {
                alert("Top up wallet failed");
            });
        }
    }

    return (
        <Paper sx={{minHeight: "120vh", padding: "5vh"}}>
            <Typography variant="h6" sx={{ paddingLeft: "1vh", paddingBottom: "2vh" }}>
                Finance
            </Typography>

            <Modal open={openTopupModal} onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={style} display="flex">
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={12}>
                            <IconButton onClick={handleClose} sx={{float:"right"}}>
                                <CloseRoundedIcon/>
                            </IconButton>
                            <Typography variant="h6">Top up</Typography>
                        </Grid>
                        <Grid item xs={12} sx={{paddingLeft: "3vh", paddingRight: "3vh"}}>
                            <TextField
                                    id="outlined-basic"
                                    type="number"
                                    label="Top Up amount"
                                    value={topupAmt}
                                    size="small"
                                    fullWidth
                                    required="true"
                                    autofocus
                                    error={topupAmt === 0}
                                    onChange={(event) => setTopupAmt(event.target.value)}
                                    />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <FormControl size="small" sx={{ width: "35vh"}}>
                                <InputLabel id="demo-simple-select-helper-label">
                                    Card
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    value={topupWithCard.cardNum}
                                    label="Game"
                                    onChange={(event) => {
                                        setTopupWithCard(event.target.value);
                                    }}
                                >
                                    {cards.map((card) => (
                                        <MenuItem key={card.cardId} value={card.cardNum}>{card.cardNum}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <Button onClick={() => topupWallet()} color="secondary" variant="contained" sx={{float:"right"}}>
                                Confirm
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>

            <Modal open={openDeleteCard} onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={style} display="flex">
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={12}>
                            <IconButton onClick={handleClose} sx={{float:"right"}}>
                                <CloseRoundedIcon/>
                            </IconButton>
                            <Typography variant="h6">Confirm Remove Card</Typography>
                        </Grid>
                        <Grid item xs={12} sx={{paddingLeft: "3vh", paddingRight: "3vh"}}>
                            <Typography paragraph variant="body1">Are you sure you want to remove your card?</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Button onClick={() => deleteCard()} color="secondary" variant="contained" sx={{float:"right"}}>
                                Confirm
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>

            <Modal open={openAddCard} onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={style2} display="flex">
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={12}>
                            <IconButton onClick={handleClose} sx={{float:"right"}}>
                                <CloseRoundedIcon/>
                            </IconButton>
                            <Typography variant="h6">Add Card</Typography>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <TextField
                                id="outlined-basic"
                                type="number"
                                label="Card Number"
                                value={cardNum}
                                size="small"
                                fullWidth
                                autofocus
                                required="true"
                                error={cardNum.length < 16}
                                onChange={(event) => {
                                    if (event.target.value.length <= 16) {
                                        setCardNum(event.target.value);
                                    }
                                }}
                                />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <TextField
                                id="outlined-basic"
                                label="Card Name"
                                value={cardName}
                                size="small"
                                fullWidth
                                required="true"
                                error={cardName === ""}
                                onChange={(event) => setCardName(event.target.value)}
                                />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <TextField
                                id="outlined-basic"
                                type="number"
                                label="cvv"
                                value={cvv}
                                size="small"
                                required="true"
                                error={cvv.length < 3}
                                onChange={(event) => {
                                        if (event.target.value.length <= 3) {
                                            setCvv(event.target.value);
                                        }
                                    }}
                                />
                        </Grid>
                        <Grid item xs={12}>
                            <DatePicker
                            label="Exp Date"
                            value={exp}
                            views={['year', 'month']}
                            minDate={moment()}
                            onChange={(newexp) => {
                                setExp(newexp);
                            }}
                            inputProps={{
                                readOnly: true,
                               }}
                            error={exp === ""}
                            helperText="Enter exp date"
                            renderInput={(params) => <TextField {...params} />}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Button onClick={() => addCard()} color="secondary" variant="contained" sx={{float:"right"}}>
                                Confirm
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>

            
            <Grid container spacing={1}>
               
                <Grid item xs={6}>
                    <Card sx={{width: "45vh", maxHeight: "35vh", padding: "3vh", paddingTop:"2vh"}}>
                        <CardContent variant="outlined">
                            <Grid container spacing={2}>
                                <Grid item xs={8} md={8}>
                                    <Typography variant="body1" sx={{fontWeight: "550", color: "secondary.main"}}>
                                        Wallet
                                    </Typography>
                                </Grid>
                                <Grid item xs={4} md={4}>
                                    <AccountBalanceWalletIcon sx={{float: "right", color:"grey"}}/>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <Typography variant="body1" sx={{fontWeight: "400", color: "#4c524d"}}>
                                        Balance Amount
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <Typography variant="h4">
                                        ${balance} 
                                    </Typography>
                                </Grid>
                                <Grid item xs={7} md={7}>
                                </Grid>
                                <Grid item xs={5} md={5}>
                                    <Button variant="outlined" color="error" 
                                            size="small" sx={{float:"right"}}
                                            onClick={() => setOpenTopupModal(true)}>
                                        Top up
                                    </Button>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <br/>
                    <Typography variant="h6">
                        Credit Cards
                    </Typography>
                    <Button variant="contained" color="secondary" sx={{float: "right"}} onClick={(e) => handleAddCard(e)}>
                        Add Card
                    </Button>
                </Grid>
                {cards.map((card) => (
                    <>
                    <Grid item xs={5}>
                        <Card sx={{width: "52vh", padding: "2vh", paddingTop:"2vh", backgroundColor: "#2c2e2d"}}>
                            <CardContent variant="outlined" sx={{paddingBottom:"0"}}>
                                <Grid container spacing={1.2}>
                                    <Grid item xs={8} md={8}>
                                        <CreditCardIcon fontSize="large" sx={{color:"white"}}/>
                                    </Grid>
                                    <Grid item xs={4} md={4} >
                                        <IconButton aria-label="delete" size="large" onClick={(e) => handleDeleteCard(card.cardId, e)} sx={{float: "right", paddingTop: "0vh", paddingRight: "0vh"}}>
                                            <DeleteIcon fontSize="small" sx={{color: "#a1a6a2"}}/>
                                        </IconButton>
                                    </Grid>
                                    
                                    <Grid item xs={12} md={12}>
                                        <Typography variant="body1" sx={{fontWeight: "500", color: "white"}}>
                                            xxxx xxxx xxxx {card.cardNum.slice(card.cardNum.length - 4)}
                                        </Typography>
                                    </Grid>
                                    <br/>
                                    <br/>
                                    <Grid item xs={8} md={8}>
                                        <Typography variant="body1" sx={{fontWeight: "400", color: "white"}}>
                                            {card.name}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={4} md={4}>
                                    <img alt="Mastercard" src={MasterCard}  width="50" style={{float: "right"}}/>
                                    </Grid>
                                </Grid>
                            </CardContent>
                            <CardActions sx={{paddingTop: "0vh"}}>
                                <ExpandMore expand={expanded}
                                            onClick={handleExpandClick}
                                            aria-expanded={expanded}
                                            aria-label="show more">
                                    <ExpandMoreIcon size="large" sx={{color: "#fff"}}/>
                                </ExpandMore>
                            </CardActions>
                            <Collapse in={expanded} timeout="auto" unmountOnExit>
                                <CardContent sx={{padding: "1vh", paddingLeft: "2vh", paddingTop: "0vh"}}>
                                    <Typography sx={{color: "#fff", fontWeight: "400"}}>
                                        <b>Card Num: </b> {card.cardNum} <br/>
                                        <b>Cvv:</b> {card.cvv} &nbsp; &nbsp; <b>Exp:</b> {moment(card.expDate, "YYYY-MM-DD").format('MM/YY')}
                                    </Typography>
                                   
                                </CardContent>
                            </Collapse>
                        </Card>
                    </Grid>
                    </>
                ))}
            </Grid> 
        </Paper>
        
    );
}

export function ProfileSettings() {
    const uId =
      window.localStorage.user === undefined
        ? 0 : JSON.parse(window.localStorage.user).userId;
    const [username, setUsername] = useState(""); 
    const [email, setEmail] = useState("");
    const [dob, setDob] = useState(moment("1990-01-01 00:00:00").toDate());
    const [gender, setGender] = useState(1);
    const [reload, setReload] = useState(0);

    useEffect(() => {
        Api.getUser(uId)
        .then((response) => response.json())
        .then((tempUser) => {
            const {email, username, dob, gender} = tempUser;
            setUsername(username);
            setEmail(email);
            setDob(moment(dob, "YYYY-MM-DDTHH:mm:ssZ[UTC]").toDate());
            setGender(gender);
            // setUser(tempUser);
        })
    },[reload, uId]);

    const handleEdit = (event) => {
        event.preventDefault();
        console.log("editing user");
        const user = {userId: uId, email: email, username: username, dob: dob, gender: gender}
        console.log(user);
        Api.updateUserProfile(uId, user)
            .then((response) => {
                if(response.ok) {
                    console.log("ok");
                    return response.json();
                } else {
                    alert("Edit cannot be made");
                }
            }).then((tempUser) => {
                // console.log(tempUser);
                // setUser(tempUser);
                setReload(reload + 1)
;            });

    }

    return (
        <Paper sx={{height: "120vh", padding: "4vh"}}>
            <Typography variant="h6" sx={{ paddingLeft: "1vh", paddingBottom: "2vh" }}>
                Profile Settings
            </Typography>
            <Grid container spacing={1}>
                <Grid item xs={2} md={2} sx={{padding: "5vh", paddingLeft: "5vh"}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} xm={12}>
                            <Typography variant="body1" sx={{ fontWeight: "500", paddingTop: "1vh", paddingLeft: "1vh", paddingBottom: "2vh" }}>
                                Email
                            </Typography>
                        </Grid>
                        <Grid item xs={12} xm={12}>
                            <Typography variant="body1" sx={{ fontWeight: "500", paddingTop: "1vh", paddingLeft: "1vh", paddingBottom: "2vh" }}>
                                Username
                            </Typography>
                        </Grid>
                        <Grid item xs={12} xm={12}>
                            <Typography variant="body1" sx={{ fontWeight: "500", paddingTop: "1vh", paddingLeft: "1vh", paddingBottom: "2vh" }}>
                                Gender
                            </Typography>
                        </Grid>
                        <Grid item xs={12} xm={12}>
                            <Typography variant="body1" sx={{ fontWeight: "500", paddingTop: "3.5vh", paddingLeft: "1vh", paddingBottom: "2vh" }}>
                                Birthday
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={10} md={10} sx={{padding: "5vh"}}>
                    <Grid container spacing={3}>
                        <Grid item xs={8} xm={8}>
                            <TextField id="outlined-basic" size="small" label="Email"
                            value={email} required fullWidth
                            onChange={(event) => setEmail(event.target.value)} />
                        
                        </Grid>
                        <Grid item xs={8} xm={8}>
                            <TextField id="outlined-basic" size="small" label="username"
                            value={username} required fullWidth
                            onChange={(event) => setUsername(event.target.value)}/>
                        </Grid>
                        
                        <Grid item xs={8} xm={8}>
                            <FormControl>
                                <InputLabel id="demo-simple-select-helper-label">
                                    Gender
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    value={gender}
                                    onChange={(event) => setGender(event.target.value)}>
                                    <MenuItem value={0}>Female</MenuItem>
                                    <MenuItem value={1}>Male</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={8} xm={8}>
                            <DatePicker
                                dateFormate="dd/MM/yyyy"
                                value={dob}
                                size="small"
                                label="Birthday"
                                onChange={(dob) => {
                                    setDob(dob);
                                }}
                                selected={dob}
                                inputProps={{
                                    readOnly: true,
                                   }}
                                renderInput={(params) => <TextField required {...params}/>}
                                />
                        </Grid>
                        <Grid item xs={8} xm={8}>
                            <Button color="secondary" variant="contained" onClick={handleEdit} sx={{float: "right"}}>
                                Confirm Edit
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
}