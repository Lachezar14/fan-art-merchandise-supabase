import {Button, createStyles, Group, Text} from "@mantine/core";
import {useEffect, useRef, useState} from "react";
import {useDropzone} from "react-dropzone";
import {Dropzone} from "@mantine/dropzone";
import {IconCloudUpload, IconDownload, IconX} from "@tabler/icons";

const useStyles = createStyles((theme) => ({
    wrapper: {
        position: 'relative',
        marginBottom: 30,
    },

    dropzone: {
        borderWidth: 1,
        paddingBottom: 50,
    },

    icon: {
        color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[4],
    },

    control: {
        position: 'absolute',
        width: 250,
        left: 'calc(50% - 125px)',
        bottom: -20,
    },
}));

export default function ProductDropzone({sendDataToParent}) {
    const [files, setFiles] = useState([]);
    console.log(files);
    const onDrop = acceptedFiles => {
        sendDataToParent(acceptedFiles);
        setFiles(files => files.concat(...acceptedFiles));
    };

    const {getRootProps, getInputProps} = useDropzone({onDrop});

    {/*} return (
        <Fragment>
            <div {...getRootProps()} className="input-area">
                {
                    <div>
                        <p className="input-text">Drop the files here ...</p>
                    </div>
                }
                <input {...getInputProps()} />
            </div>
            <div>
                Files :
                {
                    files.map(file => <div>{file.path}   </div>)
                }
            </div>
        </Fragment>
    );*/
    }

    const {classes, theme} = useStyles();
    const openRef = useRef(null);

    return (
        <div className={classes.wrapper}>
                <Dropzone
                    openRef={openRef}
                    radius="md"
                    maxSize={30 * 1024 ** 2}
                    onDrop={onDrop}
                >
                    <div style={{pointerEvents: 'none'}} {...getRootProps()}>
                        <Group position="center">
                            <Dropzone.Accept>
                                <IconDownload size={50} color={theme.colors[theme.primaryColor][6]} stroke={1.5}/>
                            </Dropzone.Accept>
                            <Dropzone.Reject>
                                <IconX size={50} color={theme.colors.red[6]} stroke={1.5}/>
                            </Dropzone.Reject>
                            <Dropzone.Idle>
                                { files.length > 0 ? null :
                                <IconCloudUpload
                                    size={50}
                                    color={theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black}
                                    stroke={1.5}
                                />}
                            </Dropzone.Idle>
                            <input {...getInputProps()} />

                        </Group>

                        <Text align="center" weight={700} size="lg" mt="xl">
                            <Dropzone.Accept>Drop files here</Dropzone.Accept>
                            <Dropzone.Reject>Pdf file less than 30mb</Dropzone.Reject>
                        </Text>
                        {files.length > 0 ?
                            <div>
                                <Text align="center" size="sm" mt="xs" color="dimmed">
                                    Drag&apos;n&apos;drop files here to upload. We can accept only <i>.pdf</i> files that
                                    are less than 30mb in size.
                                </Text>
                                Files :
                                {
                                    files.map(file =>
                                        <>
                                            <div>{file.path}</div>
                                        </>
                                    )
                                }
                            </div>
                            :
                            <>
                            <Text align="center" weight={700} size="lg" mt="xl">
                                <Dropzone.Idle>Upload files</Dropzone.Idle>
                            </Text>
                            <Text align="center" size="sm" mt="xs" color="dimmed">
                                Drag&apos;n&apos;drop files here to upload. We can accept only <i>.pdf</i> files that
                                are less than 30mb in size.
                            </Text>
                            </>
                        }
                    </div>
                </Dropzone>
        </div>
    );
}