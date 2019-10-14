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
        height: 224,
    },
    tabs: {
        position: "fixed",
        borderRight: `1px solid ${theme.palette.divider}`,
    },
    container:{
        marginLeft: '160px'
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
            >
                <Tab label="Messages" {...a11yProps(0)} />
                <Tab label="People" {...a11yProps(1)} />
                <Tab label="Restaurants" {...a11yProps(2)} />
                <Tab label="Dishes" {...a11yProps(3)} />
            </Tabs>
            <TabPanel value={value} index={0} className={classes.container}>
                Messages...
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