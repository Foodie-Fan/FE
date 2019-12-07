import React from 'react'
import {useDropzone} from 'react-dropzone'
import makeStyles from "@material-ui/core/styles/makeStyles";
import Cloud from '@material-ui/icons/Backup';
import IconButton from "@material-ui/core/IconButton";
import CheckIcon from '@material-ui/icons/Check';
import CircularProgress from "@material-ui/core/CircularProgress";
import Edit from "@material-ui/icons/Edit";
import ReactCrop from 'react-image-crop';
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import 'react-image-crop/dist/ReactCrop.css';
import Button from "@material-ui/core/Button";
import {image64toCanvasRef, base64StringtoFile, extractImageFileExtensionFromBase64} from "./utils";
import Collapse from "@material-ui/core/Collapse";
import loadImage from 'blueimp-load-image'

const useStyles = makeStyles({
        container: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            width: '100%',
            margin: '50px 5px 20px 5px',
            minWidth: "300px",
        },
        block: {
            position: 'relative',
            width: '101%',
            display: "flex",
            justifyContent: "center",

            cursor: "pointer",
            background: '#07bbff',
            color: 'white',
            height: '30',
            padding: '20px 15px 15px 15px',
            textAlign: 'center',
            borderRadius: 3,
            "&:hover": {
                boxShadow: '1px 0px 8px 3px rgba(169, 159, 161, 0.3)',
            },
        },
        icon: {
            width: 80,
            height: 'auto',
            background: 'white',
            boxShadow: '1px 0px 8px 3px rgba(169, 159, 161, 0.3)',
            position: 'absolute',
            top: '-50%',
            "&:hover": {
                background: 'white',
            },
        },
        iconImg: {
            width: 50,
            height: 'auto',
            color: '#07bbff',
        },
        successIcon: {
            width: 50,
            height: 'auto',
            color: '#00df0a',
        },
        editIcon: {
            width: 50,
            height: 'auto',
            color: '#dfd43f',
        },
        iconPosition: {
            position: 'absolute',
            top: '-46%',
            color: '#16dfdf',
        },

        imgContainer: {
            minWidth: "300px",
            overflow: "auto",
            position: 'relative',
            width: '90%',
            textAlign: "center",
            padding: '0 15px 15px 15px',
            boxShadow: '1px 0px 8px 3px rgba(169, 159, 161, 0.3)',
        },
        imgTitle: {
            marginTop: 20,
            marginBottom:
                20,
        },
        saveBtn: {
            background: "#22e63e",
            color: 'white',
            fontSize: '1rem',
            border: '1px solid #09adcb',
            width: '30%',
            height: '2.4rem',
            borderRadius: '5px',
            display: 'flex',
            justifyContent: 'center',
            marginTop: '5px',
            margin: 'auto',
            "&:hover": {
                background: "#24fb43",
                color: 'white',
            },
        },
        canvas: {
            display: "none",
        },

    })
;

function ImgDropAndCrop(props) {
    const classes = useStyles();
    const [crop, setCrop] = React.useState({
        aspect: 1 / 1,
        width: 215,
        height: 215,
    });
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const [imgSrc, setImgSrc] = React.useState(null);
    const [croppedImg, setCroppedImg] = React.useState(null);

    const [toggleCrop, setToggleCrop] = React.useState(false);
    let imagePreviewCanvasRef = React.createRef();

    const {acceptedFiles, getRootProps, getInputProps, isDragActive, isDragReject} = useDropzone({
        accept: 'image/*',
        maxSize: 10000000000,
        multiple: false,
        onDrop(acceptedFiles) {
            setSuccess(false);
            setLoading(true);
            if (acceptedFiles.length > 0) {
                setToggleCrop(false);
                const loadImageOptions = {canvas: true, maxWidth: 306};
                loadImage.parseMetaData(acceptedFiles[0], (data) => {
                    if (data.exif && data.exif.get('Orientation')) {
                        loadImageOptions.orientation = data.exif.get('Orientation')
                    }
                    loadImage(acceptedFiles[0], (canvas) => {
                        setImgSrc(canvas.toDataURL(acceptedFiles[0].type));
                    }, loadImageOptions);
                });
                setTimeout(() => {
                    setSuccess(true);
                    setLoading(false);
                }, 300);
            } else {
                setTimeout(() => {
                    setSuccess(false);
                    setLoading(false);
                }, 300);
            }
        }
    });

    const handleOnCropComplete = (crop, percentCrop) => {
        const canvasRef = imagePreviewCanvasRef.current;
        image64toCanvasRef(canvasRef, imgSrc, crop, setCroppedImg);
    };

    const handleCropImg = () => {
        const canvasRef = imagePreviewCanvasRef.current;
        const imgSrcExt = extractImageFileExtensionFromBase64(croppedImg);

        const imageData64 = canvasRef.toDataURL('image/' + imgSrcExt);
        const myFilename = "previewFile." + imgSrcExt;

        const myNewCroppedFile = base64StringtoFile(imageData64, myFilename);
        props.setImage(myNewCroppedFile);
        setToggleCrop(true);
    };

    return (
        <>
            <div className={classes.container}>
                <div {...getRootProps()} className={classes.block}>
                    <IconButton className={classes.icon}>
                        {
                            acceptedFiles.length > 0 && toggleCrop
                                ? <CheckIcon className={classes.successIcon}/>
                                : acceptedFiles.length > 0 ? acceptedFiles.map(acceptedFile => (
                                    success
                                        ? <Edit className={classes.editIcon}/>
                                        : <Cloud className={classes.iconImg}/>

                                ))
                                : <Cloud className={classes.iconImg}/>
                        }
                    </IconButton>
                    {loading && <CircularProgress size={68} className={classes.iconPosition}/>}
                    <input {...getInputProps()}/>
                    {!isDragReject
                        ? (isDragActive
                            ? <p>Drop the files here ...</p>
                            : (acceptedFiles.length > 0) &&
                            (toggleCrop)
                                ? <p>Image was saved</p>
                                : !success
                                    ? <p>Drag the image, or click to select</p>
                                    : <p>Edit the image</p>)
                        : (<p>Some files will be rejected</p>)}
                </div>
                <Collapse in={imgSrc && !toggleCrop}>
                    <Card className={classes.imgContainer}>
                        <Typography variant={"h5"} className={classes.imgTitle}>Crop your image</Typography>
                        <ReactCrop
                            src={imgSrc}
                            crop={crop}
                            onChange={newCrop => setCrop(newCrop)}
                            minWidth={215}
                            minHeight={215}
                            keepSelection={true}
                            onComplete={(crop, pixelCrop) => handleOnCropComplete(crop, pixelCrop)}
                        />
                        <canvas className={classes.canvas} ref={imagePreviewCanvasRef}></canvas>
                        <Button className={classes.saveBtn} onClick={() => handleCropImg()}>Save</Button>
                    </Card>
                </Collapse>
            </div>

        </>
    )
}


export default ImgDropAndCrop;
