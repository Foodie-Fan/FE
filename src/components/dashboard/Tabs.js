import React from 'react';
import {makeStyles, Theme} from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

function TabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            <Box p={3}>{children}</Box>
        </Typography>
    );
}

function a11yProps(index: any) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
    },
    tabs: {
        position: "fixed",
        borderRight: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.paper,
        height: '100%'
    },
    container:{
        borderLeft: `1px solid ${theme.palette.divider}`,
        marginLeft: '160px',
        backgroundColor: '#fafafa',
        width: '100%'
    }
}));


export default function VerticalTabs() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <Tabs
                orientation="vertical"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                className={classes.tabs}
                indicatorColor="primary"
            >
                <Tab label="Messages" {...a11yProps(0)} />
                <Tab label="People" {...a11yProps(1)} />
                <Tab label="Restaurants" {...a11yProps(2)} />
                <Tab label="Dishes" {...a11yProps(3)} />
            </Tabs>

            <TabPanel value={value} index={0} className={classes.container}>
                Messages...An essay is, generally, a piece of writing that gives the author's own argument — but the definition is vague, overlapping with those of a paper, an article, a pamphlet, and a short story. Essays have traditionally been sub-classified as formal and informal. Formal essays are characterized by "serious purpose, dignity, logical organization, length," whereas the informal essay is characterized by "the personal element (self-revelation, individual tastes and experiences, confidential manner), humor, graceful style, rambling structure, unconventionality or novelty of theme," etc.[1]

                Essays are commonly used as literary criticism, political manifestos, learned arguments, observations of daily life, recollections, and reflections of the author. Almost all modern essays are written in prose, but works in verse have been dubbed essays (e.g., Alexander Pope's An Essay on Criticism and An Essay on Man). While brevity usually defines an essay, voluminous works like John Locke's An Essay Concerning Human Understanding and Thomas Malthus's An Essay on the Principle of Population are counterexamples.

                In some countries (e.g., the United States and Canada), essays have become a major part of formal education. Secondary students are taught structured essay formats to improve their writing skills; admission essays are often used by universities in selecting applicants, and in the humanities and social sciences essays are often used as a way of assessing the performance of students during final exams.

                The concept of an "essay" has been extended to other media beyond writing. A film essay is a movie that often incorporates documentary filmmaking styles and focuses more on the evolution of a theme or idea. A photographic essay covers a topic with a linked series of photographs that may have accompanying text or captions.An essay is, generally, a piece of writing that gives the author's own argument — but the definition is vague, overlapping with those of a paper, an article, a pamphlet, and a short story. Essays have traditionally been sub-classified as formal and informal. Formal essays are characterized by "serious purpose, dignity, logical organization, length," whereas the informal essay is characterized by "the personal element (self-revelation, individual tastes and experiences, confidential manner), humor, graceful style, rambling structure, unconventionality or novelty of theme," etc.[1]

                Essays are commonly used as literary criticism, political manifestos, learned arguments, observations of daily life, recollections, and reflections of the author. Almost all modern essays are written in prose, but works in verse have been dubbed essays (e.g., Alexander Pope's An Essay on Criticism and An Essay on Man). While brevity usually defines an essay, voluminous works like John Locke's An Essay Concerning Human Understanding and Thomas Malthus's An Essay on the Principle of Population are counterexamples.

                In some countries (e.g., the United States and Canada), essays have become a major part of formal education. Secondary students are taught structured essay formats to improve their writing skills; admission essays are often used by universities in selecting applicants, and in the humanities and social sciences essays are often used as a way of assessing the performance of students during final exams.

                The concept of an "essay" has been extended to other media beyond writing. A film essay is a movie that often incorporates documentary filmmaking styles and focuses more on the evolution of a theme or idea. A photographic essay covers a topic with a linked series of photographs that may have accompanying text or captions.
                An essay is, generally, a piece of writing that gives the author's own argument — but the definition is vague, overlapping with those of a paper, an article, a pamphlet, and a short story. Essays have traditionally been sub-classified as formal and informal. Formal essays are characterized by "serious purpose, dignity, logical organization, length," whereas the informal essay is characterized by "the personal element (self-revelation, individual tastes and experiences, confidential manner), humor, graceful style, rambling structure, unconventionality or novelty of theme," etc.[1]

                Essays are commonly used as literary criticism, political manifestos, learned arguments, observations of daily life, recollections, and reflections of the author. Almost all modern essays are written in prose, but works in verse have been dubbed essays (e.g., Alexander Pope's An Essay on Criticism and An Essay on Man). While brevity usually defines an essay, voluminous works like John Locke's An Essay Concerning Human Understanding and Thomas Malthus's An Essay on the Principle of Population are counterexamples.

                In some countries (e.g., the United States and Canada), essays have become a major part of formal education. Secondary students are taught structured essay formats to improve their writing skills; admission essays are often used by universities in selecting applicants, and in the humanities and social sciences essays are often used as a way of assessing the performance of students during final exams.

                The concept of an "essay" has been extended to other media beyond writing. A film essay is a movie that often incorporates documentary filmmaking styles and focuses more on the evolution of a theme or idea. A photographic essay covers a topic with a linked series of photographs that may have accompanying text or captions.
                An essay is, generally, a piece of writing that gives the author's own argument — but the definition is vague, overlapping with those of a paper, an article, a pamphlet, and a short story. Essays have traditionally been sub-classified as formal and informal. Formal essays are characterized by "serious purpose, dignity, logical organization, length," whereas the informal essay is characterized by "the personal element (self-revelation, individual tastes and experiences, confidential manner), humor, graceful style, rambling structure, unconventionality or novelty of theme," etc.[1]

                Essays are commonly used as literary criticism, political manifestos, learned arguments, observations of daily life, recollections, and reflections of the author. Almost all modern essays are written in prose, but works in verse have been dubbed essays (e.g., Alexander Pope's An Essay on Criticism and An Essay on Man). While brevity usually defines an essay, voluminous works like John Locke's An Essay Concerning Human Understanding and Thomas Malthus's An Essay on the Principle of Population are counterexamples.

                In some countries (e.g., the United States and Canada), essays have become a major part of formal education. Secondary students are taught structured essay formats to improve their writing skills; admission essays are often used by universities in selecting applicants, and in the humanities and social sciences essays are often used as a way of assessing the performance of students during final exams.

                The concept of an "essay" has been extended to other media beyond writing. A film essay is a movie that often incorporates documentary filmmaking styles and focuses more on the evolution of a theme or idea. A photographic essay covers a topic with a linked series of photographs that may have accompanying text or captions.An essay is, generally, a piece of writing that gives the author's own argument — but the definition is vague, overlapping with those of a paper, an article, a pamphlet, and a short story. Essays have traditionally been sub-classified as formal and informal. Formal essays are characterized by "serious purpose, dignity, logical organization, length," whereas the informal essay is characterized by "the personal element (self-revelation, individual tastes and experiences, confidential manner), humor, graceful style, rambling structure, unconventionality or novelty of theme," etc.[1]

                Essays are commonly used as literary criticism, political manifestos, learned arguments, observations of daily life, recollections, and reflections of the author. Almost all modern essays are written in prose, but works in verse have been dubbed essays (e.g., Alexander Pope's An Essay on Criticism and An Essay on Man). While brevity usually defines an essay, voluminous works like John Locke's An Essay Concerning Human Understanding and Thomas Malthus's An Essay on the Principle of Population are counterexamples.

                In some countries (e.g., the United States and Canada), essays have become a major part of formal education. Secondary students are taught structured essay formats to improve their writing skills; admission essays are often used by universities in selecting applicants, and in the humanities and social sciences essays are often used as a way of assessing the performance of students during final exams.

                The concept of an "essay" has been extended to other media beyond writing. A film essay is a movie that often incorporates documentary filmmaking styles and focuses more on the evolution of a theme or idea. A photographic essay covers a topic with a linked series of photographs that may have accompanying text or captions.
                An essay is, generally, a piece of writing that gives the author's own argument — but the definition is vague, overlapping with those of a paper, an article, a pamphlet, and a short story. Essays have traditionally been sub-classified as formal and informal. Formal essays are characterized by "serious purpose, dignity, logical organization, length," whereas the informal essay is characterized by "the personal element (self-revelation, individual tastes and experiences, confidential manner), humor, graceful style, rambling structure, unconventionality or novelty of theme," etc.[1]

                Essays are commonly used as literary criticism, political manifestos, learned arguments, observations of daily life, recollections, and reflections of the author. Almost all modern essays are written in prose, but works in verse have been dubbed essays (e.g., Alexander Pope's An Essay on Criticism and An Essay on Man). While brevity usually defines an essay, voluminous works like John Locke's An Essay Concerning Human Understanding and Thomas Malthus's An Essay on the Principle of Population are counterexamples.

                In some countries (e.g., the United States and Canada), essays have become a major part of formal education. Secondary students are taught structured essay formats to improve their writing skills; admission essays are often used by universities in selecting applicants, and in the humanities and social sciences essays are often used as a way of assessing the performance of students during final exams.

                The concept of an "essay" has been extended to other media beyond writing. A film essay is a movie that often incorporates documentary filmmaking styles and focuses more on the evolution of a theme or idea. A photographic essay covers a topic with a linked series of photographs that may have accompanying text or captions.


            </TabPanel>
            <TabPanel value={value} index={1} className={classes.container}>
                People...
            </TabPanel>
            <TabPanel value={value} index={2} className={classes.container}>
                Restaurants...
            </TabPanel>
            <TabPanel value={value} index={3} className={classes.container}>
                Dishes...
            </TabPanel>
        </div>
    );
}