import React from "react";
import styled from "styled-components";
import "react-dragula/dist/dragula.css";

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
    Typography as MuiTypography
} from "@material-ui/core";


import {
  Heart as HeartIcon,
  ThumbsDown as ThumbsDownIcon,
} from "react-feather";
import { deepOrange, deepPurple, green, pink,lightRed } from "@material-ui/core/colors";
import {
  Star as StarIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  CloudUpload as CloudUploadIcon,
  KeyboardVoice as KeyboardVoiceIcon,
  Navigation as NavigationIcon,
  Save as SaveIcon
} from "@material-ui/icons";

import { spacing } from "@material-ui/system";

import dragula from "react-dragula";
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

const GreenAvatar = styled(Avatar)`
  background-color: ${green[500]};
`;

const OrangeAvatar = styled(Avatar)`
  background-color: ${deepOrange[500]};
`;

const PurpleAvatar = styled(Avatar)`
  background-color: ${deepPurple[500]};
`;

const RedAvatar = styled(Avatar)`
  background-color: ${deepPurple[500]};
`;


const Typography = styled(MuiTypography)(spacing);


function ThreeRule({ rule}) {
    return (
        <ThreeRuleWrapper mb={4}>
            <ThreeRuleWrapperContent>
                <Grid container  direction="row" alignContent="flex-end" alignItems="stretch" justify-self ="stretch">
                    <Grid Item justify-self ="stretch" lg="10">
                        <Grid container direction="column" justify-self ="center">
                            <Grid Item >
                                <RedAvatar> <StarIcon /> </RedAvatar>
                                <Typography variant="body2" mb={3}>
                                    {rule.title}
                                </Typography>
                            </Grid>
                            <Grid Item >
                                <Grid container>
                                    <Grid Item>
                                        <PinkAvatar size="small">1</PinkAvatar>
                                        <Typography  variant="body3" mb={3} v>
                                            {rule.things[0]}
                                        </Typography>
                                    </Grid >
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
                    <Grid Item alignItems="flex-end" alignContent="flex-end" justify-self ="center" lg="2">
                            <Fab mx={2} size="small" color="secondary" aria-label="Add">
                             <AddIcon />
                            </Fab>
                            <Fab mx={2} size="small"  background-color="pink" aria-label="Add">
                             <ThumbsDownIcon />
                            </Fab>
                            <IconButton mx={2} size ="small" color="magenta" aria-label="Delete">
                             <DeleteIcon fontSize="small" />
                            </IconButton>
                    </Grid>
                </Grid>
            </ThreeRuleWrapperContent>
        </ThreeRuleWrapper>
    );
}

export default ThreeRule;