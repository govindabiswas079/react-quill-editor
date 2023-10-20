/* import React, { Fragment, useEffect, useState } from 'react';
import JSZip from 'jszip';

const ZipFolderTree = () => {
    const [folderTree, setFolderTree] = useState(null);

    console.log(folderTree)
    useEffect(() => {
        const readZipFile = async () => {
            const response = await fetch('http://localhost:8080/api/download/zip');
            const arrayBuffer = await response.arrayBuffer();
            const zip = new JSZip();
            const loadedZip = await zip.loadAsync(arrayBuffer);

            const folderTree = {};

            loadedZip.forEach((relativePath, zipEntry) => {
                const pathParts = relativePath.split('/');
                let currentFolder = folderTree;

                pathParts.forEach((part, index) => {
                    if (index === pathParts.length - 1) {
                        // File
                        currentFolder[part] = null;
                    } else {
                        // Folder
                        if (!currentFolder[part]) {
                            currentFolder[part] = {};
                        }
                        currentFolder = currentFolder[part];
                    }
                });
            });

            setFolderTree(folderTree);
        };

        readZipFile();
    }, []);

    const renderFolderTree = (folderTree, level = 0) => {
        return Object.keys(folderTree).map((name) => {
            const isFolder = typeof folderTree[name] === 'object';
            const indent = '  '.repeat(level);
            return (
                <div key={name}>
                    {indent}
                    {isFolder ? <strong>{name}</strong> : name}
                    {isFolder && renderFolderTree(folderTree[name], level + 1)}
                </div>
            );
        });
    };

    return (
        <Fragment>
            {folderTree === null ? <></> :
                <div>
                    {renderFolderTree(folderTree)}
                </div>
            }
        </Fragment>
    )
};

export default ZipFolderTree; */


/* import React, { Fragment, useEffect, useState } from 'react';
import JSZip from 'jszip';

const ZipFolderTree = () => {
    const [folderTree, setFolderTree] = useState(null);

    useEffect(() => {
        const readZipFile = async () => {
            const response = await fetch('http://localhost:8080/api/download/zip');
            const arrayBuffer = await response.arrayBuffer();
            const zip = new JSZip();
            const loadedZip = await zip.loadAsync(arrayBuffer);

            const folderTree = {};

            loadedZip.forEach(async (relativePath, zipEntry) => {
                const pathParts = relativePath.split('/');
                let currentFolder = folderTree;

                pathParts.forEach((part, index) => {
                    if (index === pathParts.length - 1) {
                        // File
                        currentFolder[part] = zipEntry;
                    } else {
                        // Folder
                        if (!currentFolder[part]) {
                            currentFolder[part] = {};
                        }
                        currentFolder = currentFolder[part];
                    }
                });
            });

            setFolderTree(folderTree);
        };

        readZipFile();
    }, []);

    const readFileContent = async (fileEntry) => {
        console.log(fileEntry)
        // const fileContent = await fileEntry.async('string');
        // console.log(fileContent); // You can use the file content as per your requirements
    };

    const renderFolderTree = (folderTree, level = 0) => {
        return (
            <Fragment>
                {Object.keys(folderTree).map((name) => {
                    const isFolder = typeof folderTree[name] === 'object';
                    const indent = '  '.repeat(level);
                    
                    return (
                        <div key={name}>
                            {indent}
                            {isFolder ? (
                                <strong>{name}</strong>
                            ) : (
                                <Fragment>
                                    <span
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => readFileContent(folderTree[name])}
                                    >
                                        {name}
                                    </span>
                                </Fragment>
                            )}
                            {isFolder && renderFolderTree(folderTree[name], level + 1)}
                        </div>
                    );
                })}
            </Fragment>
        )
    };

    return (
        <div>
            {folderTree === null ? <></> :
                renderFolderTree(folderTree)}
        </div>
    )
};

export default ZipFolderTree; */


/* import React, { useEffect, useState } from 'react';
import JSZip from 'jszip';

const ZipFolderTree = () => {
    const [folderTree, setFolderTree] = useState({});
    const [isOpen, setIsOpen] = useState(false);
    
    useEffect(() => {
        const readZipFile = async () => {
            const response = await fetch('http://localhost:8080/api/download/zip');
            const arrayBuffer = await response.arrayBuffer();
            const zip = new JSZip();
            const loadedZip = await zip.loadAsync(arrayBuffer);

            const folderTree = {};

            loadedZip.forEach(async (relativePath, zipEntry) => {
                const pathParts = relativePath.split('/');
                let currentFolder = folderTree;

                pathParts.forEach((part, index) => {
                    if (index === pathParts.length - 1) {
                        // File
                        currentFolder[part] = zipEntry;
                    } else {
                        // Folder
                        if (!currentFolder[part]) {
                            currentFolder[part] = {};
                        }
                        currentFolder = currentFolder[part];
                    }
                });
            });

            setFolderTree(folderTree);
        };

        readZipFile();
    }, []);

    const readFileContent = async (fileEntry) => {
        const fileContent = await fileEntry.async('string');
        console.log(fileContent); // You can use the file content as per your requirements
    };

    const renderFolderTree = (folderTree, level = 0) => {
        return Object.keys(folderTree).map((name) => {
            const isFolder = typeof folderTree[name] === 'object';            

            const toggleFolder = () => {
                setIsOpen(!isOpen);
            };

            return (
                <div key={name}>
                    {isFolder ? (
                        <div className="folder">
                            <strong onClick={toggleFolder}>{isOpen ? '-' : '+'}</strong>
                            <span>{name}</span>
                        </div>
                    ) : (
                        <div className="file" onClick={() => readFileContent(folderTree[name])}>
                            {name}
                        </div>
                    )}
                    {isFolder && isOpen && renderFolderTree(folderTree[name], level + 1)}
                </div>
            );
        });
    };

    return <div id="folderTree">{renderFolderTree(folderTree)}</div>;
};

export default ZipFolderTree; */


import React, { useState, useEffect, Fragment } from 'react'
import JSZip from 'jszip';

const ZipFolderTree = () => {
    const [folderTree, setFolderTree] = useState({});
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const readZipFile = async () => {
            const response = await fetch('http://localhost:8080/api/download/zip');
            const arrayBuffer = await response.arrayBuffer();
            const zip = new JSZip();
            const loadedZip = await zip.loadAsync(arrayBuffer);

            const folderTree = {};

            loadedZip.forEach(async (relativePath, zipEntry) => {
                const pathParts = relativePath.split('/');
                let currentFolder = folderTree;

                pathParts.forEach((part, index) => {
                    if (index === pathParts.length - 1) {
                        // File
                        currentFolder[part] = zipEntry;
                    } else {
                        // Folder
                        if (!currentFolder[part]) {
                            currentFolder[part] = {};
                        }
                        currentFolder = currentFolder[part];
                    }
                });
            });

            setFolderTree(folderTree);
        };

        readZipFile();
    }, []);


    console.log(folderTree)
    return (
        <Fragment>
            {Object.keys(folderTree).map((name) => {
                // const isFolder = typeof folderTree[name] === 'object';
                // const indent = '  '.repeat(level);
                console.log(folderTree[name])
                // Object.keys(folderTree[name]).map((value) => {
                //     console.log(value)
                // })
            })}
        </Fragment>
    )
}

export default ZipFolderTree