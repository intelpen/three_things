import React from "react";
import styled from "styled-components";
import "react-dragula/dist/dragula.css";
import userReducer from "../../redux/reducers/userReducers";
import { withRouter } from "react-router";
import {
    Avatar as MuiAvatar,
    Breadcrumbs as MuiBreadcrumbs,
    Button,
    Card as MuiCard,
    CardContent,
    Divider as MuiDivider,
    Grid,
    Link,
    Fab as MuiFab,
    IconButton as MuiIconButton,
    Typography as MuiTypography, Badge
} from "@material-ui/core";
import {
    FacebookShareCount,
    FacebookShareButton,
    EmailShareButton,
    TwitterShareButton,
    FacebookIcon,
    OKShareCount,
    PinterestShareCount,
    RedditShareCount,
    TumblrShareCount,
    VKShareCount,
} from "react-share";

import {
    Heart as HeartIcon, Frown as FrownIcon, Edit3 as Edit3Icon, Share2 as ShareIcon,
    Facebook as ShareFacebookIcon, Trash2 as DeleteIcon, Smile as SmileIcon,
    ThumbsDown as ThumbsDownIcon, Twitter as ShareTwitterIcon,
    ThumbsUp, MessageSquare,

} from "react-feather";
import { deepOrange, deepPurple, green, pink,lightRed, blue, amber, blueGrey } from "@material-ui/core/colors";
import {
  Star as StarIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as Delete2Icon,
  CloudUpload as CloudUploadIcon,
  KeyboardVoice as KeyboardVoiceIcon,
  Navigation as NavigationIcon,
  Save as SaveIcon
} from "@material-ui/icons";

import { spacing } from "@material-ui/system";

import dragula from "react-dragula";
import {connect} from "react-redux";
import {Link as RouterLink} from "react-router-dom";
const Fab = styled(MuiFab)(spacing);

const IconButton = styled(MuiIconButton)(spacing);

const Card = styled(MuiCard)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const ThreeRuleWrapper = styled(Card)`
  border: 1px solid ${props => props.theme.palette.grey[300]};
  background: ${props => props.theme.body.background};
  margin-bottom: ${props => props.theme.spacing(4)}px;
  cursor: grab;
`;

const ThreeRuleWrapperContent = styled(CardContent)`
  &:last-child {
    padding-bottom: ${props => props.theme.spacing(4)}px;
  }
`;

const Avatar = styled(MuiAvatar)`
  float: left;
  margin-left: ${props => props.theme.spacing(6)}px;
  margin-right: ${props => props.theme.spacing(2)}px;
  height: 20px;
  width: 20px;
`;

const BigAvatar =styled(MuiAvatar)`
  float: right;
  margin-left: ${props => props.theme.spacing(1)}px;
  height: 32px;
  width: 32px;
`;

const PinkAvatar = styled(Avatar)`
  background-color: ${pink[500]};
`;


const BigPinkAvatar = styled(BigAvatar)`
  background-color: ${pink[500]};
`;

const BigAmberAvatar = styled(BigAvatar)`
  background-color: ${amber[500]};
`;

const BigGreyAvatar = styled(BigAvatar)`
  background-color: ${blueGrey[500]};
`;
const BlueAvatar = styled(Avatar)`
  background-color: ${blue[500]};
`;


const BigBlueAvatar = styled(BigAvatar)`
  background-color: ${blue[500]};
`;



const GreenAvatar = styled(Avatar)`
  background-color: ${green[500]};
`;
const BigGreenAvatar = styled(BigAvatar)`
  background-color: ${green[500]};
`;



const OrangeAvatar = styled(Avatar)`
  background-color: ${deepOrange[500]};
`;

const BigOrangeAvatar = styled(Avatar)`
  background-color: ${deepOrange[500]};
`;

const PurpleAvatar = styled(Avatar)`
  background-color: ${deepPurple[500]};
`;

const RedAvatar = styled(Avatar)`
  background-color: ${deepPurple[500]};
`;
const Indicator = styled(Badge)`
  .MuiBadge-badge {
    background: ${props => props.theme.header.indicator.background};
    color: ${props => props.theme.palette.common.white};
  }
`;


const Typography = styled(MuiTypography)(spacing);

class ThreeRule extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {countz:-1, rule_url : "http://intelpen.data-science.news",};
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleLike = this.handleLike.bind(this);
        this.handleDisLike = this.handleDisLike.bind(this);

    }
    componentDidMount() {
        fetch("https://graph.facebook.com/?id="+this.state.rule_url+"&fields=og_object{engagement}").then((response) => response.json())
            .then((response)=>{
                console.log("raspuns");
                console.log(response);
                if (response.og_object != null) {
                    this.setState({countz:response.og_object.engagement.count})
                }
            }).catch(undefined);
    }

    handleLike(event){
        var rule = this.props.rule;
        rule.votes_positive = rule.votes_positive +1;
        var jsonified_rule = JSON.stringify(rule);
        /* remember, this should be done better by using a "upvote_rule : id" post on the server */
        fetch("http://intelpen.data-science.news:3299/list_of_things/"+ rule.id ,{
            "body": jsonified_rule,
            "headers":{
                "Accept":"application/json",
                "Content-type" : "application/json"
            },
            "method":"PUT"
        }).then((response) => response.json()).then((response) => console.log(response));
        /*refresh*/
        this.props.handler(event);

    }
    handleDisLike(event){
        var rule = this.props.rule;
        rule.votes_negative =rule.votes_negative +1;
        var jsonified_rule = JSON.stringify(rule);
        /* remember, this should be done better by using a "upvote_rule : id" post on the server */
        fetch("http://intelpen.data-science.news:3299/list_of_things/"+ rule.id ,{
            "body": jsonified_rule,
            "headers":{
                "Accept":"application/json",
                "Content-type" : "application/json"
            },
            "method":"PUT"
        }).then((response) => response.json()).then((response) => console.log(response));
        /*refresh*/
        this.props.handler(event);

    }
    handleEdit() {
        console.log("Moving to "+ this.props.rule.id);
        //send to redux the edit rule
        this.props.history.push('/edit-rule/'+ this.props.rule.id)
    }

    handleDelete(event) {
        console.log("Delete "+ this.props.rule.id);
        console.log(this.props.handler)
        //send to redux the edit rule
        fetch("http://intelpen.data-science.news:3299/list_of_things/"+ this.props.rule.id ,{
            "headers":{
                "Accept":"application/json",
                "Content-type" : "application/json"
            },
            "method":"DELETE"
        }).then((response) => response.json()).then((response) => console.log(response));
        console.log(this.props)
        this.props.handler(event);
    }

    render() {
        var rule = this.props.rule;
        const shareUrl = this.state.rule_url;
        const title = 'GitHub';
        console.log("countz");
        console.log(this.state.countz)

        return (
            <ThreeRuleWrapper mb={4}>
                <ThreeRuleWrapperContent>
                    <Grid container direction="row" alignContent="flex-end" alignItems="stretch" justify-self="stretch">
                        <Grid Item justify-self="stretch" xs={9} lg={10} xl={10}>
                            <Grid container direction="column" justify-self="center">
                                <Grid Item>
                                    <RedAvatar> <StarIcon/> </RedAvatar>
                                    <Typography variant="body2" mb={3}>
                                        {rule.title}  (Author:{rule.author})
                                    </Typography>

                                </Grid>
                                <Grid Item >
                                    <Grid container>
                                        <Grid Item>
                                            <PinkAvatar size="small">1</PinkAvatar>
                                            <Typography variant="body3" mb={3} v>
                                                {rule.things[0]}
                                            </Typography>
                                        </Grid>
                                        <Grid Item>
                                            <PinkAvatar size="small">2</PinkAvatar>
                                            <Typography variant="body3" mb={3}>
                                                {rule.things[1]}
                                            </Typography>
                                        </Grid>
                                        <Grid Item>
                                            <PinkAvatar size="small">1</PinkAvatar>
                                            <Typography variant="body3" mb={3}>
                                                {rule.things[2]}

                                            </Typography>

                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid Item alignItems="center" alignContent="center" justify-self="center"  xs={3} lg={2} xl={2}>

                                <Indicator  badgeContent={rule.votes_positive} invisible ={rule.votes_positive == 0}>
                                    <BigPinkAvatar mx={2} my={2} aria-label="Like" onClick = {this.handleLike}>
                                        <HeartIcon/>
                                    </BigPinkAvatar>
                                </Indicator>

                            <IconButton color="secondary">
                                <Indicator  badgeContent={rule.votes_negative} invisible ={false} onClick = {this.handleDisLike}>
                                    <BigGreyAvatar mx={2} aria-label="DisLike" >
                                        <FrownIcon/>
                                    </BigGreyAvatar>
                                </Indicator>
                            </IconButton>

                            <FacebookShareButton
                                url={shareUrl}
                                quote={title}
                                className="button"
                            >
                                <Indicator  badgeContent={this.state.countz} invisible ={this.state.countz == 0}>
                                    <BigBlueAvatar mx={2} aria-label="Share to Facebook">
                                        <ShareFacebookIcon/>
                                    </BigBlueAvatar>
                                </Indicator>
                            </FacebookShareButton>

                             <EmailShareButton
                                 url={shareUrl}
                                 title={title}>
                                 <Indicator  badgeContent={this.state.emailcountz} invisible ={this.state.countz == 0}>
                                    <BigAmberAvatar mx={2} aria-label="Share Link">
                                        <ShareIcon/>
                                    </BigAmberAvatar>
                                         </Indicator>
                             </EmailShareButton>

                            <TwitterShareButton
                                url={shareUrl}
                                title={title} >
                                <Indicator  badgeContent={this.state.twittercountz} invisible ={this.state.countz == 0}>
                                    <BigBlueAvatar mx={2} aria-label="Share to Twitter">
                                        <ShareTwitterIcon/>
                                    </BigBlueAvatar>
                                </Indicator>

                            </TwitterShareButton>



                            {rule.author == this.props.user_info.currentUser ?
                                (<BigGreenAvatar mx={2} aria-label="Edit" onClick={this.handleEdit}>
                                    <Edit3Icon/>
                                </BigGreenAvatar>)
                                : null}
                            {rule.author == this.props.user_info.currentUser ?
                                (<BigGreyAvatar mx={2} aria-label="Delete" onClick = {this.handleDelete} to="/">
                                <DeleteIcon/>
                                </BigGreyAvatar>):null}

                        </Grid>
                    </Grid>
                </ThreeRuleWrapperContent>
            </ThreeRuleWrapper>
        );
    }
}
export default withRouter(connect(store => ({ user_info: store.userReducer }))(ThreeRule));